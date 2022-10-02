export function roundToDecimals(num: number, decimalPlaces: number) {
  const places = 10 ** decimalPlaces;
  return Math.round(num * places) / places;
}
