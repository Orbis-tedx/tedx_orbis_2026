# TEDxThe Orbis School — Official Event Website

**Theme: “The Extra in the Ordinary”**
An independently organised TED event at The Orbis School, Pune, India.

*Made by Tanmay Bhardwaj for The Orbis School.*

---

## 1. Overview

A four-page editorial website for TEDxThe Orbis School:

| # | Route      | Page                  | What's on it |
|---|------------|-----------------------|--------------|
| 1 | `/`        | Home                  | 3D hero, theme statement, six subtheme teasers, the required “What is TEDx?” text, organising team, closing CTA |
| 2 | `/apply`   | Speaker Registration  | Eight-step guided application → Google Sheets |
| 3 | `/theme`   | Theme                 | Typographic opening + accordion of the six subthemes |
| 4 | `/contact` | Contact               | Masthead-style contact index, venue card, social links, site map |

There are **no other pages**. (`/*` renders a small “dead end” fallback that links back to the four routes — it is not a content page.)

TED brand rules are respected: no TED logo, no TED conference imagery, no sponsor logos, no advertising. The wordmark is set in type only.

---

## 2. Tech stack

- **React 19 + Vite 7** (function components and hooks only)
- **Tailwind CSS v4** (design tokens declared in `@theme` inside `src/index.css`)
- **Custom CSS** in `src/index.css` for frosted glass, film grain, editorial easing, form fields
- **Framer Motion** — route transitions, accordion, scroll reveals
- **React Router v7** (`HashRouter`, see §7)
- **Three.js + @react-three/fiber** — the slowly rotating filament bulb on the homepage, lazy-loaded after first paint, with a drawn SVG fallback
- No component library — everything is bespoke.

---

## 3. Folder structure

```
├── index.html
├── .env.example
├── vercel.json / netlify.toml      # SPA rewrites
└── src
    ├── App.tsx                     # router + page transitions
    ├── index.css                   # tokens, glass, grain, field styles
    ├── assets/                     # drop real images here (see §8)
    ├── components
    │   ├── Nav.tsx  Footer.tsx  PageShell.tsx  Reveal.tsx
    │   ├── Wordmark.tsx  SocialIcons.tsx
    │   ├── Hero3D.tsx              # lazy loader + reduced-motion fallback
    │   └── BulbCanvas.tsx          # the three.js scene
    ├── data
    │   ├── subthemes.ts            # the six subthemes + copy + image names
    │   ├── team.ts                 # organising team placeholders
    │   ├── quotes.ts               # quotes shown in the application form
    │   └── site.ts                 # env-driven config with safe fallbacks
    └── pages
        ├── Home.tsx  Apply.tsx  ThemePage.tsx  Contact.tsx  NotFound.tsx
```

---

## 4. Running locally

```bash
npm install
cp .env.example .env      # then fill in real values
npm run dev               # http://localhost:5173
```

Production build:

```bash
npm run build             # outputs to /dist
npm run preview           # serve the build locally
```

Nothing crashes if `.env` is missing — every value falls back to a clearly marked placeholder such as `[EVENT DATE]` or `[EVENT EMAIL]`.

---

## 5. Environment variables

```
VITE_GOOGLE_SHEETS_WEB_APP_URL=your_google_apps_script_web_app_url_here
VITE_EVENT_DATE=YYYY-MM-DD
VITE_CONTACT_EMAIL=your_event_email_here
VITE_CONTACT_PHONE=+91 00000 00000
VITE_INSTAGRAM_URL=https://instagram.com/your_handle
VITE_LINKEDIN_URL=https://linkedin.com/company/your_page
VITE_FACEBOOK_URL=https://facebook.com/your_page
VITE_X_URL=https://x.com/your_handle
```

All are consumed in `src/data/site.ts`. No secret keys exist in the client bundle — Apps Script Web Apps don't need one.

---

## 6. Google Sheets integration (the full walkthrough)

### Step 1 — create the Sheet
Create a new Google Sheet named e.g. **TEDxTOS Speaker Applications**. Leave row 1 empty; the script writes headers for you on the first run.

### Step 2 — open Apps Script
In the Sheet: **Extensions → Apps Script**. Delete anything in `Code.gs` and paste this:

