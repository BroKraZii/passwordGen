var resultEl = document.getElementById("result");
var lengthEl = document.getElementById("length");
var uppercaseEl = document.getElementById("uppercase");
var lowercaseEl = document.getElementById("lowercase");
var numbersEl = document.getElementById("numbers");
var symbolsEl = document.getElementById("symbols");
var generateEl = document.getElementById("generate");
var clipboard = document.getElementById("clipboard");
var randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
}
clipboard.addEventListener("click", function() {
	var textarea = document.createElement("textarea");
	var password = resultEl.innerText;
    if(!password) {
        return; 
    }
    textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();
	alert("Copied!");
});
generate.addEventListener("click", function() {
    var length = lengthEl.value;
    if(lengthEl.value < 8) {
        alert("Minimum: 8");
        return"";
    }
    if(lengthEl.value > 128) {
        alert("Maximum: 128");
        return"";
    }
    var hasLower = lowercaseEl.checked;
	var hasUpper = uppercaseEl.checked;
	var hasNumber = numbersEl.checked;
	var hasSymbol = symbolsEl.checked;
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = "";
	var typesCount = lower + upper + number + symbol;
	var typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	if(typesCount === 0) {
        alert("Check 1 option");
	    return "";
	}
	for(let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			var funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	var finalPassword = generatedPassword.slice(0, length);
	return finalPassword;
}
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
	var symbols = '!@#$%^&*(){}[]=<>/,.+'
	return symbols[Math.floor(Math.random() * symbols.length)];
}