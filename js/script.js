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

  // Create unique ID using id + weight to support multiple weights
  const uniqueId = `${product.id}-${product.weight}`;

  const existingProduct = cart.find(item => item.id === uniqueId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    product.id = uniqueId; // override ID with unique ID
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();

  alert(`${product.name} (${product.weight}g) has been added to your cart!`);
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const buttons = document.querySelectorAll('.add-to-cart-btn');
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      const card = event.target.closest('.card');
      const originalId = card.getAttribute('data-id');
      const name = card.getAttribute('data-name');
      const weightSelect = card.querySelector('.product-weight');
      const selectedOption = weightSelect.options[weightSelect.selectedIndex];
      const weight = selectedOption.value;
      const price = parseFloat(selectedOption.dataset.price);

      if (!originalId || !name || !weight || isNaN(price)) {
        alert("Error: Missing product information.");
        return;
      }

      const product = {
        id: originalId,
        name,
        weight,
        price
      };

      addToCart(product);
    });
  });
});
