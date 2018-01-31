/*
 * Filename: randomArray.js
 * Author: Sean Wahl
 * Email: smwahl88@gmail.com
 * Description: program for generating random array and calculating median
 * 	and percentiles of given array[numbers]
 */

var MIN_ARRAY_SIZE = 1; //smallest array for random array
var MAX_ARRAY_SIZE = 10; // largest array for random array

var MIN_NUM = 1; //minimum random number to choose
var MAX_NUM = 10; //maximum random number to choose

var PERCENTILE = 0.75; //percentile to find, defined as 75%

/*
 * runRandom()
 * Return Type: array[array[number], number, number]
 * Return Error: array[] empty array
 * Description: when called this will generate a random array and 
 * 	calculate the median and 75th percentile of the array
 */
function runRandomArray(){
	var arr = generateRandomArray();
	var median = calculatePercentile(arr, 0.5);
	var p = calculatePercentile(arr, PERCENTILE );
	return [arr, median,p];
}


/*
 * runArray(array[number])
 * Return Type: array[median, percentile] 
 * Return Error: array[] empty array
 * Description: when called this ill take the given arr
 * 	calculate the median and 75th percentile of the array on error
 */
function runArray(arr){
	try {
		if (!Array.isArray(arr))
		{
			throw "Arg is not an array!";
		}
		else if (arr.some(isNaN)){
			throw "Array must contain numbers only!";
		}
		else if (arr.length == 0){
			throw "Array is empty";
		}
	}
	catch(err) {
		console.log(err);
		return [];
	}
	
	var median = calculatePercentile(arr, 0.5);
	var p = calculatePercentile(arr, PERCENTILE);
	
	return [arr, median, p];
}


/*
 * generateRandomArray()
 * Return Type: array[number]
 * Return Error: none
 * Description: when turn this will generate a random array from size 
 * 	(MAX_ARRAY_SIZE to MAX_ARRAY_SIZE) with values of (MAX_VALUE to MIN_VALUE)
 */
function generateRandomArray(){
	//create an array of random size
	var arr = new Array(getRandomInt(MIN_ARRAY_SIZE,MAX_ARRAY_SIZE));
	
	//fill array with random numbers between min and max
	for(var i = 0; i < arr.length; ++i){
		arr[i] = getRandomInt(MIN_NUM, MAX_NUM)
	}
	return arr;
}


/*
 * getRandomInt(number, number)
 * Return Type: number
 * Return Error: Number.MIN_VALUE
 * Description: given a min, and max. This will return a value between min and max
 */
function getRandomInt(min, max){
	//ensure max > min 
	try{
		
		if (isNaN(max) || isNaN(min))
		{
			throw "Args must be numbers!";
		}
		else if( max < min){
			throw "Max must be larger than min!";
		}
	}
	catch(err){
		console.log(err);
		return Number.MIN_VALUE;
	}
	
	return Math.floor((Math.random() * ( max - min + 1)) + min);
}


/*
 * calculatePercentile(array[number])
 * Return Type: number
 * Return Error: Number.MIN_VALUE;
 * Description: when called this will calculate the value at percentile and
 * 	return said value
 */
function calculatePercentile(arr, percentile){
	try{
		if(!Array.isArray(arr))
		{
			throw "Arg 0 is not an array!";
		}
		else if (arr.length == 0){
			throw "Arg 0 is empty";
		}
		else if (isNaN(percentile))
		{
			throw "Arg 1 is Not a number";
		}
		else if (percentile < 0 || percentile > 1)
		{
			throw "Arg 1 is out of bounds [0-1]";
		}
	}
	catch(err){
		console.log(err)
		return Number.MIN_VALUE;
	}
	
	arr.sort(numberSort);
	var index = (arr.length - 1) * percentile;
	
	//if index falls between two indexes, average the two
	if (index % 1 != 0)
	{
		index = Math.floor(index);
		return (arr[index] + arr[index+1])/2;
	}
	
	return arr[index];
}

/*
 * numberSort(number, number)
 * Return Type: number
 * Return Error: none
 * Description: used by sort() to sort numbers by value instead of 
 * 	alphabetically
 */
function numberSort(x, y){
	return x - y;
}





