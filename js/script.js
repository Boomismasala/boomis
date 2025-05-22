// Confirm JS is loaded
console.log("Boomis Homemade Masala - script.js loaded");

// Update cart count displayed on cart button
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = count;
  }
}

// Add a product to cart (or increase quantity if already exists)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingIndex = cart.findIndex(item => item.id === product.id && item.weight === product.weight);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} (${product.weight}g) added to cart.`);
}

// Render cart items on cart page
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cartContainer || !totalContainer) return; // Exit if not on cart page

  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalContainer.textContent = '';
    return;
  }

  let total = 0;
  const ul = document.createElement('ul');

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement('li');

    li.innerHTML = `
      <strong>${item.name} (${item.weight}g)</strong><br/>
      ₹${item.price} × 
      <button class="qty-btn" data-index="${index}" data-action="decrease">−</button>
      ${item.quantity}
      <button class="qty-btn" data-index="${index}" data-action="increase">+</button> =
      ₹${itemTotal.toFixed(2)} 
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    ul.appendChild(li);
  });

  cartContainer.appendChild(ul);
  totalContainer.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Attach event listeners for quantity buttons and remove buttons in cart
function attachCartEvents() {
  document.addEventListener('click', (event) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (event.target.classList.contains('remove-btn')) {
      const index = parseInt(event.target.getAttribute('data-index'));
      if (!isNaN(index)) {
        cart.splice(index, 1);
      }
    }

    if (event.target.classList.contains('qty-btn')) {
      const index = parseInt(event.target.getAttribute('data-index'));
      const action = event.target.getAttribute('data-action');

      if (!isNaN(index)) {
        if (action === 'increase') {
          cart[index].quantity += 1;
        } else if (action === 'decrease' && cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        }
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  });
}

// Initialize all scripts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // If on the cart page, render cart and attach events
  if (document.getElementById('cart-items')) {
    renderCart();
    attachCartEvents();
  }

  // Add to Cart button event listeners on product cards (index page)
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;

      const id = card.getAttribute('data-id');
      const name = card.getAttribute('data-name');
      const weight = card.getAttribute('data-weight');
      const price = parseFloat(card.getAttribute('data-price'));

      if (!id || !name || !weight || isNaN(price)) {
        alert('Product info missing or invalid.');
        return;
      }

      const product = { id, name, weight, price };
      addToCart(product);
    });
  });
});
