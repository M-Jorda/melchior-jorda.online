# Melchior JORDA — Portfolio (Vite + Vue 3 + Tailwind)

This repository contains a minimal, SEO-friendly portfolio scaffold built with Vite, Vue 3 and Tailwind CSS. It's optimized for static hosting (Firebase Hosting suggested). The base language is English with simple client-side language switching placeholders for FR/ES.

Features
- Pages: Home, Projects, About, Resume, Contact, 404
- Formspree integration for contact form (no backend required)
- SEO basics: meta description, sitemap.xml, robots.txt, Open Graph placeholders
- Fast, minimal assets (SVG favicon, responsive layout)

Quick start

1. Install dependencies

```bash
cd new_website
npm install
```

2. Development

```bash
npm run dev
```

3. Build

```bash
npm run build
```

4. Deploy to Firebase Hosting

- Install Firebase CLI and login
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting
```

SEO recommendations & keywords (2025)

Primary keywords to target for a junior web developer portfolio (adjust per project):

- "junior web developer"
- "web developer Malaga"
- "Vue developer"
- "frontend developer" "JavaScript developer"
- "performance web" "web accessibility" "a11y"
- "Tailwind CSS" "responsive web design"
- "freelance web developer Europe"

Local/geo keywords: "Malaga web developer", "web developer Spain", "remote frontend developer Europe"

Privacy & contact
- Contact form uses Formspree. Replace {your_form_id} in `src/pages/Contact.vue` with your Formspree form ID.
- CV placeholder available at `/assets/Melchior-JORDA-CV.pdf` in `public` directory.

Next steps I can take for you

- Produce ready-to-edit projects JSON and example project pages
- Add i18n using `vue-i18n` and generate language-specific meta tags
- Integrate GA4 or Matomo (privacy-aware) and add privacy-consent banner
- Create a GitHub Actions workflow to build and deploy to Firebase automatically
