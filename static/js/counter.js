
let count = 0;

// Get DOM elements we'll be updating
const counterDisplay = document.getElementById('counterDisplay');
const saveStatus = document.getElementById('saveStatus');



// Function to update the counter
function updateCounter(change) {
    count += change;
    counterDisplay.textContent = count;
    // Clear any previous save status
    saveStatus.textContent = '';
}

// Function to save the counter to the server
async function saveCounter() {
    try {
        // Send POST request to our FastAPI endpoint
        const response = await fetch('/save_count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ count: count })
        });
        
        const data = await response.json();
        
        // Show save status
        saveStatus.textContent = data.message;
        
    } catch (error) {
        saveStatus.textContent = 'Error saving count';
        saveStatus.style.color = 'red';
    }
}

// Initialize counter from server when page loads
async function initializeCounter() {
    try {
        //count = 0; // get this from the server at /get_count

        //01/22/2025, lab 3 part 2, Dennis added:
        const response = await fetch('/get_count');
        if(!response.ok){
            throw newError('Network error');
        }
        const data = await response.json();
        count = data["count"];
        //01/22/2025 added end.

        counterDisplay.textContent = count;



    } catch (error) {
        console.error('Error initializing counter:', error);
    }
}


function setConnectionStatus() {
    // once server counter is initialized with data from server
    // set div with id connectionStatus text content to "Connected" 
    // and color to green

    //01/22/2025 Dennis added:
    const newDiv = document.getElementById('connectionStatus');
    newDiv.textContent = 'Connected';
    newDiv.style.color = 'green';
    //01/22/2025 added end.
} 


//01/22/2025 Dennis added:
initializeCounter();
alert("Counter initialized");
setConnectionStatus();


