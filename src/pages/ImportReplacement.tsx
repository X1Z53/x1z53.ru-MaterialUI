import React from "react"

import { TableView } from "../components"
import { getDatabase } from "../hooks"

const database = getDatabase("import_replacement")

const substitute = database.map(program => [
  program.name,
  program.analogue,
  program.classes
])

export default function ImportReplacement() {
  return <TableView headers={["Программа", "Замещение", "Классы"]} database={substitute} />
}
