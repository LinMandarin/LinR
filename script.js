document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".favorite").forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
        });
    });
});
// Load cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add an item to the cart
function addToCart(id, name, price, description, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            description: description,
            quantity: 1,
            image: image // Сохраняем изображение товара
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Обновляем localStorage
    
    updateCartCount();
    showSuccessMessage();
}

// Function to update cart count in the header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Function to show success message when adding an item
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.classList.add('show');
    
    setTimeout(() => {
        message.classList.remove('show');
    }, 2000);
}

// Navigate to cart page
function goToCart() {
    window.location.href = './cart.html';
}

// Toggle favorite button
function toggleFavorite(button) {
    button.classList.toggle('active');
}

// Initialize market page when loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', function() {
            const item = this.closest('.item');
            const id = parseInt(item.dataset.id);
            const name = item.dataset.name;
            const price = parseInt(item.dataset.price);
            const description = item.dataset.description;
            const image = item.querySelector('img').src; // Получаем изображение

            addToCart(id, name, price, description, image);
        });
    });
});

