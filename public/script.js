const productList = document.getElementById('product-list');
const categoryButtons = document.querySelectorAll('#category-filters .filter-btn');
const subcategoryFilters = document.getElementById('subcategory-filters');
const addProductForm = document.getElementById('add-product-form');
const productCategorySelect = document.getElementById('product-category');
const productSubcategorySelect = document.getElementById('product-subcategory');
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
const imageModal = document.getElementById('image-modal');
const expandedImage = document.getElementById('expanded-image');
const closeImageModalButton = document.getElementById('close-image-modal');
const imageModalBackdrop = document.getElementById('image-modal-backdrop');
const prevImageButton = document.getElementById('prev-image-btn');
const nextImageButton = document.getElementById('next-image-btn');

let currentCategory = 'men';
let currentSubcategory = 'camisetas';

const subcategories = {
  all: [{ id: 'all', label: 'Ver todos' }],
  men: [
    { id: 'all', label: 'Ver todos' },
    { id: 'camisetas', label: 'Camisetas' }
  ],
  women: [
    { id: 'all', label: 'Ver todos' },
    { id: 'camisetas', label: 'Camisetas' },
    { id: 'jeans', label: 'Jeans' }
  ]
};

function updateAddProductSubcategories() {
  if (!productCategorySelect || !productSubcategorySelect) return;

  const gender = productCategorySelect.value;
  const options = subcategories[gender].filter(item => item.id !== 'all');
  productSubcategorySelect.innerHTML = options.map(option => `
    <option value="${option.id}">${option.label}</option>
  `).join('');
}

const products = [
  {
    id: 1,
    gender: 'men',
    subcategory: 'camisetas',
    title: 'Camiseta Oversize',
    price: 95,
    originalPrice: 130,
    description: 'calidad 1.1, gramaje 250.',
    image: 'https://i.ibb.co/mC3Q7BBB/003.jpg'
  },
  {
    id: 2,
    gender: 'men',
    subcategory: 'camisetas',
    title: 'Camiseta Street',
    price: 95,
    originalPrice: 130,
    description: 'calidad 1.1, gramaje 250.',
    image: 'https://i.ibb.co/60s0v4Gf/007.jpg'
  },
  {
    id: 3,
    gender: 'men',
    subcategory: 'camisetas',
    title: 'Camiseta Oversize Negra',
    price: 95,
    originalPrice: 130,
    description: 'calidad 1.1, gramaje 250.',
    image: 'https://i.ibb.co/spB1Sm1Z/002.jpg'
  },
  {
    id: 7,
    gender: 'men',
    subcategory: 'camisetas',
    title: 'Camiseta Minimalista',
    price: 95,
    originalPrice: 130,
    description: 'Diseño sobrio y cómodo para uso diario con estilo contemporáneo.',
    image: 'https://i.ibb.co/8DDz6FqS/001.jpg'
  },
  {
    id: 8,
    gender: 'men',
    subcategory: 'camisetas',
    title: 'Camiseta Básica Premium',
    price: 95,
    originalPrice: 130,
    description: 'Tela suave, resistente y perfecta para combinar con cualquier outfit.',
    image: 'https://i.ibb.co/1fNhn2qh/004.jpg'
  },
  {
    id: 9,
    gender: 'men',
    subcategory: 'camisetas',
    title: 'Camiseta Urbana',
    price: 95,
    originalPrice: 130,
    description: 'Diseño urbano y moderno para destacar en cualquier ocasión.',
    image: 'https://i.ibb.co/jvhwFbK9/006.jpg'
  }
];

let cart = [];
let nextProductId = products.length + 1;
let isUserLogged = false;

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeImageUrl(value = '') {
  if (!value) return '';

  try {
    const parsed = new URL(value, window.location.origin);
    return ['http:', 'https:', 'data:'].includes(parsed.protocol) ? parsed.href : '';
  } catch (error) {
    return '';
  }
}

function formatPrice(value) {
  return Number(value).toFixed(3);
}

let currentImageIndex = 0;
let currentImageSet = [];

