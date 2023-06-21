# Code Quiz - by Omer 

This is a coding quiz application that tests your knowledge of JavaScript fundamentals. The quiz consists of multiple-choice questions, and your score is calculated based on the number of correct answers you provide within the time limit.

## Features

- User-friendly interface
- Timed quiz with a countdown timer
- Multiple-choice questions
- Instant feedback on correct and incorrect answers
- Highscore tracking
- Ability to save and view highscores

## Getting Started

To run the quiz application, simply open the `index.html` file in your web browser. The application is built using HTML, CSS, and JavaScript, so you don't need any additional dependencies or installations.

## How to Play

1. Click the "Start Quiz" button to begin the quiz.
2. You will be presented with a series of multiple-choice questions.
3. Read each question carefully and select the answer you believe is correct.
4. If you select the correct answer, you will receive points.
5. If you select the wrong answer, time will be deducted from the countdown timer.
6. The quiz ends when you have answered all the questions or the timer reaches 0.
7. After the quiz ends, you can enter your initials to save your score.
8. You can view the highscores by clicking the "View Highscores" link.

## Customize the Quiz - Altough i added some boring questions, if you wanted to try this you can customise the code to put in questions of your choice and play with friends and family!!!

If you want to customize the quiz and add your own questions, you can modify the `questions` array in the `script.js` file. Each question is defined by an object with the following properties:

```javascript
{
  question: "Question text",
  choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
  answer: "Correct Choice"
}
