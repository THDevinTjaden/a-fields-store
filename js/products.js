// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Product filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const productsGrid = document.getElementById('products-grid');
    
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                filterProducts(category);
            });
        });
    }
    
    function filterProducts(category) {
        // Add loading state
        if (productsGrid) {
            productsGrid.classList.add('loading');
        }
        
        setTimeout(() => {
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
            
            // Remove loading state
            if (productsGrid) {
                productsGrid.classList.remove('loading');
            }
            
            // Check if no products are shown
            const visibleProducts = document.querySelectorAll('.product-card:not(.hidden)');
            showNoResults(visibleProducts.length === 0);
        }, 300);
    }
    
    function showNoResults(show) {
        let noResults = document.querySelector('.no-results');
        
        if (show) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <h3>No products found</h3>
                    <p>Try selecting a different category or check back later for new items.</p>
                `;
                if (productsGrid) {
                    productsGrid.appendChild(noResults);
                }
            }
        } else {
            if (noResults) {
                noResults.remove();
            }
        }
    }
    
    // Product quick view functionality (future enhancement)
    function initializeQuickView() {
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product-id');
                openQuickView(productId);
            });
        });
    }
    
    function openQuickView(productId) {
        // This would be implemented with actual product data
        console.log('Opening quick view for product:', productId);
        
        // Create quick view modal
        const quickView = document.createElement('div');
        quickView.className = 'product-quick-view active';
        quickView.innerHTML = `
            <div class="quick-view-content">
                <button class="quick-view-close">&times;</button>
                <div class="quick-view-body">
                    <h3>Product Quick View</h3>
                    <p>Quick view functionality coming soon!</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(quickView);
        
        // Close functionality
        const closeBtn = quickView.querySelector('.quick-view-close');
        closeBtn.addEventListener('click', () => {
            quickView.classList.remove('active');
            setTimeout(() => {
                quickView.remove();
            }, 300);
        });
        
        // Close on outside click
        quickView.addEventListener('click', (e) => {
            if (e.target === quickView) {
                closeBtn.click();
            }
        });
    }
    
    // Add to cart animations
    function initializeAddToCartAnimations() {
        const addToCartButtons = document.querySelectorAll('.snipcart-add-item');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add success animation
                this.classList.add('success');
                this.textContent = 'Added!';
                
                setTimeout(() => {
                    this.classList.remove('success');
                    this.textContent = 'Add to Cart';
                }, 2000);
            });
        });
    }
    
    // Product image hover effects
    function initializeImageHoverEffects() {
        const productImages = document.querySelectorAll('.product-image');
        
        productImages.forEach(imageContainer => {
            const image = imageContainer.querySelector('img');
            
            if (image) {
                imageContainer.addEventListener('mouseenter', function() {
                    image.style.transform = 'scale(1.05)';
                });
                
                imageContainer.addEventListener('mouseleave', function() {
                    image.style.transform = 'scale(1)';
                });
            }
        });
    }
    
    // Lazy loading for product images
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('.product-image img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Product search functionality (if needed)
    function initializeSearch() {
        const searchInput = document.querySelector('.product-search');
        
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function() {
                const searchTerm = this.value.toLowerCase();
                searchProducts(searchTerm);
            }, 300));
        }
    }
    
    function searchProducts(searchTerm) {
        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Product sorting functionality
    function initializeSorting() {
        const sortSelect = document.querySelector('.product-sort');
        
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                const sortBy = this.value;
                sortProducts(sortBy);
            });
        }
    }
    
    function sortProducts(sortBy) {
        const productsArray = Array.from(productCards);
        
        productsArray.sort((a, b) => {
            let aValue, bValue;
            
            switch (sortBy) {
                case 'price-low':
                    aValue = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                    bValue = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                    return aValue - bValue;
                    
                case 'price-high':
                    aValue = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                    bValue = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                    return bValue - aValue;
                    
                case 'name':
                    aValue = a.querySelector('.product-title').textContent;
                    bValue = b.querySelector('.product-title').textContent;
                    return aValue.localeCompare(bValue);
                    
                default:
                    return 0;
            }
        });
        
        // Reorder products in DOM
        productsArray.forEach(product => {
            if (productsGrid) {
                productsGrid.appendChild(product);
            }
        });
    }
    
    // Initialize all functionality
    initializeAddToCartAnimations();
    initializeImageHoverEffects();
    initializeLazyLoading();
    initializeSearch();
    initializeSorting();
    initializeQuickView();
    
    // Add CSS for additional product functionality
    const productStyles = `
        .snipcart-add-item.success {
            background-color: #27ae60 !important;
            transform: scale(1.05);
        }
        
        .product-card {
            transition: all 0.3s ease;
        }
        
        .product-card.hidden {
            opacity: 0;
            transform: scale(0.8);
            pointer-events: none;
        }
        
        .products-grid.loading {
            opacity: 0.6;
            pointer-events: none;
        }
        
        .product-search {
            width: 100%;
            max-width: 300px;
            padding: 0.75rem;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            font-size: 1rem;
            margin-bottom: var(--spacing-lg);
        }
        
        .product-search:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        
        .product-sort {
            padding: 0.5rem;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            background-color: var(--white);
            font-size: 1rem;
            margin-bottom: var(--spacing-lg);
        }
        
        .product-sort:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        
        .filter-btn {
            position: relative;
            overflow: hidden;
        }
        
        .filter-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .filter-btn:hover::before {
            left: 100%;
        }
        
        @media (max-width: 768px) {
            .product-search,
            .product-sort {
                width: 100%;
                max-width: none;
            }
        }
    `;
    
    // Inject product-specific styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = productStyles;
    document.head.appendChild(styleSheet);
});

// Utility function for debouncing
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