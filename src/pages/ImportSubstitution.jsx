import React from "react";

import TableConstructor from "../components/TableView";

const database = require("../databases/import_substitution.json");
const substitute = Object.keys(database).map((program) => [
  program,
  database[program]["substitution"],
  database[program]["classes"],
]);

export default function ImportSubstitution() {
  return (
    <TableConstructor
      headers={["Программа", "Замещение", "Классы"]}
      rows={substitute}
    />
  );
}
