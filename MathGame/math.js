const problemElement = document.querySelector(".problem")
const mainUI = document.querySelector(".main-ui")
const ourForm = document.querySelector(".our-form") //Bad naming...
const ourField = document.querySelector(".our-field") //More bad naming...
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const resetButton = document.querySelector(".reset-button")
const winScore = 5 //hvor mange poeng som trengs.
const defaultLives = 3 //hvor mange forsøk man har.
const money = document.querySelector(".money")
const goodMessages = ["Flott jobbet!","Nice!","Ny pokémon!","Trykk på ballen!","Enda en til samlingen!","Fortsett sånn!","Stå på!","Du er super!","Oh, hva får du nå?","Eyy! Bra jobbet!"]

const halloweenProgressBar = document.querySelector(".halloween-progress-inner")
const halloweenEgg = document.querySelector(".halloween-egg-image")
let halloweenEvent = false;


let mathValues = {
	stage: 3,
	additionMin: 0,
	additionMax: 10,
	subtractionMin:  0,
	subtractionMax:  10,
	subAllowNegative: true,
	multiplicationMin:  0,
	multiplicationMax:  10,
	divisionMin:  0,
	divisionMax:  10,
	divisionMultiplierMin:  0,
	divisionMultiplierMax:  10,
	operations: ['+','-','x','/'],
	additionDecimals: 0,
	subtractionDecimals: 0,
	multiplicationDecimals: 0,
	divisionDecimals: 0,
	difficultyModifier: 0
}

function calculateCustomDifficulty() {
	values = [];
	if(mathValues.operations.includes("+")) {
		var addition = (Math.abs(mathValues.additionMin - mathValues.additionMax) * (10 ** mathValues.additionDecimals));
		if(addition > 9000) {
			values.push(5);
		} else if (addition > 999) {
			values.push(4);
		} else if (addition > 99) {
			values.push(3);
		} else if (addition > 24) {
			values.push(2);
		} else if (addition > 2){
			values.push(1);
		} else {
			//Addition is busted!
			values.push(0);
		}
	}
	if(mathValues.operations.includes("-")) {
		var subtraction = (Math.abs(mathValues.subtractionMin - mathValues.subtractionMax) * (10 ** mathValues.subtractionDecimals));
		if(subtraction > 9000) {
			values.push(5);
		} else if (subtraction > 999) {
			values.push(4);
		} else if (subtraction > 99) {
			values.push(3);
		} else if (subtraction > 24) {
			values.push(2);
		} else if (subtraction > 2){
			values.push(1);
		} else {
			//Subtraction is busted!
			values.push(0);
		}
	}
	if(mathValues.operations.includes("x")) {
		var multiplication = (Math.abs(mathValues.multiplicationMin - mathValues.multiplicationMax) * (10 ** mathValues.multiplicationDecimals));
		if(multiplication > 999) {
			values.push(5);
		} else if (multiplication > 99) {
			values.push(4);
		} else if (multiplication > 9) {
			values.push(3);
		} else if (multiplication > 4) {
			values.push(2);
		} else if (multiplication > 2) {
			values.push(1);
		} else {
			values.push(0);
		}
	}
	if(mathValues.operations.includes("/")) {
		var division = (Math.abs(mathValues.divisionMultiplierMax - mathValues.divisionMin) * (10 ** mathValues.divisionDecimals));
		if(Math.abs(mathValues.divisionMultiplierMax - mathValues.divisionMultiplierMin) < 2 || Math.abs(mathValues.divisionMax - mathValues.divisionMin) < 2) {
			values.push(0)
		} else {
			if(division > 999) {
				values.push(5);
			} else if (division > 99) {
				values.push(4);
			} else if (division > 9) {
				values.push(3);
			} else if (division > 4) {
				values.push(2);
			} else if (division > 2) {
				values.push(1);
			} else {
				values.push(0)
			}
		}

	}

	if(values.includes(0)){
		const toast = new Toast({
			text: "En eller fler av dine egendefinerte valg er for lette, du kan derfor ikke fange pokemon på dette nivået.",
			position: "top-right",
			pauseOnHover: true,
			pauseOnFocusLoss: true,
			canClose: true,
			badToast: true,
		  })
		console.log("stage is now " + mathValues.stage)
		return 0;
	}

	var total = 0;
	for(var i = 0; i < values.length; i++) {
		total += values[i];
	}
	var avg = total / values.length;

	console.log("avg = " + avg)
	avg = Math.round(avg);
	console.log("avg round = " + avg)
	if(avg > 5) { avg = 5; }
	else if(avg < 1) { avg = 1};

	const toast = new Toast({
		text: "Vanskelighetsgraden har blitt kalkulert til nivå " + avg + "",
		position: "top-right",
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		canClose: true,
		badToast: false,
	})
	return avg;
}

