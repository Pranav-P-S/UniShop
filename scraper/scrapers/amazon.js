/**
 * Amazon India Scraper
 * Scrapes product data from amazon.in
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { generateId, cleanPrice, extractRating, delay } = require('../utils/helpers');

const BASE_URL = 'https://www.amazon.in';
const SEARCH_URL = `${BASE_URL}/s`;

// Headers to mimic a real browser
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-IN,en;q=0.9,hi;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
};

/**
 * Search for products on Amazon
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Array>} - Array of product objects
 */
async function search(query, page = 1) {
    try {
        const url = `${SEARCH_URL}?k=${encodeURIComponent(query)}&page=${page}`;
        console.log(`[AMAZON] Fetching: ${url}`);

        const response = await axios.get(url, {
            headers,
            timeout: 15000
        });

        const $ = cheerio.load(response.data);
        const products = [];

        // Select product cards
        $('div[data-component-type="s-search-result"]').each((index, element) => {
            try {
                const $el = $(element);

                // Extract product data
                const asin = $el.attr('data-asin');
                if (!asin) return;

                const titleEl = $el.find('h2 a span, .a-size-medium.a-text-normal, .a-size-base-plus.a-text-normal');
                const title = titleEl.first().text().trim();
                if (!title) return;

                // Price extraction
                const priceWhole = $el.find('.a-price-whole').first().text().replace(/[,\.]/g, '');
                const discountedPrice = parseInt(priceWhole) || 0;

                // Original price (MRP)
                const originalPriceEl = $el.find('.a-text-price .a-offscreen, .a-price[data-a-strike] .a-offscreen');
                const originalPriceText = originalPriceEl.first().text().replace(/[₹,]/g, '');
                const originalPrice = parseInt(originalPriceText) || discountedPrice;

                // Calculate discount
                const discount = originalPrice > discountedPrice
                    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
                    : 0;

                // Rating
                const ratingText = $el.find('.a-icon-star-small .a-icon-alt, .a-icon-star .a-icon-alt').first().text();
                const rating = extractRating(ratingText);

                // Review count
                const reviewText = $el.find('.a-size-base.s-underline-text, [aria-label*="stars"]').first().text();
                const reviewMatch = reviewText.match(/[\d,]+/);
                const reviewCount = reviewMatch ? parseInt(reviewMatch[0].replace(/,/g, '')) : 0;

                // Image
                const imageEl = $el.find('img.s-image');
                const image = imageEl.attr('src') || '';

                // Product URL
                const productUrl = `${BASE_URL}/dp/${asin}`;

                // Brand extraction
                const brandEl = $el.find('.a-size-base-plus.a-color-base, .a-row .a-size-base');
                let brand = brandEl.first().text().trim();
                if (!brand || brand.length > 50) {
                    // Try to extract brand from title
                    brand = title.split(' ')[0];
                }

                // Category (estimate based on keywords)
                const category = guessCategory(title);

                if (discountedPrice > 0) {
                    products.push({
                        id: generateId('amazon', asin),
                        title,
                        brand,
                        category: category.main,
                        subCategory: category.sub,
                        platform: 'amazon',
                        originalPrice,
                        discountedPrice,
                        discount,
                        rating,
                        reviewCount,
                        image,
                        productUrl,
                        inStock: true
                    });
                }
            } catch (err) {
                console.error('[AMAZON] Error parsing product:', err.message);
            }
        });

        console.log(`[AMAZON] Parsed ${products.length} products for "${query}"`);
        return products;

    } catch (error) {
        console.error('[AMAZON] Scrape error:', error.message);
        return [];
    }
}

/**
 * Guess product category based on title
 */
function guessCategory(title) {
    const titleLower = title.toLowerCase();

    const categories = [
        { keywords: ['phone', 'mobile', 'smartphone', 'iphone', 'galaxy', 'redmi', 'oneplus'], main: 'Electronics', sub: 'Smartphones' },
        { keywords: ['laptop', 'notebook', 'macbook', 'chromebook'], main: 'Electronics', sub: 'Laptops' },
        { keywords: ['headphone', 'earphone', 'earbud', 'airpods', 'headset'], main: 'Electronics', sub: 'Headphones' },
        { keywords: ['tv', 'television', 'smart tv', 'led tv'], main: 'Electronics', sub: 'TV' },
        { keywords: ['watch', 'smartwatch', 'fitness band'], main: 'Electronics', sub: 'Smartwatches' },
        { keywords: ['shirt', 'tshirt', 't-shirt', 'polo'], main: 'Fashion', sub: 'Men Shirts' },
        { keywords: ['jeans', 'trouser', 'pant'], main: 'Fashion', sub: 'Men Jeans' },
        { keywords: ['kurta', 'kurti', 'ethnic'], main: 'Fashion', sub: 'Women Kurtas' },
        { keywords: ['dress', 'gown', 'maxi'], main: 'Fashion', sub: 'Women Dresses' },
        { keywords: ['saree', 'sari'], main: 'Fashion', sub: 'Sarees' },
        { keywords: ['shoe', 'sneaker', 'running', 'sports shoe'], main: 'Fashion', sub: 'Footwear' },
        { keywords: ['bag', 'backpack', 'handbag', 'luggage'], main: 'Fashion', sub: 'Bags' },
        { keywords: ['cooker', 'kitchen', 'cookware', 'mixer', 'grinder'], main: 'Home', sub: 'Kitchen' },
        { keywords: ['sofa', 'bed', 'mattress', 'furniture'], main: 'Home', sub: 'Furniture' },
        { keywords: ['lipstick', 'makeup', 'foundation', 'mascara'], main: 'Beauty', sub: 'Makeup' },
        { keywords: ['cream', 'skincare', 'moisturizer', 'serum'], main: 'Beauty', sub: 'Skincare' },
        { keywords: ['football', 'cricket', 'bat', 'ball'], main: 'Sports', sub: 'Sports Equipment' },
        { keywords: ['yoga', 'gym', 'fitness', 'dumbbell'], main: 'Sports', sub: 'Fitness' },
        { keywords: ['toy', 'lego', 'doll', 'game'], main: 'Toys', sub: 'Toys' }
    ];

    for (const cat of categories) {
        if (cat.keywords.some(kw => titleLower.includes(kw))) {
            return { main: cat.main, sub: cat.sub };
        }
    }

    return { main: 'General', sub: 'Other' };
}

module.exports = {
    search
};
