function switchImage(mainImageId, imageSrc) {
    const mainImage = document.getElementById(mainImageId);
    mainImage.src = imageSrc;
  }

// Global cart object stored in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add items to the cart and update localStorage
function addToCart(name, price, qty) {
  if (!qty || qty <= 0) {
    alert('Please enter a valid quantity.');
    return;
  }

  // Find if the item already exists in the cart
  const existingItemIndex = cart.findIndex(item => item.name === name);
  
  if (existingItemIndex !== -1) {
    // If item exists, update its quantity
    cart[existingItemIndex].qty += parseInt(qty);
  } else {
    // Add new item
    cart.push({ name, price, qty: parseInt(qty) });
  }

  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  alert(`${name} added to the cart!`);
}

// Display cart items on the cart page
function showCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Clear previous content

  let totalPrice = 0;

  cart.forEach(item => {
    const row = document.createElement('tr');

    // Product name
    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    // Quantity
    const qtyCell = document.createElement('td');
    qtyCell.textContent = item.qty;
    row.appendChild(qtyCell);

    // Price
    const priceCell = document.createElement('td');
    priceCell.textContent = `$${item.price}`;
    row.appendChild(priceCell);

    // Total price for this item
    const totalCell = document.createElement('td');
    totalCell.textContent = `$${item.price * item.qty}`;
    row.appendChild(totalCell);

    // Remove button
    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = function () {
      removeCartItem(item.name); // Remove item by name
    };
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    cartItemsContainer.appendChild(row);

    // Update total price
    totalPrice += item.price * item.qty;
  });

  // Update total price in the UI
  document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Remove an item from the cart
function removeCartItem(name) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Remove item by filtering it out
  cart = cart.filter(item => item.name !== name);

  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  showCartItems(); // Re-render cart
}

// Initialize cart display on cart page
if (window.location.pathname.includes('cart.html')) {
  showCartItems();
}
