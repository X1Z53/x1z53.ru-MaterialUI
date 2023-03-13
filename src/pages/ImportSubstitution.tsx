import TableConstructor from "../components/TableView"

const database = require("../import_substitution.json")

const substitute = Object.keys(database).map((program) => [
  program,
  database[program]["substitution"],
  database[program]["classes"],
])

export default () => <TableConstructor headers={["Программа", "Замещение", "Классы"]} rows={substitute} />
