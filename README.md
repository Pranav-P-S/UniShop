# 🛒 UniShop

<div align="center">

![UniShop Banner](https://img.shields.io/badge/UniShop-Indian%20E--Commerce%20Aggregator-667eea?style=for-the-badge&logo=shopify&logoColor=white)

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg?style=flat-square)](https://github.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=flat-square&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**Compare prices across India's top e-commerce platforms in one beautiful interface**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔍 Smart Search
- Real-time search across all platforms
- Debounced input for performance
- Search by product name, brand, or category

### 🎯 Advanced Filtering
- **Price Range** - Dual slider with presets
- **Categories** - Electronics, Fashion, Home & more
- **Brands** - Dynamic searchable list
- **Discounts** - 10%, 25%, 50%, 70%+
- **Ratings** - Filter by customer reviews

</td>
<td width="50%">

### 🛍️ Multi-Platform Support
- 📦 **Amazon India**
- 🛒 **Flipkart**
- 🎀 **Meesho**
- 👗 **Ajio**
- 👠 **Myntra**

### 🎨 Beautiful UI
- Light/Dark theme toggle
- Glassmorphism design
- Smooth animations
- Fully responsive

</td>
</tr>
</table>

---

## 🚀 Demo

<div align="center">

| Light Mode | Dark Mode |
|:----------:|:---------:|
| Clean, modern interface | Easy on the eyes |
| ![Light Theme](https://via.placeholder.com/400x300/f8fafc/6366f1?text=Light+Mode) | ![Dark Theme](https://via.placeholder.com/400x300/0f172a/8b5cf6?text=Dark+Mode) |

</div>

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/UniShop.git

# Navigate to project directory
cd UniShop

# Install dependencies (for scraper)
npm install

# Open in browser
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

---

## 🎮 Usage

### Basic Usage
1. Open `index.html` in any modern browser
2. Use the search bar to find products
3. Apply filters from the sidebar
4. Click platform pills to filter by store
5. Click any product to visit the official page

### Running the Scraper
```bash
# Start the scraper server
node scraper/server.js

# The API will be available at http://localhost:3000
```

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/search?q=<query>` | GET | Search products |
| `/api/products` | GET | Get all products |
| `/api/scrape?platform=<name>` | POST | Trigger scrape |

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Tools |
|:--------:|:-------:|:-----:|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) | ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) | ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) | ![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white) | ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) |

</div>

---

## 📁 Project Structure

```
UniShop/
├── 📄 index.html          # Main application
├── 🎨 styles.css          # Design system & styles
├── ⚡ app.js               # Frontend logic
├── 📖 README.md           # You are here!
├── 📋 package.json        # Dependencies
└── 🔧 scraper/
    ├── server.js          # Express API server
    ├── scrapers/
    │   ├── amazon.js      # Amazon scraper
    │   ├── flipkart.js    # Flipkart scraper
    │   ├── meesho.js      # Meesho scraper
    │   ├── ajio.js        # Ajio scraper
    │   └── myntra.js      # Myntra scraper
    └── utils/
        └── helpers.js     # Utility functions
```

---

## ⚠️ Disclaimer

> This project is for **educational purposes only**. Web scraping may violate the Terms of Service of some websites. Always check and respect the `robots.txt` and ToS of websites before scraping. The developers are not responsible for any misuse of this software.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. 🍴 Fork the repository
2. 🔧 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit changes (`git commit -m 'Add AmazingFeature'`)
4. 📤 Push to branch (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ in India**

⭐ Star this repo if you found it helpful!

</div>
