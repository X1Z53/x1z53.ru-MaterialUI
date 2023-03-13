import { ReactElement } from "react"
import { IconButton, Typography } from "@mui/material"
import { DownloadRounded, Folder, Downloading, CloudDownload, InsertDriveFileRounded, Album, Save, InsertEmoticon, } from "@mui/icons-material"

import Views from "../components/Views"
import { getConfig, getDatabase } from "../functions"


const database = getDatabase("collection")
const { file_storage, image_storage } = getConfig()

const iconsStyles = { height: "40px" }
const icons: { [key: string]: ReactElement } = {
  Installer: <DownloadRounded />,
  Portable: <Folder />,
  Universal: <Downloading />,
  Netinstaller: <CloudDownload />,
  Minimal: <InsertDriveFileRounded />,
  Full: <Album />,
  Live: <Save />,
}

var programs: any = {}

for (const index in database) {
  const program = database[index]
  if (program.folder) {
    if (!programs[program.folder]) {
      programs[program.folder] = {}
      programs[program.folder].name = program.folder
      programs[program.folder].objects = []
    }
    programs[program.folder].objects.push(program)
  } else {
    programs[program.name] = program
  }
}
function configureCollection(programs: []): [] {
  const result: any = []

  for (const index in programs) {
    const { name, type, version, file_type, size, objects } = programs[index]
    const url = file_storage + "collection/" + [name, type, version].join(' ') + '.' + file_type

    if (!objects) {
      result.push([
        <div>
          <img style={iconsStyles} src={image_storage + "collection/" + name + ".svg"} alt={name} />
          <Typography>{name}</Typography>
        </div>,
        version,
        type,
        size,
        <IconButton title={type} sx={iconsStyles} href={url}>{icons[type]}</IconButton>
      ])
    } else {
      const subResult = configureCollection(objects)

      result.push([
        <Typography display="flex" flexDirection="column">
          <img style={iconsStyles} src={image_storage + "collection/" + name + ".svg"} alt={name} />
          {name}
        </Typography>,
        subResult,
      ])
    }
  }

  return result
}

// [image & title, version, type, size, download]
export default () => <Views
  headers={["Title", "Version", "Type", "Size", "Download"]}
  database={configureCollection(programs)}
/>
