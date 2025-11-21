# Eterna Axiom

Eterna Axiom is a modern **Next.js + TypeScript** web application built with a clean file structure and scalable architecture. This project follows the App Router pattern, uses modular components, hooks, utilities, and ships with an optimized production-ready setup.

---

## Live Demo
Visit: **[Website](https://eterna-axiom-gules.vercel.app/)**

---

## Features

- Built using **Next.js (App Router)**
- TypeScript-first development
- Reusable and modular components
- Custom hooks
- Organized structure: `app/`, `components/`, `hooks/`, `lib/`, `public/`
- Deployed on Vercel
- Easily extendable for APIs, authentication, dashboards, or full-stack expansion

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** CSS (extendable to Tailwind, SCSS, etc.)
- **Runtime:** Node.js
- **Deployment:** Vercel

---

## Project Structure

```
/
├─ app/                # App Router pages, layouts, server/client components
├─ components/         # Shared and reusable UI components
├─ hooks/              # Custom React hooks
├─ lib/                # Utility functions, helpers, configs
├─ public/             # Static assets (images, icons, favicon)
├─ next.config.js      # Next.js configuration
├─ tsconfig.json       # TypeScript configuration
└─ package.json        # Project metadata and scripts
```

---

## Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/Shreya-Mondal12/eterna-axiom.git
cd eterna-axiomm
```

### 2. Install Dependencies
```bash
npm install
# or
yarn
# or
pnpm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open your browser at: **http://localhost:3000**

---

## Build for Production

### Create the production build:
```bash
npm run build
```

### Start the production server:
```bash
npm start
```

---

## Environment Variables

If your project uses API keys or secrets:

1. Create a file:
```
.env.local
```

2. Add values:
```env
NEXT_PUBLIC_API_URL=
SECRET_API_KEY=
```

Note: `.env.local` is ignored by Git and safe for storing local secrets.

---

## Testing (Optional Setup)

Recommended tools if you plan to add tests:

- Jest or Vitest for unit tests
- Playwright or Cypress for end-to-end tests

Add a script:
```json
"test": "vitest"
```

---

## Linting and Formatting

Optional setup:

- ESLint for linting
- Prettier for formatting
- Husky and lint-staged for pre-commit checks

---

## Deployment (Vercel)

Steps to deploy:

1. Go to https://vercel.com
2. Import your GitHub repository
3. Select Next.js (auto-detected)
4. Deploy

Every push triggers a new automatic deployment.

---

## Contributing

1. Fork the project
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes
4. Open a pull request

---

## License

Add your chosen license (MIT recommended). Create a `LICENSE` file if needed.

---

## Author

Maintained by **Shreya Mondal**  
GitHub: https://github.com/Shreya-Mondal12

---

## Support

If you find this project useful, consider giving the repository a star on GitHub.

