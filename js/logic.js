// --- CONSTANTES ---
const IVA_RATE = 0.03; 
const PAYPAL_BUSINESS_EMAIL = 'alexanderosales048@gmail.com';

// Constantes para Webhooks de Discord
const DISCORD_LOGS_WEBHOOK = 'https://discord.com/api/webhooks/1438620421229514895/SUiHz0Kqt8vuYdHe9yXK7HchNHcRPmP_kZZc3hDUZNiSwKAtBDTUPCcuwCWG9rp2oWcC'; // Para ver la compra (staff/privado)
const DISCORD_PUBLIC_WEBHOOK = 'https://discord.com/api/webhooks/1438619985294528622/7r1gm56Gl50eGjTYfL06pEBXTtAX6e0ByL68dgMObvW0HPk2DTHy2WbE_9M1K6j9xyc2'; // Para notificar en un canal público

const DISCOUNT_CODES = {
    'IVONIA3': { type: 'percent', value: 0.03, name: '3% IVA Compensado' },
    'IVONIAMC': { type: 'percent', value: 0.25, name: '25% de Descuento VIP' },
    'NULLY': { type: 'fixed', value: 10.00, name: '$10.00 Descuento Fijo' },
    'NULL': { type: 'percent', value: 0.15, name: '15% para Upgrades' },
    'NULL': { type: 'fixed', value: 5.00, name: '$5.00 para Mineros' },
};

