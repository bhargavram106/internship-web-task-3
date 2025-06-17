// 2. Interactive JavaScript Quiz Logic (UPDATED for Current Affairs - 10 Questions + Randomization)

const quizQuestions = [
    {
        question: "Who is the current President of India as of June 2025?",
        options: ["Ram Nath Kovind", "Droupadi Murmu", "Pranab Mukherjee", "Narendra Modi"],
        answer: "Droupadi Murmu"
    },
    {
        question: "Which country is hosting the ICC Women's Cricket World Cup in 2025?",
        options: ["Australia", "England", "India and Sri Lanka", "South Africa"],
        answer: "India and Sri Lanka"
    },
    {
        question: "What is the name of the Indian space mission that successfully landed on the Moon's South Pole?",
        options: ["Chandrayaan-1", "Mangalyaan", "Chandrayaan-2", "Chandrayaan-3"],
        answer: "Chandrayaan-3"
    },
    {
        question: "Which Indian city is famously known as the 'Silicon Valley of India'?",
        options: ["Mumbai", "Bengaluru", "Hyderabad", "Chennai"],
        answer: "Bengaluru"
    },
    {
        question: "what is Maple Syrup Urine Disease that was recently seen in news?",
        options: ["A rare genetic disorder", "A respiratory disease", "A viral infection targeting nervous system", "None of the above"],
        answer: "A rare genetic disorder"
    },
    {
        question: "Which city will host the AI action summit in 2025?",
        options: ["Newyork", "Paris", "Geneva", "Tokyo"],
        answer: "Paris"
    },
    {
        question: "The 'Yashoda AI' initiative, aiming to empower women with AI literacy, was launched by which Indian institution?",
        options: ["NITI Aayog", "Reserve Bank of India (RBI)", "National Commission for Women (NCW)", "Ministry of Education"],
        answer: "National Commission for Women (NCW)"
    },
    {
        question: "What is the primary focus of India's National Quantum Mission (NQM) launched in 2024?",
        options: ["Quantum computing and communication", "Renewable energy production", "Deep-sea exploration", "Agricultural technology development"],
        answer: "Quantum computing and communication"
    },
    {
        question: "Which major national sporting event is scheduled to be held in Uttarakhand in January-February 2025?",
        options: ["Khelo India Youth Games", "National Games", "Indian Premier League", "FIH Pro League"],
        answer: "National Games"
    },
    {
        question: "How many individuals were honoured with the Padma Vibhusan Award in 2025?",
        options: ["4", "5", "7", "6"],
        answer: "7"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null; // To keep track of the currently selected option
let userName = ""; // Variable to store user's name

// NEW: References to name entry screen elements
const nameEntryScreen = document.getElementById('name-entry-screen');
const userNameInput = document.getElementById('user-name-input');
const submitNameButton = document.getElementById('submit-name-btn');

// NEW: References to quiz start screen elements
const quizStartScreen = document.getElementById('quiz-start-screen'); 
const startQuizButton = document.getElementById('start-quiz-btn');   

// Existing quiz elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-btn'); 
const quizResultElement = document.getElementById('quiz-result');
const quizControlsArea = document.querySelector('.quiz-controls-area');

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
    }
    return array;
}

// Function to show/hide quiz elements (question, options, controls)
function toggleQuizElements(show) {
    questionElement.style.display = show ? 'flex' : 'none'; 
    optionsContainer.style.display = show ? 'grid' : 'none'; 
    quizControlsArea.style.display = show ? 'flex' : 'none'; 
}

// Function to load a question
function loadQuestion() {
    selectedOption = null; 
    
    // Ensure question is visible and result is hidden
    questionElement.style.display = 'flex'; 
    quizResultElement.style.display = 'none'; 
    quizResultElement.textContent = ''; 

    // Reset option button styles and enable them for new question
    Array.from(optionsContainer.children).forEach(button => {
        button.classList.remove('selected', 'correct-answer', 'incorrect-answer'); 
        button.disabled = false; 
    });

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; 

    const optionLetters = ['A', 'B', 'C', 'D']; 
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = `${optionLetters[index]}. ${option}`; 
        button.classList.add('option-button');
        button.addEventListener('click', () => selectOption(button, option)); 
        optionsContainer.appendChild(button);
    });

    nextButton.disabled = true; 
    nextButton.textContent = "Check Answer"; 
    nextButton.style.display = 'block'; 
}

function selectOption(button, optionText) {
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }
    button.classList.add('selected');
    selectedOption = button; 
    nextButton.disabled = false; 
}

