// --- 0. CONFIGURACIÓN ---
const CONFIG = {

    PAYPAL_CLIENT_ID: 'VD5V2TDCBK95J', // 'sb' es un Client ID de sandbox para PRUEBAS. 
    
    // ¡MUY IMPORTANTE! Este es el email de la cuenta de PayPal que RECIBIRÁ el dinero.
    PAYPAL_BUSINESS_EMAIL: 'alexanderosales048@gmail.com', 
    
    // Códigos de descuento (Código: porcentaje de descuento, ej. 0.10 = 10%)
    // ¡RECUERDA! Esto no es seguro, los usuarios pueden ver los códigos en el JS.
    DISCOUNT_CODES: {
        'BIENVENIDO10': 0.10,
        'SERVER20': 0.20,
        'SOYVIP': 0.05,
        'GRATIS100': 1.0 // <-- CÓDIGO DE EJEMPLO DEL 100% (valor 1.0)
    },

    // Webhook para notificaciones de staff (privado)
    // ¡RECUERDA! Esto es INSEGURO. Tu URL es visible.
    WEBHOOK_STAFF_URL: 'https://discord.com/api/webhooks/1438620421229514895/SUiHz0Kqt8vuYdHe9yXK7HchNHcRPmP_kZZc3hDUZNiSwKAtBDTUPCcuwCWG9rp2oWcC',

    // Webhook para notificaciones públicas (canal #compras)
    WEBHOOK_PUBLIC_URL: 'https://discord.com/api/webhooks/1438619985294528622/7r1gm56Gl50eGjTYfL06pEBXTtAX6e0ByL68dgMObvW0HPk2DTHy2WbE_9M1K6j9xyc2'
};

// --- 1. DATOS DE LOS PRODUCTOS ---
// (Datos de productos existentes)
const allProducts = [
    {
        id: 1,
        name: "Rango VIP (30 días)",
        price: 9.99,
        imageUrl: "https://placehold.co/300x200/90cdf4/ffffff?text=Rango+VIP",
        altText: "Rango VIP",
        rating: 4.5,
        category: "rangos",
        badge: null
    },
    {
        id: 2,
        name: "Rango MVP+ (Permanente)",
        price: 24.99,
        imageUrl: "https://placehold.co/300x200/a0aec0/ffffff?text=Rango+MVP%2B",
        altText: "Rango MVP+",
        rating: 5,
        category: "rangos",
        badge: "¡Hot!"
    },
    {
        id: 3,
        name: "Mascota: Golem de Hierro",
        price: 7.99,
        imageUrl: "https://placehold.co/300x200/fbd38d/ffffff?text=Mascota+Golem",
        altText: "Mascota Golem de Hierro",
        rating: 4,
        category: "cosmeticos",
        badge: null
    },
    {
        id: 4,
        name: "Paquete de 5000 Gemas",
        price: 4.99,
        imageUrl: "https://placehold.co/300x200/b794f4/ffffff?text=5000+Gemas",
        altText: "Paquete de 5000 Gemas",
        rating: 4.5,
        category: "moneda",
        badge: null
    },
    {
        id: 5,
        name: "Kit de Constructor (Uso Único)",
        price: 3.99,
        imageUrl: "https://placehold.co/300x200/f687b3/ffffff?text=Kit+Constructor",
        altText: "Kit de Constructor",
        rating: 5,
        category: "kits",
        badge: null
    },
    {
        id: 6,
        name: "Efectos de Partículas: Fuego",
        price: 2.99,
        imageUrl: "https://placehold.co/300x200/4fd1c5/ffffff?text=Efectos+de+Fuego",
        altText: "Efectos de Partículas de Fuego",
        rating: 4.5,
        category: "cosmeticos",
        badge: null
    },
    {
        id: 7,
        name: "Paquete de 5 Llaves Épicas",
        price: 4.99,
        imageUrl: "https://placehold.co/300x200/38b2ac/ffffff?text=5+Llaves+Epicas",
        altText: "5 Llaves de Cajas Épicas",
        rating: 4,
        category: "llaves",
        badge: null
    },
    {
        id: 8,
        name: "Pase de Batalla: Temporada 3",
        price: 12.99,
        imageUrl: "https://placehold.co/300x200/718096/ffffff?text=Pase+de+Batalla",
        altText: "Pase de Batalla Temporada 3",
        rating: 5,
        category: "kits",
        badge: null
    }
];

