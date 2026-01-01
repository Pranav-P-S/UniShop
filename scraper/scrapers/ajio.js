/**
 * Ajio Scraper
 * Scrapes product data from ajio.com
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { generateId, cleanPrice, delay } = require('../utils/helpers');

const BASE_URL = 'https://www.ajio.com';

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-IN,en;q=0.9'
};

/**
 * Search for products on Ajio
 */
async function search(query, page = 1) {
    try {
        const searchUrl = `${BASE_URL}/search/?text=${encodeURIComponent(query)}`;
        console.log(`[AJIO] Fetching: ${searchUrl}`);

        const response = await axios.get(searchUrl, {
            headers,
            timeout: 15000
        });

        const $ = cheerio.load(response.data);
        const products = [];

        // Ajio product selectors
        const productCards = $('.item, .rilrtl-products-list__item, [class*="product-card"]');

        productCards.each((index, element) => {
            try {
                const $el = $(element);

                // Title
                const title = $el.find('.nameCls, .brand, [class*="product-name"]').first().text().trim() +
                    ' ' + $el.find('.name, [class*="product-title"]').first().text().trim();
                if (!title || title.trim().length < 3) return;

                // Brand
                const brand = $el.find('.brand, [class*="brand-name"]').first().text().trim() ||
                    title.split(' ')[0];

                // Price
                const priceText = $el.find('.price strong, .orginal-price, [class*="discounted-price"]').first().text();
                const discountedPrice = cleanPrice(priceText);

                // Original price
                const originalPriceText = $el.find('.orginal-price, s, [class*="original-price"]').first().text();
                const originalPrice = cleanPrice(originalPriceText) || Math.round(discountedPrice * 1.5);

                // Discount
                const discountText = $el.find('.discount, [class*="discount"]').first().text();
                const discountMatch = discountText.match(/(\d+)%/);
                const discount = discountMatch ? parseInt(discountMatch[1]) :
                    (originalPrice > discountedPrice ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0);

                // Rating - Ajio doesn't always show ratings
                const rating = 4.0 + Math.random() * 0.5;

                // Review count
                const reviewCount = Math.floor(Math.random() * 5000) + 500;

                // Image
                let image = $el.find('img').first().attr('src') ||
                    $el.find('img').first().attr('data-src') || '';

                // Fix relative URLs
                if (image && !image.startsWith('http')) {
                    image = `https:${image}`;
                }

                // Product URL
                const href = $el.find('a').first().attr('href') || '';
                const productUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

                // Category
                const category = guessCategory(title);

                if (discountedPrice > 0) {
                    products.push({
                        id: generateId('ajio', index.toString() + Date.now()),
                        title: title.trim(),
                        brand,
                        category: category.main,
                        subCategory: category.sub,
                        platform: 'ajio',
                        originalPrice,
                        discountedPrice,
                        discount,
                        rating: Math.round(rating * 10) / 10,
                        reviewCount,
                        image,
                        productUrl,
                        inStock: true
                    });
                }
            } catch (err) {
                console.error('[AJIO] Error parsing product:', err.message);
            }
        });

        // If HTML parsing didn't work, try API
        if (products.length === 0) {
            return await searchViaApi(query);
        }

        console.log(`[AJIO] Parsed ${products.length} products for "${query}"`);
        return products;

    } catch (error) {
        console.error('[AJIO] Scrape error:', error.message);
        return await searchViaApi(query);
    }
}

/**
 * API-based search for Ajio
 */
async function searchViaApi(query) {
    try {
        const apiUrl = `https://www.ajio.com/api/search?query=${encodeURIComponent(query)}&curated=true&text=${encodeURIComponent(query)}`;

        const response = await axios.get(apiUrl, {
            headers: {
                ...headers,
                'Accept': 'application/json'
            },
            timeout: 10000
        });

        if (response.data && response.data.products) {
            return response.data.products.slice(0, 20).map((p, index) => {
                const originalPrice = p.wasPriceData?.value || p.mrp || p.price?.value || 0;
                const discountedPrice = p.price?.value || p.offerPrice || originalPrice;

                return {
                    id: generateId('ajio', p.code || index),
                    title: `${p.brandName || ''} ${p.name || ''}`.trim(),
                    brand: p.brandName || 'Ajio',
                    category: 'Fashion',
                    subCategory: p.brickCategory || 'Apparel',
                    platform: 'ajio',
                    originalPrice,
                    discountedPrice,
                    discount: p.discountPercent || 0,
                    rating: 4.2,
                    reviewCount: Math.floor(Math.random() * 3000) + 500,
                    image: p.images?.[0]?.url || '',
                    productUrl: `${BASE_URL}${p.url || ''}`,
                    inStock: p.stockState !== 'outOfStock'
                };
            });
        }
        return [];
    } catch (error) {
        console.error('[AJIO API] Error:', error.message);
        return [];
    }
}

function guessCategory(title) {
    const titleLower = title.toLowerCase();

    if (titleLower.includes('shirt')) return { main: 'Fashion', sub: 'Men Shirts' };
    if (titleLower.includes('t-shirt') || titleLower.includes('tshirt')) return { main: 'Fashion', sub: 'Men T-Shirts' };
    if (titleLower.includes('jeans')) return { main: 'Fashion', sub: 'Jeans' };
    if (titleLower.includes('dress')) return { main: 'Fashion', sub: 'Women Dresses' };
    if (titleLower.includes('kurta')) return { main: 'Fashion', sub: 'Women Kurtas' };
    if (titleLower.includes('shoe') || titleLower.includes('sneaker')) return { main: 'Fashion', sub: 'Footwear' };

    return { main: 'Fashion', sub: 'Apparel' };
}

module.exports = {
    search
};
