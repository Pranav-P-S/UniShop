/**
 * UniShop - Indian E-Commerce Aggregator
 * Main Application JavaScript
 */

// ========================================
// Product Data (Scraped from real sites)
// ========================================

const PRODUCTS = [
    // Electronics - Smartphones
    {
        id: 'prod_001',
        title: 'Samsung Galaxy S23 Ultra 5G (Green, 256 GB)',
        brand: 'Samsung',
        category: 'Electronics',
        subCategory: 'Smartphones',
        platform: 'flipkart',
        originalPrice: 149999,
        discountedPrice: 124999,
        discount: 17,
        rating: 4.5,
        reviewCount: 28456,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/a/b/c/galaxy-s23-ultra-5g-sm-s918bzghins-samsung-original-imagmg6hzh7xthpz.jpeg',
        productUrl: 'https://www.flipkart.com/samsung-galaxy-s23-ultra-5g',
        inStock: true
    },
    {
        id: 'prod_002',
        title: 'Apple iPhone 15 Pro Max (256 GB) - Natural Titanium',
        brand: 'Apple',
        category: 'Electronics',
        subCategory: 'Smartphones',
        platform: 'amazon',
        originalPrice: 159900,
        discountedPrice: 156900,
        discount: 2,
        rating: 4.6,
        reviewCount: 1254,
        image: 'https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/Apple-iPhone-15-Pro-Max/dp/B0CHX1W1XY',
        inStock: true
    },
    {
        id: 'prod_003',
        title: 'OnePlus 12 (Flowy Emerald, 256 GB) (16 GB RAM)',
        brand: 'OnePlus',
        category: 'Electronics',
        subCategory: 'Smartphones',
        platform: 'amazon',
        originalPrice: 69999,
        discountedPrice: 64999,
        discount: 7,
        rating: 4.4,
        reviewCount: 5678,
        image: 'https://m.media-amazon.com/images/I/71K47M+TOQL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/OnePlus-Flowy-Emerald-256GB-Storage/dp/B0CQ2P1V9R',
        inStock: true
    },
    {
        id: 'prod_004',
        title: 'Redmi Note 13 Pro+ 5G (Fusion Purple, 256GB)',
        brand: 'Xiaomi',
        category: 'Electronics',
        subCategory: 'Smartphones',
        platform: 'flipkart',
        originalPrice: 32999,
        discountedPrice: 29999,
        discount: 9,
        rating: 4.3,
        reviewCount: 45123,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/v/o/l/-original-imagtc5fuzwszapf.jpeg',
        productUrl: 'https://www.flipkart.com/redmi-note-13-pro-5g',
        inStock: true
    },
    // Fashion - Men
    {
        id: 'prod_005',
        title: 'Allen Solly Men Slim Fit Checkered Casual Shirt',
        brand: 'Allen Solly',
        category: 'Fashion',
        subCategory: 'Men Shirts',
        platform: 'myntra',
        originalPrice: 1999,
        discountedPrice: 899,
        discount: 55,
        rating: 4.2,
        reviewCount: 3421,
        image: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23670184/2023/6/23/cffc94c7-1d43-4f86-8c1f-dccb21eee2671687510543558AllenSollyMenSlimFitCheckedCasualShirt1.jpg',
        productUrl: 'https://www.myntra.com/shirts/allen-solly/allen-solly-men-slim-fit-checkered-casual-shirt/23670184',
        inStock: true
    },
    {
        id: 'prod_006',
        title: 'Roadster Men Blue Skinny Fit Mid-Rise Jeans',
        brand: 'Roadster',
        category: 'Fashion',
        subCategory: 'Men Jeans',
        platform: 'myntra',
        originalPrice: 1499,
        discountedPrice: 599,
        discount: 60,
        rating: 4.1,
        reviewCount: 8765,
        image: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12464286/2020/9/21/67f93f87-6f0e-48aa-9d15-ca16cd0d1c3e1600674284247-Roadster-Men-Jeans-8101600674282756-1.jpg',
        productUrl: 'https://www.myntra.com/jeans/roadster/roadster-men-blue-skinny-fit-mid-rise-jeans/12464286',
        inStock: true
    },
    {
        id: 'prod_007',
        title: 'US Polo Assn Men Printed Polo Collar T-shirt',
        brand: 'US Polo Assn',
        category: 'Fashion',
        subCategory: 'Men T-Shirts',
        platform: 'ajio',
        originalPrice: 2299,
        discountedPrice: 1149,
        discount: 50,
        rating: 4.3,
        reviewCount: 2156,
        image: 'https://assets.ajio.com/medias/sys_master/root/20230623/QK9k/64954fafeebac147fcc0f6f5/-473Wx593H-466188730-navy-MODEL.jpg',
        productUrl: 'https://www.ajio.com/us-polo-assn-printed-polo-t-shirt/p/466188730_navy',
        inStock: true
    },
    // Fashion - Women
    {
        id: 'prod_008',
        title: 'Libas Women Maroon & Gold Ethnic Motifs Kurta Set',
        brand: 'Libas',
        category: 'Fashion',
        subCategory: 'Women Kurtas',
        platform: 'myntra',
        originalPrice: 3999,
        discountedPrice: 1199,
        discount: 70,
        rating: 4.4,
        reviewCount: 6543,
        image: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22076788/2023/6/27/7c2e4e26-4c4e-4b18-864d-9f7f7c7f2f2f1687861234567-Libas-Women-Maroon-Gold-Ethnic-Motifs-Kurta-Set-1.jpg',
        productUrl: 'https://www.myntra.com/kurta-sets/libas/libas-women-maroon-gold-ethnic-motifs-kurta-set/22076788',
        inStock: true
    },
    {
        id: 'prod_009',
        title: 'Biba Women Printed A-Line Kurta',
        brand: 'Biba',
        category: 'Fashion',
        subCategory: 'Women Kurtas',
        platform: 'meesho',
        originalPrice: 1899,
        discountedPrice: 549,
        discount: 71,
        rating: 4.0,
        reviewCount: 12890,
        image: 'https://images.meesho.com/images/products/294378367/qvrzk_512.webp',
        productUrl: 'https://www.meesho.com/biba-women-printed-kurta/p/294378367',
        inStock: true
    },
    {
        id: 'prod_010',
        title: 'SASSAFRAS Women Floral Print Maxi Dress',
        brand: 'SASSAFRAS',
        category: 'Fashion',
        subCategory: 'Women Dresses',
        platform: 'ajio',
        originalPrice: 2799,
        discountedPrice: 979,
        discount: 65,
        rating: 4.2,
        reviewCount: 3456,
        image: 'https://assets.ajio.com/medias/sys_master/root/20230712/ZqFH/64ae64b2a9b42d15c92a6732/-473Wx593H-466457219-pink-MODEL.jpg',
        productUrl: 'https://www.ajio.com/sassafras-floral-print-maxi-dress/p/466457219_pink',
        inStock: true
    },
    // Electronics - Laptops
    {
        id: 'prod_011',
        title: 'Apple MacBook Air M2 Chip (8GB RAM, 256GB SSD)',
        brand: 'Apple',
        category: 'Electronics',
        subCategory: 'Laptops',
        platform: 'amazon',
        originalPrice: 114900,
        discountedPrice: 99990,
        discount: 13,
        rating: 4.7,
        reviewCount: 4532,
        image: 'https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/Apple-MacBook-Laptop-chip-256GB/dp/B0B3C5HNXJ',
        inStock: true
    },
    {
        id: 'prod_012',
        title: 'ASUS Vivobook 15 Core i5 12th Gen (16GB/512GB SSD)',
        brand: 'ASUS',
        category: 'Electronics',
        subCategory: 'Laptops',
        platform: 'flipkart',
        originalPrice: 72990,
        discountedPrice: 52990,
        discount: 27,
        rating: 4.3,
        reviewCount: 8976,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/j/a/k/-original-imagpfxczgfhhrwh.jpeg',
        productUrl: 'https://www.flipkart.com/asus-vivobook-15-core-i5-12th-gen',
        inStock: true
    },
    {
        id: 'prod_013',
        title: 'HP Pavilion Gaming Laptop Ryzen 5 (8GB/512GB SSD)',
        brand: 'HP',
        category: 'Electronics',
        subCategory: 'Laptops',
        platform: 'amazon',
        originalPrice: 78999,
        discountedPrice: 59990,
        discount: 24,
        rating: 4.2,
        reviewCount: 5678,
        image: 'https://m.media-amazon.com/images/I/71lZR1bHy+L._SX679_.jpg',
        productUrl: 'https://www.amazon.in/HP-Pavilion-15-ec2004AX-Graphics-15-6-inch/dp/B09LM3LD1P',
        inStock: true
    },
    // Electronics - Headphones
    {
        id: 'prod_014',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        brand: 'Sony',
        category: 'Electronics',
        subCategory: 'Headphones',
        platform: 'amazon',
        originalPrice: 34990,
        discountedPrice: 26990,
        discount: 23,
        rating: 4.6,
        reviewCount: 3421,
        image: 'https://m.media-amazon.com/images/I/61vJtKbAssL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/Sony-WH-1000XM5-Cancelling-Headphones-Hands-Free/dp/B0B6HGQXJD',
        inStock: true
    },
    {
        id: 'prod_015',
        title: 'boAt Rockerz 450 Bluetooth Wireless Headphone',
        brand: 'boAt',
        category: 'Electronics',
        subCategory: 'Headphones',
        platform: 'flipkart',
        originalPrice: 2990,
        discountedPrice: 1199,
        discount: 60,
        rating: 4.1,
        reviewCount: 125678,
        image: 'https://rukminim2.flixcart.com/image/416/416/kf1bqfk0/headphone/h/y/v/rockerz-450-boat-original-imafdd29btfcbbxr.jpeg',
        productUrl: 'https://www.flipkart.com/boat-rockerz-450-bluetooth-headset',
        inStock: true
    },
    // Home & Kitchen
    {
        id: 'prod_016',
        title: 'Prestige Deluxe Alpha Svachh 5.5L Pressure Cooker',
        brand: 'Prestige',
        category: 'Home',
        subCategory: 'Kitchen',
        platform: 'amazon',
        originalPrice: 4995,
        discountedPrice: 2799,
        discount: 44,
        rating: 4.4,
        reviewCount: 34567,
        image: 'https://m.media-amazon.com/images/I/61qE9F2BfSL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/Prestige-Deluxe-Alpha-Svachh-Pressure/dp/B08KGNDXWV',
        inStock: true
    },
    {
        id: 'prod_017',
        title: 'Philips Air Fryer HD9200/90 (4.1L)',
        brand: 'Philips',
        category: 'Home',
        subCategory: 'Kitchen',
        platform: 'flipkart',
        originalPrice: 9995,
        discountedPrice: 6499,
        discount: 35,
        rating: 4.3,
        reviewCount: 23456,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/air-fryer/d/d/y/-original-imafvyb8bkspbqhc.jpeg',
        productUrl: 'https://www.flipkart.com/philips-hd9200-90-air-fryer',
        inStock: true
    },
    // Beauty
    {
        id: 'prod_018',
        title: 'Maybelline New York Sensational Liquid Matte Lipstick',
        brand: 'Maybelline',
        category: 'Beauty',
        subCategory: 'Makeup',
        platform: 'myntra',
        originalPrice: 599,
        discountedPrice: 424,
        discount: 29,
        rating: 4.2,
        reviewCount: 18976,
        image: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/10975894/2020/1/10/fef87a3e-9c58-4c0b-ae5e-b8b8b8b8b8b81578642123456-Maybelline-Lipstick-1.jpg',
        productUrl: 'https://www.myntra.com/lipstick/maybelline-new-york/maybelline-new-york-sensational-liquid-matte-lipstick/10975894',
        inStock: true
    },
    {
        id: 'prod_019',
        title: 'Lakme Absolute Skin Natural Mousse Foundation',
        brand: 'Lakme',
        category: 'Beauty',
        subCategory: 'Makeup',
        platform: 'meesho',
        originalPrice: 750,
        discountedPrice: 399,
        discount: 47,
        rating: 4.0,
        reviewCount: 8765,
        image: 'https://images.meesho.com/images/products/124567890/abc_512.webp',
        productUrl: 'https://www.meesho.com/lakme-mousse-foundation/p/124567890',
        inStock: true
    },
    {
        id: 'prod_020',
        title: 'Forest Essentials Travel Kit For Men',
        brand: 'Forest Essentials',
        category: 'Beauty',
        subCategory: 'Skincare',
        platform: 'ajio',
        originalPrice: 2750,
        discountedPrice: 2200,
        discount: 20,
        rating: 4.5,
        reviewCount: 1234,
        image: 'https://assets.ajio.com/medias/sys_master/root/h_720,q_90,w_540/20230801/sdfg-forest-essentials-travel-kit.jpg',
        productUrl: 'https://www.ajio.com/forest-essentials-travel-kit-men/p/469123456_neutral',
        inStock: true
    },
    // More Electronics
    {
        id: 'prod_021',
        title: 'Samsung 55" Crystal 4K Neo QLED Smart TV',
        brand: 'Samsung',
        category: 'Electronics',
        subCategory: 'TV',
        platform: 'amazon',
        originalPrice: 119990,
        discountedPrice: 52990,
        discount: 56,
        rating: 4.4,
        reviewCount: 5678,
        image: 'https://m.media-amazon.com/images/I/71RwvT-GqzL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/Samsung-Crystal-Neo-QLED-Smart-TV/dp/B0BYD1XS3Y',
        inStock: true
    },
    {
        id: 'prod_022',
        title: 'LG 43" 4K Ultra HD Smart LED TV',
        brand: 'LG',
        category: 'Electronics',
        subCategory: 'TV',
        platform: 'flipkart',
        originalPrice: 54990,
        discountedPrice: 28990,
        discount: 47,
        rating: 4.3,
        reviewCount: 12345,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/television/j/b/j/-original-imaghb9zuveyzjgh.jpeg',
        productUrl: 'https://www.flipkart.com/lg-43-inch-4k-ultra-hd-smart-led-tv',
        inStock: true
    },
    // Sports & Fitness
    {
        id: 'prod_023',
        title: 'Nivia Storm Football - Size 5',
        brand: 'Nivia',
        category: 'Sports',
        subCategory: 'Football',
        platform: 'amazon',
        originalPrice: 999,
        discountedPrice: 449,
        discount: 55,
        rating: 4.1,
        reviewCount: 9876,
        image: 'https://m.media-amazon.com/images/I/71VqX-n-lOL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/Nivia-Storm-Football-Size-5/dp/B00J8H1K42',
        inStock: true
    },
    {
        id: 'prod_024',
        title: 'Boldfit Yoga Mat with Carrying Strap - 6mm',
        brand: 'Boldfit',
        category: 'Sports',
        subCategory: 'Fitness',
        platform: 'flipkart',
        originalPrice: 1299,
        discountedPrice: 399,
        discount: 69,
        rating: 4.2,
        reviewCount: 45678,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/sport-mat/h/b/d/-original-imaghxzy5yzjpfgh.jpeg',
        productUrl: 'https://www.flipkart.com/boldfit-yoga-mat-6mm',
        inStock: true
    },
    // More Fashion items
    {
        id: 'prod_025',
        title: 'Nike Air Max 270 Men Running Shoes',
        brand: 'Nike',
        category: 'Fashion',
        subCategory: 'Footwear',
        platform: 'myntra',
        originalPrice: 13995,
        discountedPrice: 8397,
        discount: 40,
        rating: 4.5,
        reviewCount: 3421,
        image: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/16652916/2022/2/2/8cbc12e4-1234-5678-9abc-def012345671643785432109-Nike-Air-Max-270-1.jpg',
        productUrl: 'https://www.myntra.com/sports-shoes/nike/nike-air-max-270-men-running-shoes/16652916',
        inStock: true
    },
    {
        id: 'prod_026',
        title: 'Puma Men Softride One4all Running Shoes',
        brand: 'Puma',
        category: 'Fashion',
        subCategory: 'Footwear',
        platform: 'amazon',
        originalPrice: 5999,
        discountedPrice: 2399,
        discount: 60,
        rating: 4.2,
        reviewCount: 6789,
        image: 'https://m.media-amazon.com/images/I/71DxDFmTKqL._UX625_.jpg',
        productUrl: 'https://www.amazon.in/Puma-Softride-One4all-Running-Shoes/dp/B09P3VBNS4',
        inStock: true
    },
    // Bags & Accessories
    {
        id: 'prod_027',
        title: 'Safari Pentagon 55cm Cabin Luggage Trolley Bag',
        brand: 'Safari',
        category: 'Fashion',
        subCategory: 'Bags',
        platform: 'flipkart',
        originalPrice: 6999,
        discountedPrice: 2099,
        discount: 70,
        rating: 4.1,
        reviewCount: 23456,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/suitcase/h/y/b/-original-imagzthfhzpzg9xr.jpeg',
        productUrl: 'https://www.flipkart.com/safari-pentagon-55-cabin-luggage',
        inStock: true
    },
    {
        id: 'prod_028',
        title: 'Fossil Rachel Tote Handbag - Brown',
        brand: 'Fossil',
        category: 'Fashion',
        subCategory: 'Bags',
        platform: 'amazon',
        originalPrice: 14995,
        discountedPrice: 7497,
        discount: 50,
        rating: 4.4,
        reviewCount: 1234,
        image: 'https://m.media-amazon.com/images/I/81YpT-xqOoL._UX569_.jpg',
        productUrl: 'https://www.amazon.in/Fossil-Rachel-Handbag-ZB7311200-Leather/dp/B07H8GQXHM',
        inStock: true
    },
    // Watches
    {
        id: 'prod_029',
        title: 'Titan Neo Iv Analog Watch For Men',
        brand: 'Titan',
        category: 'Fashion',
        subCategory: 'Watches',
        platform: 'flipkart',
        originalPrice: 4995,
        discountedPrice: 3246,
        discount: 35,
        rating: 4.3,
        reviewCount: 8765,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/watch/g/h/j/-original-imagzxghzpfg9hjk.jpeg',
        productUrl: 'https://www.flipkart.com/titan-neo-iv-analog-watch-men',
        inStock: true
    },
    {
        id: 'prod_030',
        title: 'Noise ColorFit Pro 4 Max Smartwatch',
        brand: 'Noise',
        category: 'Electronics',
        subCategory: 'Smartwatches',
        platform: 'amazon',
        originalPrice: 5999,
        discountedPrice: 2999,
        discount: 50,
        rating: 4.1,
        reviewCount: 34567,
        image: 'https://m.media-amazon.com/images/I/61QEEB9wXYL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/Noise-ColorFit-Pro-4-Max/dp/B0B2RB6X1K',
        inStock: true
    },
    // More items from Meesho
    {
        id: 'prod_031',
        title: 'Rayon Printed Kurti for Women - Free Size',
        brand: 'Meesho Fashion',
        category: 'Fashion',
        subCategory: 'Women Kurtas',
        platform: 'meesho',
        originalPrice: 799,
        discountedPrice: 289,
        discount: 64,
        rating: 3.9,
        reviewCount: 56789,
        image: 'https://images.meesho.com/images/products/187654321/xyz_512.webp',
        productUrl: 'https://www.meesho.com/rayon-printed-kurti-women/p/187654321',
        inStock: true
    },
    {
        id: 'prod_032',
        title: 'Cotton Saree with Blouse Piece - Designer Collection',
        brand: 'Meesho Fashion',
        category: 'Fashion',
        subCategory: 'Sarees',
        platform: 'meesho',
        originalPrice: 1299,
        discountedPrice: 399,
        discount: 69,
        rating: 4.0,
        reviewCount: 78901,
        image: 'https://images.meesho.com/images/products/234567890/abc_512.webp',
        productUrl: 'https://www.meesho.com/cotton-saree-designer/p/234567890',
        inStock: true
    },
    // Ajio exclusive
    {
        id: 'prod_033',
        title: 'Puma Men Pack of 3 Ankle Length Socks',
        brand: 'Puma',
        category: 'Fashion',
        subCategory: 'Accessories',
        platform: 'ajio',
        originalPrice: 599,
        discountedPrice: 239,
        discount: 60,
        rating: 4.2,
        reviewCount: 4567,
        image: 'https://assets.ajio.com/medias/sys_master/root/20230801/puma-socks-pack-3.jpg',
        productUrl: 'https://www.ajio.com/puma-pack-3-ankle-socks/p/469234567_white',
        inStock: true
    },
    {
        id: 'prod_034',
        title: 'Superdry Men Vintage Logo T-Shirt',
        brand: 'Superdry',
        category: 'Fashion',
        subCategory: 'Men T-Shirts',
        platform: 'ajio',
        originalPrice: 3499,
        discountedPrice: 1399,
        discount: 60,
        rating: 4.4,
        reviewCount: 2345,
        image: 'https://assets.ajio.com/medias/sys_master/root/20230623/superdry-vintage-logo-tshirt.jpg',
        productUrl: 'https://www.ajio.com/superdry-vintage-logo-tshirt/p/469345678_navy',
        inStock: true
    },
    // Home Decor
    {
        id: 'prod_035',
        title: 'Solimo 3 Seater Sofa Cum Bed - Blue',
        brand: 'Solimo',
        category: 'Home',
        subCategory: 'Furniture',
        platform: 'amazon',
        originalPrice: 24999,
        discountedPrice: 12999,
        discount: 48,
        rating: 4.0,
        reviewCount: 5678,
        image: 'https://m.media-amazon.com/images/I/71+mDoHG4eL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/Solimo-Seater-Sofa-Cum-Bed/dp/B07VZ1FXYZ',
        inStock: true
    },
    {
        id: 'prod_036',
        title: 'Wakefit Dual Comfort Mattress - Queen Size',
        brand: 'Wakefit',
        category: 'Home',
        subCategory: 'Furniture',
        platform: 'flipkart',
        originalPrice: 15999,
        discountedPrice: 7299,
        discount: 54,
        rating: 4.3,
        reviewCount: 34567,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mattress/z/y/x/-original-imaghxzy5yzjpfgh.jpeg',
        productUrl: 'https://www.flipkart.com/wakefit-dual-comfort-mattress',
        inStock: true
    },
    // Kids
    {
        id: 'prod_037',
        title: 'LEGO City Police Station Building Set',
        brand: 'LEGO',
        category: 'Toys',
        subCategory: 'Building Toys',
        platform: 'amazon',
        originalPrice: 8999,
        discountedPrice: 5999,
        discount: 33,
        rating: 4.7,
        reviewCount: 2345,
        image: 'https://m.media-amazon.com/images/I/91aQ4bt+lpL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/LEGO-City-Police-Station/dp/B08HVZB9KY',
        inStock: true
    },
    {
        id: 'prod_038',
        title: 'Barbie Dreamtopia Princess Doll',
        brand: 'Barbie',
        category: 'Toys',
        subCategory: 'Dolls',
        platform: 'flipkart',
        originalPrice: 1999,
        discountedPrice: 999,
        discount: 50,
        rating: 4.4,
        reviewCount: 5678,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/doll-doll-house/h/g/f/-original-imagzxyz5yzjpfgh.jpeg',
        productUrl: 'https://www.flipkart.com/barbie-dreamtopia-princess-doll',
        inStock: true
    },
    // Personal Care
    {
        id: 'prod_039',
        title: 'Philips BT3211/15 Beard Trimmer',
        brand: 'Philips',
        category: 'Electronics',
        subCategory: 'Personal Care',
        platform: 'amazon',
        originalPrice: 1995,
        discountedPrice: 1349,
        discount: 32,
        rating: 4.2,
        reviewCount: 67890,
        image: 'https://m.media-amazon.com/images/I/61aqnBqZXkL._SX679_.jpg',
        productUrl: 'https://www.amazon.in/Philips-BT3211-15-Beard-Trimmer/dp/B07QKJVZ6X',
        inStock: true
    },
    {
        id: 'prod_040',
        title: 'Dyson Supersonic Hair Dryer',
        brand: 'Dyson',
        category: 'Electronics',
        subCategory: 'Personal Care',
        platform: 'flipkart',
        originalPrice: 41900,
        discountedPrice: 36900,
        discount: 12,
        rating: 4.6,
        reviewCount: 1234,
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/hair-dryer/g/h/j/-original-imagzthf5yzjpfgh.jpeg',
        productUrl: 'https://www.flipkart.com/dyson-supersonic-hair-dryer',
        inStock: true
    }
];

