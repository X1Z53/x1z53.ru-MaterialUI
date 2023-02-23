import React from "react"

import Views from "../components/Views"

const { file_storage } = require("../databases/config.json")
const database = require("../databases/trum_admins.json")
const admins = Object.keys(database).map((name) => [
  <img height="100px" src={file_storage + "trum_admins/" + name + ".jpg"} alt={name} />,
  name, database[name]["duty_days"], database[name]["contacts"]
])

export default function TrumAdmins() {
  return (<Views headers={["Фото", "Имя", "Дни дежурства", "Контакты"]} database={admins} />)
}
