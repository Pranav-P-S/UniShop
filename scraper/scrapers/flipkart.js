/**
 * Flipkart Scraper
 * Scrapes product data from flipkart.com
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { generateId, cleanPrice, extractRating, delay } = require('../utils/helpers');

const BASE_URL = 'https://www.flipkart.com';
const SEARCH_URL = `${BASE_URL}/search`;

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-IN,en;q=0.9',
    'Cache-Control': 'no-cache'
};

/**
 * Search for products on Flipkart
 */
async function search(query, page = 1) {
    try {
        const url = `${SEARCH_URL}?q=${encodeURIComponent(query)}&page=${page}`;
        console.log(`[FLIPKART] Fetching: ${url}`);

        const response = await axios.get(url, {
            headers,
            timeout: 15000
        });

        const $ = cheerio.load(response.data);
        const products = [];

        // Multiple possible selectors for Flipkart's changing layout
        const productSelectors = [
            'div._1AtVbE > div._13oc-S',
            'div[data-id]',
            '._1xHGtK._373qXS',
            '._2kHMtA',
            '._4ddWXP',
            '.slAVV4'
        ];

        let productElements = $();
        for (const selector of productSelectors) {
            productElements = $(selector);
            if (productElements.length > 0) break;
        }

        productElements.each((index, element) => {
            try {
                const $el = $(element);

                // Title
                const titleSelectors = ['._4rR01T', '.s1Q9rs', '.IRpwTa', 'a[title]', '._2WkVRV'];
                let title = '';
                for (const sel of titleSelectors) {
                    title = $el.find(sel).first().text().trim() || $el.find(sel).first().attr('title') || '';
                    if (title) break;
                }
                if (!title) return;

                // Price
                const priceSelectors = ['._30jeq3', '._1_WHN1', '._25b18c ._30jeq3'];
                let priceText = '';
                for (const sel of priceSelectors) {
                    priceText = $el.find(sel).first().text();
                    if (priceText) break;
                }
                const discountedPrice = cleanPrice(priceText);

                // Original Price
                const originalPriceSelectors = ['._3I9_wc', '._27UcVY'];
                let originalPriceText = '';
                for (const sel of originalPriceSelectors) {
                    originalPriceText = $el.find(sel).first().text();
                    if (originalPriceText) break;
                }
                const originalPrice = cleanPrice(originalPriceText) || discountedPrice;

                // Discount
                const discountSelectors = ['._3Ay6Sb', '._3xFGs5'];
                let discountText = '';
                for (const sel of discountSelectors) {
                    discountText = $el.find(sel).first().text();
                    if (discountText) break;
                }
                const discountMatch = discountText.match(/(\d+)%/);
                const discount = discountMatch ? parseInt(discountMatch[1]) :
                    (originalPrice > discountedPrice ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0);

                // Rating
                const ratingSelectors = ['._3LWZlK', '._1lRcqv ._3LWZlK'];
                let ratingText = '';
                for (const sel of ratingSelectors) {
                    ratingText = $el.find(sel).first().text();
                    if (ratingText) break;
                }
                const rating = parseFloat(ratingText) || 0;

                // Review count
                const reviewSelectors = ['._2_R_DZ span:last-child', '._13vcmD'];
                let reviewText = '';
                for (const sel of reviewSelectors) {
                    reviewText = $el.find(sel).first().text();
                    if (reviewText) break;
                }
                const reviewMatch = reviewText.match(/([\d,]+)\s*(Reviews|Ratings)/i);
                const reviewCount = reviewMatch ? parseInt(reviewMatch[1].replace(/,/g, '')) : 0;

                // Image
                const imageSelectors = ['img._396cs4', 'img._2r_T1I', 'img._1Nyybr'];
                let image = '';
                for (const sel of imageSelectors) {
                    image = $el.find(sel).first().attr('src') || '';
                    if (image) break;
                }

                // Product URL
                const linkEl = $el.find('a._1fQZEK, a.s1Q9rs, a.IRpwTa, a._2rpwqI').first();
                const href = linkEl.attr('href') || '';
                const productUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

                // Brand
                const brandSelectors = ['._2WkVRV', '._2B_pmu'];
                let brand = '';
                for (const sel of brandSelectors) {
                    brand = $el.find(sel).first().text().trim();
                    if (brand) break;
                }
                if (!brand) brand = title.split(' ')[0];

                // Category
                const category = guessCategory(title);

                if (discountedPrice > 0 && title.length > 5) {
                    products.push({
                        id: generateId('flipkart', index.toString() + Date.now()),
                        title,
                        brand,
                        category: category.main,
                        subCategory: category.sub,
                        platform: 'flipkart',
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
                console.error('[FLIPKART] Error parsing product:', err.message);
            }
        });

        console.log(`[FLIPKART] Parsed ${products.length} products for "${query}"`);
        return products;

    } catch (error) {
        console.error('[FLIPKART] Scrape error:', error.message);
        return [];
    }
}

function guessCategory(title) {
    const titleLower = title.toLowerCase();

    const categories = [
        { keywords: ['phone', 'mobile', 'smartphone', 'iphone', 'galaxy', 'redmi', 'oneplus', 'realme', 'vivo', 'oppo'], main: 'Electronics', sub: 'Smartphones' },
        { keywords: ['laptop', 'notebook', 'macbook'], main: 'Electronics', sub: 'Laptops' },
        { keywords: ['headphone', 'earphone', 'earbud', 'airpods', 'headset', 'bluetooth'], main: 'Electronics', sub: 'Headphones' },
        { keywords: ['tv', 'television', 'smart tv', 'led tv', 'android tv'], main: 'Electronics', sub: 'TV' },
        { keywords: ['watch', 'smartwatch', 'fitness band'], main: 'Electronics', sub: 'Smartwatches' },
        { keywords: ['shirt', 'tshirt', 't-shirt', 'polo'], main: 'Fashion', sub: 'Men Shirts' },
        { keywords: ['kurta', 'kurti'], main: 'Fashion', sub: 'Women Kurtas' },
        { keywords: ['saree', 'sari'], main: 'Fashion', sub: 'Sarees' },
        { keywords: ['shoe', 'sneaker'], main: 'Fashion', sub: 'Footwear' },
        { keywords: ['bag', 'backpack'], main: 'Fashion', sub: 'Bags' },
        { keywords: ['cooker', 'kitchen', 'mixer'], main: 'Home', sub: 'Kitchen' },
        { keywords: ['mattress', 'furniture', 'sofa'], main: 'Home', sub: 'Furniture' }
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
