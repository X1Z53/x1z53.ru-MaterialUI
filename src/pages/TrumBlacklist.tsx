import React from "react"
import { Typography } from "@mui/material"

import Views from "../components/Views"

import { getDatabase, getConfig } from "../functions"

const database = getDatabase("trum_blacklist")
const image_storage = getConfig("image_storage")

const blacklist = database.map(({ name, ban_reason, bans_count, ban_period }: any) => [
  <div>
    <img
      height="100px"
      src={image_storage + "trum_blacklist/" + name + ".jpg"}
      alt={name}
    />
    <Typography>{name}</Typography>
  </div>,
  ban_reason,
  bans_count,
  ban_period
])

export default () => <Views
  headers={["Имя", "Причина попадания в ЧС", "Количество банов", "Период бана"]}
  database={blacklist}
  backgroundColors={database.map(({ is_banned }: any) => Number(is_banned) ? "error.main" : "success.main")}
/>