// --- 2. ESTADO DE LA APLICACIÓN ---
let cart = [];
let appliedDiscount = null; 
let currentMinecraftUsername = "";

// --- 3. SELECTORES DE ELEMENTOS ---
// Selectores de la tienda
const productGrid = document.getElementById('product-grid');
const categoryTitle = document.getElementById('category-title');
const sidebarLinks = document.querySelectorAll('#sidebar-nav .sidebar-link');
const searchInput = document.getElementById('search-input');

// Selectores del Carrito
const cartModal = document.getElementById('cart-modal');
const cartIconButton = document.getElementById('cart-icon-button');
const closeCartButton = document.getElementById('close-cart-button');
const cartItemsContainer = document.getElementById('cart-items-container');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartCountBadge = document.getElementById('cart-count-badge');

// Selectores de Checkout
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartDiscountEl = document.getElementById('cart-discount');
const cartTotalEl = document.getElementById('cart-total');
const discountCodeInput = document.getElementById('discount-code-input');
const applyDiscountButton = document.getElementById('apply-discount-button');
const discountAppliedRow = document.getElementById('discount-applied-row');
const discountCodeText = document.getElementById('discount-code-text');
const usernameInput = document.getElementById('minecraft-username');
const cartMessage = document.getElementById('cart-message');
const paypalButtonContainer = document.getElementById('paypal-button-container');
const claimFreeButton = document.getElementById('claim-free-button'); // <-- Selector para el botón gratis

// Selectores de Notificación
const notificationToast = document.getElementById('notification-toast');

// Selectores del Menú Móvil
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');


// --- 4. FUNCIONES PRINCIPALES (INICIALIZACIÓN) ---

// Espera a que el DOM esté cargado para ejecutar todo
document.addEventListener('DOMContentLoaded', () => {
    initStore();
    initMobileMenu();
});

/**
 * Inicializa la lógica del menú móvil
 */
function initMobileMenu() {
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

/**
 * Inicializa la lógica de la tienda
 */
function initStore() {
    // Comprueba si los elementos de la tienda existen antes de continuar
    if (!productGrid || !categoryTitle || !sidebarLinks.length) {
        console.warn("No se encontraron todos los elementos de la tienda. Asegúrate de que el HTML está cargado.");
        return;
    }

    loadCart();
    addEventListeners();
    renderProducts(allProducts); // Render inicial
    renderCart();
    loadPayPalSDK();
}

// --- 5. LÓGICA DE EVENTOS ---

function addEventListeners() {
    // Clics en la barra lateral (Categorías)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', handleCategoryClick);
    });

    // Búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Clics en la cuadrícula de productos (Añadir al carrito)
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            const addToCartButton = e.target.closest('.add-to-cart-button');
            if (addToCartButton) {
                e.preventDefault(); // Prevenir la navegación si el botón está dentro de un <a>
                const productId = parseInt(addToCartButton.dataset.id, 10);
                addToCart(productId);
            }
        });
    }

    // Abrir/Cerrar Carrito
    if (cartIconButton) {
        cartIconButton.addEventListener('click', toggleCartModal);
    }
    if (closeCartButton) {
        closeCartButton.addEventListener('click', toggleCartModal);
    }
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            // Cierra el modal si se hace clic en el fondo oscuro
            if (e.target === cartModal) {
                toggleCartModal();
            }
        });
    }

    // Actualizaciones dentro del Carrito
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const target = e.target;
            const parentItem = target.closest('.cart-item');
            if (!parentItem) return;

            const productId = parseInt(parentItem.dataset.id, 10);

            // Botón de Incrementar (+)
            if (target.closest('.cart-quantity-increase')) {
                const item = cart.find(i => i.id === productId);
                if (item) updateCartQuantity(productId, item.quantity + 1);
            }
            // Botón de Decrementar (-)
            else if (target.closest('.cart-quantity-decrease')) {
                const item = cart.find(i => i.id === productId);
                if (item) updateCartQuantity(productId, item.quantity - 1);
            }
            // Botón de Eliminar (x)
            else if (target.closest('.cart-remove-item')) {
                updateCartQuantity(productId, 0); // Poner cantidad a 0 elimina el item
            }
        });
    }

    // Aplicar Descuento
    if (applyDiscountButton) {
        applyDiscountButton.addEventListener('click', applyDiscount);
    }

    // Guardar nombre de usuario de MC
    if (usernameInput) {
        usernameInput.addEventListener('input', (e) => {
            currentMinecraftUsername = e.target.value.trim();
            // Si había un error de "nombre requerido", lo borra al escribir
            if (currentMinecraftUsername) {
                setCartMessage("");
            }
        });
    }
    
    // Listener para el botón gratis
    if (claimFreeButton) {
        claimFreeButton.addEventListener('click', handleFreeClaim);
    }
}

