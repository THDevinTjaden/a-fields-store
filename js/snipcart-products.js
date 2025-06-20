// ===== SNIPCART PRODUCTS MANAGEMENT =====
// Dynamic product loading and stock management for Ashley Fields

class SnipcartProducts {
    constructor() {
        this.products = [];
        this.categories = [];
        this.isLoading = false;
        this.apiKey = 'MmNmYmQzNmUtY2E3MC00NjgxLWI0M2MtMGU3OGQ3YmRiYWRhNjM4ODYwNTY1ODUxOTM0NzYx';
        this.baseUrl = 'https://app.snipcart.com/api';
        this.useLocalData = false; // Set to false when you have server-side proxy
    }

    // Initialize products system
    async init() {
        try {
            await this.loadProducts();
            this.renderProducts();
            this.initProductControls();
        } catch (error) {
            console.error('Error initializing products:', error);
            this.showFallbackProducts();
        }
    }

    // Load products from Snipcart API or local data
    async loadProducts() {
        this.isLoading = true;
        this.showLoadingState();

        try {
            if (this.useLocalData) {
                // Use local products for development
                this.loadLocalProducts();
                console.log('Using local products for development');
            } else {
                // Try to load from Snipcart API
                await this.loadFromSnipcartAPI();
            }
            
            console.log('Products loaded:', this.products.length);
            
        } catch (error) {
            console.error('Error loading products:', error);
            console.log('Falling back to local products');
            this.loadLocalProducts();
        } finally {
            this.isLoading = false;
            this.hideLoadingState();
        }
    }

    // Load products from Snipcart API
    async loadFromSnipcartAPI() {
        try {
            // Use a CORS proxy to bypass browser restrictions
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const apiUrl = `${this.baseUrl}/products`;
            
            const response = await fetch(proxyUrl + apiUrl, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Accept': 'application/json',
                    'Origin': window.location.origin
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                this.products = data.items.map(item => this.mapSnipcartProduct(item));
                this.categories = [...new Set(this.products.map(product => product.category))].filter(Boolean);
                console.log('Successfully loaded products from Snipcart API');
            } else {
                throw new Error('No products found in Snipcart');
            }
            
        } catch (error) {
            console.error('Failed to load from Snipcart API:', error);
            throw error;
        }
    }

    // Map Snipcart product data to our format
    mapSnipcartProduct(snipcartItem) {
        return {
            id: snipcartItem.id,
            name: snipcartItem.name,
            description: snipcartItem.description || snipcartItem.name,
            price: parseFloat(snipcartItem.price),
            image: snipcartItem.image || './assets/images/placeholder.svg',
            category: snipcartItem.category || 'uncategorized',
            stock: snipcartItem.stock || 0,
            url: snipcartItem.url || window.location.href,
            metadata: snipcartItem.metadata || {}
        };
    }

