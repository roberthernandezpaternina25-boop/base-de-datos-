const productList = document.getElementById('product-list');
const filters = document.querySelectorAll('.filter-btn');
const openCartButton = document.getElementById('open-cart');
const closeCartButton = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartPanel = document.getElementById('cart-panel');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const heroRegister = document.getElementById('hero-register');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const saveCartButton = document.getElementById('save-cart-btn');
const cartSaveMessage = document.getElementById('cart-save-message');

const products = [
  {
    id: 1,
    category: 'women',
    title: 'Camiseta Oversize Beige',
    price: 48,
    description: 'Corte relajado y tejido suave para uso diario.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    category: 'women',
    title: 'Jeans tiro alto',
    price: 62,
    description: 'Jeans modernos con lavados suaves y costuras definidas.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    category: 'men',
    title: 'Sudadera Street',
    price: 55,
    description: 'Sudadera ligera con capucha y logo minimalista.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    category: 'men',
    title: 'Pantalón cargo negro',
    price: 69,
    description: 'Cargo funcional con silueta urbana y múltiples bolsillos.',
    image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    category: 'accesorios',
    title: 'Gorra con logo',
    price: 22,
    description: 'Gorra suave con detalle bordado y ajuste trasero.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    category: 'accesorios',
    title: 'Bolsos crossbody',
    price: 38,
    description: 'Bolso compacto para tu día fuera de casa.',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80'
  }
];

let cart = [];
let isUserLogged = false;

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function renderProducts(list) {
  productList.innerHTML = list.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
      <div>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
      </div>
      <div class="product-footer">
        <span class="price">${formatPrice(product.price)}</span>
        <button class="add-to-cart" type="button" data-id="${product.id}">Agregar</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.id));
    });
  });
}

function filterProducts(category) {
  const filtered = category === 'all'
    ? products
    : products.filter(product => product.category === category);
  renderProducts(filtered);
}

function updateFilterButtons(selected) {
  filters.forEach(btn => btn.classList.toggle('active', btn.dataset.category === selected));
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    filterProducts(button.dataset.category);
    updateFilterButtons(button.dataset.category);
  });
});

function openCart() {
  cartPanel.classList.add('open');
  cartOverlay.classList.add('active');
}

function closeCart() {
  cartPanel.classList.remove('open');
  cartOverlay.classList.remove('active');
}

function updateCart() {
  cartItemsContainer.innerHTML = '';
  cartSaveMessage.textContent = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Tu carrito está vacío.</p>`;
    cartCount.textContent = '0';
    cartSubtotal.textContent = '$0.00';
    saveCartButton.disabled = true;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartSubtotal.textContent = formatPrice(subtotal);

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" />
      <div class="cart-item-info">
        <span class="cart-item-title">${item.title}</span>
        <span class="cart-item-price">${formatPrice(item.price)}</span>
        <div class="quantity-controls">
          <button type="button" data-action="decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="increase" data-id="${item.id}">+</button>
        </div>
        <button class="remove-item" type="button" data-action="remove" data-id="${item.id}">Eliminar</button>
      </div>
    </div>
  `).join('');

  cartItemsContainer.querySelectorAll('button[data-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const id = Number(button.dataset.id);
      changeCartQuantity(id, action);
    });
  });

  saveCartButton.disabled = !isUserLogged || cart.length === 0;
}

async function fetchCart() {
  try {
    const response = await fetch('/cart', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('No hay usuario conectado');
    }

    const result = await response.json();
    cart = result.cart.map(entry => {
      const product = products.find(item => item.id === entry.product_id);
      return product ? { ...product, quantity: entry.quantity } : null;
    }).filter(Boolean);
    updateCart();
  } catch (error) {
    cart = [];
    updateCart();
  }
}

async function saveCartToServer() {
  if (!isUserLogged) return;

  try {
    const payload = cart.map(item => ({ productId: item.id, quantity: item.quantity }));
    await fetch('/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ cart: payload })
    });
  } catch (error) {
    console.error('Error guardando carrito:', error);
  }
}

function clearCart() {
  cart = [];
  updateCart();
}

async function syncCartAfterLogin() {
  try {
    const response = await fetch('/cart', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('No fue posible cargar el carrito');
    }

    const result = await response.json();
    const mergedQuantities = {};

    cart.forEach(item => {
      mergedQuantities[item.id] = (mergedQuantities[item.id] || 0) + item.quantity;
    });

    result.cart.forEach(entry => {
      mergedQuantities[entry.product_id] = (mergedQuantities[entry.product_id] || 0) + entry.quantity;
    });

    cart = Object.entries(mergedQuantities).map(([productId, quantity]) => {
      const product = products.find(p => p.id === Number(productId));
      return product ? { ...product, quantity } : null;
    }).filter(Boolean);

    await saveCartToServer();
    updateCart();
  } catch (error) {
    console.error('Error sincronizando carrito:', error);
    cart = [];
    updateCart();
  }
}

function setUserLogged(logged) {
  isUserLogged = logged;
  saveCartButton.disabled = !logged || cart.length === 0;
  if (!logged) {
    clearCart();
  }
}

window.clearCart = clearCart;
window.setUserLogged = setUserLogged;
window.syncCartAfterLogin = syncCartAfterLogin;
window.fetchCart = fetchCart;

saveCartButton.addEventListener('click', async () => {
  if (!isUserLogged) {
    cartSaveMessage.textContent = 'Inicia sesión para guardar el carrito.';
    cartSaveMessage.className = 'cart-save-message error';
    return;
  }

  if (cart.length === 0) {
    cartSaveMessage.textContent = 'No hay artículos para guardar.';
    cartSaveMessage.className = 'cart-save-message error';
    return;
  }

  saveCartButton.disabled = true;
  cartSaveMessage.textContent = 'Guardando carrito...';
  cartSaveMessage.className = 'cart-save-message';

  try {
    await saveCartToServer();
    cartSaveMessage.textContent = 'Carrito guardado correctamente.';
    cartSaveMessage.className = 'cart-save-message success';
  } catch (error) {
    cartSaveMessage.textContent = 'Error guardando carrito.';
    cartSaveMessage.className = 'cart-save-message error';
  } finally {
    saveCartButton.disabled = !isUserLogged || cart.length === 0;
  }
});

async function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  openCart();

  if (isUserLogged) {
    await saveCartToServer();
  }
}

function changeCartQuantity(productId, action) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  if (action === 'increase') {
    item.quantity += 1;
  }

  if (action === 'decrease') {
    item.quantity = Math.max(item.quantity - 1, 1);
  }

  if (action === 'remove') {
    cart = cart.filter(i => i.id !== productId);
  }

  updateCart();
  if (isUserLogged) {
    saveCartToServer();
  }
}

openCartButton.addEventListener('click', openCart);
closeCartButton.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
heroRegister.addEventListener('click', () => {
  document.getElementById('open-auth').click();
});

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.classList.toggle('open');
});

renderProducts(products);