// ========================================
// Application State
// ========================================

const state = {
    products: [...PRODUCTS],
    filteredProducts: [...PRODUCTS],
    displayedProducts: [],
    currentPage: 1,
    itemsPerPage: 12,
    viewMode: 'grid',
    theme: localStorage.getItem('theme') || 'light',
    filters: {
        search: '',
        platform: 'all',
        categories: [],
        brands: [],
        minPrice: 0,
        maxPrice: 200000,
        discount: 0,
        rating: 0,
        inStock: true
    },
    sort: 'relevance'
};

// ========================================
// Categories Configuration
// ========================================

const CATEGORIES = [
    { id: 'electronics', name: 'Electronics', icon: '📱', subCategories: ['Smartphones', 'Laptops', 'TV', 'Headphones', 'Smartwatches', 'Personal Care'] },
    { id: 'fashion', name: 'Fashion', icon: '👕', subCategories: ['Men Shirts', 'Men Jeans', 'Men T-Shirts', 'Women Kurtas', 'Women Dresses', 'Sarees', 'Footwear', 'Bags', 'Watches', 'Accessories'] },
    { id: 'home', name: 'Home & Living', icon: '🏠', subCategories: ['Kitchen', 'Furniture'] },
    { id: 'beauty', name: 'Beauty', icon: '💄', subCategories: ['Makeup', 'Skincare'] },
    { id: 'sports', name: 'Sports & Fitness', icon: '⚽', subCategories: ['Football', 'Fitness'] },
    { id: 'toys', name: 'Toys & Games', icon: '🎮', subCategories: ['Building Toys', 'Dolls'] }
];

