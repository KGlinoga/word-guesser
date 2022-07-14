//TODO: can reset scores with reset btn

var startBtn = document.querySelector("#startGame");
var wordDisplay = document.querySelector("#wordDisplay");
var timeLeftSpan = document.querySelector("#timeLeftSpan");
var lossSpan = document.querySelector("#lossSpan");
var winSpan = document.querySelector("#winSpan");
var resetBtn = document.querySelector("#resetScore");

var words = ["manatees", "gorgonzola", "syzygy", "lynx", "cardboard", "table", "basketball"]
var randomWord = "";
var numLetters = 0;
var userGuesses = [];
var wins = localStorage.getItem("savedWins")||0;
  winSpan.textContent=wins;
var losses = localStorage.getItem("savedLosses")||0;
  lossSpan.textContent=losses;
var timeLeft = 10;
var timer;
var isPlaying = false;

  startBtn.addEventListener("click", function(){
    if(isPlaying){
      return;
    }
    randomWord = words[Math.floor(Math.random()*words.length)];
    numLetters = randomWord.length;
    userGuesses = [];
    for (let i = 0; i < numLetters; i++) {
      userGuesses.push("_")
    }
    console.log(randomWord,numLetters,userGuesses);
    wordDisplay.textContent= userGuesses.join(" ");
    timeLeft=10;
    isPlaying=true;
    timer = setInterval(function(){
      timeLeft--;
      timeLeftSpan.textContent=timeLeft
        if(!timeLeft){
          console.log("you lose")
          losses++;
          lossSpan.textContent=losses;
          //saves scores to ls
          localStorage.setItem("savedLosses", losses);
          clearInterval(timer);
          isPlaying = false;
        }
    },1000)
  })
//listen for keystrokes
document.addEventListener("keyup",function(event){
  // do the edge case FIRST: user pushes keys before game starts
  if(!isPlaying){
    return;
  }
  console.log(event.key);
  //
  if(randomWord.includes(event.key)){
    for (let i = 0; i < randomWord.length; i++){
      if(event.key===randomWord[i]){
        userGuesses[i]=event.key
      }
    }
    console.log(userGuesses)
    //win condition
    if(userGuesses.join("")===randomWord){
      console.log("winner!")
      clearInterval(timer);
      wins++;
      winSpan.textContent=wins;
      //save scores to ls
      localStorage.setItem("savedWins",wins)
      isPlaying = false;
    }
    wordDisplay.textContent= userGuesses.join(" ");
  } else {
      console.log("not in word")
  }
})

//reset button

resetBtn.addEventListener("click",function(){
  wins=0;
  losses=0;
  localStorage.setItem("savedWins",0);
  localStorage.setItem("savedLosses",0);
  winSpan.textContent=0;
  lossSpan.textContent=0;
})







// var timeEl = document.querySelector(".time");
// var mainEl = document.getElementById("main");
// var textAreaEl = document.querySelector('#textarea')

// var secondsLeft;

// mainEl.addEventListener('click', function(event) {
//     event.preventDefault();
//     secondsLeft = 10;
//     setTime();
// })

// function setTime() {
   
//     var timerInterval = setInterval(function() {
//       secondsLeft--;
//       timeEl.textContent = secondsLeft + " seconds left to guess!";
  
//       if(secondsLeft === 0) {
//         clearInterval(timerInterval);
//         sendMessage("Time's Up!");
//       }
  
//     }, 1000);
//   }

//   function sendMessage() {
//     alert("Bummer!");
//   };

 
