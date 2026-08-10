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

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Tu carrito está vacío.</p>`;
    cartCount.textContent = '0';
    cartSubtotal.textContent = '$0.00';
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
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  openCart();
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
