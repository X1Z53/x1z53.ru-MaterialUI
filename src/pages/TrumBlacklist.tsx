import { Typography } from "@mui/material"

import { Views } from "../components"
import { getDatabase, getImage } from "../hooks"

const database = getDatabase("trum_blacklist")

const blacklist = database.map(({ name, ban_reason, bans_count, ban_period }) => [
  <img
    key={"photo"}
    height="100px"
    src={getImage(name, "trum_blacklist", "jpg")}
    alt={name}
  />,
  name,
  ban_reason,
  bans_count,
  ban_period
])

export default function TrumBlacklist() {
  return <Views
    headers={["Фото", "Имя", "Причина попадания в ЧС", "Количество банов", "Период бана"]}
    database={blacklist}
    backgroundColors={database.map(({ is_banned }) => Number(is_banned) ? "error.main" : "success.main")}
    searchPlaces={[1, 2, 3, 4]}
  />
}
