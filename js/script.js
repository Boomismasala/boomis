<script>

// Confirm JS loaded
  console.log("Boomis Homemade Masala website loaded!");

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const counter = document.getElementById('cart-count');
    if (counter) counter.textContent = count;
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', function () {
        const card = this.closest('.card');
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');

        const weightSelect = card.querySelector('.product-weight');
        const weight = weightSelect.value;
        const price = parseFloat(weightSelect.options[weightSelect.selectedIndex].dataset.price);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const index = cart.findIndex(item => item.id === id && item.weight === weight);
        if (index > -1) {
          cart[index].quantity += 1;
        } else {
          cart.push({ id, name, price, weight, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${name} (${weight}) added to cart.`);
      });
    });
  });
</script>
