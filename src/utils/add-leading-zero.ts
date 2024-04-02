const addLeadingZero = (number: number): string => {
  return number.toString().padStart(2, '0');
};

export default addLeadingZero;