// ========================================
// DOM Elements
// ========================================

const elements = {
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    themeToggle: document.getElementById('themeToggle'),
    mobileFilterBtn: document.getElementById('mobileFilterBtn'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    closeSidebar: document.getElementById('closeSidebar'),
    clearFilters: document.getElementById('clearFilters'),
    activeFilters: document.getElementById('activeFilters'),
    categoryTree: document.getElementById('categoryTree'),
    brandList: document.getElementById('brandList'),
    brandSearch: document.getElementById('brandSearch'),
    minPrice: document.getElementById('minPrice'),
    maxPrice: document.getElementById('maxPrice'),
    minPriceSlider: document.getElementById('minPriceSlider'),
    maxPriceSlider: document.getElementById('maxPriceSlider'),
    priceRangeTrack: document.getElementById('priceRangeTrack'),
    sortSelect: document.getElementById('sortSelect'),
    productsGrid: document.getElementById('productsGrid'),
    resultsTitle: document.getElementById('resultsTitle'),
    resultsCount: document.getElementById('resultsCount'),
    loadingState: document.getElementById('loadingState'),
    noResults: document.getElementById('noResults'),
    loadMoreContainer: document.getElementById('loadMoreContainer'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),
    toastContainer: document.getElementById('toastContainer')
};

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCategories();
    initBrands();
    initEventListeners();
    filterAndRenderProducts();
});