// --- 5.1. DATA MOCKUP DE PRODUCTOS ---
const products = [
// --- Nuevos Ranks ---
    { id: 1, name: "Rank FOX", category: "Ranks", price: 5.99, icon: "fas fa-fox", info: "El Rank de entrada más accesible. 1 Home y comandos básicos.", details: "Rank de inicio. Incluye /kit fox y 1 /home.", is_bestseller: false, badge_color: 'mc-wool', icon_url: "images/rank-fox.png" },
    { id: 2, name: "Rank CREEPER", category: "Ranks", price: 12.99, icon: "fas fa-explosion", info: "Un rank intermedio con un kit enfocado en TNT y explosivos.", details: "Incluye /kit creeper, /feed, y 2 /homes.", is_bestseller: false, badge_color: 'mc-gunpowder', icon_url: "images/rank-creeper.png" },
    { id: 3, name: "Rank ALLAY", category: "Ranks", price: 20.99, icon: "fas fa-hand-sparkles", info: "Rank con beneficios de recolector y un kit diario con ítems útiles.", details: "Incluye /kit allay, /fly y /feed por tiempo limitado, 3 /homes.", is_bestseller: false, badge_color: 'mc-lapis', icon_url: "images/rank-allay.png" },
    { id: 4, name: "Rank WICHT", category: "Ranks", price: 34.99, icon: "fas fa-hat-wizard", info: "Un rank avanzado. Acceso a zona VIP y kit con pociones avanzadas.", details: "Incluye /kit wicht, /fly permanente, /god temporal, 4 /homes, acceso a /warp vip.", is_bestseller: true, badge_color: 'mc-glowstone', icon_url: "images/rank-wicht.png" },

    // --- Nuevas Llaves ---
    { id: 5, name: "Llave SEASONAL", category: "Llaves", price: 1.50, icon: "fas fa-snowflake", info: "Llave para la caja de temporada. Recompensas temáticas de evento.", details: "Abre la Caja de temporada para ítems únicos que solo están disponibles por tiempo limitado.", is_bestseller: false, badge_color: 'mc-ice', icon_url: "images/key-seasonal.png" },
    { id: 6, name: "Llave PREMIUM", category: "Llaves", price: 3.50, icon: "fas fa-trophy", info: "Llave para la caja de ítems premium. Gana armadura de protección II/III.", details: "Abre la Caja Premium para obtener encantamientos de nivel medio.", is_bestseller: false, badge_color: 'mc-iron', icon_url: "images/key-premium.png" },
    { id: 7, name: "Llave ULTIMATE", category: "Llaves", price: 7.99, icon: "fas fa-gem", info: "Una llave muy rara. Oportunidad de ganar herramientas y armadura de Netherite.", details: "Abre la Caja Ultimate para tener la mejor oportunidad de obtener el mejor equipo del juego.", is_bestseller: true, badge_color: 'mc-diamond', icon_url: "images/key-ultimate.png" },
    { id: 8, name: "Llave LEGENDARIA", category: "Llaves", price: 12.99, icon: "fas fa-crown", info: "La llave más valiosa. Ítems únicos y grandes cantidades de dinero y experiencia.", details: "Abre la Caja Legendaria. Garantiza un ítem raro o un cosmético exclusivo.", is_bestseller: true, badge_color: 'mc-netherite', icon_url: "images/key-legendary.png" },
    
    // --- Nuevas Mascotas (Vacio) ---
    { id: 9, name: "Mascota LOBO", category: "Mascotas", price: 6.99, icon: "fas fa-wolf", info: "Una mascota de lobo domesticado para acompañarte.", details: "Mascota permanente. Se activa con /pet wolf. Cosmético.", is_bestseller: false, badge_color: 'mc-bone', icon_url: "images/pet-wolf.png" },
    { id: 10, name: "Mascota ENDERMAN", category: "Mascotas", price: 14.99, icon: "fas fa-teleport", info: "Una mascota de Enderman que se teletransporta contigo.", details: "Mascota permanente. Se activa con /pet enderman. Tiene efecto de partículas de teletransporte.", is_bestseller: false, badge_color: 'mc-pearl', icon_url: "images/pet-enderman.png" },

    // --- Nuevos Kits (Vacio) ---
    { id: 11, name: "Kit GUERRERO", category: "Kits", price: 7.50, icon: "fas fa-sword", info: "Un kit de batalla con armadura de hierro y espada de diamante encantada.", details: "Recibes 1 Espada de Diamante Filo III y armadura de hierro Protección II.", is_bestseller: false, badge_color: 'mc-iron', icon_url: "images/kit-guerrero.png" },
    { id: 12, name: "Kit FARMER", category: "Kits", price: 9.99, icon: "fas fa-seedling", info: "Kit de cultivo con herramientas de oro y semillas raras.", details: "Contiene Hacha de Eficiencia V, 64 semillas de cacao y una pala encantada.", is_bestseller: false, badge_color: 'mc-wheat', icon_url: "images/kit-farmer.png" },

    // --- Otros (Vacio) ---
    { id: 13, name: "Tag de CHAT ROJO", category: "Otros", price: 2.99, icon: "fas fa-tag", info: "Un tag de chat de color rojo vibrante para destacar en el chat.", details: "Color de tag de chat permanente. Se activa con /tag red.", is_bestseller: false, badge_color: 'mc-redstone', icon_url: "images/tag-red.png" },
    { id: 14, name: "Sombrero de PÍXEL", category: "Otros", price: 10.99, icon: "fas fa-mitten", info: "Un sombrero cosmético único para tu personaje.", details: "Sombrero cosmético permanente. Se activa con /hat pixel.", is_bestseller: false, badge_color: 'mc-wool', icon_url: "images/hat-pixel.png" },
];

// --- 5.2. ESTADO GLOBAL DEL CARRITO ---
let cartState = {
    items: [], 
    discountCode: null, 
    giftCardValue: 0.00, 
    minecraftUsername: null
};

// --- 5.3. FUNCIONES DE UTILIDAD Y CÁLCULO ---
function calculateTotals() {
    let subtotal = 0;
    cartState.items.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    let totalDiscount = 0;
    if (cartState.discountCode) {
        const code = cartState.discountCode;
        if (code.type === 'percent') {
            totalDiscount = subtotal * code.value;
        } else if (code.type === 'fixed') {
            totalDiscount = code.value;
        }
    }
    totalDiscount = Math.min(totalDiscount, subtotal);
    
    let totalAfterDiscount = subtotal - totalDiscount;
    const taxAmount = totalAfterDiscount * IVA_RATE;
    let totalBeforeGiftCard = totalAfterDiscount + taxAmount;
    
    let totalGiftCardUsed = Math.min(cartState.giftCardValue, totalBeforeGiftCard);
    let totalPayable = totalBeforeGiftCard - totalGiftCardUsed;
    
    return {
        subtotal: subtotal,
        totalDiscount: totalDiscount,
        taxAmount: taxAmount,
        totalGiftCardUsed: totalGiftCardUsed,
        totalPayable: Math.max(0, totalPayable),
        currentGiftCardBalance: cartState.giftCardValue
    };
}

