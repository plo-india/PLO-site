// --- Configuration ---
const csvFilePath = './fetch_camp_results.php'; // The path to your CSV file
// --- End Configuration ---

// Global variable to hold parsed data
let candidateData = [];

// Get DOM Elements
const resultForm = document.getElementById('resultForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput'); // Changed from phoneSuffixInput
const resultDisplay = document.getElementById('resultDisplay');
const errorMessage = document.getElementById('errorMessage');
const loadingMessage = document.getElementById('loadingMessage');

// APLO Result
const resultName = document.getElementById('resultName');
const resultLevel = document.getElementById('resultLevel');
const scoreP1 = document.getElementById('#1');
const scoreP2 = document.getElementById('#2');
const scoreP3 = document.getElementById('#3');
const scoreP4 = document.getElementById('#4');
const scoreP5 = document.getElementById('#5');
const APLOScoreTotal = document.getElementById('APLOScoreTotal');

// Mid-Test Result
const scoreM1 = document.getElementById('M1');
const scoreM2 = document.getElementById('M2');
const scoreM3 = document.getElementById('M3');
const MidTestScoreTotal = document.getElementById('MidTestScoreTotal');

// End-Test Result
const scoreE1 = document.getElementById('E1');
const scoreE2 = document.getElementById('E2');
const scoreE3 = document.getElementById('E3');
const scoreE4 = document.getElementById('E4');
const scoreE5 = document.getElementById('E5');
const EndTestScoreTotal = document.getElementById('EndTestScoreTotal');

/**
 * Parses CSV text into an array of objects.
 * Assumes the first row is the header.
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
        console.error("CSV file seems empty or has no data rows.");
        return []; // Return empty if no data
    }

    // Extract headers (trimming whitespace)
    const headers = lines[0].split(',').map(header => header.trim());

    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        // Basic check if the number of values matches headers
        if (values.length === headers.length) {
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
                const header = headers[j];
                const value = values[j].trim();
                console.log(header)

                // Attempt to convert numeric fields (add more if needed)
                if (['#1', '#2', '#3', '#4', '#5', 'APLO (Total)', 'M1', 'M2', 'M3', 'Mid Test (Total)',
                    'E1', 'E2', 'E3', 'E4', 'E5', 'End Test (Total)', 'Final Weighted Score'].includes(header)) {
                    entry[header] = parseFloat(value) || 0; // Use parseInt, default to 0 if NaN
                } else {
                    entry[header] = value;
                }
            }
            // Basic validation: Ensure essential fields like Roll Number and password exist
            if (entry['Email'] && entry['Password']) { // Changed from PhoneNumber
                data.push(entry);
            } else {
                console.warn(`Skipping row ${i + 1} due to missing Roll Number or password.`); // Changed message
            }
        } else {
            console.warn(`Skipping row ${i + 1} due to mismatched columns. Expected ${headers.length}, found ${values.length}. Line: "${lines[i]}"`);
        }
    }
    return data;
}

/**
 * Fetches and parses the CSV data.
 */
async function loadResultsData() {
    loadingMessage.style.display = 'block'; // Show loading message
    resultForm.style.display = 'none'; // Hide form while loading
    errorMessage.style.display = 'none'; // Hide any previous errors

    try {
        const response = await fetch(csvFilePath);
        if (!response.ok) {
            // Handle HTTP errors (e.g., file not found 404)
            throw new Error(`HTTP error! status: ${response.status} - Could not fetch ${csvFilePath}`);
        }
        const csvText = await response.text();
        candidateData = parseCSV(csvText);

        if (candidateData.length > 0) {
            console.log(`Successfully loaded and parsed ${candidateData.length} candidate records.`);
            // Data loaded successfully, show the form
            resultForm.style.display = 'flex'; // Or 'block' depending on your CSS
            loadingMessage.style.display = 'none'; // Hide loading message
            // Attach the event listener *after* data is loaded
            setupFormListener();
        } else {
            throw new Error("No valid candidate data could be parsed from the CSV.");
        }

    } catch (error) {
        console.error("Error loading or parsing CSV:", error);
        showError(`Failed to load results data. Please try refreshing the page. Details: ${error.message}`);
        loadingMessage.style.display = 'none'; // Hide loading message even on error
    }
}

/**
 * Sets up the form submission listener.
 * Should only be called after candidateData is populated.
 */
function setupFormListener() {
    resultForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Hide previous results and errors
        resultDisplay.style.display = 'none';
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim(); // Changed from phoneSuffix

        if (!email || !password) { // Changed from phoneSuffix
            showError("Please fill in both Roll Number and Password."); // Changed message
            return;
        }
        // Removed the 4-digit validation for phone suffix

        // Find the candidate (using the globally loaded candidateData)
        const foundCandidate = candidateData.find(candidate => {
            // Direct comparison with the password column
            return candidate['Email'] && // Check if Roll Number exists
                candidate['Email'].toLowerCase() === email.toLowerCase() &&
                candidate['Password'] === password; // Corrected to use 'Password' (capital P)
        });

        if (foundCandidate) {
            displayCandidateResult(foundCandidate);
        } else {
            showError("No matching result found. Please check your Roll Number and Password."); // Changed message
        }
    });
}


function displayCandidateResult(candidate) {
    resultName.textContent = `${candidate["Name"]}`.trim(); // Handle potentially missing names
    resultLevel.textContent = candidate["Final Weighted Score"] || 'N/A'; // Handle potentially missing level

    // Populate scores, defaulting to 'N/A' if missing
    scoreP1.textContent = candidate['#1'] ?? 'N/A';
    scoreP2.textContent = candidate['#2'] ?? 'N/A';
    scoreP3.textContent = candidate['#3'] ?? 'N/A';
    scoreP4.textContent = candidate['#4'] ?? 'N/A';
    scoreP5.textContent = candidate['#5'] ?? 'N/A';
    APLOScoreTotal.textContent = candidate['APLO (Total)'] ?? 'N/A';
    APLOScoreTotal.parentElement.cells[0].innerHTML = '<strong>Total</strong>';

    scoreM1.textContent = candidate['M1'] ?? 'N/A';
    scoreM2.textContent = candidate['M2'] ?? 'N/A';
    scoreM3.textContent = candidate['M3'] ?? 'N/A';
    MidTestScoreTotal.textContent = candidate['Mid Test (Total)'] ?? 'N/A';
    MidTestScoreTotal.parentElement.cells[0].innerHTML = '<strong>Total</strong>';

    scoreE1.textContent = candidate['E1'] ?? 'N/A';
    scoreE2.textContent = candidate['E2'] ?? 'N/A';
    scoreE3.textContent = candidate['E3'] ?? 'N/A';
    scoreE4.textContent = candidate['E4'] ?? 'N/A';
    scoreE5.textContent = candidate['E5'] ?? 'N/A';
    EndTestScoreTotal.textContent = candidate['End Test (Total)'] ?? 'N/A';
    EndTestScoreTotal.parentElement.cells[0].innerHTML = '<strong>Total</strong>';

    resultDisplay.style.display = 'block';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    resultDisplay.style.display = 'none'; // Hide results when showing an error
}

// --- Initialize ---
// Start loading the data as soon as the script runs
loadResultsData();
