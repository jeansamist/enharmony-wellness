# Technical Specification: Enharmony Wellness

## 1. Project Overview

**Enharmony Wellness** is a web application dedicated to holistic health and wellness. It serves as a content hub providing articles, videos, and guides related to wellness coaching, therapy, nutrition, and fitness. The platform is built to be responsive and accessible, offering users easy access to curated content.

## 2. Technology Stack

### Core Frameworks & Libraries
*   **Framework:** Next.js 16.1.1 (App Router)
*   **Language:** TypeScript (v5)
*   **UI Library:** React 19
*   **Styling:** Tailwind CSS v4
*   **Icons:** @phosphor-icons/react

### Utilities
*   **Class Management:** `clsx`, `tailwind-merge`, `class-variance-authority` (CVA)
*   **Linting & Formatting:** ESLint 9

## 3. Project Structure

The project follows the standard Next.js App Router directory structure:

```
enharmony-wellness/
├── app/                  # Application routes and layouts
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout (Html, Body, Topbar, Footer)
│   └── page.tsx          # Homepage composition
├── components/           # Reusable UI components
│   ├── ui/               # Base UI primitives (e.g., Button)
│   ├── article-card.tsx  # Display component for content items
│   ├── topbar.tsx        # Responsive navigation header
│   ├── footer.tsx        # Site footer
│   └── ...               # Section-specific components (Featured, JustIn, etc.)
├── lib/                  # Shared utilities
│   └── utils.ts          # Helper functions (e.g., cn())
├── public/               # Static assets (images, SVGs)
└── ...config files       # Configuration (next.config.ts, tailwind, etc.)
```

## 4. Key Components

### 4.1 Layout Components
*   **`RootLayout` (`app/layout.tsx`)**: Wraps the entire application. It sets up the `DM Sans` font, global styles, and includes the persistent `Topbar` and `Footer`.
*   **`Topbar` (`components/topbar.tsx`)**: A responsive navigation bar.
    *   **Desktop:** Displays a horizontal list of links with dropdowns for sub-menus.
    *   **Mobile:** Renders a hamburger menu that expands into an accordion-style navigation list.
    *   Includes "Subscribe" and "Sign in" actions.

### 4.2 Page Sections (`app/page.tsx`)
The homepage is composed of several vertically stacked sections:
*   **`Featured`**: Highlights key content.
*   **`JustIn`**: Displays the latest articles or updates.
*   **`ExploreBy`**: Navigation aid to browse content by category.
*   **`WatchAndLearn`**: Video content section.
*   **`Recommended`**: Curated content suggestions.
*   **`Subscribe`**: Newsletter subscription form/CTA.

### 4.3 UI Primitives
*   **`Button` (`components/ui/button.tsx`)**: Likely a reusable button component built with CVA for variant management (primary, outline, etc.).

## 5. Configuration & Styling

### 5.1 Tailwind CSS
*   Configured via `postcss.config.mjs` and `app/globals.css`.
*   Uses CSS variables for theming (colors, fonts).
*   **Theme Variables:**
    *   `--primary`: #7a9b8c (Greenish tone)
    *   `--secondary`: #f7f4f0 (Off-white)
    *   `--tertiary`: #2e2e2e (Dark gray)
    *   `--background`: #ffffff
    *   `--foreground`: #2e2e2e

### 5.2 TypeScript
*   Strict mode enabled.
*   Path aliases configured: `@/*` maps to `./*`.

## 6. Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Runs ESLint checks.

## 7. Future Improvements & Considerations
*   **CMS Integration:** Currently, content seems static. Integrating a Headless CMS (like Contentful, Sanity, or Strapi) would allow dynamic content management.
*   **Authentication:** The "Sign in" button is a placeholder. Integrating NextAuth.js or a similar provider would be a logical next step.
*   **SEO Optimization:** While `metadata` is present, further SEO enhancements (Open Graph tags, structured data) can be added.
*   **Testing:** No testing framework (Jest, Playwright) is currently set up. Adding unit and end-to-end tests is recommended.