function onLoad(){
  	//Event stuff 
  	//Check date
  	const d = new Date();
  	let month = d.getMonth();

  	//Halloween
  	if(month == 9) { //9 = oktober.
    	console.log("Happy Halloween!")
		halloweenEvent = true;
		loadHalloween();
    	if(halloweenbox != null) {
    	  halloweenbox.classList.remove("is-hidden")
	    }
  	} else {
    	console.log("Ikke Halloween")
  	}

	let params = new URLSearchParams(location.search);
	
	if(params.get('custom') == "true" ) {
		console.log("Custom mode enabled!")
		mathValues.stage = 3;
		mathValues.operations = [];
		if(params.get("san") == "f") {
			mathValues.subAllowNegative = false;
		}
		if(params.get("add") == "t") {
			mathValues.additionMin = Number(params.get("amin"));
			mathValues.additionMax = Number(params.get("amax"));
			mathValues.additionDecimals = Number(params.get("adec"));
			mathValues.operations.push("+");
			console.log(mathValues.difficultyModifier)
		}
		if(params.get("sub") == "t") {
			mathValues.subtractionMin = Number(params.get("smin"));
			mathValues.subtractionMax = Number(params.get("smax"));
			mathValues.subtractionDecimals = Number(params.get("sdec"));
			mathValues.operations.push("-")
		}
		if(params.get("mul") == "t") {
			mathValues.multiplicationMin = Number(params.get("mumin"));
			mathValues.multiplicationMax = Number(params.get("mumax"));
			mathValues.multiplicationDecimals = Number(params.get("mudec"));
			mathValues.operations.push("x")
		}
		if(params.get("div") == "t") {
			mathValues.divisionMin = Number(params.get("dmin"));
			mathValues.divisionMax = Number(params.get("dmax"));
			mathValues.divisionMultiplierMin = Number(params.get("dmmin"));
			mathValues.divisionMultiplierMax = Number(params.get("dmmax"));
			mathValues.divisionDecimals = Number(params.get("ddec"));
			mathValues.operations.push("/")
		}
		mathValues.stage = calculateCustomDifficulty();
		updateProblem();
		return;
	}
	
	mathValues.stage = params.get('stage');
	if(mathValues.stage == null || Number(mathValues.stage) == 0) {
		mathValues.stage = 3;		
	}
	console.log("Starting on stage: " + mathValues.stage);
	
	switch(Number(mathValues.stage)){
	case 1:
		mathValues.additionMin = 0;
		mathValues.additionMax = 10;
		mathValues.subtractionMin = 0;
		mathValues.subtractionMax = 10;
		mathValues.subAllowNegative = false;
		mathValues.operations = ['+','-'];
		break;
	case 2:
		mathValues.additionMin = 0;
		mathValues.additionMax = 25;
		mathValues.subtractionMin = 0;
		mathValues.subtractionMax = 25;
		mathValues.subAllowNegative = false;
		mathValues.operations = ['+','-'];
		break;
	case 3:
		mathValues.additionMin = 0;
		mathValues.additionMax = 10;
		mathValues.subtractionMin = 0;
		mathValues.subtractionMax = 10;
		mathValues.multiplicationMin = 0;
		mathValues.multiplicationMax = 10;
		mathValues.divisionMin = 1;
		mathValues.divisionMax = 10;
		mathValues.divisionMultiplierMin = 0,
		mathValues.divisionMultiplierMax = 10,
		mathValues.operations = ['+','-','x','/'];
		break;
	case 4:
		mathValues.additionMin = 10;
		mathValues.additionMax = 100;
		mathValues.subtractionMin = 10;
		mathValues.subtractionMax = 100;
		mathValues.multiplicationMin = 10;
		mathValues.multiplicationMax = 100;
		mathValues.divisionMin = 1;
		mathValues.divisionMax = 10;
		mathValues.divisionMultiplierMin = 1,
		mathValues.divisionMultiplierMax = 100,
		mathValues.operations = ['+','-','x','/'];
		break;
	case 5:
		mathValues.additionMin = 1000;
		mathValues.additionMax = 10000;
		mathValues.subtractionMin = 1000;
		mathValues.subtractionMax = 10000;
		mathValues.multiplicationMin = 10;
		mathValues.multiplicationMax = 999;
		mathValues.divisionMin = 10;
		mathValues.divisionMax = 100;
		mathValues.divisionMultiplierMin = 10,
		mathValues.divisionMultiplierMax = 1000,
		mathValues.operations = ['+','-','x','/'];
		break;
	default:
		break;
	}

	updateProblem();
}

