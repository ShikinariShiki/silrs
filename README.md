# SILRS Mobile

**Patient-facing laboratory information, designed for a clearer everyday experience.**

SILRS Mobile is a mobile-first web prototype that brings laboratory results, examination history, upcoming appointments, and patient profile details into a single interface. It explores how a patient could find the information they need without navigating complex clinical software.

[**Explore the live prototype**](https://silrs-onbg.vercel.app)

## Experience

| Screen | What you can explore |
| --- | --- |
| Welcome & Sign In | An entry flow with a dedicated demo account |
| Dashboard | Quick access to reports, appointments, and activity updates |
| Lab Results | Searchable examination records with date and status filters |
| Report Details | Individual lab parameters, reported values, units, and reference ranges |
| Appointments | A calendar view and scheduled examination cards |
| Patient Profile | Contact information, editable profile details, and sign-out |

The application uses a blue-and-white mobile interface, persistent bottom navigation, concise information cards, and clear status labels to keep laboratory information easy to scan.

## Built With

- **HTML5** for the page structure
- **CSS3** for responsive layouts and visual styling
- **JavaScript** for navigation, interactions, and browser-based state
- **Font Awesome** for icons and **Google Fonts** for typography
- **Playwright** for Chromium-based browser checks
- **GitHub Actions** for automated checks on every change

## Run Locally

Clone the repository and start a local HTTP server:

```bash
git clone https://github.com/ShikinariShiki/silrs.git
cd silrs
python -m http.server 8000
```

Visit **http://localhost:8000** and enter through the sign-in screen. Demo access details are displayed directly in the application.

To run the automated checks, use Node.js 24:

```bash
npm ci
node tests/smoke.js
npx playwright install chromium
node tests/browser-smoke.js
```

## Project Structure

```text
silrs/
├── index.html                  # Welcome screen
├── login.html                  # Sign-in
├── dashboard.html              # Patient dashboard
├── hasil.html                  # Lab results
├── detail-pemeriksaan.html     # Report details
├── jadwal.html                 # Appointments
├── profil.html                 # Patient profile
├── css/                        # Page styles and shared refinements
├── js/                         # Interface logic and demo session handling
├── images/                     # Interface assets
├── tests/                      # Static and browser checks
└── .github/workflows/          # Continuous integration
```

## Design Focus

The interface organizes common laboratory tasks around the patient's journey: check a result, review its details, track an appointment, and manage basic profile information. Each screen is built to keep navigation predictable and essential information visible on smaller displays.

---

**SILRS Mobile** · Laboratory information interface concept