function checkAnswer() {
    if (!selectedOption) {
        quizResultElement.textContent = "Please select an option!";
        quizResultElement.style.color = "#FFC107"; 
        quizResultElement.style.display = 'block'; 
        return;
    }

    questionElement.style.display = 'none'; // Hide the question when result appears
    quizResultElement.style.display = 'block'; 

    const userAnswer = selectedOption.textContent.substring(3); 
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;

    Array.from(optionsContainer.children).forEach(button => button.disabled = true);

    if (userAnswer === correctAnswer) {
        score++;
        quizResultElement.textContent = "Correct! 🎉";
        quizResultElement.style.color = "#00FF00"; 
        selectedOption.classList.add('correct-answer'); 
    } else {
        quizResultElement.textContent = `Oops 🫥! The correct answer was: ${correctAnswer}`;
        quizResultElement.style.color = "rgb(255,20,40)"; 
        selectedOption.classList.add('incorrect-answer'); 

        Array.from(optionsContainer.children).forEach(button => {
            const originalOptionText = button.textContent.substring(3); 
            if (originalOptionText === correctAnswer) {
                button.classList.add('correct-answer'); 
            }
        });
    }

    nextButton.textContent = (currentQuestionIndex === quizQuestions.length - 1) ? "Show Results" : "Next Question";
}

nextButton.addEventListener('click', () => {
    if (nextButton.textContent === "Check Answer") {
        checkAnswer();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }
});


function showResults() {
    questionElement.style.display = 'flex'; 
    questionElement.textContent = `${userName}, your quiz is finished! Your score: ${score} out of ${quizQuestions.length}`;
    
    optionsContainer.innerHTML = ''; 
    
    nextButton.style.display = 'none'; 
    quizResultElement.style.display = 'none'; 

    const resetButton = document.createElement('button');
    resetButton.textContent = "Play Again?";
    resetButton.classList.add('restart-button-centered'); 
    
    resetButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        shuffleArray(quizQuestions);
        nameEntryScreen.style.display = 'flex'; // Go back to name entry screen
        quizStartScreen.style.display = 'none'; 
        toggleQuizElements(false); 
        if (quizControlsArea.contains(resetButton)) { 
            resetButton.remove(); 
        }
        userNameInput.value = ''; // Clear name input
        submitNameButton.disabled = true; 
        userName = ""; // Clear stored name
        // Reset the start screen title in case user wants to enter same name
        quizStartScreen.querySelector('h3').textContent = `Ready for the Ultimate Current Affairs Challenge?`;
    });
    quizControlsArea.appendChild(resetButton); 
}

// NEW: Event listener for the submit name button
submitNameButton.addEventListener('click', () => {
    userName = userNameInput.value.trim();
    if (userName) {
        nameEntryScreen.style.display = 'none'; 
        quizStartScreen.style.display = 'flex'; 
        quizStartScreen.querySelector('h3').textContent = `Welcome, ${userName}☺️! Ready to start?`;
    } else {
        userNameInput.placeholder = "Please enter your name!";
        userNameInput.style.borderColor = "#dc3545"; 
    }
});

// NEW: Enable/disable submit button based on input
userNameInput.addEventListener('input', () => {
    submitNameButton.disabled = userNameInput.value.trim() === '';
    userNameInput.style.borderColor = "#00f0ff"; // Reset border color
    userNameInput.placeholder = "Your Name"; // Reset placeholder
});


// Existing: Event listener for the start quiz button
startQuizButton.addEventListener('click', () => {
    quizStartScreen.style.display = 'none'; 
    toggleQuizElements(true); 
    loadQuestion(); 
});

// Initial setup: Only show the name entry screen
nameEntryScreen.style.display = 'flex';
quizStartScreen.style.display = 'none';
toggleQuizElements(false); // Hide all quiz elements initially


// 3. Fetch Data from a Weather API using JavaScript
const cityInput = document.getElementById('city-input');
const fetchWeatherButton = document.getElementById('fetch-weather-btn');
const cityNameElement = document.getElementById('city-name');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const weatherErrorElement = document.getElementById('weather-error');
const weatherIconElement = document.getElementById('weather-icon');

const OPENWEATHER_API_KEY = '***REDACTED_OPENWEATHER_KEY***'; // Your OpenWeatherMap API Key

async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        displayWeatherError("Please enter a city name.");
        return;
    }

    clearWeatherDisplay();
    cityNameElement.textContent = `Loading weather for ${city}...`;
    weatherErrorElement.textContent = '';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 404) {
                displayWeatherError(`City "${city}" not found. Please check spelling.`);
            } else if (response.status === 401) {
                displayWeatherError("API key is invalid or missing. Please check your OpenWeatherMap API key.");
            } else {
                throw new Error(`HTTP error! status: ${response.status}, message: ${data.message || 'Unknown error'}`);
            }
            return;
        }

        cityNameElement.textContent = `Weather in ${data.name}, ${data.sys.country}`;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = `${data.weather[0].description}`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIconElement.src = iconUrl;
        weatherIconElement.alt = data.weather[0].description;

    } catch (error) {
        console.error("Error fetching weather:", error);
        displayWeatherError(`Failed to fetch weather. ${error.message || 'Please try again later.'}`);
    }
}

function displayWeatherError(message) {
    clearWeatherDisplay();
    weatherErrorElement.textContent = message;
}

function clearWeatherDisplay() {
    cityNameElement.textContent = '';
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
    humidityElement.textContent = '';
    windSpeedElement.textContent = '';
    weatherErrorElement.textContent = '';
    weatherIconElement.src = '';
    weatherIconElement.alt = '';
}

fetchWeatherButton.addEventListener('click', fetchWeather);

// Optional: Fetch weather for a default city on page load
// fetchWeather('London');