# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 application for an indexable childcare directory platform. The application supports multilingual content (Dutch and English) and includes features for browsing, searching, and submitting childcare companies.

## Tech Stack

- **Framework**: Nuxt 4.0.3 with Vue 3.5.20
- **Styling**: Tailwind CSS
- **i18n**: @nuxtjs/i18n for Dutch (default) and English
- **Linting**: ESLint 9.34.0 with @nuxt/eslint
- **TypeScript**: Version 5.9.2

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate

# Lint code (no explicit lint script - use ESLint directly)
npx eslint .

# Type checking (TypeScript is installed but no explicit script)
npx tsc --noEmit
```

## Architecture

### Core Structure

- **`app/`**: Main application code
  - **`pages/`**: Route components (index, search, submit, admin, company/[id])
  - **`components/`**: Reusable Vue components (Header, Footer)
  - **`composables/`**: Vue composables, notably `useCompanies` for data management
  - **`types/`**: TypeScript type definitions (Company, SearchFilters, CompanySubmission)
  - **`data/`**: Static JSON data files

- **`server/`**: Nitro server API routes
  - **`api/`**: API endpoints for companies data (GET, POST)

- **`i18n/locales/`**: Translation files organized by language (en/, nl/)

### Key Types (from `app/types/company.ts`)

- `Company`: Main entity with fields for childcare provider details
- `SearchFilters`: Query parameters for filtering companies
- `CompanySubmission`: Form data structure for new submissions

### Data Flow

1. Companies data is stored in `app/data/companies.json`
2. Server API routes read and filter this data
3. The `useCompanies` composable provides client-side data management
4. Companies can be filtered by type, age group, price range, and location

### API Integration

The application expects a Laravel backend at `http://localhost:8000/api/` for:
- GET `/companies` - List approved companies
- GET `/companies/{id}` - Get single company
- POST `/companies` - Submit new company

Currently, the server API routes provide a file-based implementation as fallback.

## Important Configuration

- **i18n**: Default locale is Dutch (`nl`), with URL strategy `prefix_except_default`
- **Alias**: `@` is configured to point to the project root
- **Modules**: Tailwind CSS, ESLint, and i18n are auto-imported Nuxt modules