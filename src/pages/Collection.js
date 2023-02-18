import React from "react";
import { IconButton, Link } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import TableConstructor from "../components/TableConstructor";

// Download icons
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FolderIcon from "@mui/icons-material/Folder";
import DownloadingIcon from "@mui/icons-material/Downloading";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import AlbumIcon from "@mui/icons-material/Album";
import SaveIcon from "@mui/icons-material/Save";

const { file_storage } = require("../databases/config.json");
const database = require("../databases/pages/collection.json");

const iconsStyles = { height: "40px", width: "auto" };
const icons = {
  Installer: <DownloadRoundedIcon />,
  Portable: <FolderIcon />,
  Universal: <DownloadingIcon />,
  Netinstaller: <CloudDownloadIcon />,
  Minimal: <InsertDriveFileRoundedIcon />,
  Full: <AlbumIcon />,
  Live: <SaveIcon />,
};

const headers = ["Icon", "Title", "Version", "Type", <LinkIcon sx={iconsStyles} />];
const collection = Object.keys(database).map((name) => {
  const file = database[name]["file"];
  const url = `${file_storage}collection/${file}`;
  return [
    <img
      style={iconsStyles}
      src={`${file_storage}collection/${name}.svg`}
      alt={name}
    />,
    name,
    database[name]["version"],
    database[name]["type"],
    <Link title={database[name]["type"]} sx={iconsStyles} href={url}>
      <IconButton>{icons[database[name]["type"]]}</IconButton>
    </Link>,
  ];
});

// collection prototype: [image, name, version, type, icon]
let file_name = "7-Zip Installer 22.01.exe"
let [name, type, version] = file_name.split(".").slice(0, -1).join(".").split(" ")

console.log(file_name, name, type, version)

export default function Collection() {
  return <TableConstructor headers={headers} rows={collection} />;
}
