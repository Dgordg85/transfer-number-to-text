"use strict";

var number = document.getElementById('number_input');

number.oninput = function() {
	var count = number.value.length;

	// ограничиваем длину в 12 символов на поле input
	var howMuchDigits = 12;
	if (count > howMuchDigits) {
		number.value = number.value.substr(0,howMuchDigits);
		count = howMuchDigits;
	}

	number.value = parseInt(number.value);

	//следит за количеством символов в слове
	var preCount = count;

	if (number.value > 0) {
		//массив для хранения чисел по 3 и 1-3 для первого
		var arrNumbers = [];
		//определяем количество символов в первой тройке цифр
		var firstArrCount;
		
		switch(count) {
			case 1:
			case 4:
			case 7:
			case 10:
			case 13:
				firstArrCount = 1;
				break;
			case 2:
			case 5:
			case 8:
			case 11:
				firstArrCount = 2;
				break;
			default:
				firstArrCount = 3;
		}

		// разбиваем число на массив
		arrNumbers[0] = number.value.substr(0, firstArrCount);
		preCount -= firstArrCount;
		var i = 0
		while (preCount != 0) {
			arrNumbers.push(number.value.substr(3 * i + firstArrCount, 3));
			preCount -= 3;
			i++;
		} 

		// Выводим в INPUT перевод
		var transformNumber = '';
		var countArr = arrNumbers.length;
		for (var i = 0; i < arrNumbers.length; i++) {
			var massiveDigit = parseInt(arrNumbers[i]);
			if (massiveDigit != 0) {
				massiveDigit = massiveDigit.toString();
				transformNumber += tranformDigitsBy3(massiveDigit, countArr-i);
				if (i + 1 < arrNumbers.length) {
				transformNumber += ' ';
				}
			}
		}

		// первую букву в верхний регистр
		transformNumber = transformNumber.charAt(0).toUpperCase() + transformNumber.substr(1);

		document.getElementById('result').value = transformNumber;
	} else if (number.value == '0') {
		document.getElementById('result').value = "Ноль";
	} else {
		document.getElementById('result').value = "";
	}
}

function checkArr(element,massive){
    for(var i=0; i < massive.length; i++) {
        if (massive[i] == element) return true;
    }
return false;
}

// возвращает приставку к разлиным сотням: тысячи, миллионы, миллиарды
function thousands(number, hundredNumber) {
	var numberCount = number.length;
	var result = '';

	if (hundredNumber > 1) {
		var firstGroupMassive = [];
		var secondGroupMassive = [];
		var thirdGroupMassive = [];

		for (var i = 0; i < 100; i++) {
			firstGroupMassive.push(1 + i * 10);  //1..11..21..101..111..121....201....991
			secondGroupMassive.push(2 + i * 10); //2..22..32..102..112..122....202....992
			secondGroupMassive.push(3 + i * 10); //3..23..33..103..113..123....203....993
			secondGroupMassive.push(4 + i * 10); //4..24..34..104..114..124....204....994
		}

		for (var k = 0; k < 10; k++) {
			thirdGroupMassive.push(k * 100 + 11); //11..111..211..311..411....911
			thirdGroupMassive.push(k * 100 + 12); //12..112..212..312..412....912
			thirdGroupMassive.push(k * 100 + 13); //13..113..213..313..413....913
			thirdGroupMassive.push(k * 100 + 14); //14..114..214..314..414....914
		}
		
		// определяем к какой группе относится
		var group;
		var isInFirstMassive = checkArr(number, firstGroupMassive);
		var isInSecondMassive = checkArr(number, secondGroupMassive);
		var isInThirdMassive = checkArr(number, thirdGroupMassive);

		if (isInFirstMassive == true && isInThirdMassive == false) {
			group = 1; //тысяча, миллион, миллиард
		} else if (isInSecondMassive == true && isInThirdMassive == false) {
			group = 2; //тысячи, миллиона, миллиарда
		} else {
			group = 3; //тысяч, миллионов, миллиардов
		}

		
		if (number != 0) {
			var suffix;
			switch (hundredNumber) {
				case 2:
					switch (group) {
						case 1:
							suffix = 'тысяча';
							break;
						case 2:
							suffix = 'тысячи';
							break;
						default:
							suffix = 'тысяч';
							break;
					}
					break;
				case 3:
					switch (group) {
						case 1:
							suffix = 'миллион';
							break;
						case 2:
							suffix = 'миллиона';
							break;
						default:
							suffix = 'миллионов';
							break;
					}
					break;
				case 4:
					switch (group) {
						case 1:
							suffix = 'миллиард';
							break;
						case 2:
							suffix = 'миллиарда';
							break;
						default:
							suffix = 'миллиардов';
							break;
					}
					break;
				default:
					break;
			}
			result += suffix;	
		}
	}
return result;
}

