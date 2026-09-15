# Hero Page — Complete Guide

## Priority Chain (Automatic)

The website checks for files in this order and loads the first one found:

```
1. festival.jpg exists?        → Festival Mode
        ↓ (not found)
2. hero-video.mp4 exists?      → Video Mode
        ↓ (not found or slow load > 10 sec)
3. hero.jpg exists?            → Hero Fallback Mode (same look as video)
        ↓ (not found)
4. hero-default.jpg            → Normal Mode (full screen + text overlay)
```

---

## Files

| File | Size | Required? | Purpose |
|------|------|-----------|---------|
| `assets/hero/hero-default.jpg` | 1920 x 1080 (16:9) | **YES — always keep** | Final fallback. Taj Mahal with "Explore All of India" text overlay |
| `assets/hero/hero.jpg` | 1920 x 1080 (16:9) | Optional | Video fallback image. Shows when video is slow/unavailable. Same size/fit as video (no text overlay) |
| `assets/hero/hero-video.mp4` | 1920 x 1080 (16:9), under 5MB, 5-8 sec | Optional | Auto-playing video hero |
| `assets/hero/festival.jpg` | 1920 x 1080 (16:9) | Optional | Festival banner (highest priority) |

---

## What Each Mode Shows

### Festival Mode (`festival.jpg`)

| | Desktop | Mobile |
|---|---------|--------|
| Height | Fills viewport below header | Natural landscape height |
| Fit | `object-fit: cover` (crops bottom) | `object-fit: contain` (full image) |
| Text overlay | Hidden | Hidden |
| Dark overlay | Hidden | Hidden |
| Scroll arrow | Hidden | Hidden |

### Video Mode (`hero-video.mp4`)

| | Desktop | Mobile |
|---|---------|--------|
| Height | Fills viewport below header (`100vh - 70px`) | Natural landscape height |
| Fit | `object-fit: cover` (crops bottom) | `object-fit: contain` (full video) |
| Text overlay | Hidden | Hidden |
| Dark overlay | Hidden | Hidden |
| Scroll arrow | ✅ Bouncing down arrow (desktop only) | Hidden |
| Fallback | After 10 sec timeout → loads `hero.jpg` | Same |

### Hero Fallback Mode (`hero.jpg`)

| | Desktop | Mobile |
|---|---------|--------|
| Height | Fills viewport below header (`100vh - 70px`) | Natural landscape height |
| Fit | Image fills from top, bottom cropped | Full image visible |
| Text overlay | Hidden | Hidden |
| Dark overlay | Hidden | Hidden |
| Scroll arrow | ✅ Bouncing down arrow (desktop only) | Hidden |

**Use this for:** An image that has text/design baked in (like the video). Example: a Canva-designed banner or AI-generated image with "Ganesh Holidays" text on it.

### Normal Mode (`hero-default.jpg`)

| | Desktop | Mobile |
|---|---------|--------|
| Height | Full viewport (`100vh`) | Full viewport |
| Fit | `object-fit: cover` | `object-fit: cover` |
| Text overlay | ✅ "Explore All of India With Us" + subtitle + button | Same |
| Dark overlay | ✅ Dark blue tint | Same |
| Scroll arrow | Hidden | Hidden |

**Use this for:** A plain travel photo (Taj Mahal, temple, etc.) where the website adds text on top.

---

## How to Use Each Mode

### I want a VIDEO hero
1. Create/download video (1920x1080, under 5MB, 5-8 sec, no audio)
2. Save as `assets/hero-video.mp4`
3. Also upload a still image as `assets/hero.jpg` (video fallback for slow internet)
4. Push to GitHub
5. Website auto-plays video. If video is slow, shows `hero.jpg` after 10 sec.

### I want a FESTIVAL banner
1. Generate banner from Gemini/ChatGPT (1920x1080, landscape)
2. Save as `assets/festival.jpg`
3. Push to GitHub
4. Website shows festival banner (overrides video and everything else)

### Festival is over — remove banner
1. Delete `assets/festival.jpg` from GitHub
2. Website auto-falls back to video → hero.jpg → hero-default.jpg

### I want just a STATIC IMAGE (no video)
1. Delete `assets/hero-video.mp4` from GitHub (if exists)
2. Upload your image as `assets/hero.jpg` (if it has text baked in)
3. Or just let it fall back to `hero-default.jpg` (Taj Mahal + website text)

### I want to change the DEFAULT hero image
1. Replace `assets/hero-default.jpg` with your new photo
2. This is the final fallback — always present, always works
3. Website shows "Explore All of India With Us" text overlay on top

