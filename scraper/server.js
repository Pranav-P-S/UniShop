/**
 * UniShop Scraper Server
 * Express API for real-time e-commerce product scraping
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import scrapers
const amazonScraper = require('./scrapers/amazon');
const flipkartScraper = require('./scrapers/flipkart');
const meeshoScraper = require('./scrapers/meesho');
const ajioScraper = require('./scrapers/ajio');
const myntraScraper = require('./scrapers/myntra');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// In-memory cache for products
let productsCache = [];
let lastScrapeTime = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Scraper mapping
const scrapers = {
    amazon: amazonScraper,
    flipkart: flipkartScraper,
    meesho: meeshoScraper,
    ajio: ajioScraper,
    myntra: myntraScraper
};

/**
 * GET /api/products
 * Returns all cached products
 */
app.get('/api/products', (req, res) => {
    res.json({
        success: true,
        count: productsCache.length,
        lastUpdated: lastScrapeTime,
        products: productsCache
    });
});

/**
 * GET /api/search
 * Search products by query
 */
app.get('/api/search', async (req, res) => {
    try {
        const { q, platform, minPrice, maxPrice, category, limit = 50 } = req.query;

        if (!q || q.trim().length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Search query must be at least 2 characters'
            });
        }

        console.log(`[SEARCH] Query: "${q}", Platform: ${platform || 'all'}`);

        // If specific platform requested, scrape only that
        let results = [];
        const searchQuery = q.trim();

        if (platform && platform !== 'all') {
            if (!scrapers[platform]) {
                return res.status(400).json({
                    success: false,
                    error: `Unknown platform: ${platform}`
                });
            }
            results = await scrapers[platform].search(searchQuery);
        } else {
            // Scrape all platforms in parallel
            const scrapePromises = Object.entries(scrapers).map(async ([name, scraper]) => {
                try {
                    const products = await scraper.search(searchQuery);
                    console.log(`[${name.toUpperCase()}] Found ${products.length} products`);
                    return products;
                } catch (error) {
                    console.error(`[${name.toUpperCase()}] Error:`, error.message);
                    return [];
                }
            });

            const allResults = await Promise.all(scrapePromises);
            results = allResults.flat();
        }

        // Apply filters
        let filteredResults = results;

        if (minPrice) {
            filteredResults = filteredResults.filter(p => p.discountedPrice >= parseInt(minPrice));
        }
        if (maxPrice) {
            filteredResults = filteredResults.filter(p => p.discountedPrice <= parseInt(maxPrice));
        }
        if (category) {
            filteredResults = filteredResults.filter(p =>
                p.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        // Limit results
        filteredResults = filteredResults.slice(0, parseInt(limit));

        // Update cache
        productsCache = [...new Map([...productsCache, ...results].map(p => [p.id, p])).values()];
        lastScrapeTime = new Date().toISOString();

        res.json({
            success: true,
            query: searchQuery,
            count: filteredResults.length,
            products: filteredResults
        });

    } catch (error) {
        console.error('[SEARCH ERROR]', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search products',
            message: error.message
        });
    }
});

/**
 * POST /api/scrape
 * Trigger a scrape for a specific platform
 */
app.post('/api/scrape', async (req, res) => {
    try {
        const { platform, query } = req.body;

        if (!query) {
            return res.status(400).json({
                success: false,
                error: 'Query is required'
            });
        }

        if (platform && !scrapers[platform]) {
            return res.status(400).json({
                success: false,
                error: `Unknown platform: ${platform}`
            });
        }

        const targetScrapers = platform ? { [platform]: scrapers[platform] } : scrapers;
        const results = [];

        for (const [name, scraper] of Object.entries(targetScrapers)) {
            try {
                console.log(`[SCRAPING] ${name} for "${query}"`);
                const products = await scraper.search(query);
                results.push(...products);
                console.log(`[${name.toUpperCase()}] Scraped ${products.length} products`);
            } catch (error) {
                console.error(`[${name.toUpperCase()}] Scrape failed:`, error.message);
            }
        }

        // Update cache
        productsCache = [...new Map([...productsCache, ...results].map(p => [p.id, p])).values()];
        lastScrapeTime = new Date().toISOString();

        res.json({
            success: true,
            scraped: results.length,
            totalCached: productsCache.length,
            lastUpdated: lastScrapeTime
        });

    } catch (error) {
        console.error('[SCRAPE ERROR]', error);
        res.status(500).json({
            success: false,
            error: 'Scrape failed',
            message: error.message
        });
    }
});

/**
 * GET /api/platforms
 * Get list of supported platforms
 */
app.get('/api/platforms', (req, res) => {
    res.json({
        success: true,
        platforms: Object.keys(scrapers).map(name => ({
            name,
            displayName: name.charAt(0).toUpperCase() + name.slice(1),
            status: 'active'
        }))
    });
});

/**
 * GET /api/stats
 * Get scraper statistics
 */
app.get('/api/stats', (req, res) => {
    const platformCounts = {};
    productsCache.forEach(p => {
        platformCounts[p.platform] = (platformCounts[p.platform] || 0) + 1;
    });

    res.json({
        success: true,
        totalProducts: productsCache.length,
        lastUpdated: lastScrapeTime,
        cacheAge: lastScrapeTime ? Date.now() - new Date(lastScrapeTime).getTime() : null,
        platformBreakdown: platformCounts
    });
});

/**
 * DELETE /api/cache
 * Clear the products cache
 */
app.delete('/api/cache', (req, res) => {
    productsCache = [];
    lastScrapeTime = null;
    res.json({
        success: true,
        message: 'Cache cleared'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('[SERVER ERROR]', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🛒  UniShop Scraper Server                           ║
║                                                        ║
║   Server running at: http://localhost:${PORT}            ║
║                                                        ║
║   Endpoints:                                           ║
║   • GET  /api/search?q=<query>  - Search products     ║
║   • GET  /api/products          - Get all products    ║
║   • POST /api/scrape            - Trigger scrape      ║
║   • GET  /api/platforms         - List platforms      ║
║   • GET  /api/stats             - Get statistics      ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
