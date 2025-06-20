# 🛒 Snipcart Product Management Setup Guide

## Current Issue
You can't add products from the Snipcart dashboard because the website is currently using local product data instead of connecting to your Snipcart catalog.

## ✅ Solution: Connect to Snipcart Dashboard

### Step 1: Deploy Your Website (Required)

Snipcart needs a public URL to fetch your products. You have several options:

**Option A: GitHub Pages (Recommended)**
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Enable GitHub Pages
4. Your site will be available at: `https://yourusername.github.io/repository-name/`

**Option B: Netlify (Free)**
1. Go to https://netlify.com
2. Drag and drop your website folder
3. Get a free URL like: `https://your-site-name.netlify.app`

**Option C: Vercel (Free)**
1. Go to https://vercel.com
2. Connect your GitHub repository
3. Deploy automatically

### Step 2: Configure Snipcart Dashboard

1. **Go to your Snipcart Dashboard:**
   - Visit: https://app.snipcart.com/dashboard
   - Sign in with your account

2. **Navigate to Products:**
   - Click on "Products" in the left sidebar
   - Look for "Fetch products using a link" option

3. **Add Your Products URL:**
   - Enter your deployed website URL + `/products.json`
   - Example: `https://yourusername.github.io/a-fields-store/products.json`
   - Click "Fetch" or "Import"

4. **Verify Products Load:**
   - Your products should appear in the Snipcart dashboard
   - You can edit them directly in the dashboard

### Step 3: Update Your Website

1. **Open `js/snipcart-products.js`**
2. **Find line 8:** `this.useLocalData = false;`
3. **Make sure it's set to:** `this.useLocalData = false;`

```javascript
// This should already be set to false
this.useLocalData = false; // Load from Snipcart dashboard
```

### Step 4: Test the Connection

1. **Refresh your deployed website**
2. **Check the browser console** for any errors
3. **Verify products load** from Snipcart dashboard

## 🔧 Alternative: Manual Product Management

If you prefer to manage products manually in the Snipcart dashboard:

1. **Go to Snipcart Dashboard → Products**
2. **Click "Add Product"**
3. **Fill in the details:**
   - **Product ID:** Unique identifier (e.g., `candle-set-001`)
   - **Name:** Product name (e.g., "Premium Candle Set")
   - **Description:** Product description
   - **Price:** Product price in USD
   - **Category:** Choose from: home, kitchen, wellness, beverages
   - **Stock:** Available quantity
   - **Image URL:** Link to product image (optional)

## 📋 Product Data Format

The `products.json` file contains your product data in this format:

```json
{
  "products": [
    {
      "id": "candle-set-001",
      "name": "Premium Candle Set",
      "description": "Handcrafted soy candles...",
      "price": 24.99,
      "image": "./assets/images/placeholder.svg",
      "category": "home",
      "stock": 15,
      "url": "https://yourdomain.com/products.html"
    }
  ]
}
```

## 🚀 Quick Start Steps

1. **Deploy your website** to GitHub Pages, Netlify, or Vercel
2. **Get your public URL** (e.g., `https://yourusername.github.io/a-fields-store/`)
3. **In Snipcart dashboard:** Add `https://yourusername.github.io/a-fields-store/products.json`
4. **Fetch/Import products** in Snipcart dashboard
5. **Refresh your website** and test

## 🔍 Troubleshooting

### Products Not Loading
- Check that your website is deployed and accessible
- Verify the products.json URL is correct
- Ensure the JSON format is valid

### CORS Errors
- The current setup uses a CORS proxy
- If it fails, fallback to local data automatically

### Cart Not Working
- Verify SnipcartSettings configuration
- Check that API key is correct in all HTML files

## 📞 Support

If you need help:
1. Check the browser console for error messages
2. Verify your Snipcart API key is correct
3. Ensure your website is publicly accessible
4. Test the products.json URL in your browser

## 🎯 Next Steps

Once connected to Snipcart:
- Add real product images
- Set up inventory management
- Configure shipping and tax rules
- Test the complete checkout process 