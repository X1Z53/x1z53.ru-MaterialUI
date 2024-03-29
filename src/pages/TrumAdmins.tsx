import { Typography } from "@mui/material"

import { Views } from "../components"
import { getDatabase, getImage } from "../hooks"

const database = getDatabase("trum_admins")

const admins = database.map(({ name, duty_days, contacts }) => [
  <img
    key={"photo"}
    style={{ height: "100px", width: "auto" }}
    src={getImage(name, "trum_admins", "jpg")}
    alt={name}
  />,
  name,
  duty_days,
  contacts
])

export default function TrumAdmins() {
  return <Views
    headers={["Фото", "Имя", "Дни дежурства", "Контакты"]}
    database={admins}
    searchPlaces={[1, 2, 3]}
  />
}