import React from "react";
import { IconButton, Link, Typography } from "@mui/material";
import {
  DownloadRounded,
  Folder,
  Downloading,
  CloudDownload,
  InsertDriveFileRounded,
  Album,
  Save,
} from "@mui/icons-material";

import Views from "../components/Views";

const { file_storage, image_storage } = require("../databases/config.json");
const database = require("../databases/collection.json");

const iconsStyles = { height: "40px", width: "auto" };
const icons = {
  Installer: <DownloadRounded />,
  Portable: <Folder />,
  Universal: <Downloading />,
  Netinstaller: <CloudDownload />,
  Minimal: <InsertDriveFileRounded />,
  Full: <Album />,
  Live: <Save />,
};

const headers = ["Title", "Version", "Type", "Size", "Download"];

function processArray(obj) {
  const result = [];
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      const splitedFileName = key.split(" ");
      const name = splitedFileName.slice(0, -2).join(" ");
      let [type, version] = splitedFileName.slice(-2);
      version = version.split(".").slice(0, -1).join(".");
      const url = file_storage + "collection/" + key;
      const size = obj[key];
      result.push([
        <div>
          <img
            style={iconsStyles}
            src={image_storage + "collection/" + name + ".svg"}
            alt={name}
          />
          <Typography>{name}</Typography>
        </div>,
        version,
        type,
        size,
        <Link title={type} sx={iconsStyles} href={url}>
          <IconButton>{icons[type]}</IconButton>
        </Link>,
      ]);
    } else {
      const subResult = processArray(obj[key]);
      result.push([
        <div>
          <img
            style={iconsStyles}
            src={image_storage + "collection/" + key + ".svg"}
            alt={key}
          />
          <Typography>{key}</Typography>
        </div>,
        subResult,
      ]);
    }
  }

  return result;
}

// [image & title, version, type, size, download]
export default () => (
  <Views headers={headers} database={processArray(database)} />
);
