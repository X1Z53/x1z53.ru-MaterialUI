import React from "react"
import { IconButton, Typography } from "@mui/material"
import { DownloadRounded, Folder, Downloading, CloudDownload, InsertDriveFileRounded, Album, Save, Link } from "@mui/icons-material"

import { Views } from "../components"
import { getConfig, getDatabase, getImage, getURL } from "../hooks"
import { ProgramType } from "../types"


const database = getDatabase("collection")
const { file_storage } = getConfig()

const iconsStyles = { height: "40px" }
const icons: { [key: string]: JSX.Element } = {
  Installer: <DownloadRounded />,
  Portable: <Folder />,
  Universal: <Downloading />,
  Netinstaller: <CloudDownload />,
  Minimal: <InsertDriveFileRounded />,
  Full: <Album />,
  Live: <Save />,
}

const programs: ProgramType[] = []

for (const index in database) {
  const { name, folder, type, version, sources, file_type, size } = database[index]
  const program = { name, folder, type, version, sources, file_type, size }

  if (folder) {
    const folderIndex = programs.map((program): string => program.name).indexOf(folder)

    if (folderIndex === -1) programs.push({ name: folder, objects: [program] })
    else programs[folderIndex].objects?.push(program)

  } else {
    programs.push(program)
  }
}

function configureCollection(programs: ProgramType[]): any[] {
  const result = []

  for (const index in programs) {
    const { name, type, version, file_type, size, sources, objects } = programs[index]
    const url = getURL([file_storage, "collection", `${name} ${type} ${version}.${file_type}`])

    result.push(
      (!objects) ? [
        <div key={"title"}>
          <img style={iconsStyles} src={getImage(name, "collection")} alt={name} />
          <Typography>{name}</Typography>
        </div>,
        version,
        type,
        size,
        <div key={"sources"}>
          {sources?.split("|").map((source: string, index: number) =>
            <IconButton key={index} title={source} sx={iconsStyles} target="_blank" href={source}><Link /></IconButton>
          )}
        </div>,
        <IconButton key={"download"} title={type} sx={iconsStyles} href={url}>
          {typeof type === "string" ? icons[type] : icons["Installer"]}
        </IconButton>
      ] : [
        <Typography key={"folder"} display="flex" flexDirection="column">
          <img style={iconsStyles} src={getImage(name, "collection")} alt={name} />
          {name}
        </Typography>,
        configureCollection(objects),
      ])
  }

  return result
}

export default function Collection() {
  return <Views
    headers={["Title", "Version", "Type", "Size", "Sources", "Download"]}
    database={configureCollection(programs)}
  />
}
