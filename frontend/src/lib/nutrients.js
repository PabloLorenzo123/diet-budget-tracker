
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
    cholestherol: { name: "cholestherol", altName: "Cholesterol", unit: "mg", dv: 300 },
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
        nutrientsInformation.cholestherol, 
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

export const nutrientState = {
    "energy": {
        amount: 0,
        dv: 0
    },
    "protein": {
        amount: 0,
        dv: 0
    },
    "fiber": {
        amount: 0,
        dv: 0
    },
    "starch": {
        amount: 0,
        dv: null
    },
    "sugars": {
        amount: 0,
        dv: 0
    },
    "addedSugars": {
        amount: 0,
        dv: 0
    },
    "netCarbs": {
        amount: 0,
        dv: 0
    },
    "monounsaturatedFat": {
        amount: 0,
        dv: null
    },
    "polyunsaturatedFat": {
        amount: 0,
        dv: null
    },
    "saturatedFat": {
        amount: 0,
        dv: 0
    },
    "transFat": {
        amount: 0,
        dv: null
    },
    "cholestherol": {
        amount: 0,
        dv: 0
    },
    "totalFat": {
        amount: 0,
        dv: 0
    },
    "B1": {
        amount: 0,
        dv: 0
    },
    "B2": {
        amount: 0,
        dv: 0
    },
    "B3": {
        amount: 0,
        dv: 0
    },
    "B5": {
        amount: 0,
        dv: 0
    },
    "B6": {
        amount: 0,
        dv: 0
    },
    "B12": {
        amount: 0,
        dv: 0
    },
    "choline": {
        amount: 0,
        dv: 0
    },
    "folate": {
        amount: 0,
        dv: 0
    },
    "A": {
        amount: 0,
        dv: 0
    },
    "C": {
        amount: 0,
        dv: 0
    },
    "D": {
        amount: 0,
        dv: 0
    },
    "E": {
        amount: 0,
        dv: 0
    },
    "K": {
        amount: 0,
        dv: 0
    },
    "calcium": {
        amount: 0,
        dv: 0
    },
    "chromium": {
        amount: 0,
        dv: 0
    },
    "copper": {
        amount: 0,
        dv: 0
    },
    "iron": {
        amount: 0,
        dv: 0
    },
    "magnesium": {
        amount: 0,
        dv: 0
    },
    "manganese": {
        amount: 0,
        dv: 0
    },
    "molybdenum": {
        amount: 0,
        dv: 0
    },
    "phosphorus": {
        amount: 0,
        dv: 0
    },
    "potassium": {
        amount: 0,
        dv: 0
    },
    "selenium": {
        amount: 0,
        dv: 0
    },
    "sodium": {
        amount: 0,
        dv: 0
    },
    "zinc": {
        amount: 0,
        dv: 0
    }
}

export const dailyValues = {
    "energy": 2000,
    "protein": 50,
    "fiber": 28,
    "starch": null,
    "sugars": 50,
    "addedSugars": 50,
    "netCarbs": 275,
    "monounsaturatedFat": null,
    "polyunsaturatedFat": null,
    "saturatedFat": 20,
    "transFat": null,
    "cholestherol": 300,
    "totalFat": 78,
    "B1": 1.2,
    "B2": 1.3,
    "B3": 16,
    "B5": 5,
    "B6": 1.7,
    "B12": 2.4,
    "choline": 550,
    "folate": 400,
    "A": 900,
    "C": 90,
    "D": 800,
    "E": 15,
    "K": 120,
    "calcium": 1300,
    "chromium": 35,
    "copper": 0.9,
    "iron": 18,
    "magnesium": 420,
    "manganese": 2.3,
    "molybdenum": 45,
    "phosphorus": 700,
    "potassium": 4700,
    "selenium": 55,
    "sodium": 2300,
    "zinc": 11
}

export const dailyTargetState = {
    budget: 0,
    energy: {
        amount: 0,
        dv: 0
    },
    "protein": {
        amount: 0,
        dv: 0
    },
    "fiber": {
        amount: 0,
        dv: 0
    },
    "starch": {
        amount: 0,
        dv: 0
    },
    "sugars": {
        amount: 0,
        dv: 0
    },
    "addedSugars": {
        amount: 0,
        dv: 0
    },
    "netCarbs": {
        amount: 0,
        dv: 0
    },
    "monounsaturatedFat": {
        amount: 0,
        dv: 0
    },
    "polyunsaturatedFat": {
        amount: 0,
        dv: 0
    },
    "saturatedFat": {
        amount: 0,
        dv: 0
    },
    "transFat": {
        amount: 0,
        dv: 0
    },
    "cholestherol": {
        amount: 0,
        dv: 0
    },
    "totalFat": {
        amount: 0,
        dv: 0
    },
    "B1": {
        amount: 0,
        dv: 0
    },
    "B2": {
        amount: 0,
        dv: 0
    },
    "B3": {
        amount: 0,
        dv: 0
    },
    "B5": {
        amount: 0,
        dv: 0
    },
    "B6": {
        amount: 0,
        dv: 0
    },
    "B12": {
        amount: 0,
        dv: 0
    },
    "choline": {
        amount: 0,
        dv: 0
    },
    "folate": {
        amount: 0,
        dv: 0
    },
    "A": {
        amount: 0,
        dv: 0
    },
    "C": {
        amount: 0,
        dv: 0
    },
    "D": {
        amount: 0,
        dv: 0
    },
    "E": {
        amount: 0,
        dv: 0
    },
    "K": {
        amount: 0,
        dv: 0
    },
    "calcium": {
        amount: 0,
        dv: 0
    },
    "chromium": {
        amount: 0,
        dv: 0
    },
    "copper": {
        amount: 0,
        dv: 0
    },
    "iron": {
        amount: 0,
        dv: 0
    },
    "magnesium": {
        amount: 0,
        dv: 0
    },
    "manganese": {
        amount: 0,
        dv: 0
    },
    "molybdenum": {
        amount: 0,
        dv: 0
    },
    "phosphorus": {
        amount: 0,
        dv: 0
    },
    "potassium": {
        amount: 0,
        dv: 0
    },
    "selenium": {
        amount: 0,
        dv: 0
    },
    "sodium": {
        amount: 0,
        dv: 0
    },
    "zinc": {
        amount: 0,
        dv: 0
    }
}