import React from "react"
import { Typography } from "@mui/material"

import { Views } from "../components"
import { getDatabase, getImage } from "../hooks"

const database = getDatabase("trum_admins")

const admins = database.map(({ name, duty_days, contacts }) => [
  <div key={name}>
    <img
      style={{ height: "100px", width: "auto" }}
      src={getImage(name, "trum_admins", "jpg")}
      alt={name}
    />
    <Typography>
      {name}
    </Typography>
  </div>,
  duty_days,
  contacts
])

export default function TrumAdmins() {
  return <Views headers={["Фото", "Дни дежурства", "Контакты"]} database={admins} />
}