# Ashley Fields - Handcrafted Treasures

A beautiful, professional website for Ashley Fields' handmade goods business, built with HTML, CSS, and JavaScript. Features a complete e-commerce solution using Snipcart for seamless online shopping.

## 🌟 Features

### Design & User Experience
- **Mobile-first responsive design** - Optimized for all devices
- **Modern, professional aesthetic** - Clean typography and elegant color scheme
- **Smooth animations** - Subtle hover effects and transitions
- **Accessibility focused** - WCAG compliant with proper ARIA labels
- **Fast loading** - Optimized images and efficient code

### E-commerce Functionality
- **Snipcart integration** - Complete shopping cart and checkout system
- **Product catalog** - Organized by categories with filtering
- **Secure payments** - Multiple payment gateway support
- **Order management** - Customer dashboard and order tracking
- **Inventory management** - Real-time stock updates

### Content Pages
- **Homepage** - Hero section, featured products, testimonials
- **Products page** - Complete catalog with category filtering
- **About page** - Ashley's story, mission, and process
- **Contact page** - Contact form, business hours, FAQ

### Technical Features
- **GitHub Pages compatible** - Ready for immediate deployment
- **SEO optimized** - Meta tags, structured data, sitemap
- **Performance optimized** - Lazy loading, minified assets
- **Cross-browser compatible** - Works on all modern browsers

## 🚀 Quick Start

### Prerequisites
- A Snipcart account (free to start)
- GitHub account for hosting
- Basic knowledge of HTML/CSS/JavaScript

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/a-fields-store.git
   cd a-fields-store
   ```

2. **Set up Snipcart**
   - Create a free account at [Snipcart](https://snipcart.com)
   - Get your public API key from the dashboard
   - Replace `YOUR_API_KEY` in all HTML files with your actual API key

3. **Customize the content**
   - Update product information in `products.html`
   - Modify Ashley's story in `about.html`
   - Update contact information in `contact.html`
   - Replace placeholder images with actual product photos

4. **Deploy to GitHub Pages**
   - Push your code to a GitHub repository
   - Go to Settings > Pages
   - Select your main branch as source
   - Your site will be live at `https://yourusername.github.io/repository-name`

## 📁 Project Structure

```
a-fields-store/
├── index.html              # Homepage
├── products.html           # Products catalog
├── about.html             # About page
├── contact.html           # Contact page
├── css/
│   ├── styles.css         # Main stylesheet
│   ├── products.css       # Product page styles
│   ├── about.css          # About page styles
│   └── contact.css        # Contact page styles
├── js/
│   ├── main.js            # Main JavaScript functionality
│   ├── products.js        # Product filtering and interactions
│   └── contact.js         # Contact form handling
├── images/                # Product and site images
├── favicon.ico           # Site favicon
└── README.md             # This file
```

## 🛠️ Customization

### Colors and Branding
The site uses CSS custom properties for easy customization. Edit the `:root` section in `css/styles.css`:

```css
:root {
    --primary-color: #8B7355;      /* Main brand color */
    --secondary-color: #D4A574;    /* Accent color */
    --accent-color: #F4E4BC;       /* Light accent */
    --text-dark: #2C2C2C;          /* Dark text */
    --text-light: #6B6B6B;         /* Light text */
    /* ... more variables */
}
```

### Adding Products
1. Add product HTML to `products.html`:
```html
<div class="product-card" data-category="ceramics">
    <div class="product-image">
        <img src="./images/your-product.jpg" alt="Product description">
    </div>
    <div class="product-info">
        <h3 class="product-title">Product Name</h3>
        <p class="product-description">Product description</p>
        <div class="product-price">$25.00</div>
        <button class="snipcart-add-item btn btn-primary"
                data-item-id="unique-id"
                data-item-name="Product Name"
                data-item-price="25.00"
                data-item-url="./products.html"
                data-item-description="Product description">
            Add to Cart
        </button>
    </div>
</div>
```

2. Add corresponding filter button if needed:
```html
<button class="filter-btn" data-category="your-category">Your Category</button>
```

### Images
- Place product images in the `images/` folder
- Use descriptive filenames
- Optimize images for web (recommended: 800x800px, WebP format)
- Include alt text for accessibility

## 🔧 Configuration

### Snipcart Settings
Configure Snipcart in the script tag of each HTML file:

```javascript
window.SnipcartSettings = {
    publicApiKey: "YOUR_API_KEY",
    loadStrategy: "on-user-interaction",
    currency: "usd",
    // Add more settings as needed
};
```

### SEO Optimization
Update meta tags in each HTML file:
- Title tags
- Meta descriptions
- Open Graph tags
- Twitter Card tags

### Analytics
Add Google Analytics or other tracking codes to the `<head>` section of your HTML files.

## 📱 Mobile Optimization

The site is built mobile-first and includes:
- Responsive navigation with hamburger menu
- Touch-friendly buttons and links
- Optimized images for mobile devices
- Fast loading on mobile networks

## 🔒 Security

- All external links use `rel="noopener"`
- Form inputs are properly validated
- Snipcart handles secure payment processing
- No sensitive data stored in client-side code

## 🚀 Performance

- Images are lazy-loaded
- CSS and JavaScript are optimized
- Minimal external dependencies
- Fast initial page load

## 📞 Support

For technical support or customization help:
1. Check the [Snipcart documentation](https://docs.snipcart.com/)
2. Review the code comments for implementation details
3. Test thoroughly on different devices and browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Snipcart](https://snipcart.com) for e-commerce functionality
- Icons and emojis for visual elements
- Google Fonts for typography
- Modern CSS Grid and Flexbox for layouts

---

**Built with ❤️ for Ashley Fields' handmade goods business** 