function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// --- 5.7. NUEVA FUNCIÓN DE WEBHOOK DE DISCORD ---

/**
 * Envía un mensaje estructurado (Embed) a un Webhook de Discord.
 * @param {string} webhookUrl - El URL del Webhook de Discord.
 * @param {object} embedData - Los datos del embed de Discord.
 */
function sendDiscordWebhook(webhookUrl, embedData) {
    if (webhookUrl.includes('[TU_WEBHOOK_URL')) {
        console.warn("Advertencia: No se puede enviar Webhook. URL de Discord no configurada.");
        return;
    }

    const payload = {
        // Se usa el nombre de la tienda y un ícono para el bot del webhook
        username: "IVONIA Store Notifier",
        avatar_url: "https://discord.com/channels/1343360454931513374/1343363542136389686/1438620962839990404", // Reemplaza con el logo de tu tienda
        embeds: [embedData]
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            console.error(`Error al enviar el Webhook a Discord (Código: ${response.status})`);
            // Opcional: Intentar leer el cuerpo de error de Discord
            response.text().then(text => console.error("Respuesta de Discord:", text));
        } else {
            console.log(`Webhook enviado con éxito a ${webhookUrl}`);
        }
    })
    .catch(error => {
        console.error('Error de red al intentar enviar el Webhook:', error);
    });
}


// --- 5.4. MANEJO DEL CARRITO ---

function updateCartDisplay() {
    const totals = calculateTotals();
    const count = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
    
    // 1. Renderizar el contador del carrito (Verificación de Null)
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }
    
    // 2. Renderizar la lista de items y la factura
    renderCart(totals);
    
    // 3. Controlar estado del botón de pago (Verificación de Null)
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutMessage = document.getElementById('checkout-message');

    if (!checkoutBtn || !checkoutMessage) {
        console.error("Error: Elementos de checkout no encontrados.");
        return;
    }
    
    // Lógica para habilitar/deshabilitar el botón
    const canCheckout = cartState.items.length > 0 && cartState.minecraftUsername && totals.totalPayable > 0;

    if (canCheckout || (cartState.items.length > 0 && totals.totalPayable <= 0)) {
        // Habilitar si hay pago pendiente O si el total es $0.00 y hay items.
        checkoutBtn.disabled = false;
        checkoutMessage.classList.add('hidden');
        if (totals.totalPayable <= 0) {
             checkoutBtn.textContent = 'Completar Compra ($0.00)';
             checkoutBtn.classList.remove('bg-[#FFC439]', 'hover:bg-yellow-500');
             checkoutBtn.classList.add('bg-green-600', 'hover:bg-green-500');
        } else {
             checkoutBtn.textContent = 'Pagar con PayPal';
             checkoutBtn.classList.add('bg-[#FFC439]', 'hover:bg-yellow-500');
             checkoutBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
        }
    } else {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Pagar con PayPal';
        checkoutBtn.classList.add('bg-[#FFC439]', 'hover:bg-yellow-500');
        checkoutBtn.classList.remove('bg-green-600', 'hover:bg-green-500');

        if (cartState.items.length === 0) {
            checkoutMessage.textContent = 'El carrito está vacío.';
        } else {
            checkoutMessage.textContent = 'Por favor, confirma tu usuario de Minecraft para pagar.';
        }
        checkoutMessage.classList.remove('hidden');
    }
}

