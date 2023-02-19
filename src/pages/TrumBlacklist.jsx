import React from "react"
import { Typography } from "@mui/material"
import TableConstructor from "../components/TableConstructor"

const { file_storage } = require("../databases/config.json")
const database = require("../databases/pages/trum_blacklist.json")

const backgroundColors = Object.keys(database).map((name) =>
  database[name]["is_banned"] ? "error.main" : "success.main"
)
const headers = ["Имя", "Причина попадания в ЧС", "Количество банов", "Период бана"]
const blacklist = Object.keys(database).map((name) => [
  <div>
    <img height="100px" src={file_storage + "trum_blacklist/" + name + ".jpg"} alt={name} />
    <Typography>{name}</Typography>
  </div>,
  database[name]["ban_reason"],
  database[name]["bans_count"],
  database[name]["ban_period"]
])

export default function TrumBlacklist() {
  return (
    <TableConstructor
      headers={headers}
      rows={blacklist}
      backgroundColors={backgroundColors}
    />
  )
}