// получает на вход числа в формате XYZ и номер сотни: 1-4
function tranformDigitsBy3(number, id) {
	var count = number.length;
	var resultArr = [];
	var result = '';
	var numChar = parseInt(number.charAt(count-1));

	switch(count) {
		case 3:
			var hundredChar = parseInt(number.charAt(0));
			resultArr.push(tranformhundreds(hundredChar));
		case 2:
			var dozensChar = parseInt(number.charAt(count - 2));
			if (dozensChar == 1) {
				resultArr.push(transoformSecondDozen(numChar));
				break;
			} else if (dozensChar != 0) {
				resultArr.push(tranformOtherDozen(dozensChar));
			}
		case 1:
			if (numChar != 0){
				switch (numChar) {
					case 1:
						if (id == 2) {
							resultArr.push('одна');	
							break;
						}
					case 2:
						if (id == 2) {
							resultArr.push('две');	
							break;
						}
					default:
						resultArr.push(tranformFirstDozen(numChar));
						break;
				}
			}
			break;
		default:
			break;
	}
	// дополняем тысячи, миллионы, миллиарды для 2, 3, 4 разрядов
	if (id > 1) {
		resultArr.push(thousands(number, id));
	}
	//отправляем надпись в резалт
	for (var i = 1; i <= resultArr.length; i++) {
		result += resultArr[i - 1];
		if (i + 1 <= resultArr.length) {
			result += ' ';
		}
	};
return result;
}

//1-9
function tranformFirstDozen(number) {
	var textNumber;
	switch(number) {
		case 9:
			textNumber = 'девять';
			break;
		case 8:
			textNumber = 'восемь';
			break;
		case 7:
			textNumber = 'семь';
			break;
		case 6:
			textNumber = 'шесть';
			break;
		case 5:
			textNumber = 'пять';
			break;
		case 4:
			textNumber = 'четыре';
			break;
		case 3:
			textNumber = 'три';
			break;
		case 2:
			textNumber = 'два';
			break;
		case 1:
			textNumber = 'один';
			break;
	}
return textNumber;
}

//10 - 19
function transoformSecondDozen(number) {
	var textNumber;
	switch(number) {
		case 9:
			textNumber = 'девятнадцать';
			break;
		case 8:
			textNumber = 'восемнадцать';
			break;
		case 7:
			textNumber = 'семнадцать';
			break;
		case 6:
			textNumber = 'шестнадцать';
			break;
		case 5:
			textNumber = 'пятнадцать';
			break;
		case 4:
			textNumber = 'четырнадцать';
			break;
		case 3:
			textNumber = 'тринадцать';
			break;
		case 2:
			textNumber = 'двенадцать';
			break;
		case 1:
			textNumber = 'одиннадцать';
			break;
		case 0:
			textNumber = 'десять';
	}
return textNumber;
}

//20 - 90
function tranformOtherDozen (number) {
	var textNumber;
	switch(number) {
		case 9:
			textNumber = 'девяносто';
			break;
		case 8:
			textNumber = 'восемьдесят';
			break;
		case 7:
			textNumber = 'семьдесят';
			break;
		case 6:
			textNumber = 'шестьдесят';
			break;
		case 5:
			textNumber = 'пятьдесят';
			break;
		case 4:
			textNumber = 'сорок';
			break;
		case 3:
			textNumber = 'тридцать';
			break;
		case 2:
			textNumber = 'двадцать';
			break;
	}
return textNumber;
}

//100 - 900
function tranformhundreds(number) {
	var textNumber;
	switch(number) {
		case 9:
			textNumber = 'девятьсот';
			break;
		case 8:
			textNumber = 'восемьсот';
			break;
		case 7:
			textNumber = 'семьсот';
			break;
		case 6:
			textNumber = 'шестьсот';
			break;
		case 5:
			textNumber = 'пятьсот';
			break;
		case 4:
			textNumber = 'четыреста';
			break;
		case 3:
			textNumber = 'триста';
			break;
		case 2:
			textNumber = 'двести';
			break;
		case 1:
			textNumber = 'сто';
			break;
	}
return textNumber;
}