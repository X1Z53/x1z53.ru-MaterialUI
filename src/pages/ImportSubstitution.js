import TableConstructor from "../components/TableConstructor";

const database = require("../databases/pages/import_substitution.json");
const substitute = Object.keys(database).map((program) => [program, database[program]["substitution"], database[program]["classes"]]);

export default function ImportSubstitution() {
  return (<TableConstructor headers={["Программа", "Замещение", "Классы"]} rows={substitute} />);
}
