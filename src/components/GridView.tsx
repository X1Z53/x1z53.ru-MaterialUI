import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material"
import { Collapse, Divider, Grid, ImageList, ImageListItem, Paper, Stack } from "@mui/material"

import { updateHTML, useToggle } from "../hooks"
import { GridType, ViewType } from "../types"

function GridTile({ isFolder, tile, backgroundColor }: GridType) {
  const [isOpen, toggleOpen] = useToggle(false)

  return isFolder ? (
    <Grid position={"relative"} item>
      <Paper
        sx={{
          borderRadius: 5,
          padding: 2,
          backgroundColor: backgroundColor,
          cursor: "pointer",
        }}
        onClick={toggleOpen}
      >
        <Stack
          direction="column"
          divider={<Divider flexItem />}
          alignItems="center"
        >
          {typeof tile[0] === "string" ? updateHTML(tile[0], "|", "<br>") : tile[0]}
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
            <div key={index}>{typeof item === "string" ? updateHTML(item, "|", "<br>") : item}</div>
          )}
        </Stack>
      </Paper>
    </Grid>
  )
}

export default function GridView({ database, backgroundColors = [] }: ViewType) {
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