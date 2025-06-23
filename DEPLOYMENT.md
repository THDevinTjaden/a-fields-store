# Deployment Guide - Ashley Fields Website

This guide will walk you through deploying Ashley Fields' handmade goods website to GitHub Pages with Snipcart integration.

## 🚀 Step 1: Set Up Snipcart

### 1. Create Snipcart Account
1. Go to [Snipcart.com](https://snipcart.com)
2. Click "Sign Up" and create a free account
3. Complete the registration process

### 2. Get Your API Key
1. Log into your Snipcart dashboard
2. Go to **Account** → **API Keys**
3. Copy your **Public API Key**
4. Keep this key secure - you'll need it for the website

### 3. Configure Snipcart Settings
1. In your dashboard, go to **Settings** → **Store Configuration**
2. Set your store name: "Ashley Fields - Handcrafted Treasures"
3. Configure your currency (USD recommended)
4. Set up your shipping zones and rates
5. Configure payment methods (Stripe, PayPal, etc.)

## 🎨 Step 2: Customize the Website

### 1. Update API Key
Replace `YOUR_API_KEY` in all HTML files with your actual Snipcart API key:
- `index.html`
- `products.html`
- `about.html`
- `contact.html`

### 2. Add Your Products
1. Edit `products.html`
2. Replace placeholder products with your actual items
3. Update product images, descriptions, and prices
4. Add your product photos to the `images/` folder

### 3. Personalize Content
1. **About Page**: Update Ashley's story in `about.html`
2. **Contact Page**: Update contact information in `contact.html`
3. **Homepage**: Update featured products in `index.html`

### 4. Add Your Images
1. Take high-quality photos of your products
2. Resize to 800x800px for product images
3. Save in WebP or JPG format
4. Place in the `images/` folder
5. Update image references in HTML files

## 🌐 Step 3: Deploy to GitHub Pages

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `a-fields-store` (or your preferred name)
4. Make it public
5. Don't initialize with README (we already have one)

### 2. Upload Your Files
1. Clone the repository to your computer:
   ```bash
   git clone https://github.com/yourusername/a-fields-store.git
   cd a-fields-store
   ```

2. Copy all website files into the repository folder

3. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Initial website setup"
   git push origin main
   ```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch
6. Click **Save**

Your site will be live at: `https://yourusername.github.io/a-fields-store`

## 🔧 Step 4: Configure Domain (Optional)

### 1. Custom Domain Setup
1. Purchase a domain (e.g., `ashleyfields.com`)
2. In GitHub repository Settings → Pages
3. Enter your custom domain
4. Save the settings

### 2. DNS Configuration
Configure your domain's DNS to point to GitHub Pages:
- **Type**: CNAME
- **Name**: @ (or www)
- **Value**: `yourusername.github.io`

## 📱 Step 5: Test Your Website

### 1. Functionality Testing
- [ ] Navigation works on all pages
- [ ] Product filtering works
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] Contact form submission
- [ ] Mobile responsiveness

### 2. Snipcart Testing
1. Go to your Snipcart dashboard
2. Switch to **Test Mode**
3. Test the complete purchase flow
4. Verify orders appear in dashboard
5. Switch to **Live Mode** when ready

### 3. Cross-Browser Testing
Test on:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

## 🔍 Step 6: SEO and Analytics

### 1. Google Analytics
1. Create a Google Analytics account
2. Get your tracking ID
3. Add the tracking code to all HTML files

### 2. Search Console
1. Submit your site to Google Search Console
2. Verify ownership
3. Submit your sitemap

### 3. Social Media
1. Update Open Graph tags in HTML files
2. Test social media sharing
3. Set up social media accounts

## 🛠️ Step 7: Maintenance

### Regular Tasks
- [ ] Update product inventory
- [ ] Add new products
- [ ] Monitor Snipcart orders
- [ ] Update contact information
- [ ] Backup your website files

### Performance Monitoring
- [ ] Check website speed
- [ ] Monitor mobile performance
- [ ] Update images as needed
- [ ] Review analytics data

## 🆘 Troubleshooting

### Common Issues

**Snipcart not loading:**
- Check API key is correct
- Verify Snipcart account is active
- Check browser console for errors

**Images not displaying:**
- Verify image paths are correct
- Check image files exist in images folder
- Ensure proper file permissions

**Mobile issues:**
- Test on actual devices
- Check viewport meta tag
- Verify CSS media queries

**GitHub Pages not updating:**
- Wait 5-10 minutes for changes to deploy
- Check repository settings
- Verify files are committed and pushed

## 📞 Support Resources

- [Snipcart Documentation](https://docs.snipcart.com/)
- [GitHub Pages Documentation](https://pages.github.com/)
- [HTML/CSS/JavaScript Resources](https://developer.mozilla.org/)

---

**Your website is now ready to sell Ashley's beautiful handmade goods! 🎉** 