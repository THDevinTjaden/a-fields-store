# Product Management Guide

## Overview
This website includes a simple admin interface for managing products without touching code. The system stores products in your browser's localStorage and automatically updates the products page.

## Accessing the Admin Interface

### Method 1: Direct Access
Visit: `https://thdevintjaden.github.io/a-fields-store/admin.html`

### Method 2: Hidden Link
Add `?admin=true` to any page URL to show the admin link:
- `https://thdevintjaden.github.io/a-fields-store/products.html?admin=true`

## Features

### 1. Add New Products
1. Go to the "Add Product" tab
2. Fill in all required fields:
   - **Product Name**: The display name for customers
   - **Category**: Choose from ceramics, textiles, candles, or jewelry
   - **Price**: Enter the price in dollars (e.g., 45.00)
   - **Product ID**: Unique identifier (e.g., ceramic-vase-blue)
   - **Description**: Product description for customers
   - **Image URL**: Link to product image (optional)
   - **Stock Quantity**: Number of items available
3. Click "Add Product"

### 2. Edit Existing Products
1. Go to the "Manage Products" tab
2. Click "Edit" next to any product
3. The product details will be loaded into the form
4. Make your changes
5. Click "Add Product" (it will update the existing product)

### 3. Delete Products
1. Go to the "Manage Products" tab
2. Click "Delete" next to any product
3. Confirm the deletion

### 4. Export/Import Products
- **Export**: Download all products as a JSON file for backup
- **Generate HTML**: Create HTML code for products (useful for manual updates)
- **Import**: Upload a JSON file to replace all products

## Product ID Guidelines
- Use lowercase letters, numbers, and hyphens only
- Make them descriptive and unique
- Examples: `ceramic-vase-sage`, `scarf-wool-1`, `candle-lavender`

## Image Guidelines
- Use square images (1:1 ratio) for best display
- Recommended size: 400x400 pixels or larger
- Supported formats: JPG, PNG, WebP
- You can use placeholder images initially and update later

## Stock Management
- Set stock to 0 to mark items as "Out of Stock"
- Products with 0 stock will show a disabled "Out of Stock" button
- Update stock quantities as you sell items

## Data Storage
- Products are stored in your browser's localStorage
- This means the data is tied to your specific browser/device
- For backup, regularly export your products using the Export feature
- To share products across devices, use the Import feature

## Tips for Success

### Adding Multiple Products
1. Add all your products through the admin interface
2. Export the products as a backup
3. Test the checkout process with each product

### Image Management
1. Upload product images to your preferred hosting service
2. Use the image URLs in the admin interface
3. Consider using a service like Imgur, Google Drive, or your own server

### Regular Maintenance
1. Update stock quantities after sales
2. Export products regularly as backup
3. Review and update product descriptions as needed

## Troubleshooting

### Products Not Showing
- Check that the product ID is unique
- Ensure all required fields are filled
- Try refreshing the page

### Images Not Loading
- Verify the image URL is correct and accessible
- Check that the image format is supported
- Consider using a different image hosting service

### Admin Interface Not Working
- Clear your browser cache
- Try a different browser
- Check that JavaScript is enabled

## Security Notes
- This is a client-side system for simplicity
- Product data is stored locally in your browser
- For more security, consider implementing a server-side solution
- The admin interface is not password-protected by default

## Next Steps
1. Add your first product using the admin interface
2. Test the checkout process
3. Export your products as backup
4. Share the admin URL with anyone who needs to manage products

## Support
If you encounter issues:
1. Check this guide first
2. Try clearing browser cache
3. Export your products before making major changes
4. Contact the developer if problems persist 