function addMoney(){
	var value = 1
	switch(Number(mathValues.stage)){
		case 1:
			value = 4;
			break;
		case 2:
			value = 8;
			break;
		case 3:
			value = 10;
			break;
		case 4:
			value = 20;
			break;
		case 5:
			value = 50;
			break;
		default:
			value = 0;
			break;
	}
	money.dataset.added = '+' + value;
	money.dataset.total = state.totalScore += value;
	money.textContent = "";
	if (state.totalScore) money.classList.add('animate');
  
	setTimeout(() => {
		money.classList.remove('animate');
	}, 500)
}
function addFixedMoney(value){
	if(Number.isNaN(value)){
		alert(value + " is not a number! Error on payment.")
		return;
	}
	money.dataset.added = '+' + value;
	money.dataset.total = state.totalScore += value;
	money.textContent = "";
	if (state.totalScore) money.classList.add('animate');
  
	setTimeout(() => {
		money.classList.remove('animate');
	}, 500)
}

function updateProblem() {
	mathValues.currentProblem = generateProblem()
	problemElement.innerHTML = `${mathValues.currentProblem.numberOne} ${mathValues.currentProblem.operator} ${mathValues.currentProblem.numberTwo}`
	ourField.value = ""
	ourField.focus()
}

function generateNumber(max) {
	return (Math.floor(Math.random() * (max + 1)))
}
function generateNumber(min, max) {
	//console.log("Gen Number: min" + min + " max " + max)
	return min + (Math.floor(Math.random() * (max + 1 - min)))
}
function generateNumber(min, max, decimals) {
	let num = min + (Math.random() * (max - min));
	if(decimals > 5) { decimals = 5;} //begrens desimaler
	//console.log("Gen Number: min" + min + " max " + max + " dec " + decimals + " result: " + num + " numFix " + Number(num.toFixed(decimals)))
	return Number(num.toFixed(decimals))
}

function generateProblem() {
  var operator = mathValues.operations[Math.floor(Math.random()*mathValues.operations.length)]
  var numberOne = 1;
  var numberTwo = 1;
  switch(operator) {
	case '+':
		numberOne = generateNumber(mathValues.additionMin, mathValues.additionMax, mathValues.additionDecimals);
		numberTwo = generateNumber(mathValues.additionMin, mathValues.additionMax, mathValues.additionDecimals);
		break;
	case '-':
		numberOne = generateNumber(mathValues.subtractionMin, mathValues.subtractionMax, mathValues.subtractionDecimals);
		numberTwo = generateNumber(mathValues.subtractionMin, mathValues.subtractionMax, mathValues.subtractionDecimals);
		break;
	case 'x':
		numberOne = generateNumber(mathValues.multiplicationMin, mathValues.multiplicationMax, mathValues.multiplicationDecimals);
		numberTwo = generateNumber(mathValues.multiplicationMin, mathValues.multiplicationMax, mathValues.multiplicationDecimals);
		break;
	case '/':
		numberOne = generateNumber(mathValues.divisionMultiplierMin, mathValues.divisionMultiplierMax, mathValues.divisionDecimals);
		numberTwo = generateNumber(mathValues.divisionMin, mathValues.divisionMax, mathValues.divisionDecimals);
		if(numberTwo == 0) {
			numberTwo++;
		}
		numberOne = numberOne * numberTwo
		if(countDecimals(numberOne) != mathValues.divisionDecimals) {
			console.log("Editing decimals of division " + numberOne)
			numberOne = Number(numberOne.toFixed(mathValues.divisionDecimals))
		}
  }
  
  if((!mathValues.subAllowNegative && operator == "-") && numberOne < numberTwo) {
	  let tempNumber = numberTwo
	  numberTwo = numberOne
	  numberOne = tempNumber
  }
	return {
    operator, numberOne, numberTwo
	}
}

