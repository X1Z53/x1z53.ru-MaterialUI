
import { Views } from "../components"
import { getDatabase } from "../hooks"

const database = getDatabase("import_replacement")
const substitute = database.map(program => [
  program.name,
  program.analogue,
  program.classes
])

export default function ImportReplacement() {
  return <Views
    headers={["Программа", "Замещение", "Классы"]}
    database={substitute}
    searchPlaces={[0, 1, 2]}
    url={"https://catalog.arppsoft.ru/replacement_list"}
  />
}