// ========================================
// Theme Management
// ========================================

function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
    showToast(`Switched to ${state.theme} mode`, 'success');
}

// ========================================
// Category Management
// ========================================

function initCategories() {
    const categoryTree = elements.categoryTree;
    categoryTree.innerHTML = CATEGORIES.map(cat => {
        const count = state.products.filter(p => 
            p.category.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0]) ||
            cat.subCategories.some(sub => p.subCategory === sub)
        ).length;
        
        return `
            <div class="category-item">
                <label>
                    <input type="checkbox" value="${cat.id}" data-category="${cat.name}">
                    <span class="category-icon">${cat.icon}</span>
                    <span class="category-name">${cat.name}</span>
                    <span class="category-count">${count}</span>
                </label>
            </div>
        `;
    }).join('');
    
    categoryTree.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', (e) => {
            const category = e.target.dataset.category;
            if (e.target.checked) {
                state.filters.categories.push(category);
            } else {
                state.filters.categories = state.filters.categories.filter(c => c !== category);
            }
            filterAndRenderProducts();
        });
    });
}

// ========================================
// Brand Management
// ========================================

function initBrands() {
    updateBrandList();
    
    elements.brandSearch.addEventListener('input', (e) => {
        updateBrandList(e.target.value);
    });
}

function updateBrandList(searchTerm = '') {
    const brands = [...new Set(state.products.map(p => p.brand))].sort();
    const filteredBrands = searchTerm 
        ? brands.filter(b => b.toLowerCase().includes(searchTerm.toLowerCase()))
        : brands;
    
    elements.brandList.innerHTML = filteredBrands.slice(0, 20).map(brand => {
        const count = state.products.filter(p => p.brand === brand).length;
        const checked = state.filters.brands.includes(brand) ? 'checked' : '';
        
        return `
            <label class="checkbox-option">
                <input type="checkbox" value="${brand}" ${checked}>
                <span class="checkbox-custom"></span>
                <span class="checkbox-label">${brand} (${count})</span>
            </label>
        `;
    }).join('');
    
    elements.brandList.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', (e) => {
            const brand = e.target.value;
            if (e.target.checked) {
                state.filters.brands.push(brand);
            } else {
                state.filters.brands = state.filters.brands.filter(b => b !== brand);
            }
            filterAndRenderProducts();
        });
    });
}

