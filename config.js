// Configuration file for Ashley Fields website
// Update these settings based on your environment

const config = {
    // Base URL - Change this when deploying
    // baseUrl: 'https://thdevintjaden.github.io/a-fields-store/',
    
    // For local development, use:
    baseUrl: 'http://127.0.0.1:5500',
    
    // Snipcart API Key - Replace with your actual key
    snipcartApiKey: 'MmNmYmQzNmUtY2E3MC00NjgxLWI0M2MtMGU3OGQ3YmRiYWRhNjM4ODYwNTY1ODUxOTM0NzYx',
    
    // Site settings
    siteName: 'Ashley Fields - Handcrafted Treasures',
    siteDescription: 'Unique handmade goods crafted with love by Ashley Fields',
    
    // Contact information
    contact: {
        email: 'hello@ashleyfields.com',
        phone: '(123) 456-7890',
        address: '123 Craft Street, Artisan District, Creative City, CC 12345'
    },
    
    // Social media (update with actual URLs)
    social: {
        instagram: '#',
        facebook: '#',
        pinterest: '#'
    }
};

// Function to get product URL
function getProductUrl() {
    return `${config.baseUrl}/products.html`;
}

// Function to get image URL
function getImageUrl(imageName) {
    return `${config.baseUrl}/images/${imageName}`;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} 