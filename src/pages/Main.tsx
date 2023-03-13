import { Card, CardContent, Typography, CardActionArea, Grid } from "@mui/material"
import parse from "html-react-parser"
import { NavLink } from "react-router-dom"

import { formatString, getDatabase } from "../functions"

type Props = {
  section: string,
  charsToUpCase: string,
  description: string,
}

const database = getDatabase("sections")

const SectionCard = ({ section, charsToUpCase, description }: Props) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <CardActionArea>
        <NavLink to={"/" + section} style={{ textDecoration: "none" }}>
          <CardContent>
            <Typography gutterBottom variant="h4">
              {formatString(section, charsToUpCase)}
            </Typography>
            <Typography variant="body1">
              {parse(description.replaceAll("|", "<br>"))}
            </Typography>
          </CardContent>
        </NavLink>
      </CardActionArea>
    </Card>
  </Grid>
)

export default () => (
  <Grid container justifyContent="center" spacing={3}>
    {database
      .filter((section: any) => section.name !== "main")
      .map((section: any) =>
        <SectionCard
          key={section.name}
          section={section.name}
          charsToUpCase={section.chars_to_up_case}
          description={section.description}
        />
      )
    }
  </Grid>
)
