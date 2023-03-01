import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
} from "@mui/material";
import parse from "html-react-parser";
import { NavLink } from "react-router-dom";

import { formatString } from "../backend/functions";

const database = require("../databases/sections.json");

const SectionCard = ({ section, charsToUpCase, description }) => (
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
);

export default () => (
  <Grid container justifyContent="center" spacing={3}>
    {Object.keys(database)
      .filter((section) => section !== "main")
      .map((section) => (
        <SectionCard
          key={section}
          section={section}
          charsToUpCase={database[section]["charsToUpCase"]}
          description={database[section]["description"]}
        />
      ))}
  </Grid>
);
