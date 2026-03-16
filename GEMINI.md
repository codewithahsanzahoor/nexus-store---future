# Nexus Store - Future Electronics (GEMINI Context)

A modern, high-tech e-commerce platform for future electronics, featuring a Gemini-powered AI assistant. This project consists of a React-based frontend and a Node.js/Express backend with MongoDB.

## Project Overview

*   **Frontend:** Built with **React 19**, **TypeScript**, and **Vite**. It uses a single-page application (SPA) architecture.
*   **Backend:** A **Node.js** and **Express** API located in the `backend/` directory, using **MongoDB** (via Mongoose) for data persistence.
*   **AI Integration:** Integrates with **Google Gemini API** through the `@google/genai` SDK to provide an intelligent product assistant.

## Directory Structure

*   `frontend/`: The React application, components, and services.
*   `backend/`: The Express server, database models, controllers, and routes.

## Building and Running

### Frontend (Root Directory / `frontend/`)
1.  **Install Dependencies:**
    ```bash
    cd frontend
    npm install
    ```
2.  **Environment Setup:** Create a `.env.local` file in the `frontend/` directory and add:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```
3.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    (Runs on http://localhost:3000 by default)

### Backend (`backend/` Directory)
1.  **Navigate to Backend:**
    ```bash
    cd backend
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Setup:** Create a `.env` file in the `backend/` directory and add:
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

*   **Language:** TypeScript is used for both frontend and backend.
*   **Code Style:** Modern ES modules and functional React components.
*   **Testing:** Backend logic is tested using **Jest** and **Supertest**.
*   **State Management:** Frontend uses React Hooks for local and global state.
*   **API Routes:** Backend routes are prefixed with `/api/` (e.g., `/api/products`, `/api/auth`).

## Key Files
*   `frontend/App.tsx`: Main React component and routing.
*   `frontend/services/gemini.ts`: Integration logic for the Gemini AI assistant.
*   `backend/app.ts`: Express application configuration.
*   `backend/index.ts`: Server entry point.
