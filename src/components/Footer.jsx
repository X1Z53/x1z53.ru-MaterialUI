import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Link, Stack, Divider } from "@mui/material"
const { file_storage, github, meonao } = require("../databases/config.json")

export default function Footer() {
  return (
    <footer style={{ marginTop: "auto", marginBottom: "10px" }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="center" spacing={1}>
        <Link title="Partner" target="_blank" href={meonao}>
          <img style={{ filter: "invert(80%)" }} height="25px" src={file_storage + "meonao.svg"} />
        </Link>
        <Link title="GitHub" target="_blank" href={github}>
          <GitHubIcon />
        </Link>
      </Stack>
    </footer>
  )
}
