import React from "react"
import { Link, Stack, Divider } from "@mui/material"
import { GitHub } from "@mui/icons-material"
import { getConfig } from "../functions"

const { image_storage, github, meonao } = getConfig()

export default () => <footer style={{ marginTop: "auto", marginBottom: "10px" }}>
  <Stack
    direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    justifyContent="center"
    spacing={1}
  >
    <Link title="Partner" target="_blank" href={meonao}>
      <img
        style={{ filter: "invert(80%)" }}
        height="25px"
        src={image_storage + "meonao.svg"}
      />
    </Link>
    <Link title="GitHub" target="_blank" href={github}>
      <GitHub />
    </Link>
  </Stack>
</footer>