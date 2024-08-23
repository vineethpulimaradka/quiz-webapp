const questions = [
    {
        question: "What are meta tags in HTML?",
        options: [
            "Meta tags are those tags which go inside the Head tag of the HTML page",
            "Meta tags are not for the interface they are important for the browser.",
            "Meta Tags are always in name or value pairs",
            "Meta tags consist of character encoding, title, or even description."
        ],
        correct: 0 // Index of the correct option
    },{
        question: "In what year did the Great October Socialist Revolution take place?",
        options: [
            "1917",
            "1923",
            "1914",
            "1920"
        ],
        correct: 0 // Index of the correct option
    },{
        question: "What is the largest lake in the world?",
        options: [
            "Caspian Sea",
            "Baikal",
            "Lake Superior",
            "Ontario"
        ],
        correct: 1 // Index of the correct option
    },{
        question: "Which planet in the solar system is known as the “Red Planet”?",
        options: [
            "Venus",
            "Earth",
            "Mars",
            "Jupiter"
        ],
        correct: 2 // Index of the correct option
    },{
        question: "Which river is the longest in the world?",
        options: [
            "Amazon",
            "Mississippi",
            "Nile",
            "Yangtze"
        ],
        correct: 2 // Index of the correct option
    }

    
];


let timeValue = 15;
let currentQuestionIndex = 0;
let timer;
let isTimerRunning = false;

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Get the start button and info box elements
    const startBtn = document.querySelector(".start_btn button");
    const infoBox = document.querySelector(".info_box");
    const quizBox = document.querySelector(".quiz_box");
    const quitBtn = document.querySelector(".info_box .quit");
    const continueBtn =document.querySelector(".info_box .restart");
    const nextBtn = document.querySelector(".quiz_box footer .next_btn");
    const timersec = document.querySelector(".timer_sec");
    const questionText = document.querySelector(".que_text span");
    const optionList = document.querySelector('.option_list');
    const resultBox = document.querySelector('.result_box');
    const replayBtn = document.querySelector(".result_box .restart");
    const quitQuizBtn = document.querySelector(".result_box .quit");


   
    startBtn.addEventListener('click', () => {
        infoBox.style.opacity = 1;
        infoBox.style.pointerEvents = 'auto';
    });

    quitBtn.addEventListener('click', () => {
        window.location.reload(); // Reload the page to restart the quiz
    });

    continueBtn.addEventListener('click', () => {
        infoBox.style.opacity = 0;
        infoBox.style.pointerEvents = 'none';
        quizBox.style.opacity = 1;
        quizBox.style.pointerEvents = 'auto';
        showQuestion();
    });



    nextBtn.addEventListener('click', nextQuestion);

    function startTimer() {
        if (isTimerRunning) {
            clearInterval(timer);
        }
        isTimerRunning = true;

        timer = setInterval(() => {
            timeValue--;
            timersec.textContent = timeValue;

            if (timeValue <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;

        optionList.innerHTML = ''; // Clear previous options

        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.innerHTML = `
                <span>${option}</span>
                <div class="icon"></div>
            `;
            optionDiv.addEventListener('click', () => selectOption(index));
            optionList.appendChild(optionDiv);
        });

        timeValue = 15; // Reset timer
        timersec.textContent = timeValue; // Update timer display
        startTimer(); // Start the timer
    }

    function selectOption(selectedIndex) {
        clearInterval(timer);
        const correctIndex = questions[currentQuestionIndex].correct;
        const options = document.querySelectorAll('.option');

        options.forEach((option, index) => {
            const icon = option.querySelector('.icon');
            if (index === selectedIndex) {
                if (index === correctIndex) {
                    icon.classList.add('tick');
                } else {
                    icon.classList.add('cross');
                }
            }
            option.style.pointerEvents = 'none'; // Disable further clicks
        });

        setTimeout(nextQuestion, 2000); // Move to the next question after a delay
    }

    function nextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    let score = 0;

    function selectOption(selectedIndex) {
        clearInterval(timer);
        const correctIndex = questions[currentQuestionIndex].correct;
        const options = document.querySelectorAll('.option');
    
        options.forEach((option, index) => {
            const icon = option.querySelector('.icon');
            if (index === selectedIndex) {
                if (index === correctIndex) {
                    icon.classList.add('tick');
                    score++; // Increment score for correct answer
                } else {
                    icon.classList.add('cross');
                }
            }
            option.style.pointerEvents = 'none'; // Disable further clicks
        });
    
        setTimeout(nextQuestion, 2000); // Move to the next question after a delay
    }
    
    function showResult() {
        quizBox.style.opacity = 0;
        quizBox.style.pointerEvents = 'none';
        const resultBox = document.querySelector('.result_box');
        const scoreText = document.querySelector('.result_box .score_text');
        
        // Update the score text
        scoreText.innerHTML = `You got <strong>${score}</strong> out of <strong>${questions.length}</strong>`;
        
        resultBox.style.opacity = 1;
        resultBox.style.pointerEvents = 'auto';
    }
    
    

    
    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
    
        optionList.innerHTML = ''; // Clear previous options
    
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.innerHTML = `
                <span>${option}</span>
                <div class="icon"></div>
            `;
            optionDiv.addEventListener('click', () => selectOption(index));
            optionList.appendChild(optionDiv);
        });
    
        // Update the question number display
        const totalQueCounter = document.querySelector('.total_que span');
        totalQueCounter.innerHTML = `<p>${currentQuestionIndex + 1}</p> of <p>${questions.length}</p> Questions`;
    
        timeValue = 15; // Reset timer
        timersec.textContent = timeValue; // Update timer display
        startTimer(); // Start the timer
    }
    
    function nextQuestion() {
        currentQuestionIndex++;
    
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }
    



//result box operation

replayBtn.addEventListener('click', () => {
    resultBox.style.opacity = 0;
    resultBox.style.pointerEvents = 'none';
    infoBox.style.opacity = 1;
    infoBox.style.pointerEvents = 'auto';
    currentQuestionIndex = 0; // Reset the current question index
    score = 0; // Reset the score
});
    

quitQuizBtn.addEventListener('click', () => {
    window.location.reload(); // Reload the page to restart the quiz
});


});