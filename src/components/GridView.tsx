import React, { useState } from "react"
import { Divider, Stack, Grid, Paper, Collapse } from "@mui/material"
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material"

import { checkType, updateHTML } from "../hooks"
import { DataView, GridTileProps } from "../types"

function GridTile({ isFolder, tile, backgroundColor }: GridTileProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  return isFolder ? (
    <Grid position={"relative"} item>
      <Paper
        sx={{
          borderRadius: 5,
          padding: 2,
          backgroundColor: backgroundColor,
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Stack
          direction="column"
          divider={<Divider flexItem />}
          alignItems="center"
        >
          {checkType(tile[0], "string", updateHTML, [tile[0], "|", "<br>"])}
          {isOpen ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </Stack>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          zIndex: 1,
          borderRadius: "20px",
          left: "-50%",
          width: "250%",
        }}
      >
        <Collapse in={isOpen} timeout="auto">
          <Grid
            container
            alignItems="center"
            padding="5px"
            justifyContent="center"
            spacing={2}
          >
            {tile[1].map((tile: [], index: number) => (
              <GridTile
                key={index}
                isFolder={Object.keys(tile).length <= 2}
                tile={tile}
                backgroundColor={backgroundColor}
              />
            ))}
          </Grid>
        </Collapse>
      </Paper>
    </Grid>
  ) : (
    <Grid item>
      <Paper
        sx={{ borderRadius: 5, padding: 2, backgroundColor: backgroundColor }}
      >
        <Stack
          direction="column"
          divider={<Divider flexItem />}
          alignItems="center"
        >
          {tile.map((item, index) =>
            <div key={index}>{checkType(item, "string", updateHTML, [item, "|", "<br>"])}</div>
          )}
        </Stack>
      </Paper>
    </Grid>
  )
}

export default function GridView({ database, backgroundColors = [] }: DataView) {
  return <Grid container alignItems="center" justifyContent="center" spacing={2}>
    {database.map((tile, index) => (
      <GridTile
        key={index}
        isFolder={Object.keys(tile).length <= 2}
        tile={tile}
        backgroundColor={backgroundColors[index]}
      />
    ))}
  </Grid>
}
