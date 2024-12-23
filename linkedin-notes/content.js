// Function to create and display the note editing dropdown
function createNoteDropdown(button, note) {
    // Check if the dropdown already exists. If it does, remove it
    let existingDropdown = document.getElementById('noteDropdown');
    if (existingDropdown) {
        existingDropdown.remove();  // Close the existing dropdown if clicked again
        return;
    }

    // Create the dropdown container
    const dropdown = document.createElement('div');
    dropdown.id = 'noteDropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.top = `${button.offsetTop + button.offsetHeight + 125}px`;  // Position below the button
    dropdown.style.left = `${button.offsetLeft}px`;
    dropdown.style.backgroundColor = 'white';
    dropdown.style.border = '0.1px solid #ccc';
    dropdown.style.padding = '10px';
    dropdown.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    dropdown.style.borderRadius = '5px';
    dropdown.style.maxWidth = '300px';
    dropdown.style.width = '100%';
    dropdown.style.zIndex = '9999';  // Ensure it appears above other elements

    const closeButton = document.createElement('button');
closeButton.innerText = '×';  // Cross symbol
closeButton.style.position = 'absolute';
closeButton.style.bottom = '5px';  // Adjust to place closer to the top of the dropdown
closeButton.style.right = '5px';  // Adjust to place closer to the right edge
closeButton.style.backgroundColor = 'transparent';
closeButton.style.border = 'none';
closeButton.style.fontSize = '16px';  // Increase font-size for better visibility
closeButton.style.cursor = 'pointer';
closeButton.style.color = '#888';

    
    // Close the dropdown when the cross button is clicked
    closeButton.addEventListener('click', () => {
        dropdown.remove();
    });

    // Create a textarea for editing the note
    const noteText = document.createElement('textarea');
    noteText.value = note;
    noteText.style.width = '100%';
    noteText.style.height = '50px';
    noteText.style.fontSize = '16px';
    noteText.style.marginBottom = '10px';
    noteText.style.boxSizing = 'border-box';

    // Automatically update the note when the user types
    noteText.addEventListener('input', () => {
        const newNote = noteText.value;
        chrome.runtime.sendMessage({ type: "saveNote", profileId: window.location.pathname, note: newNote });
    });

    // Append the textarea to the dropdown
    dropdown.appendChild(closeButton);
    dropdown.appendChild(noteText);

    // Append the dropdown to the body to display it
    document.body.appendChild(dropdown);
}

// Function to create and add a button inside the specific div
function addButton() {
    // Find the parent div where the button will be inserted
    const parentDiv = document.querySelector('.ph5.pb5');
    if (!parentDiv) {
        console.error("Could not find the div with class 'ph5 pb5'.");
        return;
    }

    // Create the button
    const button = document.createElement('button');
    button.innerText = 'Notes';  // Button label
    button.style.padding = '6px 12px';  // Smaller button size
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.fontSize = '14px';  // Reduced font size
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    button.style.marginTop = '10px';  // Add some space above the button
    button.style.marginRight = '10px';  // Optional: Add some space to the right

    // Add event listener to the button to open the note editing dropdown
    button.addEventListener('click', () => {
        const profileId = window.location.pathname;  // Assuming profileId is derived from the URL path

        // Send a message to the background script to fetch the existing note
        chrome.runtime.sendMessage({ type: "fetchNote", profileId }, (response) => {
            const note = response.note || "No notes found.";  // Default message if no note is found
            createNoteDropdown(button, note);
        });
    });

    // Append the button to the parent div
    parentDiv.appendChild(button);
}

// Add the button to the page when the content script is loaded
addButton();
