
export const nutrientsInformation = {
    energy: { name: "energy", altName: "Energy", unit: "kcal", dv: 2000 },
    protein: { name: "protein", altName: "Protein", unit: "g", dv: 50 },
    fiber: { name: "fiber", altName: "Dietary Fiber", unit: "g", dv: 28 },
    starch: { name: "starch", altName: "Starch", unit: "g", dv: null },
    sugars: { name: "sugars", altName: "Sugars", unit: "g", dv: 50 },
    addedSugars: { name: "addedSugars", altName: "Added Sugars", unit: "g", dv: 50 },
    netCarbs: { name: "netCarbs", altName: "Net Carbohydrates", unit: "g", dv: 275 },
    monounsaturatedFat: { name: "monounsaturatedFat", altName: "Monounsaturated Fat", unit: "g", dv: null },
    polyunsaturatedFat: { name: "polyunsaturatedFat", altName: "Polyunsaturated Fat", unit: "g", dv: null },
    saturatedFat: { name: "saturatedFat", altName: "Saturated Fat", unit: "g", dv: 20 },
    transFat: { name: "transFat", altName: "Trans Fat", unit: "g", dv: null },
    cholesterol: { name: "cholesterol", altName: "Cholesterol", unit: "mg", dv: 300 },
    totalFat: { name: "totalFat", altName: "Total Fat", unit: "g", dv: 78 },
    B1: { name: "B1", altName: "Thiamine (B1)", unit: "mg", dv: 1.2 },
    B2: { name: "B2", altName: "Riboflavin (B2)", unit: "mg", dv: 1.3 },
    B3: { name: "B3", altName: "Niacin (B3)", unit: "mg", dv: 16 },
    B5: { name: "B5", altName: "Pantothenic Acid (B5)", unit: "mg", dv: 5 },
    B6: { name: "B6", altName: "Vitamin B6", unit: "mg", dv: 1.7 },
    B12: { name: "B12", altName: "Vitamin B12", unit: "mcg", dv: 2.4 },
    choline: { name: "choline", altName: "Choline", unit: "mg", dv: 550 },
    folate: { name: "folate", altName: "Folate", unit: "mcg", dv: 400 },
    A: { name: "A", altName: "Vitamin A", unit: "mcg", dv: 900 },
    C: { name: "C", altName: "Vitamin C", unit: "mg", dv: 90 },
    D: { name: "D", altName: "Vitamin D", unit: "IU", dv: 800 },
    E: { name: "E", altName: "Vitamin E", unit: "mg", dv: 15 },
    K: { name: "K", altName: "Vitamin K", unit: "mcg", dv: 120 },
    calcium: { name: "calcium", altName: "Calcium", unit: "mg", dv: 1300 },
    chromium: { name: "chromium", altName: "Chromium", unit: "mcg", dv: 35 },
    copper: { name: "copper", altName: "Copper", unit: "mg", dv: 0.9 },
    iron: { name: "iron", altName: "Iron", unit: "mg", dv: 18 },
    magnesium: { name: "magnesium", altName: "Magnesium", unit: "mg", dv: 420 },
    manganese: { name: "manganese", altName: "Manganese", unit: "mg", dv: 2.3 },
    molybdenum: { name: "molybdenum", altName: "Molybdenum", unit: "mcg", dv: 45 },
    phosphorus: { name: "phosphorus", altName: "Phosphorus", unit: "mg", dv: 700 },
    potassium: { name: "potassium", altName: "Potassium", unit: "mg", dv: 4700 },
    selenium: { name: "selenium", altName: "Selenium", unit: "mcg", dv: 55 },
    sodium: { name: "sodium", altName: "Sodium", unit: "mg", dv: 2300 },
    zinc: { name: "zinc", altName: "Zinc", unit: "mg", dv: 11 }
};



export const nutrientsTable = {
    general: [
        nutrientsInformation.energy, 
        nutrientsInformation.protein, 
        nutrientsInformation.netCarbs, 
        nutrientsInformation.totalFat
    ],
    carbs: [
        nutrientsInformation.fiber, 
        nutrientsInformation.starch, 
        nutrientsInformation.sugars, 
        nutrientsInformation.addedSugars, 
        nutrientsInformation.netCarbs
    ],
    fat: [
        nutrientsInformation.monounsaturatedFat, 
        nutrientsInformation.polyunsaturatedFat, 
        nutrientsInformation.saturatedFat, 
        nutrientsInformation.transFat, 
        nutrientsInformation.cholesterol, 
        nutrientsInformation.totalFat
    ],
    vitamins: [
        nutrientsInformation.B1, 
        nutrientsInformation.B2, 
        nutrientsInformation.B3, 
        nutrientsInformation.B5, 
        nutrientsInformation.B6, 
        nutrientsInformation.B12, 
        nutrientsInformation.choline, 
        nutrientsInformation.folate, 
        nutrientsInformation.A, 
        nutrientsInformation.C, 
        nutrientsInformation.D, 
        nutrientsInformation.E, 
        nutrientsInformation.K
    ],
    minerals: [
        nutrientsInformation.calcium, 
        nutrientsInformation.chromium, 
        nutrientsInformation.copper, 
        nutrientsInformation.iron, 
        nutrientsInformation.magnesium, 
        nutrientsInformation.manganese, 
        nutrientsInformation.molybdenum, 
        nutrientsInformation.phosphorus, 
        nutrientsInformation.potassium, 
        nutrientsInformation.selenium, 
        nutrientsInformation.sodium, 
        nutrientsInformation.zinc
    ]
};

export const nutrientState = {};
Object.keys(nutrientsInformation).forEach(n => {
    const keyName = n
    nutrientState[n] = {
        amount: 0,
        dv: nutrientsInformation[n].dv == null? null: 0
    }
})



export const dailyTargetState = {
    budget: 0,
    ...nutrientState
}
