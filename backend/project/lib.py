
def format_nutrients_from_request_body(data) -> dict:
    """Takes the frontend request and formats the JSON request such that each field matches a field of diet.models.NutritionTable"""
    return {
        # nutrients.
        'energy': data.get("energy", 0.0),
        'protein': data.get("protein", 0.0),
        'fiber': data.get("fiber", 0.0),
        'starch': data.get("starch", 0.0),
        'sugars': data.get("sugars", 0.0),
        'added_sugars': data.get("addedSugars", 0.0),
        'net_carbs': data.get("netCarbs", 0.0),
        # Fats.
        'monounsaturated_fat': data.get("monounsaturatedFat", 0.0),
        'polyunsaturated_fat': data.get("polyunsaturatedFat", 0.0),
        'saturated_fat': data.get("saturatedFat", 0.0),
        'trans_fat': data.get("transFat", 0.0),
        'cholesterol': data.get("cholesterol", 0.0),
        'total_fat': data.get("totalFat", 0.0),
        # Vitamins.
        'b1': data.get("B1", 0.0),
        'b2': data.get("B2", 0.0),
        'b3': data.get("B3", 0.0),
        'b5': data.get("B5", 0.0),
        'b6': data.get("B6", 0.0),
        'b12': data.get("B12", 0.0),
        'choline': data.get("choline", 0.0),
        'folate': data.get("folate", 0.0),
        'a': data.get("A", 0.0),
        'c': data.get("C", 0.0),
        'd': data.get("D", 0.0),
        'e': data.get("E", 0.0),
        'k': data.get("K", 0.0),
        # Minerals.
        'calcium': data.get("calcium", 0.0),
        'chromium': data.get("chromium", 0.0),
        'copper': data.get("copper", 0.0),
        'iron': data.get("iron", 0.0),
        'magnesium': data.get("magnesium", 0.0),
        'manganese': data.get("manganese", 0.0),
        'molybdenum': data.get("molybdenum", 0.0),
        'phosphorus': data.get("phosphorus", 0.0),
        'potassium': data.get("potassium", 0.0),
        'selenium': data.get("selenium", 0.0),
        'sodium': data.get("sodium", 00.0),
        'zinc': data.get("zinc", 0.0)
    }
    