    // Load local products (fallback and development)
    loadLocalProducts() {
        this.products = [
            {
                id: 'candle-set-001',
                name: 'Premium Candle Set',
                description: 'Handcrafted soy candles with natural fragrances. Perfect for creating a cozy atmosphere.',
                price: 24.99,
                image: './assets/images/placeholder.svg',
                category: 'home',
                stock: 15,
                url: window.location.href
            },
            {
                id: 'tea-collection-002',
                name: 'Organic Tea Collection',
                description: 'Premium organic teas sourced from the finest gardens. Relaxation in every cup.',
                price: 19.99,
                image: './assets/images/placeholder.svg',
                category: 'beverages',
                stock: 25,
                url: window.location.href
            },
            {
                id: 'bamboo-kitchen-003',
                name: 'Bamboo Kitchen Set',
                description: 'Eco-friendly bamboo kitchen utensils. Sustainable and beautiful for your home.',
                price: 34.99,
                image: './assets/images/placeholder.svg',
                category: 'kitchen',
                stock: 8,
                url: window.location.href
            },
            {
                id: 'linen-blanket-004',
                name: 'Linen Throw Blanket',
                description: 'Soft, breathable linen throw blanket. Perfect for cozy evenings and home decor.',
                price: 49.99,
                image: './assets/images/placeholder.svg',
                category: 'home',
                stock: 12,
                url: window.location.href
            },
            {
                id: 'diffuser-005',
                name: 'Essential Oil Diffuser',
                description: 'Aromatherapy diffuser with LED mood lighting. Create a peaceful atmosphere.',
                price: 29.99,
                image: './assets/images/placeholder.svg',
                category: 'wellness',
                stock: 20,
                url: window.location.href
            },
            {
                id: 'mug-set-006',
                name: 'Ceramic Coffee Mug Set',
                description: 'Handcrafted ceramic mugs with beautiful designs. Perfect for your morning coffee.',
                price: 39.99,
                image: './assets/images/placeholder.svg',
                category: 'kitchen',
                stock: 18,
                url: window.location.href
            },
            {
                id: 'yoga-mat-007',
                name: 'Yoga Mat & Strap',
                description: 'Non-slip yoga mat with carrying strap. Perfect for home workouts and meditation.',
                price: 44.99,
                image: './assets/images/placeholder.svg',
                category: 'wellness',
                stock: 22,
                url: window.location.href
            },
            {
                id: 'wall-art-008',
                name: 'Wall Art Print Set',
                description: 'Minimalist wall art prints. Add style and personality to your space.',
                price: 54.99,
                image: './assets/images/placeholder.svg',
                category: 'home',
                stock: 5,
                url: window.location.href
            },
            {
                id: 'tea-infuser-009',
                name: 'Herbal Tea Infuser',
                description: 'Stainless steel tea infuser with loose leaf tea sampler. Perfect for tea lovers.',
                price: 27.99,
                image: './assets/images/placeholder.svg',
                category: 'beverages',
                stock: 30,
                url: window.location.href
            },
            {
                id: 'skillet-010',
                name: 'Cast Iron Skillet',
                description: 'Pre-seasoned cast iron skillet. Versatile cooking for any meal.',
                price: 64.99,
                image: './assets/images/placeholder.svg',
                category: 'kitchen',
                stock: 3,
                url: window.location.href
            },
            {
                id: 'meditation-cushion-011',
                name: 'Meditation Cushion Set',
                description: 'Comfortable meditation cushions with storage bag. Perfect for mindfulness practice.',
                price: 34.99,
                image: './assets/images/placeholder.svg',
                category: 'wellness',
                stock: 0,
                url: window.location.href
            },
            {
                id: 'table-lamp-012',
                name: 'Table Lamp',
                description: 'Modern table lamp with adjustable brightness. Perfect for reading and ambiance.',
                price: 74.99,
                image: './assets/images/placeholder.svg',
                category: 'home',
                stock: 7,
                url: window.location.href
            }
        ];
        
        this.categories = [...new Set(this.products.map(product => product.category))];
    }

    // Render products to the page
    renderProducts(productsToRender = null) {
        const productsGrid = document.getElementById('products-grid');
        const featuredProductsGrid = document.querySelector('.featured-products .products-grid');
        
        if (!productsGrid && !featuredProductsGrid) {
            console.warn('No products grid found on this page');
            return;
        }

        const products = productsToRender || this.products;
        const html = products.map(product => this.createProductCard(product)).join('');

        if (productsGrid) {
            productsGrid.innerHTML = html;
        }

        if (featuredProductsGrid) {
            // Show only first 3 products on home page
            const featuredProducts = products.slice(0, 3);
            const featuredHtml = featuredProducts.map(product => this.createProductCard(product)).join('');
            featuredProductsGrid.innerHTML = featuredHtml;
        }

        // Update product count
        this.updateProductCount(products.length);
        
        // Reinitialize product interactions
        this.initProductInteractions();
    }

    // Create product card HTML
    createProductCard(product) {
        const stockStatus = this.getStockStatus(product.stock);
        const stockClass = this.getStockClass(product.stock);
        
        return `
            <div class="product-card" data-category="${product.category || 'uncategorized'}" data-price="${product.price}" data-stock="${product.stock}">
                <div class="product-image">
                    ${product.image && product.image !== './assets/images/placeholder.svg' ? 
                        `<img src="${product.image}" alt="${product.name}" loading="lazy">` :
                        `<div class="product-placeholder">
                            <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
                                <rect width="300" height="200" fill="#f8f9fa"/>
                                <rect x="50" y="50" width="200" height="100" fill="#e9ecef" stroke="#dee2e6" stroke-width="1"/>
                                <text x="150" y="105" text-anchor="middle" fill="#6c757d" font-size="14">${product.name}</text>
                            </svg>
                        </div>`
                    }
                    <div class="stock-badge ${stockClass}">${stockStatus}</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-stock">
                        <span class="stock-text ${stockClass}">
                            ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>
                    ${product.stock > 0 ? 
                        `<button class="btn btn-primary snipcart-add-item"
                                data-item-id="${product.id}"
                                data-item-price="${product.price}"
                                data-item-url="${product.url}"
                                data-item-description="${product.description}"
                                data-item-name="${product.name}"
                                data-item-image="${product.image || ''}">
                            Add to Cart
                        </button>` :
                        `<button class="btn btn-secondary" disabled>
                            Out of Stock
                        </button>`
                    }
                </div>
            </div>
        `;
    }

