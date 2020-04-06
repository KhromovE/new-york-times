/**
 * Create async function for making request
 * @param first the first number of the range
 * @param last the last number of the range
 * @returns random generated number in the range
 */
export const generateNumber = (first: number, last: number): number =>
  Math.floor(Math.random() * last) + first
