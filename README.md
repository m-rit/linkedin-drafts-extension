# LinkedIn Notes Extension

A simple Chrome extension that allows you to add, view, and edit notes associated with a LinkedIn profile. Notes are stored locally and can be edited directly through a small dropdown UI element that appears next to the profile.
#

![image](https://github.com/user-attachments/assets/c77eba2f-f395-42f9-b420-2062112a8f0e)

## Features

- **Add Notes**: Add custom notes to LinkedIn profiles.
- **Edit Notes**: Directly edit notes without needing to save explicitly (updates are saved automatically).
- **View Notes**: View your saved notes in a small, convenient dropdown near the profile.

## Installation

1. Download the source code for the extension.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top right.
4. Click **Load unpacked** and select the folder containing the extension code.

## Usage

- **Add/Edit Notes**:
  - The extension automatically adds an "Edit Note" button below each LinkedIn profile page when installed.
  - Clicking on the "Edit Note" button will show a dropdown where you can add/edit the note.
  - Once edited, the note is saved automatically—no need for a "Save" button.
  
- **Close Notes**:
  - You can close the note dropdown by clicking the small "×" (cross) button located at the top-right corner of the dropdown.

- **Storage**:
  - Notes are stored locally using `chrome.storage.local`, making them persistent across sessions.
  - The extension supports multiple profiles; each note is tied to the `profileId`.

## How to Check Storage

To check the notes stored by the extension in the local storage:

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** (top-right).
3. Click on **Inspect views** under the extension entry.
4. This opens the Developer Tools window for the background page of your extension.
5. In the Developer Tools, go to the **Console** tab and enter the following command to view stored notes:

    ```javascript
    chrome.storage.local.get(null, (items) => {
        console.log(items);
    });
    ```

   This will log all the stored items in `chrome.storage.local`.

## How to Clean Storage

To clean or clear the notes stored in `chrome.storage.local`, you can use the following methods:


To remove a specific note associated with a profile, use the following code in the **Console** tab of the Developer Tools:

```javascript
chrome.storage.local.remove('profileId', () => {
    console.log('Item with key "profileId" removed.');
});
```
To remove all notes, use the following code in the **Console** tab of the Developer Tools:

```javascript
chrome.storage.local.clear(() => {
    console.log('All data cleared from chrome.storage.local');
});
```