function handleCategoryClick(event) {
    event.preventDefault(); 
    
    const clickedLink = event.currentTarget;
    const category = clickedLink.dataset.category;

    const linkText = clickedLink.querySelector('span').textContent;
    categoryTitle.textContent = linkText;

    sidebarLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');

    let filteredProducts = [];
    
    if (category === 'all') {
        filteredProducts = allProducts;
    } else if (['favoritos', 'recomendados', 'top20'].includes(category)) {
        if(category === 'top20') {
            filteredProducts = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 20);
            categoryTitle.textContent = "Top 20 Más Valorados";
        } else {
             // Lógica para favoritos o recomendados (requeriría más datos en el producto)
             filteredProducts = [];
        }
    } else {
        filteredProducts = allProducts.filter(product => product.category === category);
    }
    
    renderProducts(filteredProducts);
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
}

// --- 6. FUNCIONES DE RENDERIZADO (UI) ---

/**
 * "Pinta" los productos en el DOM.
 */
function renderProducts(productsToRender) {
    if (!productGrid) return; // Salir si la cuadrícula no existe
    productGrid.innerHTML = ''; // Limpia la cuadrícula

    if (productsToRender.length === 0) {
        productGrid.innerHTML = `
            <div class="col-span-full text-center text-gray-500 py-10">
                <i class="fa-solid fa-box-open text-4xl mb-4"></i>
                <p class="text-xl">No se encontraron productos.</p>
            </div>
        `;
        return;
    }

    const productCardsHTML = productsToRender.map(product => {
        const ratingStars = generateRatingStars(product.rating);
        const badgeHTML = product.badge 
            ? `<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase z-10">${product.badge}</span>`
            : '';

        return `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 product-card relative flex flex-col">
                ${badgeHTML}
                <img src="${product.imageUrl}" 
                     alt="${product.altText}" 
                     class="w-full h-48 object-cover"
                     onerror="this.src='https://placehold.co/300x200/cccccc/ffffff?text=Imagen+No+Disponible'">
                
                <div class="p-4 flex flex-col flex-grow">
                    <h4 class="text-lg font-semibold text-gray-800 truncate">${product.name}</h4>
                    <div class="flex items-center mt-1">
                        ${ratingStars}
                    </div>
                    <p class="text-lg font-bold text-minecraft-green-dark mt-2">$${product.price.toFixed(2)}</p>
                    
                    <button data-id="${product.id}" class="add-to-cart-button mt-4 w-full bg-action-orange text-white font-semibold py-2 rounded-lg hover:bg-action-orange-dark transition-colors">
                        <i class="fa-solid fa-cart-plus mr-2"></i>Añadir
                    </button>
                </div>
            </div>
        `;
    }).join('');

    productGrid.innerHTML = productCardsHTML;
}

/**
 * Pinta el contenido del modal del carrito
 */
