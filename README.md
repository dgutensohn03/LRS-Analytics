# LRS Analytics Dashboard

**React + TypeScript interactive portfolio reconstruction**

**[Live demo — GitHub Pages](https://dgutensohn03.github.io/LRS-Analytics/)** · Deployment status: [GitHub Actions](https://github.com/dgutensohn03/LRS-Analytics/actions)

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

1. Source files are committed directly to `main` (`index.html`, `package.json`, `src/`, `vite.config.ts`).
2. In **Settings → Pages**, select **GitHub Actions** as the deployment source.
3. Every push to `main` triggers the deployment workflow, or use **Actions → Deploy LRS Analytics to GitHub Pages → Run workflow**.
4. After a successful deployment, open the live URL above.

**Visibility:** This public repository is intended to host a recruiter-accessible demonstration.

## Privacy

All sample records are synthetic. Do not upload real learner records, client assets, proprietary sources or credentials.

© Daniel Gutensohn.
