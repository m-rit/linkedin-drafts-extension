chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "fetchNote") {
        chrome.storage.local.get([message.profileId], (result) => {
            sendResponse({ note: result[message.profileId] });
        });
        return true; // Keep the message channel open for async response
    }

    if (message.type === "saveNote") {
        chrome.storage.local.set({ [message.profileId]: message.note }, () => {
            console.log("Note saved:", message.note);
        });
    }
});