function renderCart() {
    // Salir si los elementos del carrito no existen
    if (!cartItemsContainer || !emptyCartMessage || !cartSubtotalEl || !cartTotalEl) return;

    // Vaciar contenedor de items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
    } else {
        emptyCartMessage.classList.add('hidden');
        cart.forEach(item => {
            const itemHTML = `
                <div class="flex items-center space-x-4 mb-4 p-2 rounded-lg border cart-item" data-id="${item.id}">
                    <img src="${item.imageUrl}" alt="${item.altText}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-grow">
                        <h4 class="font-semibold text-gray-800">${item.name}</h4>
                        <p class="text-sm text-gray-600">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="flex items-center border rounded-lg">
                        <button class="cart-quantity-decrease w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-l-lg" aria-label="Reducir cantidad">-</button>
                        <input type="number" value="${item.quantity}" class="w-12 text-center border-l border-r" readonly>
                        <button class="cart-quantity-increase w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-r-lg" aria-label="Aumentar cantidad">+</button>
                    </div>
                    <button class="cart-remove-item text-gray-400 hover:text-red-500 ml-2" aria-label="Eliminar item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
        });
    }

    // Calcular totales
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discountAmount = 0;
    
    if (appliedDiscount) {
        discountAmount = subtotal * appliedDiscount.percent;
        if(cartDiscountEl) cartDiscountEl.textContent = `-$${discountAmount.toFixed(2)}`;
        if(discountCodeText) discountCodeText.textContent = appliedDiscount.code;
        if(discountAppliedRow) discountAppliedRow.classList.remove('hidden');
    } else {
        if(discountAppliedRow) discountAppliedRow.classList.add('hidden');
    }
    
    const total = subtotal - discountAmount;

    cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    cartTotalEl.textContent = `$${total.toFixed(2)}`;

    updateCartIconCount();
    
    // LÓGICA DE BOTÓN DE PAGO (MODIFICADA)
    if (cart.length > 0) {
        if (total <= 0) {
            // Total es $0.00 o menos, es gratis
            if (paypalButtonContainer) {
                paypalButtonContainer.innerHTML = ''; // Limpiar botones de PayPal
                paypalButtonContainer.classList.add('hidden');
            }
            if (claimFreeButton) claimFreeButton.classList.remove('hidden');
        } else {
            // Hay un total que pagar
            if (paypalButtonContainer) paypalButtonContainer.classList.remove('hidden');
            if (claimFreeButton) claimFreeButton.classList.add('hidden');
            renderPayPalButton(total); // Solo renderizar PayPal si el total es > 0
        }
    } else {
        // Carrito vacío
        if (paypalButtonContainer) {
            paypalButtonContainer.innerHTML = '';
            paypalButtonContainer.classList.add('hidden');
        }
        if (claimFreeButton) claimFreeButton.classList.add('hidden');
    }
}

function updateCartIconCount() {
    if (!cartCountBadge) return;
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = count;
    cartCountBadge.classList.toggle('hidden', count === 0);
}

function generateRatingStars(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const halfStar = (rating % 1) >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) starsHTML += '<i class="fa-solid fa-star text-sm text-yellow-500"></i>';
    if (halfStar) starsHTML += '<i class="fa-solid fa-star-half-stroke text-sm text-yellow-500"></i>';
    for (let i = 0; i < emptyStars; i++) starsHTML += '<i class="fa-regular fa-star text-sm text-yellow-500"></i>';
    return starsHTML;
}

function toggleCartModal() {
    if (cartModal) {
        cartModal.classList.toggle('hidden');
    }
}

/**
 * Muestra una notificación toast
 */
function showNotification(message, isError = false) {
    if (!notificationToast) return;
    
    notificationToast.textContent = message;
    notificationToast.classList.remove('hidden', 'translate-y-20', 'opacity-0', 'bg-red-500', 'bg-minecraft-green-dark');
    
    if (isError) {
        notificationToast.classList.add('bg-red-500');
    } else {
        notificationToast.classList.add('bg-minecraft-green-dark');
    }

    // Forzar reflow para la animación de entrada
    notificationToast.offsetWidth;
    
    notificationToast.classList.remove('translate-y-20', 'opacity-0');

    setTimeout(() => {
        notificationToast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => notificationToast.classList.add('hidden'), 500); // Ocultar después de la transición
    }, 3000); // 3 segundos visible
}

/**
 * Muestra un mensaje dentro del modal del carrito
 */
function setCartMessage(message, isError = true) {
    if (!cartMessage) return;
    cartMessage.textContent = message;
    cartMessage.classList.toggle('text-red-500', isError);
    cartMessage.classList.toggle('text-green-600', !isError);
}

// --- 7. LÓGICA DEL CARRITO ---

function loadCart() {
    const savedCart = localStorage.getItem('mine-store-cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
}

function saveCart() {
    localStorage.setItem('mine-store-cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    renderCart();
    showNotification(`¡${product.name} añadido al carrito!`);
}

function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        // Eliminar item
        cart = cart.filter(item => item.id !== productId);
    } else {
        // Actualizar cantidad
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    saveCart();
    renderCart();
}

function clearCart() {
    cart = [];
    appliedDiscount = null;
    if (discountCodeInput) discountCodeInput.value = '';
    saveCart();
    renderCart();
}

// --- 8. LÓGICA DE PAGO Y NOTIFICACIONES ---

function applyDiscount() {
    if (!discountCodeInput) return;
    const code = discountCodeInput.value.toUpperCase();
    if (!code) return;

    if (CONFIG.DISCOUNT_CODES[code]) {
        const percent = CONFIG.DISCOUNT_CODES[code];
        appliedDiscount = { code, percent };
        setCartMessage(`¡${(percent * 100)}% de descuento aplicado!`, false);
        renderCart(); // Re-renderizar para aplicar el descuento
    } else {
        appliedDiscount = null;
        setCartMessage("Código de descuento no válido.", true);
        renderCart(); // Re-renderizar para quitar cualquier descuento
    }
}

function loadPayPalSDK() {
    const script = document.createElement('script');
    // Carga el SDK de PayPal con tu Client ID y la moneda
    script.src = `https://www.paypal.com/sdk/js?client-id=${CONFIG.PAYPAL_CLIENT_ID}&currency=USD`;
    script.onload = () => {
        // Una vez cargado, renderiza el botón (si hay items en el carrito)
        if (cart.length > 0) {
            // Recalcular el total aquí por si acaso
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            let discountAmount = 0;
            if (appliedDiscount) {
                discountAmount = subtotal * appliedDiscount.percent;
            }
            const total = subtotal - discountAmount;
            
            // MODIFICADO: Solo renderizar si el total es mayor a 0
            if (total > 0) {
                renderPayPalButton(total);
            }
        }
    };
    // MANEJO DE ERROR: Si el script de PayPal no se puede cargar (común en sandboxes)
    script.onerror = () => {
        console.error("Error al cargar el SDK de PayPal.");
        setCartMessage("Error al cargar el módulo de pago. Inténtalo de nuevo.", true);
    };
    document.head.appendChild(script);
}

/**
 * Renderiza el botón de PayPal
 * @param {number} totalAmount - El monto final a pagar
 */
function renderPayPalButton(totalAmount) {
    if (!paypalButtonContainer) return;
    
    // Salvaguarda por si se llama con 0
    if (totalAmount <= 0) {
        paypalButtonContainer.innerHTML = '';
        paypalButtonContainer.classList.add('hidden');
        return;
    }

    // Limpia el contenedor antes de renderizar
    paypalButtonContainer.innerHTML = '';
    
    // CORRECCIÓN: Añadir comprobación por si el SDK de PayPal no se carga
    if (typeof paypal === 'undefined') {
        console.error("El SDK de PayPal no se cargó o inicializó correctamente.");
        setCartMessage("Error al cargar el módulo de pago.", true);
        return; // No intentes renderizar el botón
    }

    // Configuración del botón de PayPal
    try {
        paypal.Buttons({
            // Validación ANTES de abrir el popup de PayPal
            onClick: (data, actions) => {
                if (!currentMinecraftUsername) {
                    setCartMessage("Por favor, introduce tu nombre de usuario de Minecraft.", true);
                    if (usernameInput) usernameInput.focus(); // Foco en el input
                    return actions.reject(); // Cancela el pago
                } else {
                    setCartMessage(""); // Limpia mensajes de error
                    return actions.resolve(); // Procede con el pago
                }
            },

            // Configura la transacción
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: totalAmount.toFixed(2) // Asegura 2 decimales
                        },
                        payee: {
                            // ¡MUY IMPORTANTE! Aquí va tu email de PayPal
                            email_address: CONFIG.PAYPAL_BUSINESS_EMAIL
                        }
                    }]
                });
            },

            // Se llama cuando el pago es aprobado por el usuario
            onApprove: (data, actions) => {
                return actions.order.capture().then(details => {
                    // ¡Pago Exitoso!
                    setCartMessage(`¡Pago completado por ${details.payer.name.given_name}!`, false);
                    
                    // Enviar notificaciones a Discord
                    sendDiscordNotification('staff', details);
                    sendDiscordNotification('public', details);

                    // Limpiar el carrito
                    setTimeout(() => {
                        clearCart();
                        toggleCartModal(); // Cierra el modal
                        showNotification("¡Gracias por tu compra!");
                    }, 3000); // Espera 3 seg. para que el usuario lea el mensaje
                });
            },

            // Manejo de errores
            onError: (err) => {
                console.error("Error de PayPal:", err);
                setCartMessage("Ocurrió un error durante el pago.", true);
            }
        }).render('#paypal-button-container');
    } catch (error) {
        console.error("Error al renderizar el botón de PayPal:", error);
        setCartMessage("Error crítico al iniciar el módulo de pago.", true);
    }
}

