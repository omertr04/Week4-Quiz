// Quiz Questions
var q = [
  {
    q: "What is the correct syntax for referring to an external script called 'script.js'?",
    c: ["<script href='script.js'>", "<script src='script.js'>", "<script name='script.js'>", "<script file='script.js'>"],
    a: "<script src='script.js'>"
  },
  {
    q: "Inside which HTML element do we put the JavaScript code?",
    c: ["<scripting>", "<javascript>", "<script>", "<js>"],
    a: "<script>"
  },
  {
    q: "How do you create a function in JavaScript?",
    c: ["function: myFunction()", "function myFunction()", "function = myFunction()", "function.myFunction()"],
    a: "function myFunction()"
  },
  {
    q: "Which built-in method removes the last element from an array and returns that element?",
    c: ["pop()", "last()", "push()", "remove()"],
    a: "pop()"
  }
];

// Variables
var sp = document.getElementById('start-page');
var qp = document.getElementById('quiz-page');
var rp = document.getElementById('result-page');
var sb = document.getElementById('start-btn');
var qe = document.getElementById('question');
var ce = document.getElementById('choices');
var te = document.getElementById('timer');
var tle = document.getElementById('time-left');
var se = document.getElementById('score');
var hf = document.getElementById('highscore-form');
var ie = document.getElementById('initials');
var gb = document.getElementById('go-back-btn');
var csb = document.getElementById('clear-scores-btn');
var hl = document.getElementById('highscore-list');

var ci = 0;
var tl = 60;
var sc = 0;
var tmr;

// Start the quiz
function startQuiz() {
  sp.classList.add('hide');
  qp.classList.remove('hide');
  startTimer();
  showQuestion();
}

// Start the timer when the quiz starts at 60 seconds
function startTimer() {
  tmr = setInterval(function () {
    tl--;
    tle.textContent = tl;

    if (tl <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Display the question
function showQuestion() {
  var qq = q[ci];
  qe.textContent = qq.q;
  ce.innerHTML = '';

  for (var i = 0; i < qq.c.length; i++) {
    var ch = qq.c[i];
    var cb = document.createElement('button');
    cb.textContent = ch;
    cb.setAttribute('class', 'choice');
    cb.setAttribute('value', ch);
    cb.onclick = checkAnswer;
    ce.appendChild(cb);
  }
}

// Validate the answer to each question
function checkAnswer(event) {
  var sa = event.target.value;
  var qq = q[ci];

  if (sa === qq.a) {
    sc += 10;
  } else {
    tl -= 10;
  }

  ci++;

  if (ci === q.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// Show the final score
function endQuiz() {
  clearInterval(tmr);
  qp.classList.add('hide');
  rp.classList.remove('hide');
  se.textContent = 'Your final score is ' + sc;
}

// Handle form submission to store initials and score
function handleFormSubmit(event) {
  event.preventDefault();

  var ini = ie.value.trim();

  if (ini !== '') {
    var hs = JSON.parse(localStorage.getItem('highscores')) || [];
    var ns = { initials: ini, score: sc };
    hs.push(ns);
    localStorage.setItem('highscores', JSON.stringify(hs));
    renderHighscores();
  }
}

// Clear highscores
function clearHighscores() {
  localStorage.removeItem('highscores');
  renderHighscores();
}

// Render highscores
function renderHighscores() {
  var hs = JSON.parse(localStorage.getItem('highscores')) || [];
  hl.innerHTML = '';

  for (var i = 0; i < hs.length; i++) {
    var h = hs[i];
    var hi = document.createElement('li');
    hi.textContent = h.initials + ' - ' + h.score;
    hl.appendChild(hi);
  }
}

// Go back to the start page
function goBack() {
  rp.classList.add('hide');
  qp.classList.add('hide');
  sp.classList.remove('hide');
  ci = 0;
  tl = 60;
  sc = 0;
  clearInterval(tmr);
}

// Event listeners
sb.addEventListener('click', startQuiz);
hf.addEventListener('submit', handleFormSubmit);
gb.addEventListener('click', goBack);
csb.addEventListener('click', clearHighscores);

// Render highscores on page load
renderHighscores();