function renderCart(totals) {
    const itemsContainer = document.getElementById('cart-items-container');
    const emptyMessage = document.getElementById('empty-cart-message');
    
    if (!itemsContainer || !emptyMessage) {
        console.error("Error: Contenedores de carrito no encontrados en el DOM.");
        return;
    }

    itemsContainer.innerHTML = '';
    
    if (cartState.items.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden'); 
        cartState.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex items-center p-3 bg-gray-800 rounded-lg shadow';
            itemDiv.innerHTML = `
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-white truncate">${item.name}</p>
                    <p class="text-xs text-gray-400">${formatCurrency(item.price)} c/u</p>
                </div>
                <div class="flex items-center space-x-3">
                    <button onclick="updateQuantity(${item.id}, -1)" class="text-violet-400 hover:text-white transition text-lg w-6 h-6 flex items-center justify-center rounded-full bg-gray-700">-</button>
                    <span class="text-sm font-bold text-white w-4 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="text-violet-400 hover:text-white transition text-lg w-6 h-6 flex items-center justify-center rounded-full bg-gray-700">+</button>
                    <span class="text-sm font-bold text-green-400 w-16 text-right">${formatCurrency(itemTotal)}</span>
                    <button onclick="removeItem(${item.id})" class="text-red-500 hover:text-red-400 transition ml-3">
                        <i class="fas fa-trash-alt text-xs"></i>
                    </button>
                </div>
            `;
            itemsContainer.appendChild(itemDiv);
        });
    }

    // Actualizar factura (Verificación de Null para todos los elementos)
    const subtotalEl = document.getElementById('subtotal-amount');
    const discountEl = document.getElementById('discount-amount');
    const giftcardBalanceEl = document.getElementById('giftcard-balance');
    const giftcardUsedEl = document.getElementById('giftcard-used');
    const taxEl = document.getElementById('tax-amount');
    const totalPayableEl = document.getElementById('total-payable');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
    if (discountEl) discountEl.textContent = `-${formatCurrency(totals.totalDiscount)}`;
    if (giftcardBalanceEl) giftcardBalanceEl.textContent = formatCurrency(totals.currentGiftCardBalance);
    if (giftcardUsedEl) giftcardUsedEl.textContent = `-${formatCurrency(totals.totalGiftCardUsed)}`;
    if (taxEl) taxEl.textContent = formatCurrency(totals.taxAmount);
    if (totalPayableEl) totalPayableEl.textContent = formatCurrency(totals.totalPayable);
}