/**
 * Maneja el reclamo de items gratuitos (descuento 100%)
 */
function handleFreeClaim() {
    // 1. Validar nombre de usuario
    if (!currentMinecraftUsername) {
        setCartMessage("Por favor, introduce tu nombre de usuario de Minecraft.", true);
        if (usernameInput) usernameInput.focus(); // Foco en el input
        return;
    }
    
    setCartMessage("Procesando tu reclamo...", false);

    // 2. Simular un objeto 'details' de PayPal para las notificaciones
    const mockDetails = {
        payer: {
            name: {
                given_name: "Usuario",
                surname: "(Reclamo Gratis)"
            },
            email_address: "no-reply@gratis.com"
        },
        purchase_units: [{
            amount: {
                value: "0.00"
            }
        }]
    };

    // 3. Enviar notificaciones
    sendDiscordNotification('staff', mockDetails);
    sendDiscordNotification('public', mockDetails);

    // 4. Limpiar carrito y cerrar
    setTimeout(() => {
        clearCart();
        toggleCartModal(); // Cierra el modal
        showNotification("¡Has reclamado tus items gratuitos!");
    }, 2000); // Espera 2 seg
}


/**
 * Envía la notificación a Discord vía Webhook
 * @param {string} type - 'staff' o 'public'
 * @param {object} details - Los detalles del pago de PayPal (o el objeto simulado)
 */
