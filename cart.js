// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to remove an item from the cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    updateCartDisplay();
    updateCartCount();
}

// Function to update item quantity in the cart
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
            updateCartDisplay();
            updateCartCount();
        }
    }
}

// Function to update cart count in the header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Format price for display
function formatPrice(price) {
    return price.toLocaleString('uk-UA') + ' ₴';
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100000 ? 0 : 500; // Free shipping over 100k
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
}

// Function to update cart display
function updateCartDisplay() {
    const cartContent = document.getElementById('cartContent');

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add products to your cart to continue shopping</p>
                <button class="continue-shopping" onclick="goToMarket()">Continue Shopping</button>
            </div>
        `;
        return;
    }

    const { subtotal, shipping, total } = calculateTotals();

    cartContent.innerHTML = `
        <div class="cart-content">
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}"> <!-- Теперь изображения отображаются -->
                        </div>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-description">${item.description}</div>
                            <div class="item-price">${formatPrice(item.price)}</div>
                        </div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <div class="quantity-display">${item.quantity}</div>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `).join('')}
            </div>
            
            <div class="cart-summary">
                <div class="summary-title">Total</div>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${formatPrice(total)}</span>
                </div>
                <button class="checkout-btn" onclick="checkout()">Checkout</button>
                <button class="continue-shopping" onclick="goToMarket()">Continue Shopping</button>
            </div>
        </div>
    `;
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    const { total } = calculateTotals();
    alert(`Thank you for your purchase! Total amount: ${formatPrice(total)}`);
    
    // Clear cart after checkout
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cleared cart
    updateCartDisplay();
    updateCartCount();
}

// Navigation functions
function goToHome() {
    window.location.href = './index.html';
}

function goToMarket() {
    window.history.back();
}

// Initialize cart page when loaded
document.addEventListener('DOMContentLoaded', function() {
    cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage
    updateCartDisplay();
    updateCartCount();
});
