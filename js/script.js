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

// Add product to cart from product card
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

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.card');
      const id = card.getAttribute('data-id');
      const name = card.getAttribute('data-name');

      const weightSelect = card.querySelector('.product-weight');
      if (!weightSelect) {
        alert('Weight selector missing for this product.');
        return;
      }

      const selectedOption = weightSelect.options[weightSelect.selectedIndex];
      const weight = selectedOption.value;
      const price = parseFloat(selectedOption.dataset.price);

      if (!id || !name || !weight || isNaN(price)) {
        alert('Error: Missing product info.');
        return;
      }

      const product = { id, name, price, weight };
      addToCart(product);
    });
  });
});
