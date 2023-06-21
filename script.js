// Quiz Questions - list of all the questions i wanted the questions to make sense so i got generic javascript questions to test the user 
var questions = [
  {
    question: "What is the correct syntax for referring to an external script called 'script.js'?",
    choices: ["<script href='script.js'>", "<script src='script.js'>", "<script name='script.js'>", "<script file='script.js'>"],
    answer: "<script src='script.js'>"
  },
  {
    question: "Inside which HTML element do we put the JavaScript code?",
    choices: ["<scripting>", "<javascript>", "<script>", "<js>"],
    answer: "<script>"
  },
  {
    question: "How do you create a function in JavaScript?",
    choices: ["function: myFunction()", "function myFunction()", "function = myFunction()", "function.myFunction()"],
    answer: "function myFunction()"
  },
  {
    question: "Which built-in method removes the last element from an array and returns that element?",
    choices: ["pop()", "last()", "push()", "remove()"],
    answer: "pop()"
  }
];

// Variables - gets the elements from the  html 
var startPage = document.getElementById('start-page');
var quizPage = document.getElementById('quiz-page');
var resultPage = document.getElementById('result-page');
var startBtn = document.getElementById('start-btn');
var questionElement = document.getElementById('question');
var choicesElement = document.getElementById('choices');
var timerElement = document.getElementById('timer');
var timeLeftElement = document.getElementById('time-left');
var scoreElement = document.getElementById('score');
var highscoreForm = document.getElementById('highscore-form');
var initialsInput = document.getElementById('initials');
var goBackBtn = document.getElementById('go-back-btn');
var clearScoresBtn = document.getElementById('clear-scores-btn');
var highscoreList = document.getElementById('highscore-list');

var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;
var timer;

// Start the quiz - begins the quiz 
function startQuiz() {
  startPage.classList.add('hide');
  quizPage.classList.remove('hide');
  startTimer();
  showQuestion();
}

// Start the timer when you click to start the quiz starting at 60 seconds
function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// This part displays the question 
function showQuestion() {
  var question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  choicesElement.innerHTML = '';

  for (var i = 0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    var choiceBtn = document.createElement('button');
    choiceBtn.textContent = choice;
    choiceBtn.setAttribute('class', 'choice');
    choiceBtn.setAttribute('value', choice);
    choiceBtn.onclick = checkAnswer;
    choicesElement.appendChild(choiceBtn);
  }
}

// This part validates the answer to each question 
function checkAnswer(event) {
  var selectedAnswer = event.target.value;
  var question = questions[currentQuestionIndex];

  if (selectedAnswer === question.answer) {
    score += 10;
  } else {
    timeLeft -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// Shows final score 
function endQuiz() {
  clearInterval(timer);
  quizPage.classList.add('hide');
  resultPage.classList.remove('hide');
  scoreElement.textContent = 'Your final score is ' + score;
}

// This function intakes the initials the user puts to display on page when working with local storage we gotta turn eveything into a string for it to function correctly 
function handleFormSubmit(event) {
  event.preventDefault();

  var initials = initialsInput.value.trim();

  if (initials !== '') {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    var newScore = { initials: initials, score: score };
    highscores.push(newScore);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    renderHighscores();
  }
}

// Clear highscores - this was a pretty usefull and easy function to add as sometimes the user may want to refresh the highscores to start a new leaderboard
function clearHighscores() {
  localStorage.removeItem('highscores');
  renderHighscores();
}

// this is where the highscores are rendered 
function renderHighscores() {
  var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  highscoreList.innerHTML = '';

  for (var i = 0; i < highscores.length; i++) {
    var highscore = highscores[i];
    var highscoreItem = document.createElement('li');
    highscoreItem.textContent = highscore.initials + ' - ' + highscore.score;
    highscoreList.appendChild(highscoreItem);
  }
}

// This basically refreshes everything where you can go back and start the quiz again
function goBack() {
  resultPage.classList.add('hide');
  quizPage.classList.add('hide');
  startPage.classList.remove('hide');
  currentQuestionIndex = 0;
  timeLeft = 60;
  score = 0;
  clearInterval(timer);
}

// Event listeners - i catogrised all the event listeners making it easy for me to manage each input a user does 
startBtn.addEventListener('click', startQuiz);
highscoreForm.addEventListener('submit', handleFormSubmit);
goBackBtn.addEventListener('click', goBack);
clearScoresBtn.addEventListener('click', clearHighscores);

// This Renders highscores on page load
renderHighscores();