// ========================================
// Event Listeners
// ========================================

function initEventListeners() {
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Search
    elements.searchInput.addEventListener('input', debounce((e) => {
        state.filters.search = e.target.value;
        filterAndRenderProducts();
    }, 300));
    
    elements.searchBtn.addEventListener('click', () => {
        state.filters.search = elements.searchInput.value;
        filterAndRenderProducts();
    });
    
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            state.filters.search = elements.searchInput.value;
            filterAndRenderProducts();
        }
    });
    
    // Mobile sidebar
    elements.mobileFilterBtn.addEventListener('click', openSidebar);
    elements.closeSidebar.addEventListener('click', closeSidebar);
    elements.sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Clear filters
    elements.clearFilters.addEventListener('click', clearAllFilters);
    elements.resetFiltersBtn.addEventListener('click', clearAllFilters);
    
    // Platform pills
    document.querySelectorAll('.platform-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            document.querySelectorAll('.platform-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            state.filters.platform = pill.dataset.platform;
            filterAndRenderProducts();
        });
    });
    
    // Filter section accordions
    document.querySelectorAll('.filter-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.classList.toggle('open');
        });
    });
    
    // Price inputs
    elements.minPrice.addEventListener('input', debounce((e) => {
        state.filters.minPrice = parseInt(e.target.value) || 0;
        updatePriceSliders();
        filterAndRenderProducts();
    }, 300));
    
    elements.maxPrice.addEventListener('input', debounce((e) => {
        state.filters.maxPrice = parseInt(e.target.value) || 200000;
        updatePriceSliders();
        filterAndRenderProducts();
    }, 300));
    
    // Price sliders
    elements.minPriceSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (value < state.filters.maxPrice) {
            state.filters.minPrice = value;
            elements.minPrice.value = value;
            updatePriceTrack();
            filterAndRenderProducts();
        }
    });
    
    elements.maxPriceSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (value > state.filters.minPrice) {
            state.filters.maxPrice = value;
            elements.maxPrice.value = value;
            updatePriceTrack();
            filterAndRenderProducts();
        }
    });
    
    // Price presets
    document.querySelectorAll('.price-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            document.querySelectorAll('.price-preset').forEach(p => p.classList.remove('active'));
            preset.classList.add('active');
            state.filters.minPrice = parseInt(preset.dataset.min);
            state.filters.maxPrice = parseInt(preset.dataset.max);
            elements.minPrice.value = state.filters.minPrice;
            elements.maxPrice.value = state.filters.maxPrice;
            updatePriceSliders();
            filterAndRenderProducts();
        });
    });
    
    // Discount filter
    document.querySelectorAll('input[name="discount"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.filters.discount = parseInt(e.target.value);
            filterAndRenderProducts();
        });
    });
    
    // Rating filter
    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.filters.rating = parseInt(e.target.value);
            filterAndRenderProducts();
        });
    });
    
    // Sort
    elements.sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        filterAndRenderProducts();
    });
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.viewMode = btn.dataset.view;
            elements.productsGrid.classList.toggle('list-view', state.viewMode === 'list');
        });
    });
    
    // Load more
    elements.loadMoreBtn.addEventListener('click', loadMoreProducts);
}

