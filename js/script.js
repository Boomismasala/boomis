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

  // Check if product (with same ID and weight) already in cart
  const existingProduct = cart.find(item => item.id === product.id && item.weight === product.weight);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  // Save updated cart
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} (${product.weight}g) has been added to your cart!`);
}

// Initialize after DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

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