    // Get stock status text
    getStockStatus(stock) {
        if (stock <= 0) return 'Out of Stock';
        if (stock <= 5) return 'Low Stock';
        if (stock <= 10) return 'Limited';
        return 'In Stock';
    }

    // Get stock status CSS class
    getStockClass(stock) {
        if (stock <= 0) return 'out-of-stock';
        if (stock <= 5) return 'low-stock';
        if (stock <= 10) return 'limited-stock';
        return 'in-stock';
    }

    // Initialize product controls (sorting, filtering)
    initProductControls() {
        this.initSorting();
        this.initFiltering();
        this.initSearch();
    }

    // Initialize sorting functionality
    initSorting() {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
            });
        }
    }

    // Sort products
    sortProducts(sortType) {
        let sortedProducts = [...this.products];

        switch (sortType) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'stock':
                sortedProducts.sort((a, b) => b.stock - a.stock);
                break;
            case 'featured':
            default:
                // Keep original order
                break;
        }

        this.renderProducts(sortedProducts);
    }

    // Initialize filtering functionality
    initFiltering() {
        // Add category filter buttons if categories exist
        if (this.categories.length > 0) {
            this.createCategoryFilters();
        }
    }

    // Create category filter buttons
    createCategoryFilters() {
        const productsControls = document.querySelector('.products-controls');
        if (!productsControls) return;

        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-filters';
        filterContainer.innerHTML = `
            <div class="filter-buttons">
                <button class="filter-btn active" data-category="all">All</button>
                ${this.categories.map(category => 
                    `<button class="filter-btn" data-category="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</button>`
                ).join('')}
            </div>
        `;

        productsControls.appendChild(filterContainer);

        // Add event listeners
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterProducts(category);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    // Filter products by category
    filterProducts(category) {
        const filteredProducts = category === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === category);
        
        this.renderProducts(filteredProducts);
    }

    // Initialize search functionality
    initSearch() {
        const searchInput = document.getElementById('product-search');
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                
                searchTimeout = setTimeout(() => {
                    const query = e.target.value.toLowerCase().trim();
                    this.searchProducts(query);
                }, 300);
            });
        }
    }

    // Search products
    searchProducts(query) {
        if (!query) {
            this.renderProducts();
            return;
        }

        const searchResults = this.products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        this.renderProducts(searchResults);
    }

    // Initialize product interactions
    initProductInteractions() {
        // Reinitialize Snipcart add to cart buttons
        this.initSnipcartButtons();
        
        // Add product view tracking
        this.trackProductViews();
    }

    // Initialize Snipcart buttons
    initSnipcartButtons() {
        const addToCartButtons = document.querySelectorAll('.snipcart-add-item');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.itemId;
                const product = this.products.find(p => p.id === productId);
                
                if (product) {
                    this.trackAddToCart(product);
                }
            });
        });
    }

    // Track product views
    trackProductViews() {
        const productCards = document.querySelectorAll('.product-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const productId = entry.target.querySelector('.snipcart-add-item')?.dataset.itemId;
                    if (productId) {
                        const product = this.products.find(p => p.id === productId);
                        if (product) {
                            this.trackProductView(product);
                        }
                    }
                }
            });
        });

        productCards.forEach(card => observer.observe(card));
    }

    // Update product count display
    updateProductCount(count) {
        const countElement = document.getElementById('products-count');
        if (countElement) {
            countElement.textContent = count;
        }
    }

    // Show loading state
    showLoadingState() {
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="loading-products">
                    <div class="loading-spinner"></div>
                    <p>Loading products...</p>
                </div>
            `;
        }
    }

    // Hide loading state
    hideLoadingState() {
        const loadingElement = document.querySelector('.loading-products');
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    // Show fallback products if API fails
    showFallbackProducts() {
        console.log('Showing fallback products');
        this.loadLocalProducts();
        this.renderProducts();
    }

    // Analytics tracking
    trackProductView(product) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_item', {
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                value: product.price
            });
        }
    }

    trackAddToCart(product) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'add_to_cart', {
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                value: product.price
            });
        }
    }
}

// ===== GLOBAL INITIALIZATION =====
let snipcartProducts;

document.addEventListener('DOMContentLoaded', function() {
    snipcartProducts = new SnipcartProducts();
    snipcartProducts.init();
});

// Export for global use
window.SnipcartProducts = SnipcartProducts; 