async function sendDiscordNotification(type, details) {
    let url = '';
    let embed = {};
    const payerName = `${details.payer.name.given_name} ${details.payer.name.surname}`;
    const total = parseFloat(details.purchase_units[0].amount.value); // Convertir a número
    
    // Construir la lista de items
    const itemsDescription = cart.map(item => `${item.quantity}x ${item.name}`).join('\n');

    if (type === 'staff') {
        url = CONFIG.WEBHOOK_STAFF_URL;
        if (!url.includes('https://discord.com/api/webhooks/')) return; // No envía si la URL no es válida

        embed = {
            title: total > 0 ? '✅ Nueva Compra de Staff' : '🎁 Reclamo Gratuito de Staff',
            description: `**¡Venta/Reclamo realizado con éxito!**`,
            color: total > 0 ? 0x00FF00 : 0x00BFFF, // Verde para compra, Azul para gratis
            fields: [
                { name: 'Usuario de Minecraft', value: `\`${currentMinecraftUsername}\``, inline: true },
                { name: 'Comprador de PayPal', value: `\`${payerName}\``, inline: true },
                { name: 'Email de PayPal', value: `\`${details.payer.email_address}\``, inline: false },
                { name: 'Total Pagado', value: `**$${total.toFixed(2)} USD**`, inline: true },
                { name: 'Items Comprados', value: `\`\`\`${itemsDescription}\`\`\``, inline: false },
            ],
            timestamp: new Date().toISOString()
        };

    } else { // 'public'
        url = CONFIG.WEBHOOK_PUBLIC_URL;
        if (!url.includes('https://discord.com/api/webhooks/')) return; // No envía si la URL no es válida
        
        // Para el público, solo mostramos el primer item para no saturar
        const firstItemName = cart[0] ? cart[0].name : 'un paquete';
        const actionText = total > 0 ? "acaba de comprar" : "acaba de reclamar";

        embed = {
            title: total > 0 ? '🎉 ¡Nueva Compra en la Tienda!' : '🎁 ¡Nuevo Reclamo en la Tienda!',
            description: `¡**${currentMinecraftUsername}** ${actionText} **${firstItemName}** y está apoyando al servidor!`,
            color: 0x5865F2, // Azul de Discord
            footer: {
                text: '¡Gracias por tu apoyo!'
            },
            timestamp: new Date().toISOString()
        };
    }

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'Notificador de Tienda',
                avatar_url: 'https://i.pinimg.com/736x/43/ba/67/43ba67dbb1a51e7c2b0f943790462345.jpg', // Un ícono de cofre
                embeds: [embed],
            }),
        });
    } catch (error) {
        console.error('Error enviando webhook a Discord:', error);
    }
}

