// ===== PRODUCTS PAGE FUNCTIONALITY =====
// Ashley Fields Products Page

document.addEventListener('DOMContentLoaded', function() {
    initProductsPage();
});

function initProductsPage() {
    initProductSorting();
    initProductCount();
    initProductAnimations();
}

// ===== PRODUCT SORTING =====
function initProductSorting() {
    const sortSelect = document.getElementById('sort-select');
    const productsGrid = document.getElementById('products-grid');
    
    if (sortSelect && productsGrid) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            sortProducts(sortValue);
        });
    }
}

function sortProducts(sortType) {
    const productsGrid = document.getElementById('products-grid');
    const products = Array.from(productsGrid.children);
    
    products.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        const nameA = a.querySelector('.product-title').textContent.toLowerCase();
        const nameB = b.querySelector('.product-title').textContent.toLowerCase();
        
        switch (sortType) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'name':
                return nameA.localeCompare(nameB);
            case 'featured':
            default:
                return 0; // Keep original order
        }
    });
    
    // Clear and re-append sorted products
    productsGrid.innerHTML = '';
    products.forEach(product => {
        productsGrid.appendChild(product);
    });
    
    // Add animation to sorted products
    animateProducts();
}

// ===== PRODUCT COUNT =====
function initProductCount() {
    const productsGrid = document.getElementById('products-grid');
    const countElement = document.getElementById('products-count');
    
    if (productsGrid && countElement) {
        const productCount = productsGrid.children.length;
        countElement.textContent = productCount;
    }
}

// ===== PRODUCT ANIMATIONS =====
function initProductAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => observer.observe(card));
}

function animateProducts() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.remove('animate-in');
        setTimeout(() => {
            card.classList.add('animate-in');
        }, 100);
    });
}

// ===== PRODUCT FILTERING (Future Enhancement) =====
function initProductFiltering() {
    // This can be expanded to add category filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const productsGrid = document.getElementById('products-grid');
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    
    // Update product count
    updateProductCount();
}

function updateProductCount() {
    const visibleProducts = document.querySelectorAll('.product-card[style*="display: block"], .product-card:not([style*="display: none"])');
    const countElement = document.getElementById('products-count');
    
    if (countElement) {
        countElement.textContent = visibleProducts.length;
    }
}

// ===== PRODUCT SEARCH (Future Enhancement) =====
function initProductSearch() {
    const searchInput = document.getElementById('product-search');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const query = this.value.toLowerCase().trim();
                searchProducts(query);
            }, 300);
        });
    }
}

function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    
    updateProductCount();
}

// ===== PRODUCT WISHLIST (Future Enhancement) =====
function initProductWishlist() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            toggleWishlist(productId, this);
        });
    });
}

function toggleWishlist(productId, button) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        button.classList.remove('wishlisted');
        button.innerHTML = '♡';
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        button.classList.add('wishlisted');
        button.innerHTML = '♥';
        showNotification('Added to wishlist', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// ===== PRODUCT QUICK VIEW (Future Enhancement) =====
function initProductQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            openQuickView(productId);
        });
    });
}

function openQuickView(productId) {
    // This would open a modal with product details
    console.log('Opening quick view for product:', productId);
}

// ===== PRODUCT ANALYTICS =====
function trackProductView(productId, productName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_item', {
            item_id: productId,
            item_name: productName
        });
    }
}

function trackAddToCart(productId, productName, price) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'add_to_cart', {
            item_id: productId,
            item_name: productName,
            value: price
        });
    }
}

// ===== PRODUCT IMAGE LAZY LOADING =====
function initProductImageLazyLoading() {
    const productImages = document.querySelectorAll('.product-image img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    productImages.forEach(img => imageObserver.observe(img));
}

// ===== PRODUCT PRICE FORMATTING =====
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// ===== PRODUCT AVAILABILITY =====
function checkProductAvailability(productId) {
    // This would typically check against an API
    // For now, we'll simulate availability
    return Math.random() > 0.1; // 90% chance of being available
}

function updateProductAvailability(productId, isAvailable) {
    const productCard = document.querySelector(`[data-item-id="${productId}"]`).closest('.product-card');
    const addToCartBtn = productCard.querySelector('.snipcart-add-item');
    
    if (!isAvailable) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'Out of Stock';
        addToCartBtn.classList.add('disabled');
    } else {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.remove('disabled');
    }
}

// ===== PRODUCT RECOMMENDATIONS (Future Enhancement) =====
function loadProductRecommendations() {
    // This would load recommended products based on current product or user behavior
    console.log('Loading product recommendations...');
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for search
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

// Show notification (reuse from main.js)
function showNotification(message, type = 'info') {
    if (window.AshleyFields && window.AshleyFields.showNotification) {
        window.AshleyFields.showNotification(message, type);
    } else {
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

// Export functions for global use
window.ProductsPage = {
    sortProducts,
    filterProducts,
    searchProducts,
    toggleWishlist,
    trackProductView,
    trackAddToCart,
    formatPrice,
    checkProductAvailability,
    updateProductAvailability
}; 