ourForm.addEventListener("submit", handleSubmit)

function swapNegative(){
	value = Number(ourField.value)
	ourField.value = value - (value * 2);
	ourField.focus();
	return;
}

function handleSubmit(e) {
	e.preventDefault()

  if(ourField.value == "") {
    ourField.focus()
    return;
  }

  if(state.score == winScore) { //Make sure we can't enter a score when whe are in the win screen.
    return;
  }
	var playerAnswer = Number(ourField.value);
	var convertedPlayerAnswer = playerAnswer;

	let correctAnswer
	const p = mathValues.currentProblem
	if(p.operator == "+") {
		correctAnswer = p.numberOne + p.numberTwo
		correctAnswer = Number(correctAnswer.toFixed(mathValues.additionDecimals))
		convertedPlayerAnswer = Number(playerAnswer.toFixed(mathValues.additionDecimals))
	} else if(p.operator == "-") {
		correctAnswer = p.numberOne - p.numberTwo
		correctAnswer = Number(correctAnswer.toFixed(mathValues.subtractionDecimals))
		convertedPlayerAnswer = Number(playerAnswer.toFixed(mathValues.subtractionDecimals))
	} else if(p.operator == "x") {
		correctAnswer = p.numberOne * p.numberTwo
		correctAnswer = Number(correctAnswer.toFixed(mathValues.multiplicationDecimals))
		convertedPlayerAnswer = Number(playerAnswer.toFixed(mathValues.multiplicationDecimals))
	} else if(p.operator == "/") {
		correctAnswer = p.numberOne / p.numberTwo
		correctAnswer = Number(correctAnswer.toFixed(mathValues.divisionDecimals))
		convertedPlayerAnswer = Number(playerAnswer.toFixed(mathValues.divisionDecimals))
	} else {
		correctAnswer = "?"
	}
	
	if(playerAnswer == correctAnswer || convertedPlayerAnswer == correctAnswer) {
		console.log(mathValues.stage + " = ditt nivå")

		if(mathValues.stage == 0) { //Juksepave pipelort!
			state.score++
			state.streak++
			pointsNeeded.textContent = 5 - state.score
			mainUI.classList.add("ui-animate-correct")
			setTimeout(() =>  mainUI.classList.remove("ui-animate-correct"), 1001)
			updateProblem();
			renderProgressBar();
			checkLogic()
			return;
		}

		state.score++
		state.streak++
		pointsNeeded.textContent = 5 - state.score
		addMoney()
    	mainUI.classList.add("ui-animate-correct")
    	setTimeout(() =>  mainUI.classList.remove("ui-animate-correct"), 1001)
		updateProblem();
		renderProgressBar();

		//Update tier solved.
		switch(mathValues.stage) {
			case '1':
				state.tier1Solved ++;
				break;
			case '2':
				state.tier2Solved ++;
				break;
			case '3':
				state.tier3Solved ++;
				break;
			case '4':
				state.tier4Solved ++;
				break;
			case '5':
				state.tier5Solved ++;
				break;
			default:
				state.customSolved ++;
				break;
		}
	} else {
		//TODO make popup with amount of Decimals.
		
//		console.log(countDecimals("Answer Decimals:" + correctAnswer))
//		console.log(countDecimals("Your Decimals:" + playerAnswer))
//		console.log("Converted Answer: " + Number(correctAnswer.toFixed(mathValues.divisionDecimals)))
//		console.log("Your converted Answer: " + Number(playerAnswer.toFixed(mathValues.divisionDecimals)))
//		console.log("Do they match? " + (Number(correctAnswer.toFixed(mathValues.divisionDecimals)) == Number(playerAnswer.toFixed(mathValues.divisionDecimals))))

		state.wrongAnswers++
		state.streak = 0;
    	ourField.value = ""
		mistakesAllowed.textContent = 2-state.wrongAnswers
		ourField.focus()
    	problemElement.classList.add("animate-wrong")
    	setTimeout(() => problemElement.classList.remove("animate-wrong"), 451)
    	mainUI.classList.add("ui-animate-wrong")
    	setTimeout(() =>  mainUI.classList.remove("ui-animate-wrong"), 1001)
	}
	checkLogic()		
}