function openCart() {
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('cart-overlay');
    if (modal && overlay) {
        modal.classList.add('open');
        overlay.classList.remove('hidden');
    }
    updateCartDisplay();
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('cart-overlay');
    if (modal && overlay) {
        modal.classList.remove('open');
        overlay.classList.add('hidden');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cartState.items.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartState.items.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
    updateCartDisplay();
    alertMessage(`Añadido: ${product.name}`, 'green');
    openCart(); 
}

function updateQuantity(productId, change) {
    const existingItem = cartState.items.find(item => item.id === productId);
    if (!existingItem) return;
    existingItem.quantity += change;
    if (existingItem.quantity <= 0) {
        removeItem(productId);
    } else {
        updateCartDisplay();
    }
}

function removeItem(productId) {
    cartState.items = cartState.items.filter(item => item.id !== productId);
    updateCartDisplay();
    alertMessage(`Producto eliminado del carrito.`, 'yellow');
}

// --- 5.5. MANEJO DE DESCUENTOS ---
function applyDiscount() {
    const input = document.getElementById('discount-input');
    if (!input) return; 
    const code = input.value.toUpperCase().trim();
    const discount = DISCOUNT_CODES[code];
    cartState.discountCode = null; 
    if (discount) {
        cartState.discountCode = discount;
        alertMessage(`Descuento aplicado: ${discount.name}`, 'green');
    } else {
        alertMessage('Código de descuento no válido.', 'red');
    }
    updateCartDisplay();
}

function applyGiftCard() {
    const input = document.getElementById('giftcard-input');
    if (!input) return; 
    const value = parseFloat(input.value);
    if (isNaN(value) || value <= 0) {
        alertMessage('Por favor, ingresa un valor de tarjeta válido.', 'red');
        return;
    }
    cartState.giftCardValue += value;
    alertMessage(`Tarjeta de regalo de ${formatCurrency(value)} canjeada.`, 'blue');
    input.value = '';
    updateCartDisplay();
}

// --- 5.6. CONFIRMAR Y EDITAR USUARIO ---

function confirmUsername() {
    const usernameInput = document.getElementById('minecraft-username');
    const confirmationSection = document.getElementById('username-confirmation-section');
    const inputArea = document.getElementById('username-input-area');
    const displayArea = document.getElementById('username-display-area');
    const usernameStatus = document.getElementById('username-status');

    if (!usernameInput || !confirmationSection || !inputArea || !displayArea || !usernameStatus) return; 

    const username = usernameInput.value.trim();

    if (username.length < 3) {
        alertMessage('Nombre de usuario inválido. Debe tener al menos 3 caracteres.', 'red');
        confirmationSection.classList.add('animate-shake');
        setTimeout(() => {
            confirmationSection.classList.remove('animate-shake');
        }, 500);
        return;
    }
    
    cartState.minecraftUsername = username;
    
    usernameStatus.textContent = username;
    inputArea.classList.add('hidden');
    displayArea.classList.remove('hidden');
    
    updateCartDisplay();
    alertMessage(`Usuario confirmado: ${username}`, 'green');
}

function editUsername() {
    const usernameInput = document.getElementById('minecraft-username');
    const inputArea = document.getElementById('username-input-area');
    const displayArea = document.getElementById('username-display-area');

    if (!usernameInput || !inputArea || !displayArea) return; 

    cartState.minecraftUsername = null;
    
    inputArea.classList.remove('hidden');
    displayArea.classList.add('hidden');
    usernameInput.value = '';
    
    updateCartDisplay();
}


// --- 5.8. CHECKOUT, PAYPAL Y DISCORD ---

function checkout() {
    if (cartState.items.length === 0) {
         alertMessage('El carrito está vacío. Añade productos para pagar.', 'red');
         return;
    }
    const confirmationSection = document.getElementById('username-confirmation-section');
    if (!cartState.minecraftUsername) {
        alertMessage('Por favor, confirma tu nombre de usuario de Minecraft antes de pagar.', 'red');
        if (confirmationSection) {
            confirmationSection.classList.add('animate-shake');
            setTimeout(() => {
                confirmationSection.classList.remove('animate-shake');
            }, 500);
        }
        return;
    }
    
    const totals = calculateTotals();
    const totalPayable = totals.totalPayable;
    const description = cartState.items.map(item => `${item.name} x${item.quantity}`).join(', ');
    const fullItemName = `Compra para [${cartState.minecraftUsername}] en IVONIA Store - (${description})`;

    // Prepara los datos del producto/compra para Discord
    const itemFields = cartState.items.map(item => ({
        name: item.name,
        value: `**Precio:** ${formatCurrency(item.price)} | **Cant:** ${item.quantity}`,
        inline: true,
    }));

    // Lógica de los Webhooks (Aplicable tanto para $0.00 como para pagos con PayPal)
    
    // --- 1. WEBHOOK DE LOGS (Para Staff) ---
    const logsEmbed = {
        title: "💸 Nueva Transacción en la Tienda",
        description: `El usuario **${cartState.minecraftUsername}** ha intentado una compra.`,
        color: 11090679, // Violeta (#a855f7)
        fields: [
            ...itemFields,
            { name: "Subtotal", value: formatCurrency(totals.subtotal), inline: true },
            { name: "Descuento Aplicado", value: formatCurrency(totals.totalDiscount), inline: true },
            { name: "Tarjeta/Gift Card Usada", value: formatCurrency(totals.totalGiftCardUsed), inline: true },
            { name: "IVA (3%)", value: formatCurrency(totals.taxAmount), inline: true },
            { name: "TOTAL A PAGAR", value: `**${formatCurrency(totalPayable)}**`, inline: false },
        ],
        footer: {
            text: `ID de Transacción Simulado: ${Date.now()}`
        },
        timestamp: new Date().toISOString()
    };
    sendDiscordWebhook(DISCORD_LOGS_WEBHOOK, logsEmbed);


    // Caso especial para compras cubiertas por descuento/gift card (Total $0.00)
    if (totalPayable <= 0) {
        alertMessage('¡Compra completada con éxito! Gracias por usar tu saldo.', 'green');
        
        // --- 2. WEBHOOK PÚBLICO (Para notificar la compra) ---
        const publicEmbed = {
            title: "✨ ¡NUEVA COMPRA EN LA TIENDA! ✨",
            description: `¡**${cartState.minecraftUsername}** acaba de apoyar el servidor comprando **${cartState.items.length}** ítem(s)!`,
            color: 3066993, // Verde
            thumbnail: {
                url: `https://minotar.net/avatar/${cartState.minecraftUsername}/100.png` // Muestra la cabeza del jugador
            },
            fields: [
                { name: "Ítems Comprados", value: description, inline: false },
                { name: "Monto Pagado", value: "**$0.00 (Cubierto)**", inline: true },
            ],
            timestamp: new Date().toISOString()
        };
        sendDiscordWebhook(DISCORD_PUBLIC_WEBHOOK, publicEmbed);

        // Simulación de limpieza de carrito
        cartState.items = [];
        cartState.discountCode = null;
        cartState.giftCardValue = 0.00;
        cartState.minecraftUsername = null; 
        updateCartDisplay();
        closeCart();

        return;
    }
    
    // Redirección a PayPal para el pago
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&` +
                      `business=${PAYPAL_BUSINESS_EMAIL}&` +
                      `item_name=${encodeURIComponent(fullItemName)}&` +
                      `amount=${totalPayable.toFixed(2)}&` +
                      `currency_code=USD`;

    window.open(paypalUrl, '_blank');
    alertMessage('Redirigiendo a PayPal para pago. ¡Gracias por tu apoyo!', 'yellow');
}


// --- 5.7. LÓGICA DE TARJETAS Y FILTROS ---

function togglePreview(productId) {
    const detailElement = document.getElementById(`details-${productId}`);
    const previewButton = document.getElementById(`preview-btn-${productId}`);
    if (!detailElement || !previewButton) return; 

    if (detailElement.classList.contains('hidden')) {
        detailElement.classList.remove('hidden');
        previewButton.innerHTML = '<i class="fas fa-eye-slash mr-2"></i> Ocultar Detalles';
    } else {
        detailElement.classList.add('hidden');
        previewButton.innerHTML = '<i class="fas fa-search mr-2"></i> Previsualizar Detalles';
    }
}

function renderProductCard(product) {
    const bestsellerBadge = product.is_bestseller 
        ? `<span class="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg rotate-3 z-10">
             <i class="fas fa-bolt mr-1"></i> ¡MÁS VENDIDO!
           </span>`
        : '';

    return `
        <div class="content-card p-5 relative overflow-hidden">
            ${bestsellerBadge}
            <div class="text-5xl text-center mb-4 p-3 rounded-md bg-gray-900">
                <i class="${product.icon} color-primary"></i>
            </div>
            
            <h3 class="font-bold text-white text-xl mb-1">${product.name}</h3>
            <p class="text-sm text-gray-400 mb-4 h-12 overflow-hidden">${product.info}</p>
            <div class="flex justify-between items-center mb-4">
                <span class="text-2xl font-bold color-primary">$${product.price.toFixed(2)}</span>
                <span class="text-xs font-semibold text-gray-500 bg-gray-800 px-2 py-1 rounded-full">${product.category.toUpperCase()}</span>
            </div>

            <div class="space-y-3">
                <button id="preview-btn-${product.id}" onclick="togglePreview(${product.id})" class="btn-secondary w-full text-sm bg-gray-700 hover:bg-gray-600 transition">
                    <i class="fas fa-search mr-2"></i> Previsualizar Detalles
                </button>
                <button onclick="addToCart(${product.id})" class="btn-main w-full text-sm">
                    <i class="fas fa-cart-plus mr-2"></i> Añadir al Carrito
                </button>
            </div>

            <div id="details-${product.id}" class="hidden mt-4 p-3 bg-gray-800 rounded-lg border-l-4 border-primary text-sm text-gray-300">
                <p class="font-bold color-primary mb-1">Detalles de ${product.name}:</p>
                <p>${product.details}</p>
            </div>
        </div>
    `;
}

function filterProducts(category) {
    const grid = document.getElementById('product-grid');
    const titleElement = document.getElementById('category-title');
    
    if (!grid || !titleElement) return; 

    const icon = (category === 'Ranks') ? 'fas fa-crown' : (category === 'Llaves') ? 'fas fa-key' : (category === 'Comandos') ? 'fas fa-terminal' : (category === 'Kits') ? 'fas fa-box-open' : (category === 'Otros') ? 'fas fa-magic' : 'fas fa-cubes';
    const titleText = (category === 'Todos') ? 'TODOS LOS ÍTEMS' : category.toUpperCase();
    titleElement.innerHTML = `<i class="${icon} mr-2"></i> ${titleText}`;

    const filteredProducts = (category === 'Todos') ? products : products.filter(p => p.category === category);
    const productHtml = filteredProducts.map(renderProductCard).join('');
    grid.innerHTML = productHtml;

    document.querySelectorAll('.sidebar-link').forEach(a => {
        a.classList.remove('active-category');
    });
    const activeLink = document.querySelector(`.sidebar-link[data-category="${category}"]`);
    if (activeLink) {
        activeLink.classList.add('active-category');
    }
}

// Uso una función de alerta simple en lugar de window.alert/confirm
function alertMessage(message, colorName) {
    const currentAlert = document.getElementById('custom-alert');
    if (currentAlert) currentAlert.remove();
    
    const colorClasses = {
        'green': 'bg-green-600 border-green-400',
        'red': 'bg-red-600 border-red-400',
        'yellow': 'bg-yellow-600 border-yellow-400',
        'blue': 'bg-blue-600 border-blue-400'
    };

    const alertDiv = document.createElement('div');
    alertDiv.id = 'custom-alert';
    alertDiv.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white shadow-lg border-l-4 transform transition-transform duration-300 translate-x-full ${colorClasses[colorName] || 'bg-gray-700 border-gray-500'}`;
    alertDiv.innerHTML = `<div class="font-bold">${message}</div>`;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.classList.remove('translate-x-full');
    }, 10);

    setTimeout(() => {
        alertDiv.classList.add('translate-x-full');
        alertDiv.addEventListener('transitionend', () => alertDiv.remove());
    }, 3000);
}

