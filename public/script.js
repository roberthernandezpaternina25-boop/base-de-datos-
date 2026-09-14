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
const goToMainImageButton = document.getElementById('go-to-main-image');

let currentCategory = 'all';
let currentSubcategory = 'all';

const subcategories = {
  all: [{ id: 'all', label: 'Ver todos' }],
  men: [
    { id: 'all', label: 'Ver todos' },
    { id: 'camisetas', label: 'Camisetas' },
    { id: 'pantalones', label: 'Pantalones' }
  ],
  women: [
    { id: 'all', label: 'Ver todos' },
    { id: 'camisetas', label: 'Camisetas' },
    { id: 'pantalones', label: 'Pantalones' }
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
    id: 7,
    gender: 'men',
    subcategory: 'camisetas',
    title: 'Camiseta oversized',
    price: 95,
    originalPrice: 130,
    description: 'algodón peruano de 380 gramos.',
    image: 'https://i.ibb.co/8DDz6FqS/001.jpg',
    images: [
      'https://i.ibb.co/WNhdzt1c/799274692-1637381854717712-7111852111004397740-n.jpg'
    ]
  },
  {
    id: 8,
    gender: 'men',
    subcategory: 'camisetas',
    title: 'camiseta oversized',
    price: 95,
    originalPrice: 130,
    description: 'algodón de 280 gramos.',
    image: 'https://i.ibb.co/1fNhn2qh/004.jpg',
    images: [
      'https://i.ibb.co/mFhHGMMw/798743393-1389075309870774-2475258463961380947-n.jpg'
    ]
  },
  {
    id: 9,
    gender: 'men',
    subcategory: 'camisetas',
    title: 'Camiseta oversize',
    price: 95,
    originalPrice: 130,
    description: 'algodón de 280 gramos.',
    image: 'https://i.ibb.co/b5K9rCRn/790491148-1070161185594037-3353032358359072976-n-1.jpg',
    images: [
      'https://i.ibb.co/VW3yyh70/IMG-0874.jpg',
      'https://i.ibb.co/39ngmWCj/798539383-1016914161393512-3543803847587127013-n.jpg',
       'https://i.ibb.co/bMCZCGWc/IMG-0870.jpg'
    ]
  },
  {
    id: 10,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'baggy oversize',
    price: 125,
    originalPrice: 150,
    description: 'Tela jeans semilicrado, estilo baggy bota ancha .',
    image: 'https://i.ibb.co/HLf8Rxtq/1.jpg',
     
  },
  {id: 11,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'baggy oversize',
    price: 125,
    originalPrice: 150,
    description: 'Tela jeans semilicrado, estilo baggy bota ancha .',
    image: 'https://i.ibb.co/8nJtbCZM/2.jpg',
  },

  {id: 12,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'baggy oversize',
    price: 125,
    originalPrice: 150,
    description: 'Tela jeans semilicrado, estilo baggy bota ancha .',
    image: 'https://i.ibb.co/GQzX1kMJ/e44bdb40-e5cc-4a55-9f75-101bbb713b94.jpg',
  },
  
  {id: 14,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'baggy oversize',
    price: 125,
    originalPrice: 150,
    description: 'Tela jeans semilicrado, estilo baggy bota ancha .',
    image: 'https://i.ibb.co/WpdQXFtV/6fac1f45-bbbd-4877-afe3-a57d228137be.jpg',
  },
  {id: 15,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'baggy oversize',
    price: 125,
    originalPrice: 150,
    description: 'Denim rigido de ecelente calidad, Bordado lateral en alto relieve .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789325164/47756f5f-2e91-4f2b-ad62-2969fc240da6.jpg',
  },
  {id: 16,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'baggy oversize',
    price: 125,
    originalPrice: 150,
    description: 'Denim rigido de ecelente calidad, Bordado lateral en alto relieve .',
    image: 'https://i.ibb.co/ycPbFs0w/Whats-App-Image-2026-09-11-at-6-11-08-AM.jpg',
  },

  {id: 17,
    gender: 'women',
    subcategory: 'pantalones',
    title: 'Palazzos importados',
    price: 125,
    originalPrice: 150,
    description: 'Rigido y stretch.',
    image: 'https://i.ibb.co/W4mQWvQW/Whats-App-Image-2026-09-11-at-6-14-32-AM.jpg',
  },
  {id: 18,
    gender: 'women',
    subcategory: 'pantalones',
    title: 'palazzos importados',
    price: 125,
    originalPrice: 150,
    description: 'Rigido y stretch.',
    image: 'https://i.ibb.co/WpYNwGYn/Whats-App-Image-2026-09-11-at-6-14-33-AM.jpg',
  },
  {id: 19,
    gender: 'women',
    subcategory: 'pantalones',
    title: 'palazzos importados',
    price: 125,
    originalPrice: 150,
    description: 'Rigido y stretch.',
    image: 'https://i.ibb.co/21Z43DqP/Whats-App-Image-2026-09-11-at-6-14-33.jpg',
  },
  {id: 20,
    gender: 'women',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 110,
    originalPrice: 140,
    description: 'jeans marca most wanted.',
    image: 'https://i.ibb.co/pB5HYsLb/Image-2026-09-13-at-8-44-35-AM.jpg',
  },
  {id: 21,
    gender: 'women',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 110,
    originalPrice: 140,
    description: 'jeans marca popsugar.',
    image: 'https://i.ibb.co/MxwgTHZV/jeans2.jpg',
  },
  {id: 22,
    gender: 'women',
    subcategory: 'pantalones',
    title: 'jeans ',
    price : 110,
    originalPrice: 140,
    description: 'jenas de la marca popsugar.',
    image: 'https://i.ibb.co/s9sVTCwj/jeans3.jpg',
  },
  {id: 23,
    gender: 'women',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 110,
    originalPrice: 140,
    description: 'jeans marca wost wanted.',
    image: 'https://i.ibb.co/N6rV8qtx/jenas1.jpg',
  },
  {id: 24,
    gender: 'women',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 110,
    originalPrice: 140,
    description: 'jeans marca wost wanted.',
    image: 'https://i.ibb.co/Kpx1Zjc3/jeans5.jpg',
  },
  {id: 25,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328413/f7baf340-d6f4-4c0c-9a31-95c19b0e91b3.jpg',
  },
  {id: 26,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328412/e37b5c07-bbbf-4621-9499-8694958c558c.jpg',
  },
  {id: 27,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328409/e25c449f-a4c8-4ca6-958e-7312b504cf27.jpg',
  },
  {id: 28,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328405/d1b339af-3344-4976-9c16-060bb6dda9a3.jpg',
  },
  {id: 29,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328404/cfdb4efd-5574-424c-8656-ae49d086c747.jpg',
  },
  {id: 30,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328403/c6ec05be-bd76-4c72-ab04-7daccb5fba64.jpg',
  },
  {id: 31,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328398/a72f322d-0933-4b87-bf8c-2315a8af639f.jpg',
  },
  {id: 32,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328397/774130dd-686d-4d00-b053-a13247a571b7.jpg',
  },
  {id: 33,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328393/86730f70-92d1-43d1-8cea-18b1a22ff50f.jpg',
  },
  {id: 34,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328392/83610e8a-8d17-47db-800b-edb7c350421a.jpg',
  },
  {id: 35,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328388/68966c82-64a9-47a3-b353-e5c8b233c06c.jpg',
  },
  {id: 36,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328388/5971ddf3-ed1d-469a-92b6-38fe628ba78d.jpg',
  },
  {id: 37,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328384/2696a847-4f72-4847-8e7c-403882b1b118.jpg',
  },
  {id: 38,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328383/1512cd24-7a08-4391-97f3-3a09728f6b95.jpg',
  },
  {id: 39,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328383/867c5968-6543-4ea6-a86a-570240db7f46.jpg',
  },
  {id: 40,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328379/613d4bec-e239-4f02-97a9-76c999bf494e.jpg',
  },
  {id: 41,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328377/420af3dc-1eaf-4078-a43f-91f3aa820cdd.jpg',
  },
  {id: 42,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328378/0104b886-5791-4120-ae0b-00d495eb6c53.jpg',
  },
  {id: 43,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328374/7c40b303-b305-4b39-8963-68a23138bdc4.jpg',
  },
  {id: 44,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328374/867c5968-6543-4ea6-a86a-570240db7f46.jpg',
  },
  {id: 45,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328374/57f68997-5b58-4408-8b15-901bb63b2f7a.jpg',
  },
  {id: 46,
    gender: 'men',
    subcategory: 'pantalones',
    title: 'jeans ',
    price: 133,
    originalPrice: 155,
    description: 'jeans caballeros.',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789328373/5f452765-1c8b-4245-90aa-22be9d73e671.jpg',
  },
  {id: 47,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345710/f9c40f4a-b99f-477d-9aed-2e91ba8d67b3.jpg',
  },
  {id: 48,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345709/bbcc2a59-0140-41d7-a421-ae31c85e10ae.jpg',
  },
  {id: 49,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345709/85851ccb-409d-4b8e-a644-07dcbad29a11.jpg',
  },
  {id: 50,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345710/f142cda0-8d59-46d6-93c0-5de44d2b6e6f.jpg',
  },
  {id: 51,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345709/d05c3787-7726-45cf-a0de-2f42552d5df3.jpg',
  },
  {id: 52,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345709/b8ec6b35-84c3-4476-999a-246175d9af5f.jpg',
  },
  {id: 53,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345709/0821548b-7d31-4ed3-937b-c1ed7c8e34cf_1.jpg',
  },
  {id: 54,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345709/6f5315ef-784c-46cb-ade9-83fef2c22ad8.jpg',
  },
  {id: 55,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345709/91b5b142-18e4-48b6-ba9e-5e27a965c0f6.jpg',
  },
  {id: 56,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345709/0471c1ac-ff50-4e2c-bcc8-723f1c88cde1.jpg',
  },
  {id: 57,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345708/6a1b613a-5c36-498e-bbe6-7cbaa7b50b50_1.jpg',
  },
  {id: 58,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345708/6ac9cbfd-997c-4371-beb9-4fc2627a3385.jpg',
  },
 
  {id: 60,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345708/72ed4eed-5410-4134-9ecb-1dd4e08a4b0f.jpg',
  },
  {id: 61,
    gender: 'women',
    subcategory: 'camisetas',
    title: 'camiseta alto gramaje',
    price: 55,
    originalPrice: 70,
    description: 'algodón de 270 gramos, costura decorativa .',
    image: 'https://res.cloudinary.com/bzvole48/image/upload/v1789345708/6a1b613a-5c36-498e-bbe6-7cbaa7b50b50.jpg',
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

function getProductReference(product) {
  return product.reference || `V7-${String(product.id).padStart(3, '0')}`;
}

function getWhatsAppProductLabel(product) {
  const labels = {
    camisetas: 'camiseta',
    pantalones: 'pantalón'
  };

  return labels[product.subcategory] || 'producto';
}

let currentImageIndex = 0;
let currentImageSet = [];

function getProductImages(product) {
  const imageList = [product.image, ...(Array.isArray(product.images) ? product.images : [])];
  return [...new Set(imageList.map(sanitizeImageUrl).filter(Boolean))];
}

function getSubcategoryImages(product) {
  const subcategoryImages = products
    .filter(item => item.gender === product.gender && item.subcategory === product.subcategory)
    .flatMap(getProductImages);

  return [...new Set(subcategoryImages)];
}

function openImageModal(imageSrc, imageSet = [imageSrc]) {
  if (!imageModal || !expandedImage) return;

  currentImageSet = imageSet;
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

function goToMainImage() {
  const expandedImageSrc = currentImageSet[currentImageIndex] || expandedImage.src;
  const product = products.find(item => getProductImages(item).includes(expandedImageSrc));
  if (!product) return;

  let mainImageButton = document.querySelector(
    `.product-main-image[data-product-id="${product.id}"]`
  );

  closeImageModal();

  if (!mainImageButton) {
    currentCategory = product.gender;
    currentSubcategory = product.subcategory;
    updateCategoryButtons(currentCategory);
    renderSubcategoryButtons();
    renderProducts(getFilteredProducts());
    mainImageButton = document.querySelector(
      `.product-main-image[data-product-id="${product.id}"]`
    );
  }

  if (!mainImageButton) return;

  mainImageButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
  mainImageButton.focus({ preventScroll: true });
}

function renderProductCards(list) {
  return list.map(product => {
    const safeTitle = escapeHtml(product.title ?? '');
    const safeDescription = escapeHtml(product.description ?? '');
    const safeSubcategory = escapeHtml(product.subcategory ?? '');
    const productImages = getProductImages(product);
    const safeImage = productImages[0] || '';
    const productReference = getProductReference(product);
    const safeProductReference = escapeHtml(productReference);
    const whatsappProductLabel = getWhatsAppProductLabel(product);
    const whatsappText = encodeURIComponent(
      `Hola, quiero realizar un pedido de la ${whatsappProductLabel} ${productReference}.`
    );
    const whatsappUrl = `https://wa.me/573218920417?text=${whatsappText}`;
    const thumbnails = productImages.slice(1).map((image, index) => `
      <button class="product-thumbnail" type="button" data-image="${image}" aria-label="Ver imagen ${index + 2} de ${safeTitle}">
        <img src="${image}" alt="${safeTitle}, vista ${index + 2}" loading="lazy" />
      </button>
    `).join('');

    return `
    <article class="product-card">
      <div class="product-gallery">
        <button class="product-main-image" type="button" data-image="${safeImage}" data-product-id="${product.id}" aria-label="Ver imagen ampliada de ${safeTitle}">
          <img src="${safeImage}" alt="${safeTitle}" loading="lazy" />
        </button>
        ${thumbnails ? `<div class="product-thumbnails">${thumbnails}</div>` : ''}
      </div>
      <div>
        <h3>${safeTitle}</h3>
        <p>${safeDescription}</p>
        <div class="product-meta">
          <span class="product-tag">${safeSubcategory}</span>
          <span class="product-reference">Ref: ${safeProductReference}</span>
        </div>
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
}

function bindProductEvents(list) {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.id));
    });
  });

  document.querySelectorAll('.product-card .product-gallery').forEach(gallery => {
    const productImageSet = [...gallery.querySelectorAll('[data-image]')]
      .map(element => element.dataset.image)
      .filter(Boolean);
    const product = list.find(item => productImageSet.includes(getProductImages(item)[0]));
    const imageSet = product ? getSubcategoryImages(product) : productImageSet;

    gallery.querySelectorAll('[data-image]').forEach(imageButton => {
      imageButton.addEventListener('click', () => {
        openImageModal(imageButton.dataset.image, imageSet);
      });
    });
  });
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

  productList.innerHTML = renderProductCards(list);
  bindProductEvents(list);
}

function renderInitialProducts() {
  const groups = [...new Map(products.map(product => [
    `${product.gender}-${product.subcategory}`,
    products.filter(item => item.gender === product.gender && item.subcategory === product.subcategory)
  ])).values()];

  productList.innerHTML = groups.map(group => {
    const firstProduct = group[0];
    const categoryLabel = firstProduct.gender === 'men' ? 'Caballeros' : 'Damas';
    const subcategoryLabel = firstProduct.subcategory.charAt(0).toUpperCase() + firstProduct.subcategory.slice(1);
    const previewProducts = group.slice(0, 3);

    return `
      <section class="product-category-group">
        <div class="product-category-heading">
          <div>
            <p class="eyebrow">${categoryLabel}</p>
            <h3>${escapeHtml(subcategoryLabel)}</h3>
          </div>
          <button class="btn btn-secondary similar-products-btn" type="button" data-category="${firstProduct.gender}" data-subcategory="${firstProduct.subcategory}">Ver productos similares</button>
        </div>
        <div class="product-grid product-preview-grid">${renderProductCards(previewProducts)}</div>
      </section>
    `;
  }).join('');

  bindProductEvents(products);
  document.querySelectorAll('.similar-products-btn').forEach(button => {
    button.addEventListener('click', () => {
      currentCategory = button.dataset.category;
      currentSubcategory = button.dataset.subcategory;
      updateCategoryButtons(currentCategory);
      renderSubcategoryButtons();
      renderProducts(getFilteredProducts());
      productList.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  if (currentCategory === 'all') {
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
if (goToMainImageButton) {
  goToMainImageButton.addEventListener('click', goToMainImage);
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
    const additionalImages = String(formData.get('additionalImages') || '')
      .split(/[\n,]+/)
      .map(sanitizeImageUrl)
      .filter(Boolean);

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
      image,
      images: additionalImages
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
renderInitialProducts();