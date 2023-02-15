import React from "react"
import { IconButton, Link } from "@mui/material"
import LinkIcon from "@mui/icons-material/Link"
import TableConstructor from "../components/TableConstructor"

// Download icons
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded"
import FolderIcon from "@mui/icons-material/Folder"
import DownloadingIcon from "@mui/icons-material/Downloading"
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded"
import AlbumIcon from "@mui/icons-material/Album"
import SaveIcon from "@mui/icons-material/Save"

// Default variables
const { file_storage } = require("../databases/config.json")

const iconsStyles = { height: "40px", width: "auto" }
const icons = {
  Installer: <DownloadRoundedIcon />,
  Portable: <FolderIcon />,
  Universal: <DownloadingIcon />,
  Netinstaller: <CloudDownloadIcon />,
  Minimal: <InsertDriveFileRoundedIcon />,
  Full: <AlbumIcon />,
  Live: <SaveIcon />
}

function formatCollection(database) {
  return Object.keys(database).map((name) => (
    [
      <img style={iconsStyles} src={file_storage + "collection/" + name + ".svg"} alt={name} />,
      name, database[name]["version"], database[name]["type"],
      <Link title={database[name]["type"]} sx={iconsStyles} href={file_storage + "collection/" + database[name]["file"]}>
        <IconButton>{icons[database[name]["type"]]}</IconButton>
      </Link>
    ]
  ))
}

const headers = ["Icon", "Title", "Version", "Type", <LinkIcon sx={iconsStyles} />]
const database = require("../databases/pages/collection.json")
const collection = formatCollection(database)

export default function Collection() { return <TableConstructor headers={headers} rows={collection} /> }
