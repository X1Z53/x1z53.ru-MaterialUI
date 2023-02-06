import { styled } from "@mui/material/styles";
import { IconButton, Link } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import TableConstructor from "../components/TableConstructor";

// Download icons
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FolderIcon from "@mui/icons-material/Folder";
import DownloadingIcon from "@mui/icons-material/Downloading";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import SaveIcon from "@mui/icons-material/Save";
import AlbumIcon from "@mui/icons-material/Album";

// Default variables
const { file_storage } = require("../databases/config.json");

const Installer = styled(DownloadRoundedIcon)`title: "Installer";`;
const Portable = styled(FolderIcon)`title: "Portable";`;
const Universal = styled(DownloadingIcon)`title: "Universal";`;
const Netinstaller = styled(CloudDownloadIcon)`title: "Netinstaller";`;
const Minimal = styled(InsertDriveFileRoundedIcon)`title: "Minimal";`;
const Full = styled(AlbumIcon)`title: "Full";`;
const Live = styled(SaveIcon)`title: "Live";`;

const iconsStyles = { height: "40px", width: "auto" };
const icons = {
  Installer: <Installer sx={iconsStyles} />,
  Portable: <Portable sx={iconsStyles} />,
  Universal: <Universal sx={iconsStyles} />,
  Netinstaller: <Netinstaller sx={iconsStyles} />,
  Minimal: <Minimal sx={iconsStyles} />,
  Full: <Full sx={iconsStyles} />,
  Live: <Live sx={iconsStyles} />
};

const database = require("../databases/collection.json");
const headers = [
  "Icon",
  "Title",
  "Version",
  "Size",
  <LinkIcon sx={iconsStyles} />
];
const collection = Object.keys(database).map((name) =>
  database[name]["type"] !== "Folder" ? [
    <img style={iconsStyles} src={file_storage + "collection/" + name + ".svg"} alt={name} />,
    name,
    database[name]["version"],
    database[name]["type"],
    <Link title={database[name]["type"]} href={file_storage + "collection/" + database[name]["file"]}>
      <IconButton>{icons[database[name]["type"]]}</IconButton>
    </Link>
  ] : [
    <img style={iconsStyles} src={file_storage + "collection/" + name + ".svg"} alt={name} />,
    name
  ]
);

export default function Collection() {
  return <TableConstructor headers={headers} rows={collection} />;
}
