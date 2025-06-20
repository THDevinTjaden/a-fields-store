# Ashley Fields - Online Store

A professional, mobile-first e-commerce website built with HTML, CSS, and JavaScript, integrated with Snipcart for seamless online shopping.

## 🌟 Features

- **Mobile-First Design**: Responsive layout optimized for all devices
- **E-commerce Integration**: Powered by Snipcart for secure online payments
- **Professional UI/UX**: Clean, modern design with smooth animations
- **SEO Optimized**: Meta tags, semantic HTML, and proper structure
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized images, lazy loading, and efficient code
- **Contact Form**: Functional contact form with validation
- **Testimonials**: Customer reviews section
- **Product Catalog**: Featured products with add-to-cart functionality

## 🚀 Quick Start

1. **Clone or Download** this repository
2. **Set up Snipcart**:
   - Sign up at [Snipcart](https://snipcart.com)
   - Get your API key from the dashboard
   - Replace `YOUR_SNIPCART_API_KEY` in `index.html` with your actual API key
3. **Customize Content**:
   - Update product information in `index.html`
   - Replace placeholder images with actual product photos
   - Modify colors and styling in `css/styles.css`
4. **Deploy** to GitHub Pages or your preferred hosting service

## 📁 File Structure

```
ashley-fields-store/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
├── assets/
│   └── images/            # Product images and graphics
├── robots.txt             # SEO configuration
└── README.md              # This file
```

## 🛠️ Customization

### Adding Products

To add new products, copy this structure in the `products-grid` section:

```html
<div class="product-card">
    <div class="product-image">
        <img src="./assets/images/your-product.jpg" alt="Product Name">
    </div>
    <div class="product-info">
        <h3 class="product-title">Product Name</h3>
        <p class="product-description">Product description here.</p>
        <div class="product-price">$29.99</div>
        <button class="btn btn-primary snipcart-add-item"
                data-item-id="product-id"
                data-item-price="29.99"
                data-item-url="https://your-domain.com"
                data-item-description="Product description"
                data-item-name="Product Name"
                data-item-image="./assets/images/your-product.jpg">
            Add to Cart
        </button>
    </div>
</div>
```

### Customizing Colors

Update the CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Main brand color */
    --secondary-color: #3498db;    /* Accent color */
    --accent-color: #e74c3c;       /* Call-to-action color */
    /* ... other variables */
}
```

### Adding Pages

1. Create new HTML files for additional pages
2. Update navigation links in `index.html`
3. Add corresponding styles in `css/styles.css`

## 🔧 Snipcart Configuration

### Required Setup

1. **API Key**: Replace `YOUR_SNIPCART_API_KEY` in the HTML
2. **Product Data**: Ensure all `data-item-*` attributes are properly set
3. **Domain Configuration**: Add your domain to Snipcart dashboard

### Product Attributes

- `data-item-id`: Unique product identifier
- `data-item-price`: Product price (number only)
- `data-item-name`: Product name
- `data-item-description`: Product description
- `data-item-image`: Product image URL
- `data-item-url`: Current page URL

## 📱 Mobile Optimization

The website is built mobile-first with:

- Responsive grid layouts
- Touch-friendly buttons (minimum 44px)
- Optimized typography for small screens
- Fast loading times
- Progressive enhancement

## 🎨 Design System

### Typography
- **Font Family**: Inter (Google Fonts)
- **Scale**: Modular scale from 0.75rem to 3rem
- **Line Height**: 1.6 for body, 1.2 for headings

### Spacing
- **Base Unit**: 1rem (16px)
- **Scale**: 0.25rem, 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem

### Colors
- **Primary**: #2c3e50 (Dark Blue)
- **Secondary**: #3498db (Blue)
- **Accent**: #e74c3c (Red)
- **Neutral**: Various grays for text and backgrounds

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Open Graph tags
- Proper heading hierarchy
- Alt text for images
- Robots.txt configuration
- Fast loading times

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Focus indicators
- Skip to main content link

## 🚀 Deployment

### GitHub Pages

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Other Hosting

- Upload files to your web server
- Ensure all paths are relative
- Configure your domain in Snipcart dashboard

## 📊 Analytics (Optional)

To add analytics, include your tracking code in the `<head>` section:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛡️ Security

- HTTPS required for Snipcart
- No sensitive data in client-side code
- Input validation on forms
- XSS protection through proper escaping

## 📞 Support

For issues or questions:

1. Check the [Snipcart documentation](https://docs.snipcart.com/)
2. Review browser console for JavaScript errors
3. Validate HTML/CSS using W3C validators
4. Test on multiple devices and browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- **Design**: Custom design for Ashley Fields
- **Icons**: SVG icons (inline)
- **Fonts**: Inter by Google Fonts
- **E-commerce**: Snipcart
- **Hosting**: GitHub Pages compatible

---

**Built with ❤️ for Ashley Fields** 