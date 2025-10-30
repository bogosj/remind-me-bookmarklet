# remind-me-bookmarklet

This project allows you to quickly create a Google Task from any webpage you are visiting. It consists of two parts:

1.  A **Google Apps Script** that acts as a web service to create tasks.
2.  An **HTML page** with a JavaScript bookmarklet you can add to your browser.

## Setup Instructions

Follow these steps carefully to get your bookmarklet working.

### Part 1: Deploy the Google Apps Script

1.  **Create the Script:**
    *   Go to [script.google.com](https://script.google.com) and click **New project**.
    *   Give the project a name, like "Remind Me - Task Creator".
    *   Delete any existing code in the `Code.gs` file and paste the contents of `Code.gs` from this repository.
    *   Click the **Save project** icon.

2.  **Enable the Google Tasks API:**
    *   In the left sidebar, click **Services**.
    *   Click **+ Add a service**.
    *   Select **Google Tasks API** from the list and click **Add**. This allows the script to interact with your tasks.

3.  **Deploy as a Web App:**
    *   Click the **Deploy** button in the top right and select **New deployment**.
    *   Click the gear icon next to "Select type" and choose **Web app**.
    *   In the "Configuration" settings:
        *   **Description:** `Creates Google Tasks from a URL.`
        *   **Execute as:** `Me (your@email.com)`
        *   **Who has access:** `Anyone` (This is required for the bookmarklet to call it from any website. The script is still secured to your account).
    *   Click **Deploy**.

4.  **Authorize and Get URL:**
    *   Google will ask you to authorize the script. Follow the prompts. You may see a "Google hasn't verified this app" warning. Click **Advanced**, then **Go to (your project name)** to proceed.
    *   After deploying, a "Deployment updated" window will appear. **Copy the Web app URL**. You will need this for the next part.

### Part 2: Create and Use the Bookmarklet

1.  **Open the Bookmarklet Generator:**
    *   Open the `index.html` file from this project in your web browser.

2.  **Store Your Secret Key:**
    *   The page will automatically generate a unique secret key for you. Click the **Copy** button.
    *   In your Google Apps Script project, go to **Project Settings** (the gear icon on the left sidebar).
    *   Scroll down to "Script properties" and click **Add script property**.
    *   For "Property", enter `SHARED_SECRET`.
    *   For "Value", paste the secret key you copied from the `index.html` page. Click **Save script properties**.

3.  **Configure and Save the Bookmarklet:**
    *   Go back to the `index.html` page in your browser.
    *   Paste your **Web App URL** (from the deployment step) into the input box on the page.
    *   The "Remind Me" link at the bottom will become active. **Drag this link** to your browser's bookmarks bar. No further editing is needed!

4.  **You're Done!**
    *   Navigate to any webpage you want to be reminded of.
    *   Click the "Remind Me" bookmark.
    *   A new task with the page's URL will be created in your default Google Tasks list, due today!

## Security Notes

*   The `SHARED_SECRET` is stored securely in your Google Apps Script project's properties and is not exposed in the script code itself.
*   The bookmarklet sends this secret over HTTPS, encrypting it during transit.

This multi-factor approach makes it much harder for unauthorized parties to create tasks. Do not share your Web App URL or your `SHARED_SECRET` publicly.