# Local Development with Snipcart

## 🚨 **The Problem**

Snipcart requires **publicly accessible URLs** for order validation. Local development (`localhost` or `127.0.0.1`) will cause these errors:

- "Domain Crawling Failed"
- "Product URLs could not be reached"
- Order validation failures

## 🔧 **Solutions**

### **Option 1: Use ngrok (Recommended)**

1. **Install ngrok:**
   ```bash
   npm install -g ngrok
   ```

2. **Start local server:**
   ```bash
   python3 -m http.server 5500
   ```

3. **Create public tunnel:**
   ```bash
   ngrok http 5500
   ```

4. **Update URLs:**
   - Copy ngrok URL (e.g., `https://abc123.ngrok.io`)
   - Update all `data-item-url` in HTML files

### **Option 2: Deploy to GitHub Pages**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Enable GitHub Pages** in repository settings

3. **Update URLs** to your GitHub Pages URL

## 📝 **Quick Fix for Current Issues**

### **1. Update Product URLs**

Replace all `data-item-url="./products.html"` with:
```html
data-item-url="https://yourusername.github.io/a-fields-store/products.html"
```

### **2. Add Shipping Configuration**

In Snipcart Dashboard:
1. Go to Settings → Shipping
2. Add shipping zones and rates
3. Configure at least one shipping method

### **3. Add Real Images**

Replace placeholder files in `images/` folder with actual product photos.

## 🚀 **Next Steps**

1. **Choose a solution** (ngrok or GitHub Pages)
2. **Update all product URLs**
3. **Configure shipping in Snipcart**
4. **Add real product images**
5. **Test complete purchase flow**

## 📞 **Need Help?**

- [Snipcart Local Development Guide](https://snipcart.com/blog/develop-a-snipcart-powered-website-locally-using-ngrok)
- [Snipcart Documentation](https://docs.snipcart.com/) 