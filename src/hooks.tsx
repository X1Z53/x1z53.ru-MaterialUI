import React from "react"
import { Typography } from "@mui/material"
import parse from "html-react-parser"
import database from "./backend/database.json"

import { DatabaseType } from "./types"
const { objects } = database

export function formatString(inputString: string, charsToUpCase: string): string {
  const charIndexes = typeof charsToUpCase === "string" ? charsToUpCase.split(",").map(Number) : [0]
  const stringArr = inputString.replaceAll("_", " ").split("")

  const formattedString = stringArr.map((char, index) =>
    charIndexes.includes(index) ? char.toUpperCase() : char.toLowerCase()
  ).join("")

  return formattedString
}

export function getDatabase(tableName: string): { [key: string]: string }[] {
  const table = objects.find(item => item.name === tableName) as DatabaseType | undefined
  if (!table) return []

  const keys = table.columns.map(key => key.name)
  const values = table.rows

  return values.map(row =>
    keys.reduce((obj: { [key: string]: string }, key, index) => {
      obj[key] = row[index]
      return obj
    }, {})
  )
}

export function getDatabaseHeaders(tableName: string): string[] {
  const table = objects.find(item => item.name === tableName) as DatabaseType | undefined
  if (!table) return []

  return table.columns.map(key => key.name)
}

export function getConfig(paramName = ""): any {
  const database = getDatabase("config")
  const result: { [key: string]: string } = {}

  database.forEach(({ name, param }) => {
    result[name] = param
  })

  return paramName ? result[paramName] : result
}

export function getURL(urlParts: string[]): string {
  return urlParts.filter(part => part !== "").join("/")
}

export function getImage(fileName: string, folder = "", fileType = "svg") {
  return getURL([getConfig("image_storage"), folder, `${fileName}.${fileType}`])
}

export function checkType(variable: any, type: string, func: Function, props: any[]): any {
  return typeof variable === type ? func(...props) : variable
}

export function updateHTML(html: string, originalChar: string, updateChar: string): JSX.Element {
  return <Typography>{parse(html.replaceAll(originalChar, updateChar))}</Typography>
}
