import { Typography } from "@mui/material"
import { getConfig, getDatabase } from "../functions"

import Views from "../components/Views"

const image_storage = getConfig("image_storage")
const database = getDatabase("trum_admins")

const admins = database.map(({name, duty_days, contacts}: any) => [
  <div>
    <img
      style={{ height: "100px", width: "auto" }}
      src={image_storage + "trum_admins/" + name + ".jpg"}
      alt={name}
    />
    <Typography>
      {name}
    </Typography>
  </div>,
  duty_days,
  contacts
])

export default () => <Views headers={["Фото", "Дни дежурства", "Контакты"]} database={admins} />