function openImageModal(imageSrc) {
  if (!imageModal || !expandedImage) return;

  currentImageSet = products.filter(product => product.image).map(product => product.image);
  currentImageIndex = currentImageSet.indexOf(imageSrc);

  if (currentImageIndex < 0) {
    currentImageIndex = 0;
  }

  expandedImage.src = imageSrc;
  imageModal.classList.add('active');
  imageModal.setAttribute('aria-hidden', 'false');
}

function showNextImage(direction) {
  if (!currentImageSet.length) return;

  currentImageIndex = (currentImageIndex + direction + currentImageSet.length) % currentImageSet.length;
  expandedImage.src = currentImageSet[currentImageIndex];
}

function closeImageModal() {
  if (!imageModal || !expandedImage) return;
  imageModal.classList.remove('active');
  imageModal.setAttribute('aria-hidden', 'true');
  expandedImage.src = '';
  currentImageIndex = 0;
  currentImageSet = [];
}

function renderProducts(list) {
  if (currentCategory === 'women' && (!list || list.length === 0)) {
    productList.innerHTML = `
      <article class="product-card product-card-empty">
        <div class="product-empty-state">
          <div>
            <h3>Próximamente</h3>
            <p>Estamos preparando la colección para damas.</p>
          </div>
        </div>
      </article>
    `;
    return;
  }

  productList.innerHTML = list.map(product => {
    const safeTitle = escapeHtml(product.title ?? '');
    const safeDescription = escapeHtml(product.description ?? '');
    const safeSubcategory = escapeHtml(product.subcategory ?? '');
    const safeImage = sanitizeImageUrl(product.image);
    const whatsappText = encodeURIComponent(`Hola, quiero hacer un pedido de ${safeTitle}`);
    const whatsappUrl = `https://wa.me/573218920417?text=${whatsappText}`;

    return `
    <article class="product-card">
      <img src="${safeImage}" alt="${safeTitle}" loading="lazy" data-image="${safeImage}" />
      <div>
        <h3>${safeTitle}</h3>
        <p>${safeDescription}</p>
        <span class="product-tag">${safeSubcategory}</span>
      </div>
      <div class="product-footer">
        <div class="price-group">
          <span class="price price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-old">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="add-to-cart" type="button" data-id="${product.id}">Agregar</button>
          <a class="whatsapp-btn" href="${whatsappUrl}" target="_blank" rel="noreferrer noopener">Pedir por WhatsApp</a>
        </div>
      </div>
    </article>
  `;
  }).join('');

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.id));
    });
  });

  document.querySelectorAll('.product-card img').forEach(img => {
    img.addEventListener('click', () => {
      openImageModal(img.dataset.image);
    });
  });
}

function getFilteredProducts() {
  const byGender = currentCategory === 'all'
    ? products
    : products.filter(product => product.gender === currentCategory);

  if (currentCategory === 'all' || currentSubcategory === 'all') {
    return byGender;
  }

  return byGender.filter(product => product.subcategory === currentSubcategory);
}

