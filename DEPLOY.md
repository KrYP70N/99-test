# Deployment Guide: GitHub Pages

Deployment is now automated! Every time you push to the `main` branch, your site will be updated.

## 1. Enable GitHub Pages
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, ensure it is set to **"Deploy from a branch"**.
4. (The workflow will automatically create and update a `gh-pages` branch for you).
5. Once the first "Deploy" action finishes, you can select the `gh-pages` branch here if it's not automatically selected.

## 2. Trigger Deployment
- Just push your code to the `master` branch!
- Track progress in the **Actions** tab.

Your site will be live at: `https://<YOUR_USERNAME>.github.io/code-challenge/`
