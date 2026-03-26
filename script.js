const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What year did the first iPhone launch?",
    answers: [
      { text: "2005", correct: false },
      { text: "2007", correct: true },
      { text: "2009", correct: false },
      { text: "2011", correct: false },
    ],
  },
  {
    question: "Which artist painted 'The Starry Night'?",
    answers: [
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
      { text: "Vincent van Gogh", correct: true },
      { text: "Salvador Dalí", correct: false },
    ],
  },
  {
    question: "What is the fastest land animal?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Cheetah", correct: true },
      { text: "Peregrine Falcon", correct: false },
      { text: "Horse", correct: false },
    ],
  },
  {
    question: "Who wrote '1984'?",
    answers: [
      { text: "Aldous Huxley", correct: false },
      { text: "George Orwell", correct: true },
      { text: "Ray Bradbury", correct: false },
      { text: "J.R.R. Tolkien", correct: false },
    ],
  },
  {
    question: "What is the square root of 144?",
    answers: [
      { text: "10", correct: false },
      { text: "11", correct: false },
      { text: "12", correct: true },
      { text: "14", correct: false },
    ],
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    answers: [
      { text: "Germany", correct: false },
      { text: "Brazil", correct: false },
      { text: "Croatia", correct: false },
      { text: "France", correct: true },
    ],
  },
  {
    question: "What does 'HTTP' stand for?",
    answers: [
      { text: "HyperText Transfer Protocol", correct: true },
      { text: "High Transfer Text Protocol", correct: false },
      { text: "Hyper Transfer Text Process", correct: false },
      { text: "HighText Transfer Process", correct: false },
    ],
  },
  {
    question: "Which actor played Jack Dawson in 'Titanic'?",
    answers: [
      { text: "Brad Pitt", correct: false },
      { text: "Matt Damon", correct: false },
      { text: "Leonardo DiCaprio", correct: true },
      { text: "Johnny Depp", correct: false },
    ],
  },
  {
    question: "What is the smallest country in the world by land area?",
    answers: [
      { text: "Monaco", correct: false },
      { text: "San Marino", correct: false },
      { text: "Vatican City", correct: true },
      { text: "Liechtenstein", correct: false },
    ],
  },
  {
    question: "Which element has the atomic number 1?",
    answers: [
      { text: "Helium", correct: false },
      { text: "Oxygen", correct: false },
      { text: "Hydrogen", correct: true },
      { text: "Carbon", correct: false },
    ],
  },
  {
    question: "Who directed the movie 'Inception'?",
    answers: [
      { text: "Steven Spielberg", correct: false },
      { text: "James Cameron", correct: false },
      { text: "Quentin Tarantino", correct: false },
      { text: "Christopher Nolan", correct: true },
    ],
  },
  {
    question: "What is the main ingredient in traditional hummus?",
    answers: [
      { text: "Black beans", correct: false },
      { text: "Chickpeas", correct: true },
      { text: "Lentils", correct: false },
      { text: "Eggplant", correct: false },
    ],
  },
  {
    question: "Which famous scientist developed the three laws of motion?",
    answers: [
      { text: "Albert Einstein", correct: false },
      { text: "Galileo Galilei", correct: false },
      { text: "Isaac Newton", correct: true },
      { text: "Nikola Tesla", correct: false },
    ],
  },
  {
    question: "What is the highest-grossing film of all time (as of 2024)?",
    answers: [
      { text: "Titanic", correct: false },
      { text: "Avatar", correct: true },
      { text: "Avengers: Endgame", correct: false },
      { text: "Star Wars: The Force Awakens", correct: false },
    ],
  },
  {
    question: "Which music artist has the most Grammy awards of all time?",
    answers: [
      { text: "Beyoncé", correct: true },
      { text: "Quincy Jones", correct: false },
      { text: "Paul McCartney", correct: false },
      { text: "Jay-Z", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length

// EVENT LISTENERS

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
  // RESET BARS
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion(){
  // RESET STATE
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // What is a Dataset? It is a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimisation check
  if(answerDisabled) return

  answerDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if(isCorrect) {
    score++
    scoreSpan.textContent = score
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // Check if there are any questions left or if the questions are done
    if(currentQuestionIndex < quizQuestions.length) {
      showQuestion()
    }else {
      showResults()
    }
  }, 1000)
}

function showResults(){
  quizScreen.classList.remove("active")
  resultScreen.classList.add("active")

  finalScoreSpan.textContent = score;

  const percentage = (score/quizQuestions.length) * 100

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz(){
  resultScreen.classList.remove("active");

  startQuiz();
}