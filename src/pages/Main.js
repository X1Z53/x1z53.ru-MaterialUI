import React from "react"
import { Card, CardContent, Typography, CardActionArea, Grid } from "@mui/material"
import parse from "html-react-parser"
import { formatString } from "../backend/functions"

const database = require("../databases/sections.json")

export default function Main() {
  return (
    <Grid container spacing={3}>
      {Object.keys(database).map((section) => (
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea href={"/" + section}>
              <CardContent>
                <Typography gutterBottom variant="h4">
                  {formatString(section, database[section]["charsToUpCase"])}
                </Typography>
                {parse(database[section]["description"].replaceAll("|", "<br>"))}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
