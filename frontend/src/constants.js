export const REFRESH_TOKEN = "refreshToken";
export const ACCESS_TOKEN = "accessToken";

export const AddFoodModalTabs = ['All', 'Create'];

export const diaryGroups = ['uncategorized', 'breakfast', 'lunch', 'dinner', 'snacks'];

export const defaultDiaryGroupObject = {name: '', foods: [], show: false, hideFromDiary: false};
export const defaultDiaryGroups = [
    {name: 'breakfast', foods: [], show: false, hideFromDiary: false}, // May consider adding a field named 'order'.
    {name: 'lunch', foods: [], show: false, hideFromDiary: false},
    {name: 'dinner', foods: [], show: false, hideFromDiary: false},
    {name: 'snacks', foods: [], show: false, hideFromDiary: false}
];

export const maxNumberOfMeals = 8;
export const maxNumberOfDays = 7;

export const mealObjectState = {foods: [], show: false, hideFromDiary: false};

export const defaultModalWidth = '70%';
export const defaultModalHeight = '95%';


export const servingMeasures = [
    {unit: 'g', valueInGrams: 1},
    {unit: 'oz', valueInGrams: 28},
]
