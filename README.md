# Ghovedika | గోవేదిక - Multilingual D2C E-Commerce & Admin Panel

Production-ready D2C Multilingual (Telugu & English) E-Commerce Platform and Master Control Admin Panel for **Ghovedika (గోవేదిక)**, featuring authentic Desi Cow products, bio-fertilizers, pooja essentials, traditional paddy decor, natural food, and household supplies.

## 🌿 Brand Information
- **Brand Name**: Ghovedika | గోవేదిక
- **Domain**: [www.ghovedika.store](http://www.ghovedika.store)
- **Email**: `ghovedika@gmail.com`
- **Phones**: `+91 8008588599`, `+91 9393935343`
- **Retail Store**: Opposite Bradipeta Bridge, Palakollu, West Godavari, Andhra Pradesh - 534260
- **Goshala Premises**: Vedangi–Vedangipalem, Poduru Mandal, West Godavari, Andhra Pradesh - 534260

---

## 🚀 Key Features

### 🛒 Customer E-Commerce Website
- **Multilingual i18n**: Database-driven real-time language switcher for **Telugu (తెలుగు)** using `Noto Sans Telugu` and **English** using `Poppins`.
- **26 Seeded Products across 5 Categories**:
  1. Bio-Fertilizers & Plant Nutrition (Growth Mix, Ghana & Drava Jeevamrutham, Agni Astram, Vermicompost, Cocopeat, etc.)
  2. Pooja & Spiritual Essentials (Gomaya Dhoop Sticks, Sambrani Cups, Vibhuti, Pidakal, Bhogi Danda, etc.)
  3. Traditional & Eco Decor (Paddy Tassels / Vari Kannulu, Door Torans, Bird Nests, Divine Frame, Coconut Broomsticks)
  4. Hygiene & Household (Gomaya Phenyl)
  5. Natural Food & Wellness (A2 Bilona Desi Cow Ghee, Wild Honey, Herbal Sunnipindi, Virgin Coconut Oil)
- **Product Details Page**: Multi-image gallery with zoom, variant selector, quantity stepper, stock badge, benefits bullet points, usage instructions, specifications table, FAQs, and related products slider.
- **Cart & Coupon Engine**: Slide-over cart drawer & dedicated cart page with coupon discount validation (`GHOVEDIKA10`, `DESICOW100`), free shipping progress bar, and real-time total calculations.
- **Checkout & Payments**: Full Indian address form with PIN code check, COD mode, and Razorpay online payment architecture integration.
- **Live Order Status Tracking**: Customer account order history & visual step-by-step progress tracker (Placed → Confirmed → Processing → Packed → Shipped → Out for Delivery → Delivered).
- **Floating WhatsApp Widget**: Instant WhatsApp chat button (`wa.me/918008588599`) with pre-filled Telugu/English inquiries.

---

### 👑 Master Control Admin Panel (`/admin`)
- **Protected Master Center**: Passcode authentication (`admin123` or `ghovedika8008`).
- **Executive Dashboard**: Real-time total revenue, order metrics, low stock warnings, recent orders table with status dropdown, and top-selling products.
- **Product CRUD**: Add, edit, duplicate, delete, and publish/disable products, prices, variants, stock, images, benefits, usage, specifications, FAQs, and SEO tags.
- **Category Management**: Add, edit, sort, and toggle active status for categories.
- **Order Management**: Search/filter orders, update timeline status, enter courier tracking numbers, add internal staff notes, and print tax invoices.
- **Inventory Oversight**: Real-time stock tracking with audit transaction logs.
- **Coupon Manager**: Percentage & flat discount coupons with minimum order caps and usage limits.
- **CMS & Banner Manager**: Hero banner slider editor, promo section manager, and static page content editor (About, Contact, Privacy, Terms, Shipping, Returns).
- **Global Settings**: Update brand phones (8008588599, 9393935343), email, addresses, Google Maps links, free shipping thresholds, COD toggles, and global SEO metadata.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Ghovedika Palette (`Noto Sans Telugu`, `#1E4D2B` Natural Green, `#8B4513` Earth Brown, `#FAF6EE` Warm Cream, `#C5A059` Gold)
- **Icons**: Lucide React
- **Database Layer**: Unified Firebase Firestore / Auth / Storage integration with persistent LocalStorage fallback.

---

## 📦 Setup & Development Instructions

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables (Optional for Firebase Sync)**:
   Copy `.env.example` to `.env` and fill in your Firebase credentials:
   ```bash
   cp .env.example .env
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build Production Bundle & Typecheck**:
   ```bash
   npm run build
   ```

---

## 🔒 Admin Credentials for Testing
- Navigate to: `http://localhost:5173/admin`
- Enter Passcode: `admin123` or `ghovedika8008`
