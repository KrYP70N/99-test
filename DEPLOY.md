# Deployment Guide: React (Vite) to Google Cloud Storage

This guide explains how to deploy your React application to Google Cloud Storage (GCS) using the GitHub Actions workflow we created.

## 1. Google Cloud Setup

### Step 1.1: Create a Project
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project.
3.  Note your **Project ID**.

### Step 1.2: Create a Storage Bucket
1.  In the Cloud Console, go to **Cloud Storage** > **Buckets**.
2.  Click **Create**.
3.  **Name**: Enter a unique name (e.g., `my-react-app-bucket`). This will be your `GCP_BUCKET_NAME`.
4.  **Location**: Choose a **Location Type**:
    *   **Region** (Recommended): Pick a region close to you (e.g., `us-central1`).
5.  **Access Control**: Uncheck "Enforce public access prevention". Select **Uniform** access control.
6.  Click **Create**.

### Step 1.3: Make Bucket Public
1.  Go to the **Permissions** tab of your new bucket.
2.  Click **Grant Access**.
3.  **New Principals**: Type `allUsers`.
4.  **Role**: Select `Cloud Storage` > `Storage Object Viewer`.
5.  Click **Save**.
6.  Go to the **Configuration** tab and set `Index page` to `index.html`.

### Step 1.4: Create a Service Account
1.  Go to **IAM & Admin** > **Service Accounts**.
2.  Click **Create Service Account**.
3.  **Name**: `github-deployer`.
4.  **Role**: Grant `Storage Object Admin`.
5.  Click **Done**.

---

## 2. GitHub Repository Setup

Add these **Repository Secrets** (Settings > Secrets and variables > Actions):

| Name | Value |
|------|-------|
| `GCP_PROJECT_ID` | Your Google Cloud Project ID. |
| `GCP_BUCKET_NAME` | The name of your bucket. |

---

## 3. Workload Identity Federation (Crucial if Keys are Blocked)

Since JSON keys are blocked by your Organization, follow these steps to connect GitHub to Google Cloud without a key.

### Step 3.1: Create Workload Identity Pool
1.  Go to **IAM & Admin** > **Workload Identity Federation**.
2.  Click **CREATE POOL**. Name it `github-pool`. Click **Continue**.
3.  Add a **Provider**:
    *   **Provider type**: OpenID Connect (OIDC).
    *   **Provider name**: `github-provider`.
    *   **Issuer (URL)**: `https://token.actions.githubusercontent.com`
    *   **Audience**: Default.
4.  **Attribute mapping**:
    *   `google.subject` = `assertion.sub`
    *   `attribute.repository` = `assertion.repository`
5.  Click **Save**.

### Step 3.2: Grant Service Account Access
1.  In the Workload Identity Federation page, click on your pool (`github-pool`).
2.  Click **GRANT ACCESS**.
3.  Select your Service Account (`github-deployer`).
4.  In **Principals**, select **Only identities matching filter**.
5.  **Attribute name**: `repository`.
6.  **Attribute value**: `99techteam/code-challenge` (Adjust if your repo name is different).
7.  Click **Save**.
8.  A window will show a value for `workload_identity_provider`. **Copy this long string.**

### Step 3.3: Update GitHub Secrets
Add these to GitHub Secrets:
*   `WIF_PROVIDER`: The value you copied in Step 3.2 (starts with `projects/...`).
*   `WIF_SERVICE_ACCOUNT`: Your service account email (e.g., `github-deployer@your-project.iam.gserviceaccount.com`).

---

## 4. Deploy

1.  Push your changes to the `main` branch.
2.  Watch the progress in the GitHub **Actions** tab.
3.  Your site will be live at `https://storage.googleapis.com/<YOUR_BUCKET_NAME>/index.html`.
