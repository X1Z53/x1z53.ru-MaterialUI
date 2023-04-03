import { Typography } from "@mui/material"
import parse from "html-react-parser"
import ky from "ky"
import { useState } from "react"
import { DatabaseType } from "./types"

const jsonDatabase: {objects: any} = await ky("https://files.x1z53.ru/test_database.json").json()
const database = jsonDatabase.objects

export function formatString(inputString: string, charsToUpCase: string) {
  const charIndexes = typeof charsToUpCase === "string" ? charsToUpCase.split(",").map(Number) : [0]
  const stringArr = inputString.replaceAll("_", " ").split("")

  const formattedString = stringArr.map((char, index) =>
    charIndexes.includes(index) ? char.toUpperCase() : char.toLowerCase()
  ).join("")

  return formattedString
}

export function useToggle(initialValue: any) {
  const [value, setValue] = useState(initialValue)

  const toggleValue = () => setValue(!value)

  return [value, toggleValue]
}

export function useBooleanState(initialValue: any) {
  const [value, setValue] = useState(initialValue)

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)

  return [value, setTrue, setFalse]
}

export function getDatabase(tableName: string) {
  const table = database.find((item: any) => item.name === tableName) as DatabaseType | undefined
  if (!table) return []

  const keys = table.columns.map((key: Record<string, string>) => key.name)
  const values = table.rows

  return values.map((row: string[]) =>
    keys.reduce((obj: Record<string, string>, key: string, index: number) => {
      obj[key] = row[index]
      return obj
    }, {})
  )
}

export function getConfig() {
  const database = getDatabase("config")
  const result: Record<string, string> = {}

  database.forEach(({ name, param }) => {
    result[name] = param
  })

  return result
}

export function getURL(urlParts: string[]) {
  return urlParts.filter(part => part !== "").join("/")
}

export function getImage(fileName: string, folder = "", fileType = "svg") {
  const { image_storage } = getConfig()
  return getURL([image_storage, folder, `${fileName}.${fileType}`])
}

export function updateHTML(html: string, originalChar: string, updateChar: string) {
  return <Typography>{parse(html.replaceAll(originalChar, updateChar))}</Typography>
}
