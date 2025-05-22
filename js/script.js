<script>
  // Confirm JS loaded
  console.log("Boomis Homemade Masala website loaded!");

  // Update cart item count in the cart button
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) {
      countElement.textContent = count;
    }
  }

  // Add a product to the cart
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if same product with same weight already in cart
    const existingProduct = cart.find(item => item.id === product.id && item.weight === product.weight);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Feedback to user
    alert(`${product.name} (${product.weight}) has been added to your cart!`);
  }

  // Initialize after DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Attach click event to all .add-to-cart-btn buttons
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        const card = event.target.closest('.card');

        // Read selected weight and corresponding price
        const weightSelect = card.querySelector('.product-weight');
        let weight = '100g';
        let price = parseFloat(card.getAttribute('data-price'));

        if (weightSelect) {
          const selectedOption = weightSelect.selectedOptions[0];
          weight = selectedOption.value + 'g';
          price = parseFloat(selectedOption.getAttribute('data-price'));
        }

        // Read other product info from data attributes
        const product = {
          id: card.getAttribute('data-id'),
          name: card.getAttribute('data-name'),
          price: price,
          weight: weight
        };

        // Add product to cart
        addToCart(product);
      });
    });
  });
</script>
