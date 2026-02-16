# 99Tech Code Challenge Solution

This repository contains the solutions for Problems 1, 2, and 3 of the 99Tech Code Challenge.

## 🚀 Live Demo
The solution is deployed and live at:
**[https://KrYP70N.github.io/99-test/](https://KrYP70N.github.io/99-test/)**

---

## 🛠 Technical Decisions & Implementation

### Problem 1: Logic & Testing
- **Refactoring**: Extracted core business logic into custom hooks to separate concerns from the UI.
- **Testing**: Added unit tests using Vitest to ensure logic correctness.
- **Patterns**: Used modern React functional components and clean Type definitions.

### Problem 2: Currency Swap UI
- **Design System**: Built a premium, responsive UI using a custom CSS variables system.
- **Animations**: Integrated **Framer Motion** for smooth transitions and interactive micro-animations.
- **Shared Components**: Implemented a reusable `TokenModal` for currency selection, ensuring a consistent user experience.
- **UI Fix**: Resolved a critical modal centering issue by using a robust "fixed-center" CSS strategy that prevents animation-related positioning bugs.

### Problem 3: Wallet Page Optimization
- **Efficiency**: Rectified `useMemo` dependency issues and optimized computational logic for sorting and filtering balances.
- **Refactoring**: Split the monolithic `WalletPage` into smaller, focused components to reduce unnecessary re-renders.
- **Code Quality**: Corrected anti-patterns (such as using `index` as a key) to ensure stable list rendering.

### CI/CD Pipeline
- **Strategy**: Pivoted from Google Cloud Platform to **GitHub Pages** for a more streamlined and frictionless deployment experience, bypassing complex organization-level service account restrictions.
- **Automation**: Fully automated the build and deploy process using GitHub Actions.
- **Router Configuration**: Configured React Router with a dynamic `basename` to handle subdirectory hosting (Vite + GH Pages) seamlessly.

---

## 🏃 How to Run Locally

1. **Clone the repo**:
   ```bash
   git clone https://github.com/KrYP70N/99-test.git
   cd 99-test/solution
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📦 Project Structure
- `solution/src/problems/`: Individual solutions for each task.
- `solution/src/components/`: Shared UI components (Modals, Layouts).
- `.github/workflows/`: Automation scripts for deployment.
