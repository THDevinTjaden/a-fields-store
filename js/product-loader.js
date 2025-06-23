// Product Loader - Dynamically loads products from admin interface
class ProductLoader {
    constructor() {
        this.products = this.loadProducts();
        this.init();
    }

    loadProducts() {
        const stored = localStorage.getItem('ashley-fields-products');
        return stored ? JSON.parse(stored) : this.getDefaultProducts();
    }

    getDefaultProducts() {
        return [
            {
                id: 'ceramic-vase-sage',
                name: 'Sage Green Vase',
                price: 45.00,
                category: 'ceramics',
                description: 'Hand-thrown ceramic vase in sage green glaze',
                image: './images/ceramic-vase-1.jpg',
                stock: 5
            },
            {
                id: 'ceramic-mug-1',
                name: 'Artisan Coffee Mug',
                price: 28.00,
                category: 'ceramics',
                description: 'Handcrafted ceramic coffee mug with unique texture',
                image: './images/ceramic-mug-1.jpg',
                stock: 10
            },
            {
                id: 'ceramic-bowl-set',
                name: 'Serving Bowl Set',
                price: 65.00,
                category: 'ceramics',
                description: 'Set of 3 hand-thrown ceramic serving bowls',
                image: './images/ceramic-bowl-1.jpg',
                stock: 3
            },
            {
                id: 'scarf-wool-1',
                name: 'Merino Wool Scarf',
                price: 35.00,
                category: 'textiles',
                description: 'Luxurious handwoven scarf in soft merino wool',
                image: './images/scarf-wool-1.jpg',
                stock: 8
            },
            {
                id: 'throw-blanket-1',
                name: 'Cozy Throw Blanket',
                price: 85.00,
                category: 'textiles',
                description: 'Hand-knitted throw blanket in chunky yarn',
                image: './images/throw-blanket-1.jpg',
                stock: 4
            },
            {
                id: 'pillow-cover-1',
                name: 'Embroidered Pillow Cover',
                price: 42.00,
                category: 'textiles',
                description: 'Hand-embroidered pillow cover with floral design',
                image: './images/pillow-cover-1.jpg',
                stock: 6
            },
            {
                id: 'candle-lavender',
                name: 'Lavender Fields Candle',
                price: 28.00,
                category: 'candles',
                description: 'Natural soy wax candle with lavender essential oils',
                image: './images/candle-lavender.jpg',
                stock: 15
            },
            {
                id: 'candle-vanilla',
                name: 'Vanilla Bean Candle',
                price: 28.00,
                category: 'candles',
                description: 'Natural soy wax candle with vanilla bean scent',
                image: './images/candle-vanilla.jpg',
                stock: 12
            },
            {
                id: 'candle-citrus',
                name: 'Citrus Grove Candle',
                price: 28.00,
                category: 'candles',
                description: 'Natural soy wax candle with citrus essential oils',
                image: './images/candle-citrus.jpg',
                stock: 10
            },
            {
                id: 'necklace-1',
                name: 'Handcrafted Necklace',
                price: 55.00,
                category: 'jewelry',
                description: 'Unique handcrafted necklace with natural stones',
                image: './images/necklace-1.jpg',
                stock: 7
            },
            {
                id: 'earrings-1',
                name: 'Artisan Earrings',
                price: 32.00,
                category: 'jewelry',
                description: 'Handcrafted earrings with delicate design',
                image: './images/earrings-1.jpg',
                stock: 9
            },
            {
                id: 'bracelet-1',
                name: 'Handwoven Bracelet',
                price: 25.00,
                category: 'jewelry',
                description: 'Handwoven bracelet with natural materials',
                image: './images/bracelet-1.jpg',
                stock: 11
            }
        ];
    }

    init() {
        this.renderProducts();
        this.setupFiltering();
    }

    renderProducts(filterCategory = 'all') {
        const container = document.getElementById('products-grid');
        if (!container) return;

        const filteredProducts = filterCategory === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === filterCategory);

        if (filteredProducts.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <h3>No products found</h3>
                    <p>Try selecting a different category or check back later for new items.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='./images/product-placeholder.jpg'">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    ${product.stock > 0 ? `
                        <button class="snipcart-add-item btn btn-primary"
                                data-item-id="${product.id}"
                                data-item-name="${product.name}"
                                data-item-price="${product.price.toFixed(2)}"
                                data-item-url="https://thdevintjaden.github.io/a-fields-store/products.html"
                                data-item-description="${product.description}">
                            Add to Cart
                        </button>
                    ` : `
                        <button class="btn btn-secondary" disabled>
                            Out of Stock
                        </button>
                    `}
                </div>
            </div>
        `).join('');
    }

    setupFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter products
                const category = button.dataset.category;
                this.renderProducts(category);
            });
        });
    }

    // Method to refresh products (useful after admin updates)
    refreshProducts() {
        this.products = this.loadProducts();
        this.renderProducts();
    }
}

// Initialize product loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.productLoader = new ProductLoader();
}); 