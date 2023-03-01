export function formatString(string, charsToUpCase) {
	charsToUpCase = charsToUpCase || [0]
	string = string.replaceAll("_", " ").split("")
	return string.map((symbol, index) =>
		charsToUpCase.includes(index) ? symbol.toUpperCase() : symbol.toLowerCase()
	).join("")
}

/*
Functions, what can be usefull

Current URL location
In Main:
  <Header getUrl={() => useLocation().pathname.slice(1)} />

  In Header:
  import { Typography } from "@mui/material"
  import { formatString } from "../backend/functions"
  import sections from "../databases/sections.json"

  ... = ({ getUrl }) => {
  const urlElement = getUrl()
  const pageTitle = urlElement
    ? formatString(urlElement, sections[urlElement]?.charsToUpCase)
    : "Main"

  return (
    <Typography variant="h4">
      {pageTitle}
    </Typography>
  )
  }
*/
