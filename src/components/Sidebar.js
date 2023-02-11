import React from "react"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { formatString } from "../backend/functions"

const database = require("../databases/sections.json")
const sections = Object.keys(database)

export default function Sidebar() {
  return (
    <List>
      <ListItem key="main_page" disablePadding>
        <ListItemButton href="/">
          <ListItemText>Main Page</ListItemText>
        </ListItemButton>
      </ListItem>
      {sections.map((section) => (
        <ListItem key={section} disablePadding>
          <ListItemButton title={database[section]["description"]} href={"/" + section}>
            <ListItemText>
              {formatString(section, database[section]["charsToUpCase"])}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
