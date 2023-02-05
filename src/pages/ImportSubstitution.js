import TableConstructor from "../components/TableConstructor";

const database = require("../databases/import_substitution.json");
const substitute = Object.keys(database).map((program) =>
  [
    program,
    database[program]["substitution"],
    database[program]["classes"]
  ].map(function (item) {
    let items = [];
    if (typeof item === "string") {
      item = item.split("|");
      for (const value in item) {
        items.push(item[value], <br />);
      }
    } else {
      items = item;
    }
    return items;
  })
);

export default function ImportSubstitution() {
  return (
    <TableConstructor
      headers={["Программа", "Замещение", "Классы"]}
      rows={substitute}
    />
  );
}