// --- 5.10. FUNCIÓN DE PROMOCIÓN ---
function showPromoFloat() {
    const promoEl = document.getElementById('promo-float');
    if (promoEl) {
        // Muestra el mensaje después de 1 segundo para que sea visible
        setTimeout(() => {
            promoEl.classList.remove('opacity-0', 'scale-95');
        }, 1000);

        // Hace que se cierre automáticamente después de 10 segundos
        setTimeout(() => {
            if (promoEl.classList.contains('opacity-0')) return; // No cerrar si ya fue cerrado por el usuario
            promoEl.classList.add('opacity-0', 'scale-95');
        }, 10000);
    }
}

// --- 5.9. INICIALIZACIÓN (BLINDAJE DE CÓDIGO) ---
// Usamos DOMContentLoaded para asegurar que el HTML esté 100% cargado antes de interactuar con él.
document.addEventListener('DOMContentLoaded', () => {
    // 1. Renderiza los productos (esto crea las tarjetas en el DOM)
    filterProducts('Todos'); 

    // 2. Inicialización de iconos de Lucide (DEBE IR DESPUÉS DE RENDERIZAR LOS ÍCONOS)
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        try {
            lucide.createIcons();
        } catch(e) {
            console.error("Error al inicializar Lucide Icons:", e);
        }
    }
    
    // 3. Inicializa el estado del carrito y la factura
    updateCartDisplay();
    
    // 4. Muestra la promoción flotante al cargar la página (NUEVO)
    showPromoFloat();
});