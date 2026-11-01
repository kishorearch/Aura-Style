# AuraStyle E-Commerce Chatbot Interface

A modern, production-ready real-time E-Commerce Chatbot web interface built with clean HTML5, CSS3, and vanilla JavaScript across three modular files:
- [`index.html`](file:///c:/Users/kiya4/OneDrive/Desktop/chatbot/index.html)
- [`styles.css`](file:///c:/Users/kiya4/OneDrive/Desktop/chatbot/styles.css)
- [`app.js`](file:///c:/Users/kiya4/OneDrive/Desktop/chatbot/app.js)

Zero external UI frameworks, zero build steps, and fully compatible with **GitHub Pages** or direct local browsing.

---

## 🌟 Key Features

### 1. Floating Launcher & Chat Window
- **Floating Launcher Button:** Bottom-right corner trigger with animated notification badge, soft glow, and SVG open/close morphing transition.
- **Floating Tooltip Pill:** Contextual greeting prompt with a dismiss button that floats above the launcher.
- **Smooth Animations:** Slide-up and scale-in spring animations inspired by Intercom and Zendesk widgets.
- **Fully Responsive Drawer:** Transforms smoothly into a fullscreen bottom sheet drawer on mobile devices with safe-area support.

### 2. E-Commerce Layout Header & Live Context Switcher
- **Live Status Indicator:** Pulsing green beacon displaying real-time database connection status (`Online • Live DB Connected`).
- **Interactive User & Order Switcher:** Dynamic dropdown to instantly simulate different customer profiles and order states:
  - `Sarah Connor (VIP)` — Active Order `#ORD-98231` (*In Transit via FedEx*)
  - `Alex Rivera` — Active Order `#ORD-44912` (*Delivered via DHL*)
  - `Maya Lin` — Active Order `#ORD-77104` (*Processing via UPS*)
  - `Guest User` — *(No active orders)*
- **Header Actions:**
  - 🔄 **Clear Chat:** Reset conversation history with a fresh greeting.
  - 🔊 **Sound Toggle:** Turn synthesized message audio effects on/off.
  - ✕ **Minimize:** Close the chat window.

### 3. Interactive Chat Flow & Rich Widgets
- **Message Bubbles:** Distinct user and bot styles with avatar badges, sender initials, and real-time formatted timestamps.
- **Dynamic Quick Action Chips:** Context-aware interactive chips below bot messages and on a sticky bottom horizontal scrollbar.
- **Rich Interactive Widgets:**
  - 📦 **Order Tracking Stepper:** Complete vertical timeline showing order status, courier info, estimated delivery, package item summaries, copyable tracking code, and delivery notes.
  - 🛍️ **Product Mini-Cards:** High-resolution product images, pricing with discount strikethroughs, live inventory stock pills (*In Stock* / *Low Stock Alert*), and one-click "Add to Cart" with cart counter integration.
  - 🎧 **Human Agent Escalation Card:** Live handoff to a priority specialist (Elena Rostova) with queue position and estimated wait time.
  - 🏷️ **Store Promo Voucher Cards:** One-click copyable discount codes (e.g., `AURA20`).
  - 🛡️ **Return & Warranty Guarantee Card:** Clear breakdown of return window and instant authorizations.

### 4. Real-Time Query Simulation Engine (`app.js`)
- **Mock JSON Database:** Comprehensive dataset of live orders, inventory items with stock levels, user profiles, and promo codes.
- **Async Latency Simulation:** Simulates natural API/database latency with an animated 3-dot pulse typing indicator bubble.
- **Natural Language Intent Matching:** Handles order tracking, item stock inquiries, product discovery, coupon queries, warranty questions, and human escalation.
- **Web Audio API Feedback:** Crisp synthesized sound effects for sending and receiving messages without any external audio asset dependencies.

### 5. Input Area
- **Multi-line Textarea:** Auto-expands as you type with a clean character limit overflow.
- **Keyboard Shortcuts:** Press `Enter` to submit, `Shift + Enter` for a new line.
- **Simulated Voice Input:** Interactive microphone button that toggles listening animation, captures simulated voice speech, and submits the query.

---

## 🚀 How to Run & Preview

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (Python)
If Python is installed on your machine, open PowerShell in the directory and run:
```powershell
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 3: GitHub Pages Deployment
1. Initialize git and commit the 3 files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AuraStyle chatbot"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your site will be live at `https://<your-username>.github.io/<your-repo-name>/` in seconds.