function countDecimals(number) { //Thank you https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
    if (Math.floor(number.valueOf()) === number.valueOf()) return 0;

    var str = number.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}

function checkLogic() {
	//If you win
	if(state.score === winScore) {
		if(mathValues.stage == 0) {
			state.score = 0
			state.wrongAnswers = 0
			pointsNeeded.textContent = winScore
			mistakesAllowed.textContent = (defaultLives -1)
			renderProgressBar()
			resetGame();
			const toast = new Toast({
				text: "En eller fler av dine egendefinerte valg er for lette, du kan derfor ikke fange pokemon på dette nivået.",
				position: "top-right",
				pauseOnHover: true,
				pauseOnFocusLoss: true,
				canClose: true,
				badToast: true,
			  })
			return;
		}
		progressHalloweenEgg()
	  	endMessage.textContent = goodMessages[Math.floor(Math.random() * (Object.keys(goodMessages).length))]
	  	document.body.classList.add("overlay-is-open")
      	pokeball.classList.remove("is-hidden")
	}
	//If you lost
	if(state.wrongAnswers === defaultLives) {
		resetGame()
	}
}

resetButton.addEventListener("click", resetGame)

function resetGame() {
	document.body.classList.remove("overlay-is-open")
	state.score = 0
	state.wrongAnswers = 0
	pointsNeeded.textContent = winScore
	mistakesAllowed.textContent = (defaultLives -1)
	renderProgressBar()
 	newCatchInfo.innerHTML = ""
  	resetButton.classList.add("is-hidden")
  	saveAll()
}

function renderProgressBar(){
	progressBar.style.transform = `scaleX(${state.score/winScore})`
}


/*
~~~ Halloween ~~~
*/

let halloweenStats = {
  eggId: 0,
  eggNeeded: 3,
  eggStatus: 0,
  eggSolved: 0,
  eventYear: 2000
}

function toggleHalloweenBox(){
	if(halloweenbox == null) {
	  return;
	}
	if(halloweenbox.classList.contains("hide-egg")){
	  console.log("egg is already hidden")
	  halloweenbox.classList.remove("hide-egg")
	} else {
	  console.log("egg is not hidden")
	  halloweenbox.classList.add("hide-egg")
	}
  
}

function progressHalloweenEgg() {
	if(!halloweenEvent) {
		return;
	}
	halloweenStats.eggStatus++;
	updateHalloweenEggBar();
	saveHalloween();
	saveAll();
}

function updateHalloweenEggBar() {
	if(halloweenStats.eggStatus < halloweenStats.eggNeeded) {
		halloweenProgressBar.style.transform = `scaleX(${halloweenStats.eggStatus/halloweenStats.eggNeeded})`;
		halloweenEgg.classList.add("animate__repeat-1");
		halloweenEgg.classList.remove("animate__repeat-1");
	} else {
		halloweenProgressBar.style.transform = `scaleX(${1})`;
		halloweenProgressBar.classList.add("hallowenOpenEgg");
		halloweenEgg.classList.add("animate__infinite");
	}
}

