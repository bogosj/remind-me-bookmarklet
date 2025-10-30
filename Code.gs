/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this script to only the current document containing the script.
 * It is a best practice for security.
 */

/**
 * Handles HTTP POST requests to create a new Google Task.
 * This function is the entry point for the web app.
 *
 * @param {Object} e The event parameter for a web app POST request.
 *                   e.postData.contents contains the raw request body.
 * @returns {ContentService.TextOutput} A JSON response indicating success or failure.
 */
function doPost(e) {
  try {
    // Get the secret stored in Script Properties.
    const SHARED_SECRET = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (!SHARED_SECRET) {
      throw new Error("SHARED_SECRET is not set in Script Properties.");
    }

    // Parse the JSON payload from the request body.
    const payload = JSON.parse(e.postData.contents);
    const { url, secret } = payload;

    // Validate the secret.
    if (secret !== SHARED_SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Invalid secret." }))
        .setMimeType(ContentService.MimeType.JSON)
        .setStatusCode(403); // Forbidden
    }

    if (!url) {
      throw new Error("URL is missing from the payload.");
    }

    // Get today's date in RFC3339 format required by the Tasks API.
    const today = new Date();
    const dueDate = Utilities.formatDate(today, Session.getScriptTimeZone(), "yyyy-MM-dd'T'00:00:00.000'Z'");

    // Create the task in the user's default task list.
    const newTask = Tasks.Tasks.insert({
      title: url,
      due: dueDate
    }, '@default');

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Task created successfully.", taskId: newTask.id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Failed to create task.", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}