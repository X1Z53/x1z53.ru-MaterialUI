import React, { useState } from "react"
import {
  Divider,
  Stack,
  Grid,
  Paper,
  Typography,
  Collapse,
} from "@mui/material"
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material"
import parse from "html-react-parser"

type GridTileProps = {
  isFolder: boolean,
  tile: any[],
  backgroundColor: string
}

type Props = {
  tiles: any[],
  backgroundColors?: string[]
}

const GridTile = ({ isFolder, tile, backgroundColor }: GridTileProps) => {
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
          {typeof tile[0] === "string" ? (
            <Typography>{parse(tile[0].replace(/\|/g, "<br />"))}</Typography>
          ) : (
            tile[0]
          )}
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
            {tile[1].map((tile: any, index: number) => (
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
            typeof item === "string" ? (
              <Typography key={index}>
                {parse(item.replace(/\|/g, "<br />"))}
              </Typography>
            ) : (
              item
            )
          )}
        </Stack>
      </Paper>
    </Grid>
  )
}

export default ({ tiles, backgroundColors = [] }: Props) => (
  <Grid container alignItems="center" justifyContent="center" spacing={2}>
    {tiles.map((tile, index) => (
      <GridTile
        key={index}
        isFolder={Object.keys(tile).length <= 2}
        tile={tile}
        backgroundColor={backgroundColors[index]}
      />
    ))}
  </Grid>
)
