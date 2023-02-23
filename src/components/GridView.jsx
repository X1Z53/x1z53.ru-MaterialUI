import React from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import parse from "html-react-parser"

const GridTile = ({ tile, tileId, backgroundColor }) =>
  <Grid item xs={12} sm={6} md={3} key={tileId}>
    <Paper sx={{ borderRadius: 5, padding: 2, backgroundColor: { backgroundColor } }}>
      {tile.map((item) => (<>
        <Typography>
          {typeof item === "string" ? parse(item.replace(/\|/g, "<br />")) : item}
        </Typography>
        <Divider />
      </>
      ))}
    </Paper>
  </Grid>


export default ({ tiles, backgroundColors = [] }) =>
  <Grid container alignItems="center" spacing={2}>
    {tiles.map((tile, index) => (
      <GridTile tile={tile} tileId={index} backgroundColor={backgroundColors[index]} />
    ))}
  </Grid>
