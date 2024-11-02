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

export const roundTo = (num, decimalPlaces) => {
  return Number(Math.round(num + 'e' + decimalPlaces) + 'e-' + decimalPlaces);
}
