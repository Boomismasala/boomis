// Confirm JS is loaded
console.log("Boomis Homemade Masala - script.js loaded");

// Update cart count in the cart button
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = count;
  }
}

// Add product to cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === product.id && item.weight === product.weight);
  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} (${product.weight}g) has been added to your cart!`);
}

// Load cart items on cart page
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalContainer.textContent = '';
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement('div');
    row.classList.add('cart-item');
    row.innerHTML = `
      <strong>${item.name} (${item.weight}g)</strong><br/>
      ₹${item.price} x 
      <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
      ${item.quantity}
      <button class="qty-btn" data-index="${index}" data-action="increase">+</button> =
      ₹${itemTotal}
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartContainer.appendChild(row);
  });

  totalContainer.textContent = `Total: ₹${total}`;
}

// Handle quantity adjustments and removal
function attachCartEvents() {
  document.addEventListener('click', (e) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
    }

    if (e.target.classList.contains('qty-btn')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      const action = e.target.getAttribute('data-action');
      if (action === 'increase') {
        cart[index].quantity += 1;
      } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  });
}

// Place Order logic
function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Simple checkout example
  alert("Thank you! Your order has been placed.");
  localStorage.removeItem('cart');
  updateCartCount();
  renderCart();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const cartItems = document.getElementById('cart-items');
  if (cartItems) {
    renderCart();
    attachCartEvents();
  }

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }

  // Add to Cart logic for product cards
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      const id = card.getAttribute('data-id');
      const name = card.getAttribute('data-name');
      const weightSelect = card.querySelector('.product-weight');
      const selectedOption = weightSelect.options[weightSelect.selectedIndex];
      const weight = selectedOption.value;
      const price = parseFloat(selectedOption.dataset.price);

      if (!id || !name || !weight || isNaN(price)) {
        alert("Error: Missing product information.");
        return;
      }

      const product = { id, name, weight, price };
      addToCart(product);
    });
  });
});
