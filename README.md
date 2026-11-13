# LRS Analytics Dashboard

**React + TypeScript interactive portfolio reconstruction**

**[Live demo — GitHub Pages](https://dgutensohn03.github.io/LRS-Analytics/)** (available after successful deployment).

A responsive, data-rich learning analytics application featuring reusable UI components, interactive charts, filtering, learner drill-downs and an xAPI-inspired statement explorer.

> **Disclosure:** The original client application was private. This is an independent reconstruction with fictional learners, programs and metrics, not the original production application or source.

## Features

- **Overview:** KPIs, completion and assessment trends, program comparisons
- **Performance:** Plotly charts with interactive date and program filters
- **Learners:** Searchable directory, profiles and activity histories
- **Data Explorer:** Search, filter, paginate, inspect structured statement details and export CSV
- **Components:** Reusable typed React UI components and chart patterns
- **Case Study:** Project story, technical approach and architecture
- **Responsive UI:** Desktop, tablet and mobile layouts

## Stack

React 18 · TypeScript · Vite · Plotly.js · react-plotly.js · CSS · Vitest.

## Local development

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

## GitHub Pages

Repository: https://github.com/dgutensohn03/LRS-Analytics

**Live URL:** https://dgutensohn03.github.io/LRS-Analytics/

1. Ensure application source has been uploaded to the repository root (`index.html`, `package.json`, `src/`, `vite.config.ts`, etc.).
2. In **Settings → Pages**, set deployment source to **GitHub Actions**.
3. Push changes to `main` and check the **Actions** tab for the deploy workflow.
4. Visit the live URL once the workflow finishes successfully.

**Visibility:** The repository was private during setup. Pages availability for private repositories depends on GitHub plan and configuration; a public recruiter demo may require making it public.

## Privacy

All sample records are synthetic. Do not upload real learner records, client assets, proprietary sources or credentials.

© Daniel Gutensohn.