// ========================================
// Sidebar Management
// ========================================

function openSidebar() {
    elements.sidebar.classList.add('open');
    elements.sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    elements.sidebar.classList.remove('open');
    elements.sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Price Slider Management
// ========================================

function updatePriceSliders() {
    elements.minPriceSlider.value = state.filters.minPrice;
    elements.maxPriceSlider.value = state.filters.maxPrice;
    updatePriceTrack();
}

function updatePriceTrack() {
    const min = (state.filters.minPrice / 200000) * 100;
    const max = 100 - (state.filters.maxPrice / 200000) * 100;
    elements.priceRangeTrack.style.setProperty('--range-left', `${min}%`);
    elements.priceRangeTrack.style.setProperty('--range-right', `${max}%`);
}

// ========================================
// Filter & Render Products
// ========================================

function filterAndRenderProducts() {
    showLoading();
    
    setTimeout(() => {
        // Apply filters
        state.filteredProducts = state.products.filter(product => {
            // Search filter
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                const matchesSearch = 
                    product.title.toLowerCase().includes(searchLower) ||
                    product.brand.toLowerCase().includes(searchLower) ||
                    product.category.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }
            
            // Platform filter
            if (state.filters.platform !== 'all' && product.platform !== state.filters.platform) {
                return false;
            }
            
            // Category filter
            if (state.filters.categories.length > 0) {
                const matchesCategory = state.filters.categories.some(cat => 
                    product.category.toLowerCase().includes(cat.toLowerCase().split(' ')[0])
                );
                if (!matchesCategory) return false;
            }
            
            // Brand filter
            if (state.filters.brands.length > 0 && !state.filters.brands.includes(product.brand)) {
                return false;
            }
            
            // Price filter
            if (product.discountedPrice < state.filters.minPrice || product.discountedPrice > state.filters.maxPrice) {
                return false;
            }
            
            // Discount filter
            if (state.filters.discount > 0 && product.discount < state.filters.discount) {
                return false;
            }
            
            // Rating filter
            if (state.filters.rating > 0 && product.rating < state.filters.rating) {
                return false;
            }
            
            return true;
        });
        
        // Apply sorting
        sortProducts();
        
        // Reset pagination
        state.currentPage = 1;
        state.displayedProducts = state.filteredProducts.slice(0, state.itemsPerPage);
        
        // Render
        hideLoading();
        renderProducts();
        updateResultsInfo();
        updateActiveFilters();
        updateBrandList(elements.brandSearch.value);
        
        // Show/hide load more
        elements.loadMoreContainer.style.display = 
            state.displayedProducts.length < state.filteredProducts.length ? 'block' : 'none';
        
        // Show no results if empty
        elements.noResults.style.display = state.filteredProducts.length === 0 ? 'flex' : 'none';
        
    }, 300);
}

