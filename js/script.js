// Placeholder for future scripts such as cart logic, interactivity
console.log("Boomis Homemade Masala website loaded!");
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}
