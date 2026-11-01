/**
 * ====================================================================
 * AURA CONCIERGE — PRODUCTION REAL-TIME E-COMMERCE CHATBOT ENGINE
 * Vanilla JavaScript (ES6+), Clean Architecture, Zero External Dependencies
 * ====================================================================
 */

'use strict';

// ====================================================================
// 1. MOCK DATABASE (Live Orders, Products Inventory, Users & Knowledge)
// ====================================================================
const MockDB = {
  // Test User Accounts
  users: {
    usr_sarah: {
      id: 'usr_sarah',
      name: 'Sarah Connor',
      initials: 'SC',
      tier: 'VIP Gold Member',
      avatarGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      email: 'sarah.c@aurastyle.com',
      activeOrderId: 'ORD-98231',
      cartCount: 2
    },
    usr_alex: {
      id: 'usr_alex',
      name: 'Alex Rivera',
      initials: 'AR',
      tier: 'Standard Member',
      avatarGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      email: 'alex.rivera@example.com',
      activeOrderId: 'ORD-44912',
      cartCount: 1
    },
    usr_maya: {
      id: 'usr_maya',
      name: 'Maya Lin',
      initials: 'ML',
      tier: 'Platinum Elite',
      avatarGradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
      email: 'maya.lin@example.com',
      activeOrderId: 'ORD-77104',
      cartCount: 4
    },
    usr_guest: {
      id: 'usr_guest',
      name: 'Guest Shopper',
      initials: 'GS',
      tier: 'Guest Account',
      avatarGradient: 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
      email: 'guest@aurastyle.com',
      activeOrderId: null,
      cartCount: 0
    }
  },

  // Live Orders Database
  orders: {
    'ORD-98231': {
      id: 'ORD-98231',
      userId: 'usr_sarah',
      orderDate: 'Oct 30, 2026',
      status: 'In Transit',
      carrier: 'FedEx Express Priority',
      trackingCode: 'FX-84920194US',
      estimatedDelivery: 'Tomorrow by 4:30 PM',
      shippingAddress: '742 Evergreen Terrace, Seattle, WA 98101',
      items: [
        { name: 'Aura SoundPulse ANC Headphones', qty: 1, price: 199.00 },
        { name: 'HydroGlow Insulated Flask (Matte Black)', qty: 1, price: 39.00 }
      ],
      total: 238.00,
      steps: [
        { title: 'Order Confirmed', time: 'Oct 30 • 10:14 AM', completed: true },
        { title: 'Customs Cleared & Packed', time: 'Oct 31 • 02:40 PM', completed: true },
        { title: 'In Transit (Departed Seattle Hub)', time: 'Nov 01 • 06:15 AM', active: true },
        { title: 'Out for Local Delivery', time: 'Expected Nov 02', pending: true },
        { title: 'Delivered', time: 'Pending', pending: true }
      ]
    },
    'ORD-44912': {
      id: 'ORD-44912',
      userId: 'usr_alex',
      orderDate: 'Oct 26, 2026',
      status: 'Delivered',
      carrier: 'DHL On-Demand Express',
      trackingCode: 'DH-9940124801',
      estimatedDelivery: 'Delivered on Oct 28 at 2:15 PM',
      shippingAddress: '100 Sunset Blvd, Austin, TX 78701',
      items: [
        { name: 'UltraLite Mechanical Keyboard (Wireless)', qty: 1, price: 129.00 },
        { name: 'AeroGlide Ergonomic Mouse', qty: 1, price: 59.00 }
      ],
      total: 188.00,
      steps: [
        { title: 'Order Confirmed', time: 'Oct 26 • 09:00 AM', completed: true },
        { title: 'Quality Inspection & Packed', time: 'Oct 26 • 01:20 PM', completed: true },
        { title: 'In Transit via DHL Flight #701', time: 'Oct 27 • 11:30 AM', completed: true },
        { title: 'Out for Delivery', time: 'Oct 28 • 08:45 AM', completed: true },
        { title: 'Delivered • Signed by Alex R.', time: 'Oct 28 • 02:15 PM', completed: true }
      ]
    },
    'ORD-77104': {
      id: 'ORD-77104',
      userId: 'usr_maya',
      orderDate: 'Nov 01, 2026',
      status: 'Processing',
      carrier: 'UPS Air Logistics',
      trackingCode: 'UP-4410294100',
      estimatedDelivery: 'Nov 04, 2026',
      shippingAddress: '450 Park Avenue, New York, NY 10022',
      items: [
        { name: 'Veloce Smart Fitness Watch (Titanium)', qty: 1, price: 249.00 }
      ],
      total: 249.00,
      steps: [
        { title: 'Payment Authorized & Confirmed', time: 'Nov 01 • 08:30 AM', completed: true },
        { title: 'Order Processing at Logistics Hub', time: 'Nov 01 • 10:00 AM', active: true },
        { title: 'Carrier Hand-off & Dispatch', time: 'Scheduled Nov 02', pending: true },
        { title: 'In Transit', time: 'Pending', pending: true },
        { title: 'Delivered', time: 'Pending', pending: true }
      ]
    }
  },

  // Live Inventory Catalog
  products: [
    {
      id: 'prod_headphones',
      name: 'Aura SoundPulse ANC Headphones',
      category: 'Audio',
      price: 199.00,
      originalPrice: 249.00,
      stockCount: 14,
      inStock: true,
      rating: 4.9,
      reviewsCount: 382,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      features: ['Active Noise Cancellation 45dB', '40h Battery Life', 'Ultra-Soft Memory Foam Earcups'],
      keywords: ['headphones', 'headphone', 'audio', 'soundpulse', 'sound', 'music', 'anc', 'earphones']
    },
    {
      id: 'prod_keyboard',
      name: 'UltraLite Mechanical Keyboard',
      category: 'Workspace',
      price: 129.00,
      originalPrice: 149.00,
      stockCount: 3,
      inStock: true,
      lowStock: true,
      rating: 4.8,
      reviewsCount: 215,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
      features: ['Hot-swappable tactile switches', 'Multi-device Bluetooth 5.2', 'CNC Aluminum Case'],
      keywords: ['keyboard', 'mechanical', 'ultralite', 'typing', 'switches', 'workspace', 'keys']
    },
    {
      id: 'prod_watch',
      name: 'Veloce Smart Fitness Watch',
      category: 'Wearables',
      price: 249.00,
      originalPrice: 299.00,
      stockCount: 9,
      inStock: true,
      rating: 4.9,
      reviewsCount: 512,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      features: ['Sapphire crystal display', 'ECG + SpO2 tracking', '14-Day battery endurance'],
      keywords: ['watch', 'smartwatch', 'veloce', 'fitness', 'wearable', 'tracker', 'apple watch alternative']
    },
    {
      id: 'prod_flask',
      name: 'HydroGlow Insulated Flask',
      category: 'Lifestyle',
      price: 39.00,
      originalPrice: 48.00,
      stockCount: 28,
      inStock: true,
      rating: 4.7,
      reviewsCount: 164,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      features: ['Triple vacuum wall insulation', 'Keeps cold 24h / hot 12h', 'BPA-Free Food Grade 18/8 Steel'],
      keywords: ['flask', 'bottle', 'water', 'hydroglow', 'drinkware', 'insulated', 'tumbler']
    },
    {
      id: 'prod_mouse',
      name: 'AeroGlide Ergonomic Mouse',
      category: 'Workspace',
      price: 59.00,
      originalPrice: 79.00,
      stockCount: 2,
      inStock: true,
      lowStock: true,
      rating: 4.8,
      reviewsCount: 190,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
      features: ['57° natural handshake angle', 'Silent click switches', 'Hyper-fast magnetic scroll'],
      keywords: ['mouse', 'aeroglide', 'ergonomic', 'workspace', 'pointer', 'bluetooth mouse']
    },
    {
      id: 'prod_backpack',
      name: 'Nimbus Minimalist Tech Pack',
      category: 'Lifestyle',
      price: 89.00,
      originalPrice: 110.00,
      stockCount: 18,
      inStock: true,
      rating: 4.9,
      reviewsCount: 298,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      features: ['Weatherproof Cordura fabric', 'Suspended 16-inch laptop pocket', 'Hidden RFID passport pocket'],
      keywords: ['backpack', 'bag', 'nimbus', 'tech pack', 'laptop bag', 'travel']
    }
  ],

  // Active Promo Codes
  promos: [
    { code: 'AURA20', discount: '20% off all orders', minOrder: 50 },
    { code: 'FREESHIP', discount: 'Free express worldwide shipping', minOrder: 75 },
    { code: 'VIPTECH', discount: '$30 off order above $150', minOrder: 150 }
  ]
};