function captureHalloweenPokemon() {
	if(true){//halloweenStats.eggStatus >= halloweenStats.eggNeeded) {
		let SpookyNormalPokemon = [19,20,52,53,88,89,92,93,94,105,187,198,200,215,222,228,228,261,262,264,275,302,353,354,355,356,359,425,426,429,430,434,435,442,452,461,477,478,479,487,491,509,510,562,563,570,571,607,608,609,629,630,633,634,635,679,680,681,708,709,710,711,717,720,769,770,778,781,792,799,800,802,827,828,854,855,859,860,861,862,864,867,877,885,886,887,893,897,898]
		document.body.classList.add("overlay-is-open")
		pokeball.classList.remove("is-hidden")
		if(Math.random() > 0.7) {
			createEventPokemon("halloween");
		} else {
			createSpecificPokemon(SpookyNormalPokemon[Math.floor(Math.random()* (Object.keys(SpookyNormalPokemon).length))])
		}
		halloweenProgressBar.style.transform = `scaleX(${0})`;
		halloweenProgressBar.classList.remove("hallowenOpenEgg");
		halloweenEgg.classList.remove("animate__infinite");
		halloweenStats.eggStatus = 0;
		halloweenStats.eggNeeded++;
		halloweenStats.eggId = Math.floor(Math.random() * 5)+1;
		updateEggImage();
		saveHalloween();

	} else {
		return;
	}

}

function updateEggImage(){
	let path = "images/events/halloween/halloween-egg-0" + halloweenStats.eggId +".png";
	halloweenEgg.src= path;
}

function saveHalloween(){
	if(checkACookieExists("cookies") &&  halloweenEvent) {
	  
	} else {
		//Ikke cookie-tilatelse.
	  return;
	}
	if(!isNaN(halloweenStats.eggId)) {
	  window.localStorage.setItem('he-eggid',JSON.stringify(halloweenStats.eggId))
	}
	if(!isNaN(halloweenStats.eggNeeded)) {
		window.localStorage.setItem('he-eggneeded',JSON.stringify(halloweenStats.eggNeeded))
	}
	if(!isNaN(halloweenStats.eggSolved)) {
		window.localStorage.setItem('he-eggsolved',JSON.stringify(halloweenStats.eggSolved))
	}
	if(!isNaN(halloweenStats.eggStatus)) {
		window.localStorage.setItem('he-eggstatus',JSON.stringify(halloweenStats.eggStatus))
	}
	window.localStorage.setItem('he-year',JSON.stringify(new Date().getFullYear()))
}

function loadHalloween() {
	halloweenStats.eventYear = getStorageInt('he-year');
	if(halloweenStats.eventYear != new Date().getFullYear()) {
		console.log('Year is wrong - starting over!')
		return;
	}
	halloweenStats.eggId = getStorageInt('he-eggid');
	updateEggImage();
	halloweenStats.eggNeeded = getStorageInt('he-eggneeded');
	halloweenStats.eggStatus = getStorageInt('he-eggstatus');
	halloweenStats.eggSolved = getStorageInt('he-eggsolved');
	halloweenProgressBar.style.transform = `scaleX(${halloweenStats.eggStatus/halloweenStats.eggNeeded})`;

	updateHalloweenEggBar()

	console.log("Buggfix")
	let pokedex = document.getElementById("pokedex"); //Fix MewTwo
	if(pokedex != null && pokedex.contains(document.getElementById("N150-H1"))) {
		console.log("Found card")
		card = pokedex.querySelector("#" + "N150-H1");
		if(card == null) {
			console.log("Error when updating MewTwo - Returning (Card)");
			return;
		}
		console.log(card)
		card.href = "images/pokemon/normal/50014.png";
		console.log("Changed href!")
		console.log(card);
		image = card.querySelector(".card-image .card-image");
		if(image == null) {
			console.log("Error when updating MewTwo - Returning (Image)");
			return;
		}
		console.log(image);
		image.style = "background-image: url('images/pokemon/normal/50014.png');"
		console.log("Changed image");
	} else {
		console.log("Could not find card")
	}
  }

onLoad()