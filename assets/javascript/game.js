// Tank names, used to generate images as well
var tankArray = [
	"abrams",
	"armata",
	"challenger",
	"leclerc",
	"leopard",
	"merkava",
	"patton",
	"sheridan",
	"sherman",
	"t34",
	"t72",
	"tiger"
];

// Declare initial variables
var gameInProgress = false;
var pickedTank = "tanks";
var guessesLeft = 10;
var tankNameArr = [];
var userGuess = "";
var userGuessArr = [];
var wrongGuesses = [];
var gamesWon = 0;
var gamesLost = 0;
var instructions = "Press any key to start.";

function display() {
	// Hook JS into HTML by ID
	document.getElementById("tankImg").src =
		"assets/images/" + pickedTank + ".jpg";
	document.getElementById("instruct").innerHTML = instructions;
	document.getElementById(
		"wrongGuessesID"
	).innerHTML = wrongGuesses.toString();
	document.getElementById("guessesLeftID").innerHTML = guessesLeft;
	document.getElementById("gamesWon").innerHTML = gamesWon;
	document.getElementById("gamesLost").innerHTML = gamesLost;
}

// Initialize vars
function initializer() {
	//pickedTank = "tanks";
	guessesLeft = 10;
	tankNameArr = [];
	userGuess = "";
	userGuessArr = [];
	wrongGuesses = [];
	instructions = "Press a key to start";
}

// Picks random tank name from tank array
function tankPicker() {
	var rando = Math.floor(Math.random() * tankArray.length);
	return tankArray[rando];
}

// Setup game - doesn't store key press
function gameSetup() {
	tankNameArr = Array.from(pickedTank);
	console.log("tankNameArr =" + tankNameArr);
	fillInSpaces();
	gameInProgress = true;
}

function checkGuessUnique() {
	if (userGuessArr.includes(userGuess)) {
		return false;
	} else {
		userGuessArr.push(userGuess);
		checkGuessInTank();
	}
}

function checkGuessInTank() {
	if (tankNameArr.includes(userGuess)) {
		fillInSpaces();
	} else {
		guessesLeft--;
		wrongGuesses.push(userGuess);
		if (guessesLeft === 0) {
			gameLost();
		}
	}
}

function fillInSpaces() {
	var spacesArr = [];
	for (var i = 0; i < tankNameArr.length; i++) {
		if (userGuessArr.includes(tankNameArr[i])) {
			spacesArr.push(tankNameArr[i]);
		} else {
			spacesArr.push("_");
		}
	}
	var spacesStr = "";
	spacesStr = spacesArr.join("");
	document.getElementById("spacesID").innerHTML = spacesStr;
	console.log(
		"spacesStr: " +
			spacesStr +
			", spacesArr: " +
			spacesArr +
			", tankNameArr: " +
			tankNameArr
	);
	if (spacesStr === pickedTank) {
		gameWon();
	}
}

function gameWon() {
	gamesWon++;
	gameInProgress = false;
	instructions = "You won! Press a key to continue...";
	pickedTank = "victory";
}

function gameLost() {
	gamesLost++;
	gameInProgress = false;
	instructions = "You Lost! Press a key to try again...";
	pickedTank = "defeat";
}

document.onkeypress = function() {
	if (gameInProgress) {
		userGuess = event.key;
		checkGuessUnique();
		display();
	} else {
		initializer();
		display();
		pickedTank = tankPicker();
		display();
		gameSetup();
		display();
	}
};
