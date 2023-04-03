import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"

import { formatString, getDatabase } from "../hooks"
import { SectionType } from "../types"

const database = getDatabase("sections")

const Section = ({ section, charsToUpCase, description }: SectionType ) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <CardActionArea>
        <NavLink to={"/" + section} style={{ textDecoration: "none" }}>
          <CardContent>
            <Typography gutterBottom variant="h4">
              {formatString(section, charsToUpCase)}
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
          </CardContent>
        </NavLink>
      </CardActionArea>
    </Card>
  </Grid>
)

export default function Main() {
  return (
    <Grid container justifyContent="center" spacing={3}>
      {database
        .filter((section) => section.name !== "main")
        .map((section) => <Section
          key={section.name}
          section={section.name}
          charsToUpCase={section.chars_to_up_case}
          description={section.description} />
        )}
    </Grid>
  )
}
