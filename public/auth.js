const authOverlay = document.getElementById('auth-overlay');
const authModal = document.getElementById('auth-modal');
const openAuth = document.getElementById('open-auth');
const closeAuth = document.getElementById('close-auth');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');
const loginMessage = document.getElementById('login-message');
const logoutButton = document.getElementById('logout-btn');

let currentUser = null;

function toggleAuthModal(show) {
  authModal.classList.toggle('open', show);
  authOverlay.classList.toggle('active', show);
}

function switchAuthTab(tabName) {
  authTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  authForms.forEach(form => {
    form.classList.toggle('active', form.id === `${tabName}-form`);
  });
}

function showMessage(element, message, type = 'success') {
  element.textContent = message;
  element.className = `auth-message show ${type}`;
}

function clearMessage(element) {
  element.textContent = '';
  element.className = 'auth-message';
}

function updateUserState() {
  if (currentUser) {
    openAuth.textContent = `Hola, ${currentUser.nombre}`;
    logoutButton.style.display = 'block';
    clearMessage(loginMessage);
    clearMessage(registerMessage);
  } else {
    openAuth.textContent = '👤 Cuenta';
    logoutButton.style.display = 'none';
  }
}

function saveUser(user) {
  currentUser = user;
  updateUserState();
}

function clearUser() {
  currentUser = null;
  updateUserState();
}

async function loadUser() {
  try {
    const response = await fetch('/me', {
      method: 'GET',
      credentials: 'include'
    });
    const result = await response.json();

    if (response.ok) {
      currentUser = result.usuario;
    } else {
      currentUser = null;
    }
  } catch (error) {
    currentUser = null;
  }

  if (currentUser && typeof window.setUserLogged === 'function') {
    window.setUserLogged(true);
  }
  if (currentUser && typeof window.fetchCart === 'function') {
    await window.fetchCart();
  }

  updateUserState();
}

openAuth.addEventListener('click', () => {
  if (currentUser) {
    toggleAuthModal(true);
    switchAuthTab('login');
    showMessage(loginMessage, `Conectado como ${currentUser.nombre}`, 'success');
  } else {
    toggleAuthModal(true);
  }
});

closeAuth.addEventListener('click', () => toggleAuthModal(false));
authOverlay.addEventListener('click', () => toggleAuthModal(false));

logoutButton.addEventListener('click', () => {
  clearUser();
  toggleAuthModal(false);
});

authTabs.forEach(tab => {
  tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
});

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearMessage(registerMessage);

  const firstName = document.getElementById('register-first').value.trim();
  const lastName = document.getElementById('register-last').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const phone = document.getElementById('register-phone').value.trim();
  const password = document.getElementById('register-password').value;
  const confirm = document.getElementById('register-confirm').value;

  if (password !== confirm) {
    return showMessage(registerMessage, 'Las contraseñas no coinciden.', 'error');
  }

  if (!firstName || !lastName || !email || !phone || !password) {
    return showMessage(registerMessage, 'Completa todos los campos.', 'error');
  }

  showMessage(registerMessage, 'Creando cuenta...', 'success');

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        nombre: firstName,
        apellido: lastName,
        email,
        telefono: phone,
        password
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'No fue posible crear la cuenta.');
    }

    saveUser(result.usuario);
    if (typeof window.setUserLogged === 'function') {
      window.setUserLogged(true);
    }
    if (typeof window.syncCartAfterLogin === 'function') {
      await window.syncCartAfterLogin();
    }

    showMessage(registerMessage, '¡Cuenta creada correctamente! Bienvenido.', 'success');
    registerForm.reset();
    setTimeout(() => toggleAuthModal(false), 1000);
  } catch (error) {
    showMessage(registerMessage, error.message, 'error');
  }
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearMessage(loginMessage);

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    return showMessage(loginMessage, 'Completa email y contraseña.', 'error');
  }

  showMessage(loginMessage, 'Iniciando sesión...', 'success');

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'No fue posible iniciar sesión.');
    }

    saveUser(result.usuario);
    if (typeof window.setUserLogged === 'function') {
      window.setUserLogged(true);
    }
    if (typeof window.syncCartAfterLogin === 'function') {
      await window.syncCartAfterLogin();
    }

    showMessage(loginMessage, `¡Bienvenido, ${result.usuario.nombre}!`, 'success');
    loginForm.reset();
    setTimeout(() => toggleAuthModal(false), 1000);
  } catch (error) {
    showMessage(loginMessage, error.message, 'error');
  }
});

logoutButton.addEventListener('click', async () => {
  try {
    await fetch('/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  }

  if (typeof window.setUserLogged === 'function') {
    window.setUserLogged(false);
  }
  if (typeof window.clearCart === 'function') {
    window.clearCart();
  }
  clearUser();
  toggleAuthModal(false);
});

loadUser();
