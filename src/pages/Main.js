import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid
} from "@mui/material"
import { formatString } from "../functions"

import parse from "html-react-parser"

const database = require("../databases/sections.json")
const sections = Object.keys(database)
export default function Main() {
  return (
    <Grid sx={{ flexGrow: 1 }} justifyContent="center" container spacing={5}>
      {sections.map((section, index) => (
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardActionArea href={"/" + section}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
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
