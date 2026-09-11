# Festival Hero Image — Upload Guide

## How It Works

The website automatically detects festival banners. No code changes needed — just upload/delete image files.

```
assets/
├── hero.jpg              ← Always present (default travel photo — Taj Mahal etc.)
├── festival.jpg          ← Upload during festivals (desktop banner)
└── festival-mobile.jpg   ← Upload during festivals (mobile banner)
```

| What the website does | When |
|----------------------|------|
| Shows `hero.jpg` + "Explore All of India" text + dark overlay | `festival.jpg` does NOT exist |
| Shows `festival.jpg` (desktop) or `festival-mobile.jpg` (mobile), no text overlay | `festival.jpg` EXISTS in assets folder |

---

## Image Sizes to Request

| File | Size (pixels) | Aspect Ratio | For |
|------|--------------|--------------|-----|
| `festival.jpg` | **1920 x 1080** | 16:9 landscape | Desktop / Laptop |
| `festival-mobile.jpg` | **1080 x 1920** | 9:16 portrait | Mobile phones |

**Both files are required during festivals.** If only `festival.jpg` is uploaded, desktop works but mobile may not look ideal.

---

## Sample Prompts for Gemini / ChatGPT Image Generation

### Desktop Banner (festival.jpg — 1920x1080)

**Ganesh Chaturthi:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy Ganesh Chaturthi.
Include: Lord Ganesha idol, South Indian temple, a Maruti Ertiga car, scenic road, sunset.
Text on image: "Ganesh Holidays wishes you a Happy Ganesh Chaturthi"
Small text: "New Journeys, More Blessings"
Style: Warm golden light, premium travel brand, festive feel.
Colors: Blue, gold, green, sunset orange.
```

**Diwali:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy Diwali.
Include: Diwali diyas/lamps, Indian travel landmarks, fireworks, a car on scenic road.
Text on image: "Ganesh Holidays Wishes You a Happy Diwali"
Small text: "Travel with Light, Travel with Joy"
Style: Warm golden light, festive, premium travel brand.
Colors: Deep blue background, gold, orange, warm tones.
```

**Pongal:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy Pongal.
Include: Pongal pot with sugarcane, sunrise, South Indian landscape, temple, car.
Text on image: "Ganesh Holidays Wishes You a Happy Pongal"
Small text: "Celebrate with a Journey"
Style: Warm sunrise tones, festive, traditional South Indian feel.
Colors: Orange, yellow, green, earth tones.
```

**Onam:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy Onam.
Include: Kerala backwaters, Onam pookalam (flower rangoli), boat, scenic nature.
Text on image: "Ganesh Holidays Wishes You a Happy Onam"
Small text: "Journey Through God's Own Country"
Style: Lush green, vibrant flowers, tropical feel, premium brand.
Colors: Green, yellow, white, gold.
```

**Christmas / New Year:**
```
Generate a professional travel brand banner, 1920x1080 pixels, 16:9 landscape.
Theme: Happy New Year 2027.
Include: Indian travel landmarks, fireworks, celebration, car on highway.
Text on image: "Ganesh Holidays Wishes You a Happy New Year 2027"
Small text: "New Year, New Destinations"
Style: Night scene, fireworks, celebratory, premium travel brand.
Colors: Deep blue, gold, silver, sparkles.
```

### Mobile Banner (festival-mobile.jpg — 1080x1920)

Use the **same prompt** as above but change the first line to:
```
Generate a professional travel brand banner, 1080x1920 pixels, 9:16 portrait (vertical).
```

Keep the same theme, text, and elements — just in vertical layout.

---

## Step-by-Step: Upload Festival Banner

### During Festival

1. **Generate 2 images** from Gemini/ChatGPT using the prompts above
2. **Save them as:**
   - Desktop version → `festival.jpg`
   - Mobile version → `festival-mobile.jpg`
3. **Upload to GitHub:**

   **Option A: Git (from laptop)**
   ```cmd
   cd "D:\Users\q68373\OneDrive - Delta Air Lines\KIRO\Kanna_Projects\Website_GH\GH_tile_scroll"
   git add assets/festival.jpg assets/festival-mobile.jpg
   git commit -m "Added Diwali festival banner"
   git push
   ```

   **Option B: GitHub browser (from phone/laptop)**
   1. Go to https://github.com/ganeshholidays/ganeshholidays.github.io
   2. Navigate to `assets/` folder
   3. Click **Add file → Upload files**
   4. Upload both `festival.jpg` and `festival-mobile.jpg`
   5. Click **Commit changes**

4. **Wait 1 minute** — website auto-shows festival banner!

### After Festival (Remove Banner)

1. **Delete the files from GitHub:**

   **Option A: Git (from laptop)**
   ```cmd
   cd "D:\Users\q68373\OneDrive - Delta Air Lines\KIRO\Kanna_Projects\Website_GH\GH_tile_scroll"
   git rm assets/festival.jpg assets/festival-mobile.jpg
   git commit -m "Removed festival banner"
   git push
   ```

   **Option B: GitHub browser**
   1. Go to repo → `assets/festival.jpg`
   2. Click the **three dots (...)** → **Delete file** → Commit
   3. Repeat for `festival-mobile.jpg`

2. **Wait 1 minute** — website auto-shows regular hero image!

---

## Quick Checklist for Festival Update

```
☐ Generate desktop banner (1920x1080) → save as festival.jpg
☐ Generate mobile banner (1080x1920) → save as festival-mobile.jpg
☐ Upload both to assets/ folder on GitHub
☐ Check website on laptop — banner visible?
☐ Check website on phone — banner visible?
☐ After festival — delete both files from GitHub
☐ Check website — regular hero image is back?
```

---

## Upcoming Festivals Calendar (Plan Ahead)

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

- **hero.jpg must always be present** — this is the fallback when no festival banner exists
- **Both festival.jpg AND festival-mobile.jpg should be uploaded together** for the best experience
- **File names are case-sensitive** — use exactly `festival.jpg` and `festival-mobile.jpg` (lowercase)
- **File format:** JPG is preferred (smaller file size). PNG also works but may be larger
- **File size:** Keep each image under **500KB** for fast loading. If Gemini generates a larger file, compress it at https://tinyjpg.com (free)
- **Browser cache:** After uploading/deleting, if the change doesn't show immediately, clear browser cache (Ctrl+Shift+R on laptop, or clear cache in mobile browser settings)
