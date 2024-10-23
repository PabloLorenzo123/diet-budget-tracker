export const titleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

export const removeTrailingZeros = (e) => {
  e.target.value = e.target.value.replace(/^0+(?=\d)/, '');
}
