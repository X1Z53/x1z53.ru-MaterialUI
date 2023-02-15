import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Link, Typography } from "@mui/material"


export default function Footer() {
  return (
    <footer style={{ marginTop: "auto", marginBottom: "10px" }}>
      <Typography variant="h6">X1Z53</Typography>
      <Link target="_blank" href="https://github.com/X1Z53/site_mui">
        <GitHubIcon />
      </Link>
    </footer>
  )
}
