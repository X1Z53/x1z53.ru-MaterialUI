import React, { useState } from "react"
import { ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material";
import { TableView, GridView } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";

import Table from './TableView'
import Grid from './GridView'

export default ({ headers, database, backgroundColors }) => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return <TabContext value={value}>
    <Toolbar variant="dense">
      <ToggleButtonGroup
        size="small"
        value={value}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="1" sx={{ borderRadius: "10px" }}><TableView fontSize="small" /></ToggleButton>
        <ToggleButton value="2" sx={{ borderRadius: "10px" }}><GridView fontSize="small" /></ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
    <TabPanel value="1"><Table headers={headers} rows={database} backgroundColors={backgroundColors} /></TabPanel>
    <TabPanel value="2"><Grid tiles={database} backgroundColors={backgroundColors} /></TabPanel>
  </TabContext>
}