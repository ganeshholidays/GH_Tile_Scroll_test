# ganeshholidays.in — Domain Setup Guide

## What You Need Before Starting

| Item | Status |
|------|--------|
| Domain `ganeshholidays.in` purchased (BigRock/GoDaddy/Hostinger) | ☐ |
| GitHub repo live at `ganeshholidays.github.io` | ☐ Already done |
| Access to domain registrar's DNS settings | ☐ |
| 10 minutes of time | ☐ |

---

## Step 1: Add DNS Records at Your Domain Registrar

### If you bought from BigRock:

1. Login to https://www.bigrock.in → **My Orders** → click on `ganeshholidays.in`
2. Click **DNS Management** (or **Manage DNS**)
3. **Delete any existing A records** that point to BigRock's default servers
4. Add these **A Records** (one by one):

| Type | Host/Name | Value/Points To | TTL |
|------|-----------|----------------|-----|
| A | @ | `185.199.108.153` | 600 |
| A | @ | `185.199.109.153` | 600 |
| A | @ | `185.199.110.153` | 600 |
| A | @ | `185.199.111.153` | 600 |

5. Add this **CNAME Record**:

| Type | Host/Name | Value/Points To | TTL |
|------|-----------|----------------|-----|
| CNAME | www | `ganeshholidays.github.io` | 600 |

6. Click **Save** / **Add Record** after each entry

### If you bought from GoDaddy:

1. Login to https://www.godaddy.com → **My Products** → click **DNS** next to `ganeshholidays.in`
2. Under **Records**, delete any existing A record pointing to GoDaddy parking
3. Click **Add Record** and add the same 4 A records and 1 CNAME record as above
4. Save

### If you bought from Hostinger:

1. Login to https://hpanel.hostinger.com → **Domains** → click `ganeshholidays.in`
2. Go to **DNS / Nameservers** → **DNS Records**
3. Add the same 4 A records and 1 CNAME record as above
4. Save

---

## Step 2: Tell GitHub About Your Domain

1. Open browser → go to https://github.com/ganeshholidays/ganeshholidays.github.io
2. Click **Settings** (top menu, gear icon)
3. In the left sidebar, click **Pages**
4. Under **Custom domain**, type: `ganeshholidays.in`
5. Click **Save**
6. Wait a few seconds — GitHub will check DNS
7. Check the box: **✅ Enforce HTTPS**
   - If this option is grayed out, wait 10-15 minutes and come back — GitHub is generating your SSL certificate

---

## Step 3: Create CNAME File in Your Repository

GitHub needs a `CNAME` file in the root of your repo. You can create it:

### Option A: From laptop (Git)
```cmd
cd "D:\Users\q68373\OneDrive - Delta Air Lines\KIRO\Kanna_Projects\Website_GH\GH_tile_scroll"
echo ganeshholidays.in > CNAME
git add CNAME
git commit -m "Added custom domain CNAME"
git push
```

### Option B: From GitHub browser
1. Go to your repo → click **Add file** → **Create new file**
2. Filename: `CNAME` (all uppercase, no extension)
3. Content (just one line):
```
ganeshholidays.in
```
4. Click **Commit changes**

**Note:** GitHub may auto-create this file when you set the custom domain in Step 2. Check if it already exists before creating manually.

---

## Step 4: Wait for DNS Propagation

| What | Time |
|------|------|
| DNS changes to take effect | **1 to 24 hours** (usually 15-30 minutes) |
| HTTPS certificate generation | **10-30 minutes** after DNS is verified |

### How to check if it's working:

1. Open browser → go to `http://ganeshholidays.in`
   - If you see your website → DNS is working!
   - If you see "can't reach this site" → wait more, DNS is still propagating

2. After site loads, check HTTPS:
   - Go to `https://ganeshholidays.in`
   - You should see a lock icon (🔒) in the address bar
   - If you get a certificate error → wait 30 more minutes, GitHub is still generating the SSL cert

---

## Step 5: Verify Everything Works

Open these URLs and check:

| URL | Should Show |
|-----|------------|
| `https://ganeshholidays.in` | ✅ Your main website |
| `https://www.ganeshholidays.in` | ✅ Your main website (redirects) |
| `https://ganeshholidays.in/review.html` | ✅ Review form |
| `https://ganeshholidays.github.io` | ✅ Redirects to `ganeshholidays.in` |

