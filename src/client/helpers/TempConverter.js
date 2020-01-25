const toCelsius = (temp) => {
  const result = temp - 273.15;
  return Math.round(result);
};

const toFahrenheit = (temp) => {
  const result = (temp * 9) / 5 - 459.67;
  return Math.round(result);
};

module.exports.toCelsius = toCelsius;
module.exports.toFahrenheit = toFahrenheit;
