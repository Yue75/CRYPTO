/**
 * Pour controler si la valeur est négative
 * @param value
 * @returns
 */
export function useIsNegative(value: string): boolean {
  const number = Number(value)
  return !isNaN(number) && number < 0
}
