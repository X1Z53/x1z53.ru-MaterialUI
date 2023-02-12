import React from "react"
import { Card, CardContent, Typography, CardActionArea, Grid } from "@mui/material"
import parse from "html-react-parser"
import { formatString } from "../backend/functions"
import { NavLink } from "react-router-dom"

const database = require("../databases/sections.json")

export default function Main() {
  return (
    <Grid container spacing={3}>
      {Object.keys(database).map((section) => (section === "main" ? <></> : 
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea>
              <NavLink to={"/" + section} style={{ textDecoration: 'none' }}>
                <CardContent>
                  <Typography gutterBottom variant="h4">
                    {formatString(section, database[section]["charsToUpCase"])}
                  </Typography>
                  {parse(database[section]["description"].replaceAll("|", "<br>"))}
                </CardContent>
              </NavLink>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
