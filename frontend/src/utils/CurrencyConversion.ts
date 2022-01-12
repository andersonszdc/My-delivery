const CurrencyConversion = (number: number) => {
  const newNumber = number.toFixed(2).replace('.', ',');
  return `R$ ${newNumber}`;
};

export default CurrencyConversion;