---

## Image Specifications

### For hero.jpg and hero-default.jpg
- **Resolution:** 1920 x 1080 pixels
- **Aspect ratio:** 16:9 landscape
- **Format:** JPG
- **File size:** Under 500KB (compress at https://tinyjpg.com)

### For hero-video.mp4
- **Resolution:** 1920 x 1080 pixels
- **Aspect ratio:** 16:9 landscape
- **Format:** MP4
- **Duration:** 5-8 seconds (loops automatically)
- **Audio:** No audio (muted)
- **File size:** Under 5MB (compress at https://www.freeconvert.com/video-compressor)

### For festival.jpg
- **Resolution:** 1920 x 1080 pixels
- **Aspect ratio:** 16:9 landscape
- **Format:** JPG
- **File size:** Under 500KB
- **Text placement:** Keep important text in the center (edges may be cropped on desktop)

---

## Gemini/ChatGPT Prompts for Images

### hero.jpg (video fallback — designed banner)
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Brand: Ganesh Holidays — South India's trusted road travel partner.
Include: Scenic Indian road, car (Maruti Ertiga), mountains or temple, warm lighting.
Text on image: "Your Journey, Our Commitment"
Small text: "We Turn Miles Into Memories"
Style: Premium, cinematic, warm golden light.
Keep all text centered.
```

### hero-default.jpg (plain travel photo for text overlay)
No need to generate — use a free photo from Pexels/Unsplash:
- Taj Mahal, Meenakshi Temple, Kerala backwaters, etc.
- Download at 1920x1080
- No text needed — the website adds text overlay automatically

### Festival banners
See `Documents/Festival_Hero_Image_Guide.md` for festival-specific prompts.

---

## Fallback Timeline

```
Page loads
    ↓
Check festival.jpg ──── found? ──→ Show festival banner
    ↓ (not found)
Check hero-video.mp4
    ↓
    ├── Video loads in < 10 sec ──→ Play video
    ├── Video loads but autoplay blocked ──→ Show hero.jpg
    ├── Video file not found ──→ Show hero.jpg
    └── 10 seconds pass, no video ──→ Show hero.jpg
    ↓
Check hero.jpg ──── found? ──→ Show hero.jpg (same size as video, no text)
    ↓ (not found)
Show hero-default.jpg ──→ Full screen + "Explore All of India" text
```

---

## Current Files on the Website

| File | Content | Status |
|------|---------|--------|
| `hero-default.jpg` | Taj Mahal photo | ✅ Always present |
| `hero.jpg` | (Upload your designed banner) | Optional |
| `hero-video.mp4` | (Upload your Canva/Pexels video) | Optional |
| `festival.jpg` | (Upload during festivals only) | Optional |

All files go in `assets/hero/` folder.

---

## Quick Reference

| I want to... | Upload/Delete |
|--------------|--------------|
| Show video | Upload `hero-video.mp4` + `hero.jpg` to `assets/hero/` |
| Show festival banner | Upload `festival.jpg` to `assets/hero/` |
| Remove festival | Delete `festival.jpg` from `assets/hero/` |
| Remove video | Delete `hero-video.mp4` from `assets/hero/` |
| Change default image | Replace `hero-default.jpg` in `assets/hero/` |
| Change video fallback image | Replace `hero.jpg` in `assets/hero/` |


---

## How to Create a Poster in Canva

### Step 1: Open Canva
1. Go to https://www.canva.com (login or create free account)
2. Click **Create a design** → **Custom size**
3. Enter: **1920** width x **1080** height (pixels)
4. Click **Create new design**

### Step 2: Design Your Poster

**For hero.jpg (video fallback / designed banner):**
1. Left panel → **Elements** → search `travel India road`
2. Pick a background photo
3. Click **Text** → **Add a heading**
4. Type: `Your Journey, Our Commitment`
5. Font: **Sora Bold** or **Playfair Display**
6. Color: **White (#FFFFFF)**
7. Add subheading: `We Turn Miles Into Memories`
8. Optional: Upload your logo (`logo.png`)

**For festival.jpg:**
1. Left panel → **Elements** → search `diwali` or `pongal` etc.
2. Pick festive backgrounds/elements
3. Add text: `Ganesh Holidays Wishes You a Happy Diwali`
4. Add your logo

### Step 3: Keep Text Centered
**Important:** Keep all text and important elements in the **center area** of the design. On desktop, the edges/bottom may get cropped. On mobile, the full image shows.

```
┌──────────────────────────────────────────┐
│  edge    │  ★ SAFE ZONE ★  │    edge    │
│ (may     │  Keep all text   │  (may      │
│  crop)   │  and logos here  │   crop)    │
│          │                  │            │
│          │                  │            │
│──────────│──────────────────│────────────│
│          │  bottom may crop on desktop   │
└──────────────────────────────────────────┘
```

### Step 4: Export
1. Click **Share** → **Download**
2. File type: **PNG** or **JPG**
3. Click **Download**
4. Rename to `hero.jpg` or `festival.jpg` as needed
5. If file is over 500KB, compress at https://tinyjpg.com

### Step 5: Upload
1. Upload to `assets/hero/` folder on GitHub
2. Website picks it up automatically

---

## Sample Canva Design Prompts (for Gemini/ChatGPT Image Generation)

### hero.jpg — Designed Banner
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Brand: Ganesh Holidays — South India's trusted road travel partner.
Include: Scenic Indian road, car (Maruti Ertiga), mountains or temple, warm lighting.
Text on image: "Your Journey, Our Commitment"
Small text: "We Turn Miles Into Memories"
Style: Premium, cinematic, warm golden light.
Keep all text centered.
```

### Festival Banners

**Ganesh Chaturthi:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy Ganesh Chaturthi.
Include: Lord Ganesha idol, South Indian temple, car, scenic road, sunset.
Text on image: "Ganesh Holidays wishes you a Happy Ganesh Chaturthi"
Small text: "New Journeys, More Blessings"
Style: Warm golden light, premium travel brand, festive feel.
Keep all text centered.
```

**Diwali:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy Diwali.
Include: Diwali diyas/lamps, Indian travel landmarks, fireworks, car on scenic road.
Text on image: "Ganesh Holidays Wishes You a Happy Diwali"
Small text: "Travel with Light, Travel with Joy"
Style: Warm golden light, festive, premium travel brand.
Keep all text centered.
```

**Pongal:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy Pongal.
Include: Pongal pot with sugarcane, sunrise, South Indian landscape, temple, car.
Text on image: "Ganesh Holidays Wishes You a Happy Pongal"
Small text: "Celebrate with a Journey"
Style: Warm sunrise tones, festive, traditional South Indian feel.
Keep all text centered.
```

**Onam:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy Onam.
Include: Kerala backwaters, Onam pookalam (flower rangoli), boat, scenic nature.
Text on image: "Ganesh Holidays Wishes You a Happy Onam"
Small text: "Journey Through God's Own Country"
Style: Lush green, vibrant flowers, tropical feel, premium brand.
Keep all text centered.
```

**Christmas / New Year:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy New Year 2027.
Include: Indian travel landmarks, fireworks, celebration, car on highway.
Text on image: "Ganesh Holidays Wishes You a Happy New Year 2027"
Small text: "New Year, New Destinations"
Style: Night scene, fireworks, celebratory, premium travel brand.
Keep all text centered.
```

---

## Upcoming Festivals Calendar

| Festival | Approx Date | Banner Theme |
|----------|-------------|-------------|
| Ganesh Chaturthi | Aug/Sep | Lord Ganesha, temple, blessings |
| Onam | Aug/Sep | Kerala, flowers, boat |
| Navratri | Sep/Oct | Durga, vibrant colors, dance |
| Diwali | Oct/Nov | Diyas, fireworks, golden light |
| Christmas | Dec 25 | Winter, celebration, landmarks |
| New Year | Jan 1 | Fireworks, new beginnings |
| Pongal / Sankranti | Jan 14-15 | Pongal pot, sunrise, harvest |
| Republic Day | Jan 26 | India Gate, tricolor, patriotic |
| Tamil New Year | Apr 14 | Traditional, kolam, fresh start |
| Independence Day | Aug 15 | Tricolor, landmarks, patriotic |

**Tip:** Generate banners 2-3 days before the festival so you're ready to upload on time.

---

## Important Notes

- **File size:** Keep images under **500KB** and videos under **5MB** for fast loading
- **Compress images:** Use https://tinyjpg.com (free)
- **Compress videos:** Use https://www.freeconvert.com/video-compressor (free)
- **File names are case-sensitive** — use exactly `festival.jpg`, `hero.jpg`, `hero-video.mp4`, `hero-default.jpg` (all lowercase)
- **Browser cache:** After uploading/deleting, if changes don't show, clear browser cache (Ctrl+Shift+R) or open in incognito
