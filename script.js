const meals = [
  {
    id: 1,
    name: "Jollof Rice",
    description: "Aromatic rice cooked in tomato and pepper sauce with spices, served with plantains.",
    price: 3000,
    image: "image10.jpg",
  },
  {
    id: 2,
    name: "Egusi Soup",
    description: "Melon seed soup with assorted meats and vegetables, served with pounded yam.",
    price: 2800,
    image: "images11.jpg"
  },
  {
    id: 3,
    name: "Suya Skewers",
    description: "Grilled spicy beef skewers with peanut rub, served with onions and tomatoes.",
    price: 2200,
    image: "suya.jpg"
  },
  {
    id: 4,
    name: "Pepper Soup",
    description: "Spicy assoted meat broth infused with traditional herbs ans spicies, served.",
    price: 2000,
    image: "peppersoup.jpg",
  },
  {
  id: 5,
  name: "Efo Riro",
  description: " Smooth pounded yam servesd with flavorful vegetable stew packed with assoted meats and fish.",
  price: 3500,
  image: "eforiro.jpg",
},
{
  id: 6,
  name: "Akara and Pap",
  description: "Traditional been cakes served with fermented corn pudding, a classic Nigerian breakfast.",
  price: 2500,
  image: "akara.jpg",
},
];

let cart = [];

function renderMenuItems() {
  const container = document.getElementById('menu-items');
  container.innerHTML = '';
  meals.forEach(meal => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <div class="menu-img">
        <img src="${meal.image}" alt="${meal.name}" width="100" height="100">
        <div class="price-tag">₦${meal.price.toFixed(2)}</div>
      </div>
      <div class="item-details">
        <h3 class="item-title">${meal.name}</h3>
        <p class="item-desc">${meal.description}</p>
        <button class="add-btn" data-id="${meal.id}">
          <i class="fas fa-plus"></i> Add to Plate
        </button>
      </div>
    `;
    div.querySelector('.add-btn').addEventListener('click', () => addToCart(meal.id));
    container.appendChild(div);
  });
}

function addToCart(id) {
  const meal = meals.find(m => m.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...meal, quantity: 1 });
  }
  updateCart();
  showToast();
}

function updateCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart">Add some delicious meal!</div>';
    document.getElementById('total').textContent = '0.00';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="item-name">${item.name}</div>
      <div class="quantity-controls">
        <button class="quantity-btn" data-id="${item.id}" data-change="-1">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" data-id="${item.id}" data-change="1">+</button>
      </div>
      <div class="item-price">₦${(item.price * item.quantity).toFixed(2)}</div>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const change = parseInt(btn.dataset.change);
      const item = cart.find(i => i.id === id);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
          cart = cart.filter(i => i.id !== id);
        }
        updateCart();
      }
    });
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('total').textContent = total.toFixed(2);
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.style.display = 'block';
  setTimeout(() => (toast.style.display = 'none'), 2000);
}

document.getElementById('submit-order').addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your plate is empty!");
    return;
  }
  document.getElementById('success-modal').style.display = 'block';
  cart = [];
  updateCart();
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('success-modal').style.display = 'none';
});

document.getElementById('print-order').addEventListener('click', () => {
  window.print();
});

// Run after DOM loads
renderMenuItems();
