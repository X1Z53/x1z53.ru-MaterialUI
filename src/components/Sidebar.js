import React from "react"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { formatString } from "../backend/functions"
import { Link } from "react-router-dom"

const database = require("../databases/sections.json")
const sections = Object.keys(database)

export default function Sidebar() {
  return (
    <List>
      {sections.map((section) => (
        <Link to={"/" + (section === "main" ? "" : section)} style={{ textDecoration: 'none' }}>
          <ListItem key={section} disablePadding>
            <ListItemButton title={database[section]["description"]} style={{ padding: "3px 10px" }}>
              <ListItemText>
                {formatString(section, database[section]["charsToUpCase"])}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  )
}
