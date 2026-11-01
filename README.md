# Anurag Pal — Creative Portfolio 2026

Cinematic, high-retention video editor and creative director portfolio inspired by Behance 2026 editorial standards. Built inside the existing `port` workspace preserving all 227+ media production assets.

## 🚀 Features
- **Editorial Typography & Layout**: Warm canvas aesthetic (`#F4F3EE`) with corner reference asterisks (`*`) and crosses (`+`), bold grotesque display titles, and timecode REC monitor.
- **Short-Form Content Showcase (9:16)**: Interactive stacked-phone reel player with hover-to-scrub video previews and cinema modal playback.
- **Enterprise & Motion Graphics (16:9)**: Featuring executive interview series (BluWis CEO & CRO) and dynamic agency promo edits.
- **Brand & UI/UX Systems**: Kanak brand identity book with direct PDF access and BluWis enterprise website wireframe proposal.
- **Editorial Photography**: High-resolution documentary and natural-light stills with lightbox modal.
- **Centralized Admin CMS**: Press the settings icon in the top utility bar or unlock with PIN `anurag2026` to edit profile copy, manage projects, and export `portfolioData.json`.
- **Dynamic Scannable QR Code**: Powered by `qrcode.react` connecting mobile visitors directly to your WhatsApp and portfolio.
- **Hardware-Accelerated Video Streaming**: Custom Vite streaming middleware with HTTP 206 byte-range seeking for instantaneous video playback.

---

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start local development server with video streaming
npm run dev

# Build for production
npm run build
```

---

## 📁 Content Management
Edit all personal info, projects, skills, and client links directly in:
`src/data/portfolioData.ts`

Or live in the browser via the built-in CMS panel (Passcode: `anurag2026`).
