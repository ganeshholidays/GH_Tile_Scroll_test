# Ganesh Holidays - Complete Project Plan

## Overview

| Item | Detail |
|------|--------|
| **Website** | https://ganeshholidays.github.io |
| **Business** | All-India Tour & Travel Service (South India based) |
| **Languages** | Tamil (தமிழ்) and English — toggle in header |
| **Access** | Public — anyone with the URL can access |
| **Devices** | Auto-detects mobile/tablet/laptop and loads appropriate view |
| **Maintenance** | Minimal — photo/review management via Google Sheets |
| **Color Theme** | Dark Navy (#0f172a) + Gold (#f6ad55) |
| **Hosting** | GitHub Pages (free) |
| **Repository** | https://github.com/ganeshholidays/ganeshholidays.github.io |

---

## Current Status

| Feature | Status |
|---------|--------|
| Main website (index.html) | ✅ Live |
| Review form (review.html) | ✅ Live |
| Bilingual (EN/Tamil) | ✅ Working |
| Mobile responsive | ✅ Working |
| Desktop grid layout | ✅ Working |
| Swiper carousels (mobile) | ✅ Working |
| Gallery auto-scroll | ✅ Working |
| Touch pause on swipe | ✅ Working |
| Custom logo (transparent PNG) | ✅ Done |
| Google Sheets review system | ⏳ Pending setup |

---

## Hosting: GitHub Pages (FREE)

| Detail | Value |
|--------|-------|
| Platform | GitHub Pages |
| Cost | ₹0 forever |
| URL | https://ganeshholidays.github.io |
| Deploy method | Push to `main` branch → auto-deploys |
| SSL/HTTPS | Auto (free) |
| Uptime | 99.99% |
| Custom domain (future) | Can add `ganeshholidays.in` later |

**How deployment works:**
1. Edit files locally (or in Kiro IDE)
2. Push to GitHub (`git push`)
3. GitHub Pages auto-deploys in ~1 minute
4. Site is updated at https://ganeshholidays.github.io

---

## Bilingual Support (Tamil + English)

**How it works:**
- All text content is stored in `js/i18n.js` with translations
- Language toggle button in the header switches instantly (no page reload)
- User's language preference is saved in browser (remembered on next visit)
- Default language: English

**To add/edit translations:**
- Open `js/i18n.js`
- Find the key you want to change
- Update both `en` and `ta` values
- Push to GitHub

---

## Responsive Design

| Device | Screen Width | Layout |
|--------|-------------|--------|
| Mobile | < 768px | Single column, hamburger menu, swiper carousels |
| Tablet | 768px – 1024px | Two columns, compact nav |
| Desktop | > 1024px | Full 3-column grid, side-by-side content, hover effects |

**Key behaviors:**
- Navigation becomes hamburger menu (☰) on mobile
- Tiles show as swiper carousels on mobile, grid on desktop
- Gallery auto-scrolls on all devices
- Touch: pause for 5 seconds on swipe, then resume
- Images lazy-load for performance

---

## Website Sections

### Header / Navigation Bar (Fixed)
- Logo (transparent PNG, 50x50)
- Brand name: "GANESH HOLIDAYS"
- Tagline in gold: "YOUR JOURNEY, OUR COMMITMENT"
- Language toggle: [EN] [தமிழ்]
- Menu: Home | About | Services | Packages | Gallery | Reviews | Contact
- Mobile: Hamburger menu with slide-in panel

### 1. Hero Section
- Full-screen travel background (Taj Mahal)
- Company tagline
- CTA: "View Tour Packages"
- Smooth fade-in animation

### 2. About Section
- Company story
- Stats: Years in service, Happy customers, Destinations covered
- Animated counters on scroll

### 3. Services (6 tiles)
- Domestic Tours
- Pilgrimage Tours
- Holiday Packages
- Family Tours
- Corporate Travel
- Custom Itinerary
- Mobile: Swiper carousel | Desktop: 3-column grid

### 4. Popular Packages (6 tiles)
- Destination cards with image, name, duration, price
- "Enquire Now" button on each
- Mobile: Swiper carousel | Desktop: 3-column grid

### 5. Why Choose Us (6 tiles)
- Experienced drivers
- Well-maintained vehicles
- Transparent pricing
- 24/7 support
- Customizable plans
- All-India coverage
- Mobile: Swiper carousel | Desktop: 3-column grid

### 6. Travel Gallery
- Auto-scrolling photo carousel (both mobile and desktop)
- Photos loaded from `assets/photos.json`
- Desktop: 3 photos visible | Mobile: 1 photo
- Touch pause: 5 seconds then resumes

### 7. Customer Experiences (Reviews)
- Hardcoded reviews (3 initial)
- Google Sheets reviews (after setup — see Review_System_Guide.md)
- Star ratings, feedback text, customer name, trip destination
- Mobile: Swiper carousel | Desktop: 3-column grid

### 8. Contact Section
- Phone number (clickable)
- WhatsApp link
- Email
- Google Maps embed
- Enquiry form

### 9. Footer
- Logo + brand name
- Quick navigation links
- Social links (Instagram, Facebook, WhatsApp)
- Copyright

---

## Project File Structure

```
GH_tile_scroll/
├── index.html              ← Main website (all sections)
├── review.html             ← Customer feedback form (sharable link)
├── css/
│   └── style.css           ← All styling (responsive + animations)
├── js/
│   ├── main.js             ← Navigation, animations, swiper, gallery
│   └── i18n.js             ← Tamil/English translations
├── assets/
│   ├── logo.jpg            ← Logo file (always name as logo.jpg)
│   ├── favicon.svg         ← Browser tab icon
│   ├── photos.json         ← Gallery photo filenames list
│   └── gallery/            ← Gallery photos folder
│       ├── photo1.jpg
│       ├── photo2.jpg
│       └── ...
├── Documents/
│   ├── Project_Plan.md     ← This file
│   ├── Review_System_Guide.md ← How reviews work
│   └── Deployment_Guide.md ← How to deploy/update
└── (backup files)
    ├── index-bkp-original.html
    └── style-bkp-original.css
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Structure | HTML5 | Page layout |
| Styling | CSS3 (custom) | Responsive design, animations |
| Interactivity | Vanilla JavaScript | Language toggle, menu, counters |
| Carousels | Swiper.js (CDN) | Mobile tile scrolling, gallery |
| Fonts | Google Fonts (Sora, Josefin Sans, Noto Sans Tamil) | Typography |
| Icons | Font Awesome (CDN) | UI icons |
| Hosting | GitHub Pages | Free static hosting |
| Reviews | Google Sheets + Apps Script | Review storage & approval |
| Images | JPG/PNG, lazy-loaded | Fast loading |
| SSL | Auto (GitHub) | HTTPS security |

---

## Gallery Management

**How to add new gallery photos:**
1. Add the photo file to `assets/gallery/` folder
2. Open `assets/photos.json`
3. Add the filename to the JSON array
4. Push to GitHub → photo appears on the website

**photos.json format:**
```json
["photo1.jpg", "photo2.jpg", "photo3.jpg", "new-photo.jpg"]
```

---

## Review System (Summary)

Full details in: **Documents/Review_System_Guide.md**

**Quick overview:**
1. Send review link to customer: `https://ganeshholidays.github.io/review.html`
2. Customer fills and submits
3. Data goes to Google Sheet → you get email
4. Open sheet → type `YES` in Approved column
5. Review appears on website automatically

---

## Logo Management

**Current setup:** Logo referenced as `assets/logo.jpg` in HTML

**To update the logo:**
1. Save new logo as `logo.jpg` (overwrite the file)
2. Push to GitHub
3. Done — no code changes needed

**Tip:** If your logo needs transparency, save as PNG, rename to `logo.jpg`, or update the HTML reference to `logo.png`.

---

## How to Make Updates

### Change text content:
- Edit `js/i18n.js` for bilingual text
- Push to GitHub

### Change styling/colors:
- Edit `css/style.css`
- Push to GitHub

### Add gallery photos:
- Add file to `assets/gallery/`
- Update `assets/photos.json`
- Push to GitHub

### Update packages/services:
- Edit `index.html` directly
- Push to GitHub

---

## Cost Summary

| Item | Cost |
|------|------|
| GitHub Pages hosting | ₹0 (free forever) |
| Google Sheets (reviews) | ₹0 (free) |
| Domain (optional, future) | ₹500-800/year |
| SSL certificate | ₹0 (auto, free) |
| **Total current cost** | **₹0** |

---

## Future Enhancements (Can Be Added Later)

| Feature | Effort | Description |
|---------|--------|-------------|
| Custom domain | Low | Buy `ganeshholidays.in` and connect to GitHub Pages |
| Google Business reviews | Medium | Pull reviews from Google Maps listing |
| Online booking | Medium | Add payment gateway for package booking |
| Admin panel (CMS) | Medium | Upload photos without code using Decap CMS |
| WhatsApp chatbot | Medium | Auto-reply to enquiries |
| SEO optimization | Low | Meta tags, sitemap, structured data |
| Analytics | Low | Add Google Analytics for visitor tracking |
| Photo display from reviews | Medium | Show customer-uploaded photos on website |
