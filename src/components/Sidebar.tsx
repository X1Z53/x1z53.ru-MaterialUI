import React from "react"
import { Link } from "react-router-dom"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"

import { formatString, getDatabase } from "../hooks"

const database = getDatabase("sections")

export default function Sidebar(): JSX.Element {
  return <List>
    {database.map((section: {[key: string]: string}) => {
      const { name, description, chars_to_up_case } = section
      const path = `/${name === "main" ? "" : name}`

      return <Link to={path} key={name} style={{ textDecoration: "none" }}>
        <ListItem disablePadding>
          <ListItemButton title={description} style={{ padding: "3px 10px" }}>
            <ListItemText>
              {formatString(name, chars_to_up_case)}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    })}
  </List>
}
