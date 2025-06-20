// ===== ADMIN PANEL FUNCTIONALITY =====
// Ashley Fields Admin Panel

class AdminPanel {
    constructor() {
        this.apiKey = 'MmNmYmQzNmUtY2E3MC00NjgxLWI0M2MtMGU3OGQ3YmRiYWRhNjM4ODYwNTY1ODUxOTM0NzYx';
        this.baseUrl = 'https://app.snipcart.com/api';
        this.products = [];
    }

    async init() {
        await this.loadProducts();
        this.updateDashboard();
        this.initEventListeners();
    }

    // Load products from Snipcart
    async loadProducts() {
        try {
            const response = await fetch(`${this.baseUrl}/products`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.products = data.items || [];
            console.log('Products loaded:', this.products.length);
            
        } catch (error) {
            console.error('Error loading products:', error);
            // Show fallback data
            this.showFallbackData();
        }
    }

    // Show fallback data if API fails
    showFallbackData() {
        this.products = [
            {
                id: 'candle-set-001',
                name: 'Premium Candle Set',
                description: 'Handcrafted soy candles with natural fragrances.',
                price: 24.99,
                stock: 15,
                category: 'home',
                image: './assets/images/candle-set.jpg'
            },
            {
                id: 'tea-collection-002',
                name: 'Organic Tea Collection',
                description: 'Premium organic teas sourced from the finest gardens.',
                price: 19.99,
                stock: 25,
                category: 'beverages',
                image: './assets/images/tea-collection.jpg'
            }
        ];
    }

    // Update dashboard statistics
    updateDashboard() {
        const totalProducts = this.products.length;
        const lowStock = this.products.filter(p => p.stock > 0 && p.stock <= 5).length;
        const outOfStock = this.products.filter(p => p.stock <= 0).length;
        const categories = [...new Set(this.products.map(p => p.category))].filter(Boolean).length;

        document.getElementById('total-products').textContent = totalProducts;
        document.getElementById('low-stock').textContent = lowStock;
        document.getElementById('out-of-stock').textContent = outOfStock;
        document.getElementById('total-categories').textContent = categories;

        this.updateRecentProducts();
    }

    // Update recent products display
    updateRecentProducts() {
        const recentProductsContainer = document.getElementById('recent-products');
        const recentProducts = this.products.slice(0, 5);

        if (recentProducts.length === 0) {
            recentProductsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }

        const productsHtml = recentProducts.map(product => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-md); border-bottom: 1px solid var(--border-color);">
                <div>
                    <h4 style="margin: 0 0 var(--spacing-xs) 0;">${product.name}</h4>
                    <p style="margin: 0; color: var(--text-secondary); font-size: var(--font-size-sm);">$${product.price} • Stock: ${product.stock}</p>
                </div>
                <div style="display: flex; gap: var(--spacing-sm);">
                    <button class="btn btn-secondary" onclick="editProduct('${product.id}')" style="font-size: var(--font-size-sm); padding: var(--spacing-xs) var(--spacing-sm);">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteProduct('${product.id}')" style="font-size: var(--font-size-sm); padding: var(--spacing-xs) var(--spacing-sm);">Delete</button>
                </div>
            </div>
        `).join('');

        recentProductsContainer.innerHTML = productsHtml;
    }

    // Initialize event listeners
    initEventListeners() {
        const productForm = document.getElementById('product-form');
        if (productForm) {
            productForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addProduct();
            });
        }

        // Navigation
        const navLinks = document.querySelectorAll('.admin-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(e.target.getAttribute('href').substring(1));
            });
        });
    }

    // Navigate between sections
    navigateTo(section) {
        // Hide all sections
        document.querySelectorAll('section').forEach(s => s.style.display = 'none');
        
        // Show target section
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Update navigation
        document.querySelectorAll('.admin-nav a').forEach(link => link.classList.remove('active'));
        document.querySelector(`[href="#${section}"]`).classList.add('active');
    }

    // Add new product
    async addProduct() {
        const form = document.getElementById('product-form');
        const formData = new FormData(form);
        const productData = Object.fromEntries(formData);

        try {
            const response = await fetch(`${this.baseUrl}/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: productData.name,
                    id: productData.id,
                    description: productData.description,
                    price: parseFloat(productData.price),
                    stock: parseInt(productData.stock),
                    category: productData.category,
                    image: productData.image
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showNotification('Product added successfully!', 'success');
            form.reset();
            hideAddProductForm();
            
            // Reload products
            await this.loadProducts();
            this.updateDashboard();
            
        } catch (error) {
            console.error('Error adding product:', error);
            showNotification('Error adding product. Please try again.', 'error');
        }
    }

    // Edit product
    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            showNotification('Product not found.', 'error');
            return;
        }

        // Populate form with product data
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-category').value = product.category || '';
        document.getElementById('product-image').value = product.image || '';

        // Show form
        showAddProductForm();
        
        // Change form to update mode
        const form = document.getElementById('product-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Update Product';
        form.dataset.editMode = 'true';
        form.dataset.editId = productId;
    }

    // Delete product
    async deleteProduct(productId) {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const response = await fetch(`${this.baseUrl}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showNotification('Product deleted successfully!', 'success');
            
            // Reload products
            await this.loadProducts();
            this.updateDashboard();
            
        } catch (error) {
            console.error('Error deleting product:', error);
            showNotification('Error deleting product. Please try again.', 'error');
        }
    }

    // Refresh products
    async refreshProducts() {
        showNotification('Refreshing products...', 'info');
        await this.loadProducts();
        this.updateDashboard();
        showNotification('Products refreshed!', 'success');
    }

    // Export products
    exportProducts() {
        const dataStr = JSON.stringify(this.products, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ashley-fields-products.json';
        link.click();
        
        URL.revokeObjectURL(url);
        showNotification('Products exported successfully!', 'success');
    }
}

// ===== GLOBAL FUNCTIONS =====

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 
                     type === 'error' ? 'var(--error-color)' : 
                     type === 'warning' ? 'var(--warning-color)' : 'var(--secondary-color)'};
        color: white;
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform var(--transition-normal);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Show add product form
function showAddProductForm() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('add-product').style.display = 'block';
}

// Hide add product form
function hideAddProductForm() {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('add-product').style.display = 'none';
    
    // Reset form
    const form = document.getElementById('product-form');
    form.reset();
    form.dataset.editMode = 'false';
    delete form.dataset.editId;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Add Product';
}

// Refresh products
function refreshProducts() {
    if (window.adminPanel) {
        window.adminPanel.refreshProducts();
    }
}

// Export products
function exportProducts() {
    if (window.adminPanel) {
        window.adminPanel.exportProducts();
    }
}

// Edit product
function editProduct(productId) {
    if (window.adminPanel) {
        window.adminPanel.editProduct(productId);
    }
}

// Delete product
function deleteProduct(productId) {
    if (window.adminPanel) {
        window.adminPanel.deleteProduct(productId);
    }
}

// ===== INITIALIZATION =====
let adminPanel;

document.addEventListener('DOMContentLoaded', function() {
    adminPanel = new AdminPanel();
    adminPanel.init();
    window.adminPanel = adminPanel;
}); 