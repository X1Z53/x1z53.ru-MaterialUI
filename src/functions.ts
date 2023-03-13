import database from "./database.json"
const { objects } = database

export function formatString(input_string: string, charsToUpCase: string) {
  const chars_indexes: number[] = typeof charsToUpCase === "string" ? charsToUpCase.split(",").map((char: string) => Number(char)) : [0]
  const string: string[] = input_string.replaceAll("_", " ").split("")

  return string.map((char: string, index: number) =>
    chars_indexes.includes(index) ? char.toUpperCase() : char.toLowerCase()
  ).join("")
}

export function getDatabase(table_name: string) {
  var table: {[key: string]: any} = {}
  for (const index in objects) {
    const item = objects[index]
    if (item.name === table_name) {
      table = item
      break
    }
  }

  const keys = table.columns.map((key: any) => key.name)
  const values = table.rows

  return values.map((row: any) => {
    var obj: {[key: string]: any}= {}
    keys.forEach((key: string, index: number) => { obj[key] = row[index] })
    return obj
  })
}

export function getConfig(param_name: string = '') {
  const database = getDatabase("config")
  const result: {[key: string]: any} = {}

  database.map(({ name, param }: any) => {
    result[name] = param
  })

  return param_name ? result[param_name] : result
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