```javascript
/**
 * TEDxThe Orbis School — speaker application receiver.
 * Appends one row per submission, in field order, with a timestamp.
 */
const HEADERS = [
  'Timestamp',
  'First Name',
  'Last Name',
  'School',
  'Grade',
  'Date of Birth',
  'Phone Number',
  'Email ID',
  'About Yourself',
  'Sub Topic',
  'Idea Description',
  'Introduction',
  'Video Link (Google Drive)'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var d = {};
    if (e && e.postData && e.postData.contents) {
      try {
        d = JSON.parse(e.postData.contents);     // JSON body (what the site sends)
      } catch (err) {
        d = e.parameter || {};                   // urlencoded fallback
      }
    } else {
      d = (e && e.parameter) || {};
    }

    sheet.appendRow([
      d.timestamp || new Date().toISOString(),
      d.firstName || '',
      d.lastName || '',
      d.school || '',
      d.grade || '',
      d.dob || '',
      d.phone || '',
      d.email || '',
      d.about || '',
      d.subTopic || '',
      d.idea || '',
      d.introduction || '',
      d.videoLink || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('TEDxThe Orbis School endpoint is live.');
}
```

### Step 3 — deploy
**Deploy → New deployment → Type: Web app**
- Description: `TEDxTOS applications v1`
- **Execute as: Me**
- **Who has access: Anyone**
- Deploy → authorise the script → copy the **Web app URL** (`https://script.google.com/macros/s/…/exec`).

### Step 4 — wire it up
```
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/XXXX/exec
```
Add the same variable in your host's dashboard (Vercel → Settings → Environment Variables, or Netlify → Site settings → Environment) and redeploy.

> **Re-deploying the script:** after editing `Code.gs` you must run **Deploy → Manage deployments → edit → New version**, otherwise the old code keeps serving.

### CORS note / tradeoff
The site posts with `mode: "no-cors"` and a `text/plain` content type. This is the combination that works reliably against Apps Script from any origin without preflight failures — Apps Script redirects to `googleusercontent.com`, which breaks strict CORS requests.

The cost: the response is **opaque**, so the browser cannot read the script's JSON reply. The form therefore treats “no network error” as success. A genuine network failure (offline, wrong URL host) still throws and shows the error state. Always confirm the first few real submissions actually landed in the Sheet.

If you prefer a readable response, deploy the script and call it *without* `no-cors`; you'll need to accept that Apps Script's redirect can intermittently fail CORS in some browsers.

---

## 7. Routing & deployment

The app uses **`HashRouter`** (`/#/theme`, `/#/apply`, …). This guarantees that every route resolves on a direct visit or hard refresh on *any* static host — no server rewrite required. `vercel.json` and `netlify.toml` rewrites are also included, so if you switch `HashRouter` → `BrowserRouter` in `src/App.tsx` deep links will still work on Vercel/Netlify.

**Vercel:** import the repo → Framework preset “Vite” → build `npm run build`, output `dist` → add env vars → Deploy.
**Netlify:** New site from Git → build `npm run build`, publish `dist` → add env vars → Deploy. (`netlify.toml` already sets this.)

---

## 8. Swapping in real images

| What | Where | Notes |
|---|---|---|
| Subtheme images | `src/assets/subtheme-*.jpg` | Filenames are listed in `src/data/subthemes.ts` (`image` field). Add the file, then in `src/pages/ThemePage.tsx` replace the placeholder `<figure>` contents with `<img src={new URL(\`../assets/${s.image}\`, import.meta.url).href} alt="" />`. Recommended 1600×1280. |
| Team portraits | `src/assets/team-01.jpg` … | Set the `photo` field in `src/data/team.ts` to the imported path. While `photo` is `""`, a typographic monogram is shown, and a broken `src` is hidden gracefully. Recommended 1000×1250 (4:5). |

No image reference can render broken: every placeholder is styled, and the team `<img>` has an `onError` guard.

---

## 9. Editing content

- **Team members** → `src/data/team.ts` (name, role, one-line bio, photo). Array order = page order.
- **Quotes in the application** → `src/data/quotes.ts`. Only verifiable public-domain lines are attributed; anything uncertain is marked as such.
- **Subtheme copy** → `src/data/subthemes.ts` (title, teaser, body).
- **Contact details, date, socials** → `.env` (see §5), consumed by `src/data/site.ts`.
- **The required “What is TEDx?” paragraph** is in `src/pages/Home.tsx` and must stay verbatim.

---

## 10. Accessibility & performance

- Semantic landmarks, labelled form controls, `aria-invalid` / `aria-describedby` on every field, `role="alert"` errors, live word counters via `aria-live`.
- Full keyboard navigation, visible focus rings in the accent colour.
- `prefers-reduced-motion` disables the grain animation, transitions and 3D rotation.
- WebGL is feature-detected and skipped on low-core devices; the canvas mounts only after first paint, behind `React.lazy`.

---

## 11. Credits

**Made by Tanmay Bhardwaj for The Orbis School.**
This independent TEDx event is operated under license from TED.
