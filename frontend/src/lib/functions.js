export const titleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value);
}

export const removeTrailingZeros = (e) => {
  e.target.value = e.target.value.replace(/^0+(?=\d)/, '');
}

export const validateDecimalNumberInput = (e, min=0) => {
   // Remove any non-digit characters (including "e" and "-") but keep "." if it’s followed by digits or at the end
   e.target.value = e.target.value.replace(/[^0-9.]|(?<=\..*)\./g, '');
   // Remove leading zeros.
   e.target.value = e.target.value.replace(/^0+(?=\d)/, '');
   // If the value is a number but this isnt greater or equal to min. 
  if (!isNaN(e.target.value) && e.target.value < min){
    e.target.value = '';
  }
  // If it is not a number or it's empty then set its value to the minimum. This way the input is never left undefined.
  if (isNaN(e.target.value) || !e.target.value && !min){
    console.log("is not a number.")
    e.target.value = min;
  }
  // console.log(e.target.value);
}

export const roundTo = (num, decimalPlaces) => {
  return Number(Math.round(num + 'e' + decimalPlaces) + 'e-' + decimalPlaces);
}

export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const splitArray = (arr) => {
  const middleIndex = Math.ceil(arr.length / 2);
  const firstHalf = arr.slice(0, middleIndex);
  const secondHalf = arr.slice(middleIndex);
  return [firstHalf, secondHalf];
}

export const getTotalNutrients = (nutrient, meals, dailyTargets, selectedMealIdx, selectedFoodObj) => {
  let totalNutrients;
  if (selectedMealIdx != null){
      // Sum all the nutrients of the foods in this meal.
      totalNutrients = meals[selectedMealIdx].foods.reduce((acc, meal) => acc + meal.nutritionalContribution[nutrient], 0);
  } 
  else if (selectedFoodObj) {
      totalNutrients = selectedFoodObj.nutritionalContribution[nutrient];
  } else {
      // Sum all the nutrients of all the foods in the dairy.
      totalNutrients = meals.filter(m => m && !m.hideFromDiary).reduce((acc, meal) => acc + meal.foods.reduce((acc, f) => acc + f.nutritionalContribution[nutrient], 0), 0);
  }
  totalNutrients = roundTo(totalNutrients, 2);
  const percentage = roundTo(totalNutrients / dailyTargets[nutrient].amount * 100, 2) ;
  return [totalNutrients, percentage];
}

export const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}