### Test on mobile:
1. Open `https://ganeshholidays.in` on your phone
2. Check all sections load properly
3. Test language toggle (EN / தமிழ்)
4. Test review form submission

---

## After Setup: What Changes

| What | Before | After |
|------|--------|-------|
| Website URL | `ganeshholidays.github.io` | `ganeshholidays.in` |
| Review link for customers | `ganeshholidays.github.io/review.html` | `ganeshholidays.in/review.html` |
| Old URL | Still works | Auto-redirects to `.in` |
| Code changes | None needed | None needed |
| Push/deploy method | Same (`git push`) | Same (`git push`) |
| Cost | Free | ₹400-700/year (domain only) |
| Hosting | Still GitHub Pages (free) | Still GitHub Pages (free) |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Can't reach this site"** | DNS hasn't propagated yet. Wait 1-24 hours. Check DNS with https://dnschecker.org — enter `ganeshholidays.in` and verify A records show GitHub's IPs. |
| **"Your connection is not private" (HTTPS error)** | SSL certificate is still being generated. Wait 30 minutes. Go to GitHub → Settings → Pages → check "Enforce HTTPS" again. |
| **www.ganeshholidays.in doesn't work** | Make sure the CNAME record for `www` pointing to `ganeshholidays.github.io` is added in DNS settings. |
| **Site loads but looks broken (no CSS)** | Clear browser cache (Ctrl+Shift+R). If still broken, check that the CNAME file content is exactly `ganeshholidays.in` (no extra spaces or lines). |
| **GitHub Pages says "DNS check unsuccessful"** | DNS records haven't propagated yet. Wait and try again. Use https://dnschecker.org to verify. |
| **"Enforce HTTPS" checkbox is grayed out** | GitHub is still verifying DNS and generating the certificate. Wait 15-30 minutes and refresh the page. |
| **Old ganeshholidays.github.io URL still shows website** | This is normal — it auto-redirects to ganeshholidays.in. This is actually good (no broken links). |
| **Domain expired / not renewed** | Only `ganeshholidays.in` stops working. `ganeshholidays.github.io` continues to work forever (free). Renew the domain within 30-60 day grace period to get it back. |

---

## DNS Verification Tool

Use this free tool to check if your DNS records are set correctly:

1. Go to https://dnschecker.org
2. Enter: `ganeshholidays.in`
3. Select record type: **A**
4. Click **Search**
5. You should see `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` across all locations
6. Green checkmarks = DNS is propagated and working

---

## Updating the Review System Links

After domain setup, update the Google Apps Script email notification to include the new domain:

1. Open Google Sheet → **Extensions → Apps Script**
2. Find this line in the `doPost` function:
```
'Open Google Sheet to approve:\n' +
```
3. Make sure the sheet URL is correct (this doesn't need to change — it's a Google Sheets link)

Also update your WhatsApp message template for sharing the review link:
```
Old: https://ganeshholidays.github.io/review.html
New: https://ganeshholidays.in/review.html
```

---

## Quick Summary — Complete Steps

```
Step 1: Add 4 A records + 1 CNAME record at domain registrar
Step 2: Set custom domain in GitHub → Settings → Pages
Step 3: Create CNAME file in repo (if not auto-created)
Step 4: Wait 15 min to 24 hours for DNS propagation
Step 5: Verify https://ganeshholidays.in loads correctly
Done!
```

**Total time: 10 minutes of work + waiting for DNS**
**Cost: ₹0 (domain cost is separate — hosting remains free)**

---

## Annual Reminder

Your domain needs to be **renewed every year**. Set a reminder:

| What | When |
|------|------|
| Domain renewal reminder | **30 days before expiry** |
| Where to renew | Same registrar where you bought (BigRock/GoDaddy/Hostinger) |
| Cost | ₹600-900/year (renewal price) |
| What happens if not renewed | `ganeshholidays.in` stops working. `ganeshholidays.github.io` still works. 30-60 day grace period to renew. |

**Tip:** Enable auto-renewal at your registrar to avoid accidentally losing the domain.
