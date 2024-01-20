export function getNumberFromString(str: string): number {
  const numb = str.match(/\d/g)
  return Number(numb?.join(''))
}
