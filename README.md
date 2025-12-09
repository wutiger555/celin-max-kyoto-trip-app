# Kyoto Winter Sync ⛩️❄️

A minimalist, design-forward travel companion web app built for **Max & Celin's 2025 Winter Trip** to Kyoto and Osaka.

This application serves as a comprehensive digital itinerary, interactive map, and transportation guide, designed with a clean, "Japanese Modern" aesthetic optimized for mobile usage while exploring. It is capable of working offline as a Progressive Web App (PWA).

## ✨ Features

- **📱 Mobile-first PWA**: Installable on iOS/Android home screens with generic offline support.
- **🗾 Interactive Timeline**: A scrollable, detailed day-by-day itinerary.
- **🗺️ Dynamic Map**: Integrated Leaflet map visualizing the day's route and locations.
- **🚄 Traffic Guide**: A dedicated section for transportation information (trains, buses, etc.).
- **🌦️ Smart Dashboard**: 
    - Real-time weather integration (with graceful offline fallback).
    - Currency exchange calculator (with offline fallback rate).
- **🎨 Beautiful Aesthetics**: Custom design system featuring stone colors, serif typography, and smooth micro-interactions.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) v19 (TypeScript)
- **Build Tool**: [Vite](https://vitejs.dev/) v6
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3
- **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **PWA**: [Vite Plugin PWA](https://vite-pwa-org.netlify.app/)
- **Deployment**: GitHub Actions (auto-deploy to GitHub Pages)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wutiger555/celin-max-kyoto-trip-app.git
   cd celin-max-kyoto-trip-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   *(Note: This project uses Tailwind CSS v3. The `postinstall` setup handles the configuration.)*

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000/celin-max-kyoto-trip-app/` in your browser.

## 📱 How to Install (Mobile)

This app is designed to be added to your phone's home screen for the best experience.

1. **Visit the App URL** on your mobile browser (Safari for iOS, Chrome for Android).
2. **Follow the On-screen Prompt**:
   - The app will automatically detect if you are running in a browser.
   - A minimalist "Add to Home Screen" guide will appear after a few seconds.
3. **iOS**: Tap the "Share" button → Select "Add to Home Screen".
4. **Android**: Tap the menu (three dots) → Select "Install App" or "Add to Home screen".

## 📦 Deployment

This project is configured with **GitHub Actions** for automated deployment.

1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment**, set "Source" to **GitHub Actions**.
3. Push changes to the `main` or `master` branch.
    ```bash
    git push origin main
    ```
4. The workflow will build the project and deploy it to `https://wutiger555.github.io/celin-max-kyoto-trip-app/`.

## 📁 Project Structure

```
├── .github/workflows # GitHub Actions for deployment
├── components/       # Reusable UI components
│   ├── ui/           # Basic UI elements (Icons, etc.)
│   ├── PWAInstallPrompt.tsx # "Add to Home Screen" logic
│   ├── ...
├── data/             # Static data (Itinerary, Hotels, etc.)
├── public/           # Static assets (Icons, Manifest)
├── App.tsx           # Main application shell
├── index.css         # Global styles & Tailwind directives
└── vite.config.ts    # Vite & PWA configuration
```

## 🗺️ Roadmap

- [x] Basic Itinerary & Map
- [x] Weather & Currency API Integration
- [x] Offline Fallbacks (Graceful degradation)
- [x] PWA Support (Manifest & Service Worker)
- [x] GitHub Pages Auto-deployment
- [ ] Photo gallery upload feature (Post-trip)

---

*Designed with ❤️ by AI & Human Collaboration.*