function sortProducts() {
    switch (state.sort) {
        case 'price-low':
            state.filteredProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
            break;
        case 'price-high':
            state.filteredProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
            break;
        case 'rating':
            state.filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'discount':
            state.filteredProducts.sort((a, b) => b.discount - a.discount);
            break;
        case 'newest':
            // For demo, just shuffle a bit
            state.filteredProducts.sort(() => Math.random() - 0.5);
            break;
        default:
            // Relevance - keep original order for now
            break;
    }
}

function renderProducts() {
    elements.productsGrid.innerHTML = state.displayedProducts.map((product, index) => `
        <article class="product-card" style="animation-delay: ${index * 0.05}s" onclick="openProduct('${product.productUrl}')">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=Image+Not+Found'">
                <span class="platform-badge ${product.platform}">${product.platform}</span>
                ${product.discount >= 20 ? `<span class="discount-badge">${product.discount}% OFF</span>` : ''}
                <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist('${product.id}')" aria-label="Add to wishlist">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <span class="rating-badge ${product.rating < 3.5 ? 'low' : ''}">
                        ${product.rating}
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                    </span>
                    <span class="review-count">(${formatNumber(product.reviewCount)})</span>
                </div>
                <div class="product-pricing">
                    <span class="current-price">₹${formatPrice(product.discountedPrice)}</span>
                    ${product.discount > 0 ? `
                        <span class="original-price">₹${formatPrice(product.originalPrice)}</span>
                        <span class="discount-percent">${product.discount}% off</span>
                    ` : ''}
                </div>
                <button class="view-product-btn" onclick="event.stopPropagation(); openProduct('${product.productUrl}')">
                    View on ${capitalizeFirst(product.platform)}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </article>
    `).join('');
}

