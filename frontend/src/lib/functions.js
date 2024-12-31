import { nutrientsInformation } from "./nutrients";

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
    e.target.value = min;
  }
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
      totalNutrients = meals.filter(m => m && !m.hideFromDiary).
      reduce((acc, meal) => acc + meal.foods.reduce((acc, f) => acc + f.nutritionalContribution[nutrient], 0), 0);
  }
  totalNutrients = roundTo(totalNutrients, 2);
  const percentage = roundTo(totalNutrients / dailyTargets[nutrient].amount * 100, 2) || 0; // In case the daily target value is 0.
                                                                                            // To avoid dividing by 0.
  return [totalNutrients, percentage ]; 
}

export const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}

export const getTotalNutrientsInMeal = (foods, nutrient) => 
  roundTo(foods.reduce((acc, f) => acc + f.nutritionalContribution[nutrient], 0), 2);


export const calculateNutritionalContribution = (foodProduct, portionSize) => {
  const nutritionalContribution = { ...foodProduct.nutritionData };

  // Update the nutritional contribution data based on portion size.
  Object.keys(nutritionalContribution).forEach(nutrient => {
      const nutrientValue = foodProduct.nutritionData[nutrient];
      const gramWeight = foodProduct.foodData.gramWeight;
      
      nutritionalContribution[nutrient] = roundTo((portionSize * nutrientValue) / gramWeight, 2);
  });

  return nutritionalContribution;
}


export const transformDailyTargets = (dt) => {
  const dailyTargets = {}
  Object.keys(dt).map(nutrient => {
      if (nutrientsInformation[nutrient]){ // Only budget would fail this if condition.
          const value = dt[nutrient];
          const dv = nutrientsInformation[nutrient]?.dv;
          dailyTargets[nutrient] = {
              amount: value,
              dv: roundTo((value / dv) * 100, 2) || 0
          }
      }    
  })
  return dailyTargets;
}


export const areObjectsEqual = (obj1, obj2) => {
  // Check if both objects have the same number of keys
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
  }

  // Check if every key-value pair in obj1 matches obj2
  for (const key in obj1) {
      // Check if the key exists in obj2
      if (!obj2.hasOwnProperty(key)) {
          return false;
      }

      // If values are objects, compare them deeply
      if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
          if (!areObjectsEqual(obj1[key], obj2[key])) {
              return false;
          }
      } else if (obj1[key] !== obj2[key]) {
          return false;
      }
  }

  return true;  // Objects are equal
}

export const flattenNutritionData = (nutritionData) => {
  const flatNutritionData = {...nutritionData}
  Object.keys(flatNutritionData).forEach(nutrient => {
      flatNutritionData[nutrient] = nutritionData[nutrient].amount;
  })
  return flatNutritionData;
}

// Used in AddToDiaryBtn.jsx, .
export const foodTotalCost = (selectedFood, smValueInGrams, servings) => {
  // If this food product has a serving size.
  if (selectedFood.foodData.gramWeight){
    const pricePerGram = selectedFood.foodData.productPrice / (selectedFood.foodData.gramWeight * selectedFood.foodData.servings);
    return roundTo(pricePerGram * (smValueInGrams * servings), 2);
  } 
  // In case the amount of grams in the food servings is n/a.
  const pricePerServing = selectedFood.foodData.productPrice / selectedFood.foodData.servings;
  return roundTo(pricePerServing * servings, 2);
}
