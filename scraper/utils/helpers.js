/**
 * Utility functions for scrapers
 */

/**
 * Generate a unique product ID
 */
function generateId(platform, suffix) {
    return `${platform}_${suffix}_${Date.now().toString(36)}`;
}

/**
 * Clean price string and extract numeric value
 */
function cleanPrice(priceStr) {
    if (!priceStr) return 0;

    // Remove currency symbols, commas, and spaces
    const cleaned = priceStr.replace(/[₹$€,\s]/g, '').replace(/[^0-9.]/g, '');

    // Parse as integer (most Indian prices are whole numbers)
    const price = parseInt(cleaned);

    return isNaN(price) ? 0 : price;
}

/**
 * Extract rating from text like "4.5 out of 5" or "4.5★"
 */
function extractRating(ratingText) {
    if (!ratingText) return 0;

    const match = ratingText.match(/(\d+\.?\d*)/);
    if (match) {
        const rating = parseFloat(match[1]);
        return rating > 5 ? rating / 10 : rating; // Handle if rating is like 45 instead of 4.5
    }

    return 0;
}

/**
 * Delay utility for rate limiting
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
async function retry(fn, retries = 3, delayMs = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            await delay(delayMs * Math.pow(2, i));
        }
    }
}

/**
 * Truncate text to a maximum length
 */
function truncate(text, maxLength = 100) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

/**
 * Normalize whitespace in text
 */
function normalizeWhitespace(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
}

/**
 * Parse Indian number format (1,23,456)
 */
function parseIndianNumber(str) {
    if (!str) return 0;
    return parseInt(str.replace(/,/g, '')) || 0;
}

/**
 * Format price in Indian format
 */
function formatIndianPrice(price) {
    if (typeof price !== 'number') return '₹0';
    return '₹' + price.toLocaleString('en-IN');
}

/**
 * Calculate discount percentage
 */
function calculateDiscount(original, discounted) {
    if (!original || original <= discounted) return 0;
    return Math.round(((original - discounted) / original) * 100);
}

/**
 * Check if URL is valid
 */
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Sanitize product data
 */
function sanitizeProduct(product) {
    return {
        ...product,
        title: normalizeWhitespace(product.title),
        brand: normalizeWhitespace(product.brand) || 'Unknown',
        originalPrice: Math.max(0, product.originalPrice || 0),
        discountedPrice: Math.max(0, product.discountedPrice || 0),
        discount: Math.min(100, Math.max(0, product.discount || 0)),
        rating: Math.min(5, Math.max(0, product.rating || 0)),
        reviewCount: Math.max(0, product.reviewCount || 0),
        inStock: product.inStock !== false
    };
}

module.exports = {
    generateId,
    cleanPrice,
    extractRating,
    delay,
    retry,
    truncate,
    normalizeWhitespace,
    parseIndianNumber,
    formatIndianPrice,
    calculateDiscount,
    isValidUrl,
    sanitizeProduct
};