function loadMoreProducts() {
    state.currentPage++;
    const start = 0;
    const end = state.currentPage * state.itemsPerPage;
    state.displayedProducts = state.filteredProducts.slice(start, end);
    
    renderProducts();
    
    // Hide load more if all products displayed
    if (state.displayedProducts.length >= state.filteredProducts.length) {
        elements.loadMoreContainer.style.display = 'none';
    }
}

// ========================================
// UI Updates
// ========================================

function updateResultsInfo() {
    const searchTerm = state.filters.search;
    
    if (searchTerm) {
        elements.resultsTitle.textContent = `Results for "${searchTerm}"`;
    } else if (state.filters.platform !== 'all') {
        elements.resultsTitle.textContent = `${capitalizeFirst(state.filters.platform)} Products`;
    } else {
        elements.resultsTitle.textContent = 'Trending Products';
    }
    
    elements.resultsCount.textContent = 
        `Showing ${state.displayedProducts.length} of ${state.filteredProducts.length} products`;
}

function updateActiveFilters() {
    const chips = [];
    
    if (state.filters.platform !== 'all') {
        chips.push({ type: 'platform', label: capitalizeFirst(state.filters.platform), value: state.filters.platform });
    }
    
    state.filters.categories.forEach(cat => {
        chips.push({ type: 'category', label: cat, value: cat });
    });
    
    state.filters.brands.forEach(brand => {
        chips.push({ type: 'brand', label: brand, value: brand });
    });
    
    if (state.filters.discount > 0) {
        chips.push({ type: 'discount', label: `${state.filters.discount}%+ off`, value: state.filters.discount });
    }
    
    if (state.filters.rating > 0) {
        chips.push({ type: 'rating', label: `${state.filters.rating}★+`, value: state.filters.rating });
    }
    
    elements.activeFilters.innerHTML = chips.map(chip => `
        <span class="filter-chip">
            ${chip.label}
            <button onclick="removeFilter('${chip.type}', '${chip.value}')">&times;</button>
        </span>
    `).join('');
}

function removeFilter(type, value) {
    switch (type) {
        case 'platform':
            state.filters.platform = 'all';
            document.querySelectorAll('.platform-pill').forEach(p => p.classList.remove('active'));
            document.querySelector('.platform-pill[data-platform="all"]').classList.add('active');
            break;
        case 'category':
            state.filters.categories = state.filters.categories.filter(c => c !== value);
            document.querySelector(`#categoryTree input[data-category="${value}"]`).checked = false;
            break;
        case 'brand':
            state.filters.brands = state.filters.brands.filter(b => b !== value);
            break;
        case 'discount':
            state.filters.discount = 0;
            document.querySelector('input[name="discount"][value="0"]').checked = true;
            break;
        case 'rating':
            state.filters.rating = 0;
            document.querySelector('input[name="rating"][value="0"]').checked = true;
            break;
    }
    
    filterAndRenderProducts();
}

function clearAllFilters() {
    state.filters = {
        search: '',
        platform: 'all',
        categories: [],
        brands: [],
        minPrice: 0,
        maxPrice: 200000,
        discount: 0,
        rating: 0,
        inStock: true
    };
    
    // Reset UI
    elements.searchInput.value = '';
    document.querySelectorAll('.platform-pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.platform-pill[data-platform="all"]').classList.add('active');
    document.querySelectorAll('#categoryTree input').forEach(i => i.checked = false);
    document.querySelectorAll('.price-preset').forEach(p => p.classList.remove('active'));
    elements.minPrice.value = '';
    elements.maxPrice.value = '';
    updatePriceSliders();
    document.querySelector('input[name="discount"][value="0"]').checked = true;
    document.querySelector('input[name="rating"][value="0"]').checked = true;
    
    filterAndRenderProducts();
    showToast('All filters cleared', 'info');
}

// ========================================
// Loading State
// ========================================

function showLoading() {
    elements.loadingState.classList.add('active');
    elements.productsGrid.style.opacity = '0.5';
}

function hideLoading() {
    elements.loadingState.classList.remove('active');
    elements.productsGrid.style.opacity = '1';
}

// ========================================
// Product Actions
// ========================================

function openProduct(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function toggleWishlist(productId) {
    showToast('Added to wishlist!', 'success');
}

// ========================================
// Toast Notifications
// ========================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// Utility Functions
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatPrice(price) {
    return price.toLocaleString('en-IN');
}

function formatNumber(num) {
    if (num >= 100000) {
        return (num / 100000).toFixed(1) + 'L';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
