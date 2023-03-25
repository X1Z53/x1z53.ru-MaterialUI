import React, { useState } from "react"
import { ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material"
import { TableView as TableIcon, GridView as GridIcon } from "@mui/icons-material"
import { TabContext, TabPanel } from "@mui/lab"

import { GridView, TableView } from "./"
import { DataView } from "../types"

export default function Views({ headers, database, backgroundColors = [] }: DataView) {
  const [value, setValue] = useState("1")

  return (
    <TabContext value={value}>
      <Toolbar variant="dense">
        <ToggleButtonGroup
          size="small"
          value={value}
          exclusive
          onChange={(_, newValue: string) => setValue(newValue)}
        >
          <ToggleButton value="1" sx={{ borderRadius: "10px" }}>
            <TableIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="2" sx={{ borderRadius: "10px" }}>
            <GridIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
      <TabPanel value="1">
        <TableView
          headers={headers}
          database={database}
          backgroundColors={backgroundColors}
        />
      </TabPanel>
      <TabPanel value="2">
        <GridView
          database={database}
          backgroundColors={backgroundColors}
        />
      </TabPanel>
    </TabContext>
  )
}