function renderSubcategoryButtons() {
  subcategoryFilters.innerHTML = '';

  if (currentCategory === 'all' || currentCategory === 'women') {
    return;
  }

  subcategories[currentCategory].forEach(subcategory => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-btn ${subcategory.id === currentSubcategory ? 'active' : ''}`;
    button.dataset.subcategory = subcategory.id;
    button.textContent = subcategory.label;
    button.addEventListener('click', () => {
      currentSubcategory = subcategory.id;
      renderSubcategoryButtons();
      renderProducts(getFilteredProducts());
    });
    subcategoryFilters.appendChild(button);
  });
}

function updateCategoryButtons(selected) {
  categoryButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === selected));
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    currentSubcategory = 'all';
    updateCategoryButtons(currentCategory);
    renderSubcategoryButtons();
    renderProducts(getFilteredProducts());
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

function sanitizeText(value = '') {
  return String(value).trim().replace(/\s+/g, ' ');
}

function isValidPositiveNumber(value) {
  return Number.isFinite(Number(value)) && Number(value) > 0;
}

function normalizeCartItem(item) {
  if (!item || typeof item !== 'object') return null;

  const safeId = Number(item.id);
  const safeQuantity = Number(item.quantity);
  const safePrice = Number(item.price);

  if (!Number.isInteger(safeId) || safeId <= 0) return null;
  if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) return null;
  if (!Number.isFinite(safePrice) || safePrice < 0) return null;

  return {
    ...item,
    id: safeId,
    quantity: Math.floor(safeQuantity),
    price: safePrice,
    title: sanitizeText(item.title).slice(0, 120),
    image: sanitizeImageUrl(item.image),
    description: sanitizeText(item.description).slice(0, 250)
  };
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

  const safeCart = cart.map(normalizeCartItem).filter(Boolean);
  cart = safeCart;

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
    const normalized = Array.isArray(result.cart) ? result.cart : [];

    cart = normalized.map(entry => {
      const product = products.find(item => item.id === Number(entry.product_id));
      if (!product) return null;
      return normalizeCartItem({ ...product, quantity: Number(entry.quantity) || 1 });
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
    const payload = cart
      .map(normalizeCartItem)
      .filter(Boolean)
      .map(item => ({ productId: item.id, quantity: Math.max(1, Math.floor(item.quantity)) }));

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
  const productIdNumber = Number(productId);
  const product = products.find(item => item.id === productIdNumber);

  if (!product || !Number.isInteger(productIdNumber) || productIdNumber <= 0) return;

  const existing = cart.find(item => item.id === productIdNumber);

  if (existing) {
    existing.quantity = Math.max(1, existing.quantity + 1);
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  cart = cart.map(normalizeCartItem).filter(Boolean);
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
    item.quantity = Math.max(1, Number(item.quantity) + 1);
  }

  if (action === 'decrease') {
    item.quantity = Math.max(1, Number(item.quantity) - 1);
  }

  if (action === 'remove') {
    cart = cart.filter(i => i.id !== productId);
  }

  cart = cart.map(normalizeCartItem).filter(Boolean);
  updateCart();
  if (isUserLogged) {
    saveCartToServer();
  }
}

openCartButton.addEventListener('click', openCart);
closeCartButton.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
if (closeImageModalButton) {
  closeImageModalButton.addEventListener('click', closeImageModal);
}
if (imageModalBackdrop) {
  imageModalBackdrop.addEventListener('click', closeImageModal);
}
if (prevImageButton) {
  prevImageButton.addEventListener('click', () => showNextImage(-1));
}
if (nextImageButton) {
  nextImageButton.addEventListener('click', () => showNextImage(1));
}
document.addEventListener('keydown', event => {
  if (!imageModal || !imageModal.classList.contains('active')) return;

  if (event.key === 'Escape') {
    closeImageModal();
  }

  if (event.key === 'ArrowLeft') {
    showNextImage(-1);
  }

  if (event.key === 'ArrowRight') {
    showNextImage(1);
  }
});
heroRegister.addEventListener('click', () => {
  document.getElementById('open-auth').click();
});

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.classList.toggle('open');
});

if (addProductForm) {
  addProductForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(addProductForm);
    const title = sanitizeText(formData.get('title'));
    const description = sanitizeText(formData.get('description'));
    const price = Number(formData.get('price'));
    const originalPriceValue = sanitizeText(formData.get('originalPrice'));
    const originalPrice = originalPriceValue ? Number(originalPriceValue) : undefined;
    const gender = sanitizeText(formData.get('gender'));
    const subcategory = sanitizeText(formData.get('subcategory'));
    const image = sanitizeImageUrl(formData.get('image'));

    if (!title || !description || !image || Number.isNaN(price) || price <= 0 || !['men', 'women'].includes(gender)) {
      return;
    }

    if (originalPrice !== undefined && (!Number.isFinite(originalPrice) || originalPrice <= 0)) {
      return;
    }

    const newProduct = {
      id: nextProductId++,
      gender,
      subcategory,
      title: title.slice(0, 120),
      price,
      originalPrice,
      description: description.slice(0, 250),
      image
    };

    products.push(newProduct);
    renderProducts(getFilteredProducts());
    addProductForm.reset();
    updateAddProductSubcategories();
  });
}

if (productCategorySelect) {
  productCategorySelect.addEventListener('change', updateAddProductSubcategories);
}

updateAddProductSubcategories();
renderSubcategoryButtons();
renderProducts(getFilteredProducts());