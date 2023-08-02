const NUM_QUESTIONS = 5;
const TIME_LIMIT_SECONDS = 30;

// Array to hold the questions and answers
const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    // Add more questions and answers accordingly
];

let score = 0;
let currentQuestionIndex = 0;
let timeRemaining = TIME_LIMIT_SECONDS;
let startTime, currentTime;

const startBtn = document.getElementById("startBtn");
const questionContainer = document.getElementById("questionContainer");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const resultContainer = document.getElementById("resultContainer");
const resultText = document.getElementById("resultText");
const initialsInput = document.getElementById("initialsInput");
const saveBtn = document.getElementById("saveBtn");

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
saveBtn.addEventListener("click", saveScore);

function startQuiz() {
    startBtn.style.display = "none";
    questionContainer.style.display = "block";

    startTime = Date.now();

    showQuestion();
    startTimer();
}

function showQuestion() {
    if (currentQuestionIndex < NUM_QUESTIONS) {
        questionText.textContent = questions[currentQuestionIndex].question;
        answerInput.value = "";
    } else {
        endQuiz();
    }
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++;
    } else {
        timeRemaining = Math.max(0, timeRemaining - 2);
    }

    currentQuestionIndex++;
    showQuestion();
}

function startTimer() {
    const timerInterval = setInterval(function () {
        currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        timeRemaining = Math.max(0, TIME_LIMIT_SECONDS - elapsedTime);

        if (timeRemaining === 0 || currentQuestionIndex === NUM_QUESTIONS) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";

    resultText.textContent = `Quiz finished!\nYour score: ${score}/${NUM_QUESTIONS}\nTime taken: ${TIME_LIMIT_SECONDS - timeRemaining} seconds`;
}

function saveScore() {
    const initials = initialsInput.value.trim();

    // You can add code here to save the score and initials to a database or store them locally

    alert(`Thank you for taking the quiz, ${initials}! Your score has been recorded.`);
}
