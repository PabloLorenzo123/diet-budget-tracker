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
}

export const roundTo = (num, decimalPlaces) => {
  return Number(Math.round(num + 'e' + decimalPlaces) + 'e-' + decimalPlaces);
}

export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
