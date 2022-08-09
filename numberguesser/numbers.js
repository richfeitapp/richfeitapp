
function getErrorMessage(item, finalNumber) {
    let halfNumber = item.halfNumber;
    if(finalNumber > halfNumber) {
      if (item.up) {
        return null; 
      }
    }
    if (finalNumber > halfNumber) {
     return "You said lower when I asked you if it was higher or lower than " + halfNumber;
    }
    if (item.up) {
      return "You said higher when I asked you if it was higher or lower than " + halfNumber;
    }
    return null;
}

codingExerciseForEllie();

function codingExerciseForEllie() {
  let item0 = {
    up: true,
    halfNumber: 50
  };
  console.log(getErrorMessage(item0, 28));
  return;
}

codingExerciseForEllie();


let record = [];

function calculateGuesses(maxNumber) {
    let number = 2;
    let goUp = 1;
    while (number < maxNumber) {
        goUp = goUp + 1;
        console.log(number);
        number  = number * 2;
    }
    console.log("goUp", goUp);
    return goUp;
}

let personNumber = null;
let lastGuess = null;
let difference = null;

function go() {
    let guessSection = document.getElementById("guess");
    guessSection.style.visibility = "visible";
    let theNumber = document.getElementById("compute_guess");
    let downCount = document.getElementById("countDown")
    downCount.style.visibility = "visible";
    
    let whatNumber = document.getElementById("whatNumber");
    if(whatNumber.value.trim() === "") {
        window.alert("Invalid number");
        return;
    }
    let whatNumberNumber = parseInt(whatNumber.value);
    if(whatNumberNumber < 1) {
        window.alert("Invalid Number (You must pick a number greater than 0)");
        return;
    }
    let calGuess = document.getElementById("number_of_guesses");
    calGuess.innerText = calculateGuesses(whatNumberNumber);
    console.log(calculateGuesses(whatNumberNumber));

    lastGuess = Math.round(whatNumberNumber * 0.5); 
    difference = Math.round(lastGuess * 0.5);
    theNumber.innerText = lastGuess;
}
function add() {
    count(true);
    lastGuess = lastGuess + difference;
    difference = Math.round(difference * 0.5);
    let compute_guess = document.getElementById("compute_guess");
    compute_guess.innerText = lastGuess;
}
function subtract() {
    count(false);
    lastGuess = lastGuess - difference;
    difference = Math.round(difference * 0.5);
    let compute_guess = document.getElementById("compute_guess");
    compute_guess.innerText = lastGuess;
}
function IGuessedIt() {
    let main = document.getElementById("main_text");
    main.style.display = "none";
    let downCount = document.getElementById("countDown");
    downCount.style.visibility = "hidden";
    let buttons = document.getElementById("guess");
    buttons.style.visibility = "hidden";
    let lolipop = document.getElementById("yay");
    lolipop.style.visibility = "visible";

    let all = document.getElementById("twoNumbers");
    all.style.visibility = "hidden";

    let uhOh = document.getElementById("oof")
    uhOh.style.display = "none";
}

function count(higher) {
  if(itIsTheEndOfTheWorldAsWeKnowIt()) {
    return;
   }
  let computeGuessElement = document.getElementById("compute_guess")
  parseInt(computeGuessElement.innerText)
    if(computeGuessElement < 0) {
    window.alert("aldskgjlkajd;lkjl;kj;alkhdgakd");
  }
   let recording = {
      up: higher,
      halfNumber: parseInt(computeGuessElement.innerText)
   };
   record.push(recording);
   console.log("the Array", record);

   let guessNumber = getNumberOfGuesses();
    let guessNumberElement = document.getElementById("number_of_guesses");
   guessNumber = guessNumber - 1;
    guessNumberElement.innerText = guessNumber;
    console.log(guessNumber);
}

function guessComplete() {
        if (guessNumber === 0) {
            let niceOne = document.getElementById(got_it_number)
        niceOne.style.visibility = "visible"
        }
    };
function getNumberOfGuesses() {
    let guessNumberElement = document.getElementById("number_of_guesses");
    let guessNumberText = guessNumberElement.innerText;
    let guessNumber = parseInt(guessNumberText);
    return guessNumber;
}

function itIsTheEndOfTheWorldAsWeKnowIt() {
    if (getNumberOfGuesses() === 1) {
        uhOh();
        return true;
    }
    return false;
}
function uhOh() {
    let theOne = document.getElementById("main_text")
    theOne.style.display = "none";
    
    let down = document.getElementById("countDown")
    down.style.visibility = "hidden";

    let button = document.getElementById("guess")
    button.style.visibility = "hidden";

    let both = document.getElementById("twoNumbers")
    both.style.visibility = "hidden";

    let oof = document.getElementById("oof")
    oof.style.display = "block";
}
function enterFinalNumber() {
  let finalNumber = parseInt(document.getElementById("final_number").value);
  record.forEach(function (single) {
    getErrorMessage (single, finalNumber)
    //console.log(single, getErrorMessage (single, 28));
  let badClick = getErrorMessage(single, finalNumber);
  console.log(badClick);
  if (badClick !== null) {
    let errorMessageElement = document.getElementById("wrongClick");
    console.log(errorMessageElement);
    if(errorMessageElement.innerText === "") {
      errorMessageElement.innerText = badClick;
    }
  }
});
}