import React from "react"
import { IconButton, Link, Typography } from "@mui/material"
import LinkIcon from "@mui/icons-material/Link"
import TableConstructor from "../components/TableConstructor"

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded"
import FolderIcon from "@mui/icons-material/Folder"
import DownloadingIcon from "@mui/icons-material/Downloading"
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded"
import AlbumIcon from "@mui/icons-material/Album"
import SaveIcon from "@mui/icons-material/Save"

const { file_storage } = require("../databases/config.json")
const database = require("../databases/pages/collection.json")

const iconsStyles = { height: "40px", width: "auto" }
const icons = {
  Installer: <DownloadRoundedIcon />,
  Portable: <FolderIcon />,
  Universal: <DownloadingIcon />,
  Netinstaller: <CloudDownloadIcon />,
  Minimal: <InsertDriveFileRoundedIcon />,
  Full: <AlbumIcon />,
  Live: <SaveIcon />,
}


const headers = ["Title", "Version", "Type", "Size", <LinkIcon sx={iconsStyles} />]


function processArray(obj) {
  const result = []
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      const splitedFileName = key.split(" ")
      const name = splitedFileName.slice(0, -2).join(" ")
      let [type, version] = splitedFileName.slice(-2)
      version = version.split(".").slice(0, -1).join(".")
      const url = `${file_storage}collection/${key}`
      const size = obj[key]
      result.push([
        <div>
          <img style={iconsStyles} src={`${file_storage}collection/${name}.svg`} alt={name} />
          <Typography>{name}</Typography>
        </div>,
        version,
        type,
        size,
        <Link title={type} sx={iconsStyles} href={url}>
          <IconButton>{icons[type]}</IconButton>
        </Link>,
      ])
    } else {
      const subResult = processArray(obj[key])
      result.push([
        <div>
          <img style={iconsStyles} src={`${file_storage}collection/${key}.svg`} alt={key} />
          <Typography>{key}</Typography>
        </div>,
        subResult
      ])
    }
  }
  return result
}

const collection = processArray(database)
console.log(collection)
// collection prototype: [image, name, version, type, icon]
export default () => <TableConstructor headers={headers} rows={collection} />
