var questionElm = document.querySelector(".question");
var result = document.querySelector(".resultContainer");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var quiz = document.querySelector(".quiz");
var counter = 0;
var timer;
var timerCount;
var initialInput = document.querySelector("#initial-text");
var initialForm = document.querySelector("#initial");
var initialList = document.querySelector("#initial-list");
var submitButton = document.querySelector("#submit");
var view = document.querySelector("#view");
var highscores = [];
var answers=0;
var currentQuestion= 0;

 
    
// Questions
var questions = [
    {
        questionElm : "How do you add a comment in a CSS file?",
        choiceA : "/* this is a comment */",
        choiceB : "// this is a comment //",
        choiceC : "// this is a comment",
        choiceD : "!--this is a comment",
        

    },{
        questionElm : "Images in your webpage may have the following extensions except",
        choiceA : "png",
        choiceB : "gif",
        choiceC : "jpg",
        choiceD : "psd",
        
    }
];

var lastQuestion = questions.length - 1;

//Get each initial and score and attach it to HTML list
function renderHighscores() {
  initialList.innerHTML = "";
  for (var i = 0; i < highscores.length; i++) {
    var highscore = highscores[i];
    var li = document.createElement("li");
    li.textContent = highscore.initial + ":" + highscore.result;
    li.setAttribute("data-index", i);
    initialList.appendChild(li);
  }
}

//Run when the page loads
function init() {
//Get data from localStorage
  var storedScores = JSON.parse(localStorage.getItem("highscores"));

//If something is in localStorage then update the array
  if (storedScores !== null) {
    highscores = storedScores;
  }
  renderHighscores();
}

function storeScores() {
//Set array in localStorage
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

//Button for creating each highscore
submitButton.addEventListener("click", function(event) {
event.preventDefault();
      scores = {
         initial: initialInput.value.trim(),
         result: counter
     };
            
  if (scores === "") {
    return;
  }

  //Add new highscore to array and  clear input
  highscores.push(scores);
  initialInput.value = "";
  result.style.display="none";
  initialForm.style.display="none";
  storeScores();
  renderHighscores();
});



// Calls init to retrieve data and render it to the page on load
init();


function renderQuestion(){
    var q = questions[currentQuestion];
    questionElm.innerHTML = "<p>"+ q.questionElm +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;

}

choiceA.addEventListener("click",correctAns);
 
//wrong choice      
choiceB.addEventListener("click",function(){
    counter--;
    //deduct 3 seconds from clock as penalty
    timerCount-=3;
    if(currentQuestion<lastQuestion){
        currentQuestion++;
        answers++;
        renderQuestion();
    } else {endQuize();}
});
//wrong choice 
choiceC.addEventListener("click",function(){
    counter--;
    //deduct 3 seconds from clock as penalty
    timerCount-=3;
    if(currentQuestion<lastQuestion){
        currentQuestion++;
        answers++;
        renderQuestion();
    }  else {endQuize();}
});
//wrong choice  
choiceD.addEventListener("click",function(){
    counter--;
    //deduct 3 seconds from clock as penalty
    timerCount-=3;
    if(currentQuestion<lastQuestion){
        currentQuestion++;
        answers++;
        renderQuestion();
    } else {endQuize();}
 });
  
 //Function for correct answer
 function correctAns(){
    counter++;
    if(currentQuestion<lastQuestion){
        currentQuestion++; 
        answers++;
        renderQuestion();
    } else {endQuize();}
 }
    

function startQuize() {
  startButton.style.display = "none"
  quiz.style.display = "block";
  timerCount = 10;
  renderQuestion();
  startTimer();
  
}


function endQuize() {
    startButton.style.display = "none"
    quiz.style.display = "none";
    result.style.display="block";
    initialForm.style.display="block";
    result.innerHTML = "<p>"+ " Your result is: " + counter +"</p>";
    clearInterval(timer);
}



function startTimer() {
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount === 0 && answers!==questions.length) {
        //when time is up and questions are not answered in complete
      counter-=questions.length-answers;
      clearInterval(timer);
      endQuize();  
    }
  }, 1000);
}

startButton.addEventListener("click", startQuize);

//Button for highscores view
view.addEventListener("click",function(){
    initialList.style.display= "block";
})


