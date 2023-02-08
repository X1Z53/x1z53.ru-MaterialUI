export function formatString(string, charsToUpCase) {
  charsToUpCase = charsToUpCase || [0]
  string = string.replaceAll("_", " ").split("")
  return string.map((symbol, index) =>
    charsToUpCase.includes(index) ? symbol.toUpperCase() : symbol.toLowerCase()
  ).join("")
}
