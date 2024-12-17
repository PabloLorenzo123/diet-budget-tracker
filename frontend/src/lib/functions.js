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

export const getTotalNutrientsInMeal = (foods, nutrient) => 
  roundTo(foods.reduce((acc, f) => acc + f.nutritionalContribution[nutrient], 0), 2);


export const  transformNutrientData = (nutrientData) => {
  const keyMapping = {
      // General.
      energy: "energy",
      protein: "protein",

      // Carbs.
      fiber: "fiber",
      starch: "starch",
      sugars: "sugars",
      addedSugars: "added_sugars",
      netCarbs: "net_carbs",

      // Fats.
      monounsaturatedFat: "monounsaturated_fat",
      polyunsaturatedFat: "polyunsaturated_fat",
      saturatedFat: "saturated_fat",
      transFat: "trans_fat",
      cholesterol: "cholesterol",
      totalFat: "total_fat",

      // Vitamins.
      B1: "b1",
      B2: "b2",
      B3: "b3",
      B5: "b5",
      B6: "b6",
      B12: "b12",
      choline: "choline",
      folate: "folate",
      A: "a",
      C: "c",
      D: "d",
      E: "e",
      K: "k",

      // Minerals.
      calcium: "calcium",
      chromium: "chromium",
      copper: "copper",
      iron: "iron",
      magnesium: "magnesium",
      manganese: "manganese",
      molybdenum: "molybdenum",
      phosphorus: "phosphorus",
      potassium: "potassium",
      selenium: "selenium",
      sodium: "sodium",
      zinc: "zinc"
  };

  const transformedData = {};
    for (const [key, value] of Object.entries(nutrientData)) {
        if (!keyMapping[key]) {
            continue; // Skip the entry if the key is not in the mapping
        }
        transformedData[keyMapping[key]] = value.dv; // Use `value.dv` as the float value
    }

    return transformedData;
}


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