// ====================================================================
// 2. SYNTHETIC AUDIO FEEDBACK (Web Audio API - Zero Asset Dependency)
// ====================================================================
class SoundFX {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
  }

  playPop(type = 'sent') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;

      if (type === 'sent') {
        // High crisp soft ping
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'received') {
        // Welcoming two-tone chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(660, now + 0.07);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      }
    } catch (e) {
      // Audio playback fails silently if user has not interacted
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

// ====================================================================
// 3. CHATBOT QUERY ENGINE (Live Query & Intent Simulation)
// ====================================================================
class ChatEngine {
  constructor(db) {
    this.db = db;
    this.currentUserId = 'usr_sarah';
  }

  setUser(userId) {
    if (this.db.users[userId]) {
      this.currentUserId = userId;
    }
  }

  getCurrentUser() {
    return this.db.users[this.currentUserId] || this.db.users.usr_guest;
  }

  getActiveOrder() {
    const user = this.getCurrentUser();
    if (user.activeOrderId && this.db.orders[user.activeOrderId]) {
      return this.db.orders[user.activeOrderId];
    }
    return null;
  }

  // Simulate asynchronous database & API latency with real-time response structure
  async processQuery(userInput) {
    const cleanText = userInput.trim().toLowerCase();

    // Natural latency simulation (650ms to 1100ms)
    const simulatedDelay = Math.floor(Math.random() * 450) + 650;
    await new Promise(resolve => setTimeout(resolve, simulatedDelay));

    // 1. Check for specific or generic Order Tracking intents
    const orderMatch = userInput.match(/#?ORD-?\d+/i);
    const trackingKeywords = ['track', 'order', 'status', 'delivery', 'where is', 'package', 'shipping', 'transit', 'shipped'];
    const isOrderQuery = orderMatch || trackingKeywords.some(kw => cleanText.includes(kw));

    if (isOrderQuery) {
      let targetOrder = null;
      if (orderMatch) {
        const extractedId = orderMatch[0].toUpperCase().replace('#', '');
        // Standardize format: ORD-XXXXX
        const normalized = extractedId.includes('-') ? extractedId : extractedId.replace('ORD', 'ORD-');
        targetOrder = this.db.orders[normalized];
      }

      // If no specific ID mentioned or ID not found, check active user's order
      if (!targetOrder) {
        targetOrder = this.getActiveOrder();
      }

      if (targetOrder) {
        return {
          type: 'order_tracking',
          order: targetOrder,
          message: `I located order **#${targetOrder.id}** for ${this.getCurrentUser().name}. It is currently **${targetOrder.status}** via **${targetOrder.carrier}**.`,
          chips: ['Estimated Delivery Date', 'Check Items in Order', 'Report Shipping Delay', 'Check Item Stock']
        };
      } else {
        return {
          type: 'text',
          message: `I couldn't find an active order linked to your current profile (**${this.getCurrentUser().name}**). You can enter an order ID (e.g., \`#ORD-98231\` or \`#ORD-44912\`), or switch test profiles in the top bar!`,
          chips: ['Track #ORD-98231', 'Track #ORD-44912', 'Check Item Stock', 'Browse Catalog']
        };
      }
    }

    // 2. Check for Inventory & Stock inquiries
    const stockKeywords = ['stock', 'inventory', 'available', 'availability', 'left', 'buy', 'units'];
    const isStockQuery = stockKeywords.some(kw => cleanText.includes(kw));

    // Find any product mentioned by keyword or name
    const foundProduct = this.db.products.find(p => {
      const matchName = cleanText.includes(p.name.toLowerCase());
      const matchKeyword = p.keywords.some(k => cleanText.includes(k));
      return matchName || matchKeyword;
    });

    if (foundProduct && isStockQuery) {
      const stockStatus = foundProduct.lowStock
        ? `⚠️ **Low Stock Alert:** Only **${foundProduct.stockCount} units** left in our Seattle fulfillment center!`
        : `✅ **In Stock:** **${foundProduct.stockCount} units** available for immediate same-day dispatch.`;

      return {
        type: 'product_card',
        product: foundProduct,
        message: `${stockStatus} Here are the real-time inventory specifications for the **${foundProduct.name}**:`,
        chips: [`Add ${foundProduct.name.split(' ')[0]} to Cart`, 'Check Warranty Details', 'Any Promo Codes?', 'Return Policy']
      };
    }

    // 3. Check for Product Catalog browsing / recommendation requests
    if (foundProduct) {
      return {
        type: 'product_card',
        product: foundProduct,
        message: `Here is the current catalog listing and live pricing for **${foundProduct.name}**:`,
        chips: ['Check Item Stock', 'Track Order #ORD-98231', 'Current Promo Codes', 'Speak to Human Agent']
      };
    }

    const catalogKeywords = ['catalog', 'products', 'gear', 'headphones', 'keyboard', 'watch', 'items', 'recommend', 'show', 'browse', 'shop', 'trending'];
    if (catalogKeywords.some(kw => cleanText.includes(kw))) {
      // Return top 2 featured products
      const topProducts = [this.db.products[0], this.db.products[1]];
      return {
        type: 'multi_products',
        products: topProducts,
        message: `Here are two of our top-rated essentials currently in high demand with verified customer reviews:`,
        chips: ['Check Stock on Headphones', 'Check Stock on Keyboard', 'Track My Order', 'Discount Codes']
      };
    }

    // 4. Promo codes and Discounts
    const promoKeywords = ['promo', 'coupon', 'discount', 'code', 'offer', 'deal', 'save', 'voucher'];
    if (promoKeywords.some(kw => cleanText.includes(kw))) {
      return {
        type: 'promo_codes',
        message: `Here are our verified store promotion codes active today:`,
        promos: this.db.promos,
        chips: ['Apply Code AURA20', 'Track Order #ORD-98231', 'Check Headphones Stock', 'Return Policy']
      };
    }

    // 5. Speak to Human Agent / Escalation
    const humanKeywords = ['human', 'agent', 'support', 'representative', 'person', 'operator', 'talk to someone', 'complaint', 'real person'];
    if (humanKeywords.some(kw => cleanText.includes(kw))) {
      return {
        type: 'human_handoff',
        agentName: 'Elena Rostova',
        role: 'Tier-2 Priority Support Specialist',
        waitTime: 'Under 2 minutes',
        ticketId: `TICK-${Math.floor(100000 + Math.random() * 900000)}`,
        message: `I have prepared a priority handoff ticket for you. Live representative **Elena Rostova** is ready to connect with full context of your session:`,
        chips: ['Connect Live Now', 'Track My Order Instead', 'Browse Deals']
      };
    }

    // 6. Return, Refunds & Warranty Policy
    const returnKeywords = ['return', 'refund', 'warranty', 'exchange', 'broken', 'damaged', 'money back', 'policy'];
    if (returnKeywords.some(kw => cleanText.includes(kw))) {
      return {
        type: 'policy_card',
        message: `We offer a **30-Day Hassle-Free Return Guarantee** and a **2-Year Comprehensive Hardware Warranty** on all AuraStyle hardware.`,
        bullets: [
          'Prepaid digital return shipping labels generated instantly.',
          'Refunds processed to your original payment method in 2 business days.',
          'Zero restocking fees on unopened or defect-reported units.'
        ],
        chips: ['Generate Return Authorization', 'Track Order #ORD-98231', 'Speak to Human Agent']
      };
    }

    // 7. Greeting & General Assistance
    const greetingKeywords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'hola', 'start', 'help'];
    if (greetingKeywords.some(kw => cleanText === kw || cleanText.startsWith(kw + ' '))) {
      const user = this.getCurrentUser();
      return {
        type: 'text',
        message: `Hello ${user.name}! 👋 Welcome back to **AuraStyle Concierge**. I have real-time access to our live inventory, shipping logistics, and your account records. How can I assist you today?`,
        chips: [
          user.activeOrderId ? `Track Order #${user.activeOrderId}` : 'Track Order #ORD-98231',
          'Check Item Stock',
          'Current Promo Codes',
          'Speak to Human Agent'
        ]
      };
    }

    // 8. Thank you
    if (cleanText.includes('thank') || cleanText.includes('great') || cleanText.includes('awesome') || cleanText.includes('perfect')) {
      return {
        type: 'text',
        message: `You're very welcome! If you need anything else regarding orders, inventory, or product recommendations, I'm right here 24/7. Have a wonderful day! ✨`,
        chips: ['Browse Collection', 'Track Active Order', 'Check Promo Codes']
      };
    }

    // 9. Intelligent Fallback with Contextual Guidance
    return {
      type: 'text',
      message: `I analyzed your inquiry: _"${userInput}"_. I can pull live database records for you! What would you like to check?`,
      chips: [
        'Track Order #ORD-98231',
        'Check Headphones Stock',
        'Available Promo Codes',
        'Speak to Human Agent'
      ]
    };
  }
}

// ====================================================================
// 4. UI CONTROLLER & EVENT LISTENERS
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize State & Engines
  const sound = new SoundFX();
  const engine = new ChatEngine(MockDB);

  // DOM Elements - Chat Window & Controls
  const launcherWrapper = document.getElementById('chat-launcher-wrapper');
  const launcherBtn = document.getElementById('chat-launcher-btn');
  const launcherTooltip = document.getElementById('launcher-tooltip');
  const tooltipCloseBtn = document.getElementById('tooltip-close-btn');
  const unreadBadge = document.getElementById('launcher-unread-badge');
  const chatWindow = document.getElementById('chat-window');
  const btnCloseChat = document.getElementById('btn-close-chat');
  const btnClearChat = document.getElementById('btn-clear-chat');
  const btnSoundToggle = document.getElementById('btn-sound-toggle');
  const userOrderSelect = document.getElementById('user-order-select');
  const chatMessages = document.getElementById('chat-messages');
  const chatBody = document.getElementById('chat-body');
  const typingIndicator = document.getElementById('typing-indicator');
  const quickChipsScroll = document.getElementById('quick-chips-scroll');
  const chatTextarea = document.getElementById('chat-textarea');
  const btnSendMessage = document.getElementById('btn-send-message');
  const btnVoiceInput = document.getElementById('btn-voice-input');
  const chatToast = document.getElementById('chat-toast');
  const headerStatusText = document.getElementById('header-status-text');

  // DOM Elements - Storefront Context
  const storeProductsGrid = document.getElementById('store-products-grid');
  const heroOpenChatBtn = document.getElementById('hero-open-chat-btn');
  const searchAssistantBtn = document.getElementById('search-assistant-btn');
  const storeSearchInput = document.getElementById('store-search-input');
  const headerUserAvatar = document.getElementById('header-user-avatar');
  const headerUserName = document.getElementById('header-user-name');

  let isChatOpen = false;
  let isTyping = false;
  let toastTimeout = null;

  // Render Storefront Products Catalog Grid (for interactive grounding)
  function renderStorefrontCatalog() {
    if (!storeProductsGrid) return;
    storeProductsGrid.innerHTML = MockDB.products.map(prod => `
      <div class="store-card" data-product-id="${prod.id}">
        <div class="store-card-img-wrap">
          <img src="${prod.image}" alt="${prod.name}" class="store-card-img" loading="lazy">
          <span class="store-card-badge ${prod.lowStock ? 'badge-lowstock' : 'badge-instock'}">
            ${prod.lowStock ? `Low Stock (${prod.stockCount} left)` : `In Stock (${prod.stockCount})`}
          </span>
        </div>
        <div class="store-card-body">
          <span class="store-card-category">${prod.category}</span>
          <h3 class="store-card-title">${prod.name}</h3>
          <div class="store-card-rating">
            <span>★ ${prod.rating}</span>
            <span class="count">(${prod.reviewsCount} reviews)</span>
          </div>
          <div class="store-card-price-row">
            <span class="store-card-price">$${prod.price.toFixed(2)}</span>
            ${prod.originalPrice ? `<span class="store-card-original">$${prod.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="btn-card-inquire" data-inquire-product="${prod.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Ask Stock via Chat</span>
          </button>
        </div>
      </div>
    `).join('');

    // Attach click listener to "Ask Stock via Chat" buttons on store items
    storeProductsGrid.querySelectorAll('.btn-card-inquire').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productName = btn.getAttribute('data-inquire-product');
        openChat();
        handleUserMessageSubmission(`Check stock on ${productName}`);
      });
    });
  }

  // Format timestamps (e.g., "10:28 AM")
  function formatCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Display toast alerts inside chat header
  function showToast(text, duration = 2800) {
    if (!chatToast) return;
    chatToast.textContent = text;
    chatToast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      chatToast.classList.remove('show');
    }, duration);
  }

  // Toggle Chat Window Open / Close
  function openChat() {
    if (isChatOpen) return;
    isChatOpen = true;
    chatWindow.classList.add('is-open');
    launcherBtn.classList.add('is-active');
    launcherBtn.setAttribute('aria-expanded', 'true');
    chatWindow.setAttribute('aria-hidden', 'false');

    // Hide unread badge
    if (unreadBadge) unreadBadge.style.display = 'none';

    // Dismiss launcher tooltip if active
    if (launcherTooltip) launcherTooltip.style.display = 'none';

    // Focus input area on desktop
    if (window.innerWidth > 640) {
      setTimeout(() => chatTextarea.focus(), 300);
    }
    scrollToBottom();
  }

  function closeChat() {
    if (!isChatOpen) return;
    isChatOpen = false;
    chatWindow.classList.remove('is-open');
    launcherBtn.classList.remove('is-active');
    launcherBtn.setAttribute('aria-expanded', 'false');
    chatWindow.setAttribute('aria-hidden', 'true');
  }

  function toggleChat() {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  // Auto-scroll chat body to bottom
  function scrollToBottom() {
    setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 50);
  }

  // Render Quick Chips Bar
  function setQuickChips(chips = []) {
    if (!quickChipsScroll) return;
    if (!chips || chips.length === 0) {
      quickChipsScroll.parentElement.style.display = 'none';
      return;
    }
    quickChipsScroll.parentElement.style.display = 'block';
    quickChipsScroll.innerHTML = chips.map(chip => `
      <button class="quick-chip" type="button" data-chip-text="${chip}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span>${chip}</span>
      </button>
    `).join('');

    // Reattach click events
    quickChipsScroll.querySelectorAll('.quick-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-chip-text');
        handleUserMessageSubmission(text);
      });
    });
  }

  // Render Bot Response Widgets
  function createBotWidgetMarkup(response) {
    if (!response) return '';

    // 1. Single Product Mini-Card
    if (response.type === 'product_card' && response.product) {
      const p = response.product;
      return `
        <div class="product-widget-card">
          <div class="widget-card-media">
            <img src="${p.image}" alt="${p.name}" class="widget-card-img">
            <span class="widget-stock-pill ${p.lowStock ? 'low-stock' : 'in-stock'}">
              ${p.lowStock ? `⚠️ Low Stock: Only ${p.stockCount} left` : `✓ In Stock: ${p.stockCount} units`}
            </span>
          </div>
          <div class="widget-card-details">
            <span class="widget-product-category">${p.category}</span>
            <div class="widget-product-title">${p.name}</div>
            <div class="widget-price-rating-row">
              <div class="widget-price-wrap">
                <span class="widget-price">$${p.price.toFixed(2)}</span>
                ${p.originalPrice ? `<span class="widget-original-price">$${p.originalPrice.toFixed(2)}</span>` : ''}
              </div>
              <span class="widget-rating-tag">★ ${p.rating}</span>
            </div>
            <div class="widget-btn-row">
              <button class="widget-btn-action widget-btn-primary" onclick="window.triggerProductAction('${p.name}', 'add')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Add to Cart</span>
              </button>
              <button class="widget-btn-action widget-btn-secondary" onclick="window.triggerProductAction('${p.name}', 'details')">
                <span>Specs</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 2. Multiple Products Listing
    if (response.type === 'multi_products' && response.products) {
      return response.products.map(p => `
        <div class="product-widget-card" style="margin-bottom: 8px;">
          <div class="widget-card-media" style="aspect-ratio: 16 / 7;">
            <img src="${p.image}" alt="${p.name}" class="widget-card-img">
            <span class="widget-stock-pill ${p.lowStock ? 'low-stock' : 'in-stock'}">
              ${p.stockCount} In Stock
            </span>
          </div>
          <div class="widget-card-details">
            <div class="widget-product-title">${p.name}</div>
            <div class="widget-price-rating-row">
              <span class="widget-price">$${p.price.toFixed(2)}</span>
              <button class="widget-btn-action widget-btn-primary" style="padding: 4px 10px; font-size: 0.72rem;" onclick="window.triggerProductAction('${p.name}', 'add')">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // 3. Order Tracking Timeline Stepper Widget
    if (response.type === 'order_tracking' && response.order) {
      const o = response.order;
      const statusBadgeClass = o.status === 'Delivered' 
        ? 'status-badge-delivered' 
        : (o.status === 'In Transit' ? 'status-badge-transit' : 'status-badge-processing');

      const stepsHtml = o.steps.map(s => `
        <div class="timeline-step ${s.completed ? 'completed' : (s.active ? 'active' : 'pending')}">
          <div class="step-node"></div>
          <div class="step-title">${s.title}</div>
          <div class="step-time">${s.time}</div>
        </div>
      `).join('');

      const itemsSummary = o.items.map(i => `${i.name} (x${i.qty})`).join(', ');

      return `
        <div class="order-tracking-card">
          <div class="tracking-header">
            <div>
              <span class="meta-label">Order Reference</span>
              <div class="tracking-order-id">#${o.id}</div>
            </div>
            <span class="tracking-status-badge ${statusBadgeClass}">${o.status}</span>
          </div>

          <div class="tracking-meta-grid">
            <div class="tracking-meta-item">
              <span class="meta-label">Courier & Waybill</span>
              <span class="meta-val">${o.trackingCode}</span>
            </div>
            <div class="tracking-meta-item">
              <span class="meta-label">Estimated Delivery</span>
              <span class="meta-val">${o.estimatedDelivery}</span>
            </div>
            <div class="tracking-meta-item" style="grid-column: span 2;">
              <span class="meta-label">Package Contents (${o.items.length} items • $${o.total.toFixed(2)})</span>
              <span class="meta-val" style="font-weight: 500; font-size: 0.74rem;">${itemsSummary}</span>
            </div>
          </div>

          <!-- Vertical Interactive Stepper -->
          <div class="timeline-stepper">
            ${stepsHtml}
          </div>

          <div class="tracking-footer-actions">
            <button class="btn-tracking-pill" onclick="window.copyTracking('${o.trackingCode}')">
              📋 Copy Tracking #
            </button>
            <button class="btn-tracking-pill" onclick="window.requestDeliveryInstructions('${o.id}')">
              🚚 Delivery Notes
            </button>
          </div>
        </div>
      `;
    }

    // 4. Human Agent Handoff Widget
    if (response.type === 'human_handoff') {
      return `
        <div class="agent-handoff-card">
          <div class="handoff-header">
            <div class="handoff-avatar">ER</div>
            <div>
              <div class="handoff-title">${response.agentName}</div>
              <div class="handoff-status">● Assigned Senior Concierge</div>
            </div>
          </div>
          <div class="handoff-meta">
            <span>Ticket: <strong>${response.ticketId}</strong></span>
            <span>Est. Wait: <strong>${response.waitTime}</strong></span>
          </div>
          <button class="btn-handoff-connect" onclick="window.connectToAgent('${response.ticketId}')">
            Enter Live Secure Channel
          </button>
        </div>
      `;
    }

    // 5. Store Policy / Warranty Card
    if (response.type === 'policy_card') {
      const bulletsHtml = response.bullets.map(b => `<li style="margin-bottom: 4px;">${b}</li>`).join('');
      return `
        <div class="order-tracking-card" style="border-left: 3px solid var(--brand-primary);">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">
            🛡️ Official AuraStyle Guarantee:
          </div>
          <ul style="font-size: 0.78rem; color: var(--text-secondary); padding-left: 18px; line-height: 1.4;">
            ${bulletsHtml}
          </ul>
        </div>
      `;
    }

    // 6. Active Promo Codes List
    if (response.type === 'promo_codes' && response.promos) {
      const promosList = response.promos.map(p => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 8px 12px; margin-top: 6px;">
          <div>
            <span style="font-family: var(--font-mono); font-weight: 800; font-size: 0.82rem; color: var(--brand-primary);">${p.code}</span>
            <div style="font-size: 0.7rem; color: var(--text-secondary);">${p.discount}</div>
          </div>
          <button class="btn-tracking-pill" style="flex: none; padding: 4px 10px;" onclick="window.applyPromoCode('${p.code}')">
            Copy Code
          </button>
        </div>
      `).join('');

      return `
        <div class="order-tracking-card">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
            🏷️ Available Store Vouchers:
          </div>
          ${promosList}
        </div>
      `;
    }

    return '';
  }

  // Append a User Message to the Chat DOM
  function appendUserMessage(text) {
    const user = engine.getCurrentUser();
    const timeStr = formatCurrentTime();

    const row = document.createElement('div');
    row.className = 'message-row user-message';
    row.innerHTML = `
      <div class="msg-avatar user-msg-avatar" style="background: ${user.avatarGradient};">
        ${user.initials}
      </div>
      <div class="msg-content-wrap">
        <div class="message-bubble">
          <p>${escapeHtml(text)}</p>
        </div>
        <span class="msg-time">${timeStr}</span>
      </div>
    `;

    chatMessages.appendChild(row);
    sound.playPop('sent');
    scrollToBottom();
  }

  // Append a Bot Message to the Chat DOM
  function appendBotMessage(response) {
    const timeStr = formatCurrentTime();
    const widgetHtml = createBotWidgetMarkup(response);

    const row = document.createElement('div');
    row.className = 'message-row bot-message';
    row.innerHTML = `
      <div class="msg-avatar bot-msg-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <div class="msg-content-wrap">
        <div class="message-bubble">
          ${renderMarkdownText(response.message || '')}
          ${widgetHtml}
        </div>
        <span class="msg-time">${timeStr}</span>
      </div>
    `;

    chatMessages.appendChild(row);
    sound.playPop('received');
    scrollToBottom();

    // Update sticky quick chips with fresh context
    if (response.chips) {
      setQuickChips(response.chips);
    }
  }

  // Handle User Message Submission Flow
  async function handleUserMessageSubmission(customText = null) {
    if (isTyping) return;

    const text = customText !== null ? customText : chatTextarea.value.trim();
    if (!text) return;

    // Reset textarea
    chatTextarea.value = '';
    chatTextarea.style.height = 'auto';

    // 1. Add user message
    appendUserMessage(text);

    // 2. Show live querying typing indicator
    isTyping = true;
    typingIndicator.style.display = 'flex';
    headerStatusText.textContent = 'Querying live DB...';
    scrollToBottom();

    // 3. Process query via Mock Engine
    try {
      const response = await engine.processQuery(text);

      // Hide typing indicator
      typingIndicator.style.display = 'none';
      isTyping = false;
      headerStatusText.textContent = 'Online • Live DB Connected';

      // 4. Render response
      appendBotMessage(response);
    } catch (err) {
      console.error(err);
      typingIndicator.style.display = 'none';
      isTyping = false;
      headerStatusText.textContent = 'Online • Live DB Connected';
      appendBotMessage({
        type: 'text',
        message: 'Sorry, I encountered a brief synchronization delay with our database. Please try again.',
        chips: ['Retry Request', 'Track Order #ORD-98231', 'Check Item Stock']
      });
    }
  }

  // Initial Welcome Greeting Sequence
  function loadInitialWelcomeMessage() {
    chatMessages.innerHTML = '';
    const user = engine.getCurrentUser();
    const activeOrder = engine.getActiveOrder();

    const welcomeData = {
      type: 'text',
      message: `Hello **${user.name}**! 👋 Welcome to **AuraStyle Concierge**. I am connected directly to our warehouse inventory and live courier tracking feeds. How can I assist your shopping today?`,
      chips: [
        activeOrder ? `Track Order #${activeOrder.id}` : 'Track Order #ORD-98231',
        'Check Headphones Stock',
        'Available Promo Codes',
        'Speak to Human Agent'
      ]
    };

    appendBotMessage(welcomeData);
  }

  // Global helper functions attached to window for interactive card buttons
  window.triggerProductAction = function(productName, action) {
    if (action === 'add') {
      showToast(`🛒 "${productName}" added to your cart!`);
      // Update cart count badge in store header
      const cartCountBadge = document.querySelector('.cart-count');
      if (cartCountBadge) {
        cartCountBadge.textContent = parseInt(cartCountBadge.textContent || '0') + 1;
      }
      sound.playPop('received');
    } else {
      handleUserMessageSubmission(`Show full specifications and stock for ${productName}`);
    }
  };

  window.copyTracking = function(code) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        showToast(`📋 Tracking code ${code} copied to clipboard!`);
      }).catch(() => {
        showToast(`Tracking: ${code}`);
      });
    } else {
      showToast(`Tracking: ${code}`);
    }
  };

  window.requestDeliveryInstructions = function(orderId) {
    handleUserMessageSubmission(`I would like to add delivery instructions for order #${orderId}`);
  };

  window.applyPromoCode = function(code) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    showToast(`🎟️ Code "${code}" copied! Discount applied at checkout.`);
  };

  window.connectToAgent = function(ticketId) {
    showToast(`Connecting to Elena Rostova (${ticketId})...`);
    setTimeout(() => {
      appendBotMessage({
        type: 'text',
        message: `**Live Support Agent Connected** 🎧\n\nElena Rostova: _"Hi ${engine.getCurrentUser().name}! I have your active order #${engine.getActiveOrder() ? engine.getActiveOrder().id : '98231'} open in front of me. How can I help make your experience smoother today?"_`,
        chips: ['Update Shipping Address', 'Product Warranty Query', 'Issue a Return Label']
      });
    }, 1200);
  };

  // Switch Active Test User / Order Context Handler
  userOrderSelect.addEventListener('change', (e) => {
    const selectedUserId = e.target.value;
    engine.setUser(selectedUserId);
    const user = engine.getCurrentUser();

    // Update Storefront Header User Badge
    if (headerUserAvatar && headerUserName) {
      headerUserAvatar.textContent = user.initials;
      headerUserAvatar.style.background = user.avatarGradient;
      headerUserName.textContent = `${user.name} (${user.tier.split(' ')[0]})`;
    }

    showToast(`Switched profile to: ${user.name}`);

    // Post an announcement in chat
    const orderText = user.activeOrderId 
      ? `Active Order synchronized: **#${user.activeOrderId}**` 
      : `No active orders currently pending.`;

    appendBotMessage({
      type: 'text',
      message: `🔄 **Active Customer Context Updated**\n\nSwitched session to **${user.name}** (${user.tier}). ${orderText}`,
      chips: [
        user.activeOrderId ? `Track Order #${user.activeOrderId}` : 'Browse Catalog',
        'Check Item Stock',
        'Check Deals & Promos'
      ]
    });
  });

  // Sound Toggle Handler
  btnSoundToggle.addEventListener('click', () => {
    const isNowOn = sound.toggle();
    const iconOn = btnSoundToggle.querySelector('.icon-sound-on');
    const iconOff = btnSoundToggle.querySelector('.icon-sound-off');

    if (isNowOn) {
      iconOn.style.display = 'block';
      iconOff.style.display = 'none';
      showToast('🔊 Audio sound feedback enabled');
      sound.playPop('sent');
    } else {
      iconOn.style.display = 'none';
      iconOff.style.display = 'block';
      showToast('🔇 Audio sound feedback muted');
    }
  });

  // Clear Chat Handler
  btnClearChat.addEventListener('click', () => {
    loadInitialWelcomeMessage();
    showToast('Conversation cleared and reset.');
  });

  // Textarea Auto-expand & Enter-to-send
  chatTextarea.addEventListener('input', () => {
    chatTextarea.style.height = 'auto';
    chatTextarea.style.height = Math.min(chatTextarea.scrollHeight, 110) + 'px';
  });

  chatTextarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserMessageSubmission();
    }
  });

  btnSendMessage.addEventListener('click', () => {
    handleUserMessageSubmission();
  });

  // Simulated Voice Mic Input
  btnVoiceInput.addEventListener('click', () => {
    btnVoiceInput.classList.toggle('listening');
    if (btnVoiceInput.classList.contains('listening')) {
      showToast('🎙️ Simulated speech input: Listening...');
      chatTextarea.setAttribute('placeholder', 'Listening... Say something like "Where is my order?"');

      setTimeout(() => {
        btnVoiceInput.classList.remove('listening');
        chatTextarea.setAttribute('placeholder', "Ask Aura anything (e.g., 'Track #98231' or 'Stock on Headphones')...");
        const simulatedVoicePrompt = "Where is my active order right now?";
        chatTextarea.value = simulatedVoicePrompt;
        showToast('🎙️ Voice captured: "Where is my active order right now?"');
        setTimeout(() => {
          handleUserMessageSubmission();
        }, 600);
      }, 2200);
    }
  });

  // Storefront & Header Chat Launcher Triggers
  launcherBtn.addEventListener('click', toggleChat);
  btnCloseChat.addEventListener('click', closeChat);

  if (heroOpenChatBtn) {
    heroOpenChatBtn.addEventListener('click', () => {
      openChat();
    });
  }

  if (searchAssistantBtn) {
    searchAssistantBtn.addEventListener('click', () => {
      const q = storeSearchInput ? storeSearchInput.value.trim() : '';
      openChat();
      if (q) {
        handleUserMessageSubmission(`Search products and stock for: ${q}`);
      }
    });
  }

  if (tooltipCloseBtn) {
    tooltipCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      launcherTooltip.style.display = 'none';
    });
  }

  // Simple Markdown & Safe HTML Formatter
  function escapeHtml(string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderMarkdownText(text) {
    if (!text) return '';
    let rendered = text;

    // Bold **text**
    rendered = rendered.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic _text_
    rendered = rendered.replace(/_(.*?)_/g, '<em>$1</em>');
    // Inline code `code`
    rendered = rendered.replace(/`(.*?)`/g, '<code>$1</code>');
    // Line breaks to paragraphs / br
    rendered = rendered.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');

    return rendered;
  }

  // Initialize page
  renderStorefrontCatalog();
  loadInitialWelcomeMessage();
});
