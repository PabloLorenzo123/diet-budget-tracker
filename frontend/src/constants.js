// Tokens.
export const REFRESH_TOKEN = "refreshToken";
export const ACCESS_TOKEN = "accessToken";

// Index (Diet) constants
export const AddFoodModalTabs = ['All', 'Create'];
export const diaryGroups = ['uncategorized', 'breakfast', 'lunch', 'dinner', 'snacks'];
export const defaultDiaryGroupObject = {name: '', foods: [], show: false, hideFromDiary: false}; // Or day object.
export const defaultMealObject = {foods: [], show: false, hideFromDiary: false};

export const defaultDiaryGroups = [
    {name: 'breakfast', foods: [], show: false, hideFromDiary: false, order: 0}, // May consider adding a field named 'order'.
    {name: 'lunch', foods: [], show: false, hideFromDiary: false, order: 1},
    {name: 'dinner', foods: [], show: false, hideFromDiary: false, order: 2},
    {name: 'snacks', foods: [], show: false, hideFromDiary: false, order: 3},
];

export const maxNumberOfMeals = 8;
export const maxNumberOfDays = 7;

export const groceryHaulMaxHeight = '450px';

// Modal.
export const defaultModalWidth = '70%';
export const defaultModalHeight = '95%';

// Foods Products and Create Food Products constants.
export const massUnits = [
    {name: 'grams', unit: 'g', valueInGrams: 1},
    {name: 'ounces', unit: 'oz', valueInGrams: 28},
    { name: 'kilograms', unit: 'kg', valueInGrams: 1000 },
    { name: 'milligrams', unit: 'mg', valueInGrams: 0.001 },
    { name: 'pounds', unit: 'lb', valueInGrams: 453.592 },
]

export const defaultMassUnitIdx = 0;

export const defaultFoodData = {
  productName: "", // The name of the food product.
  productLink: "", // The link to buy that product.
  servings: 1, // How many servings are in the product.
  measure: "serving", // It could be a serving, a tbspoon, an egg.
  measurement: {
    unit: massUnits[defaultMassUnitIdx], // Oz, Grams, Lbs, etc.
    amount: undefined, // How many grams is a serving, this is optional. n/a for eggs for instance, slices etc.
  },
  gramWeight: undefined, 
  productPrice: 0
}
