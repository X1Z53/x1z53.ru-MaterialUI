import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import { formatString } from "../backend/functions";
import database from "../databases/sections.json";

const sections = Object.keys(database);

export default () =>
  <List>
    {sections.map((section) => {
      const path = `/${section === "main" ? "" : section}`;
      const { description, charsToUpCase } = database[section];
      return (
        <Link to={path} key={section} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton title={description} style={{ padding: "3px 10px" }}>
              <ListItemText>{formatString(section, charsToUpCase)}</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
      );
    })}
  </List>
