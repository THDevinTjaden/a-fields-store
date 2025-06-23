#!/bin/bash

# Deployment script for Ashley Fields website
echo "🚀 Deploying Ashley Fields website to GitHub Pages..."

# Add all changes
git add .

# Commit with timestamp
git commit -m "Fix Snipcart URLs and deploy to GitHub Pages - $(date)"

# Push to GitHub
git push origin main

echo "✅ Changes pushed to GitHub!"
echo "🌐 Your site will be live at: https://thdevintjaden.github.io/a-fields-store/"
echo ""
echo "📋 Next steps:"
echo "1. Wait 2-5 minutes for GitHub Pages to update"
echo "2. Test the website at the URL above"
echo "3. Test Snipcart functionality"
echo "4. Add real product images to the images/ folder"
echo ""
echo "🔧 If you need to make changes:"
echo "1. Edit the files locally"
echo "2. Run this script again: ./deploy.sh" 