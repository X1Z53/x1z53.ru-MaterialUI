import { Album, CloudDownload, Downloading, DownloadRounded, Folder, InsertDriveFileRounded, Link, Save } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Views } from "../components"
import { getConfig, getDatabase, getImage, getURL } from "../hooks"


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

function configureCollection(programs: any[]): any[] {
  const result = []

  for (const index in programs) {
    const { name, type, version, size, sources, folder } = programs[index]
    const url = getURL([file_storage, "collection", `${name} ${type} ${version}`])

    result.push([
      <img key={"icon"} style={iconsStyles} src={getImage(name, "collection")} alt={name} />,
      name,
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
      </IconButton>,
      folder
    ])
  }

  return result
}

export default function Collection() {
  return <Views
    headers={["Icon", "Title", "Version", "Type", "Size", "Sources", "Download"]}
    database={configureCollection(database)}
    searchPlaces={[1, 2, 3, 4]}
    haveFolders
  />
}
