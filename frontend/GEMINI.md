# Nexus Store - Future Electronics

A modern, high-tech e-commerce platform for future electronics, featuring a Gemini-powered AI assistant. This project consists of a React-based frontend and a Node.js/Express backend with MongoDB.

## Project Overview

*   **Frontend:** Built with **React 19**, **TypeScript**, and **Vite**. It uses a single-page application (SPA) architecture with custom state-based routing.
*   **Backend:** A **Node.js** and **Express** API located in the `server/` directory, using **MongoDB** (via Mongoose) for data persistence.
*   **AI Integration:** Integrates with **Google Gemini API** through the `@google/genai` SDK to provide an intelligent product assistant.
*   **Architecture:**
    *   `src/components`: Reusable UI components (Header, Footer, ProductCard, GeminiAssistant).
    *   `src/pages`: Main application views (Home, Catalog, ProductDetail, Cart, etc.).
    *   `src/services`: Service layers for external APIs (Gemini).
    *   `server/`: Independent backend service with its own controllers, models, and routes.
    *   `conductor/`: Comprehensive project documentation and development tracks.

## Building and Running

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Running locally or via URI in `.env`)
*   Gemini API Key

### Frontend (Root Directory)
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Setup:** Create a `.env.local` file and add:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```
3.  **Start Development Server:**
    ```bash
    npm run dev
    ```
4.  **Build for Production:**
    ```bash
    npm run build
    ```

### Backend (`server/` Directory)
1.  **Navigate to Server:**
    ```bash
    cd server
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Setup:** Create a `.env` file and add:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/nexus_store
    ```
4.  **Start Development Server:**
    ```bash
    npm run dev
    ```
5.  **Run Tests:**
    ```bash
    npm run test
    ```

## Development Conventions

*   **Language:** TypeScript is strictly used for both frontend and backend.
*   **Code Style:** Follow the guidelines in `conductor/code_styleguides/`.
*   **Testing:** Backend logic should be tested using **Jest** and **Supertest**. Tests are located alongside the code (e.g., `*.test.ts`).
*   **Data Models:** Defined in `types.ts` (Frontend) and `server/models/` (Backend).
*   **State Management:** Frontend uses React Hooks (`useState`, `useCallback`, `useMemo`) for local and global state.
*   **API Routes:** Prefixed with `/api/` in the backend (e.g., `/api/products`).

## Key Files
*   `App.tsx`: Main React component and router logic.
*   `constants.ts`: Static product data and application constants.
*   `server/app.ts`: Express application configuration.
*   `services/gemini.ts`: Integration logic for the Gemini AI assistant.
*   `conductor/`: Contains detailed technical specifications and development roadmap.
