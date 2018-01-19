var MIN_ARRAY_SIZE = 1; //smallest array for random array
var MAX_ARRAY_SIZE = 10; // largest array for random array

var MIN_NUM = -100; //minimum random number to choose
var MAX_NUM = 100; //maximum random number to choose

var PERCENTILE = 0.75; //percentile to find, defined as 75%

/*
 * runRandom()
 * return tye: none
 * description: when called this will generate a random array and 
 * calculate the median and 75th percentile of the array
 */
function runRandomArray(){
	var arr = generateRandomArray();
	var median = calculatePercentile(arr, 0.5);
	var p = calculatePercentile(arr, PERCENTILE );
	return([arr.sort(numberSort), median,p]);
}


/*
 * runArray(arr)
 * return type: array[median, percentile] array will be empty on error
 * description: when called this ill take the given arr
 * calculate the median and 75th percentile of the array on error
 */
function runArray(arr){
	try {
		if (arr.some(isNaN)){
			throw "Array must contain numbers only!";
		}
		if (arr.length == 0){
			throw "Array is empty"
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
 * return type: array[number]
 * description: when turn this will generate a random array from size 
 * (MAX_ARRAY_SIZE to MAX_ARRAY_SIZE) with values of (MAX_VALUE to MIN_VALUE)
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
 * reutun type: number, returns Number.MIN_VALUE on error
 * description: given a min, and max. This will return a value between min and max
 */
function getRandomInt(min, max){
	//ensure max > min 
	try{
		if( max < min){
			throw "Max array size must be larger than min"
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
 * return type: number
 * description: when called this will calculate the value at percentile and
 * return said value
 */
function calculatePercentile(arr, percentile){
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
 * return type: number
 * Description: used by sort() to sort numbers by value instead of 
 * alphabetically
 */
function numberSort(x, y){
	return x - y;
}





