import { useState } from "react"
import { ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material"
import { TableView, GridView } from "@mui/icons-material"
import { TabContext, TabPanel } from "@mui/lab"

import Table from "./TableView"
import Grid from "./GridView"

type Props = {
  headers: string[],
  database: Object[],
  backgroundColors?: string[]
}

export default ({ headers, database, backgroundColors=[] }: Props) => {
  const [value, setValue] = useState("1")

  return (
    <TabContext value={value}>
      <Toolbar variant="dense">
        <ToggleButtonGroup
          size="small"
          value={value}
          exclusive
          onChange={(event: any, newValue: string) => setValue(newValue)}
        >
          <ToggleButton value="1" sx={{ borderRadius: "10px" }}>
            <TableView fontSize="small" />
          </ToggleButton>
          <ToggleButton value="2" sx={{ borderRadius: "10px" }}>
            <GridView fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
      <TabPanel value="1">
        <Table
          headers={headers}
          rows={database}
          backgroundColors={backgroundColors}
        />
      </TabPanel>
      <TabPanel value="2">
        <Grid tiles={database} backgroundColors={backgroundColors} />
      </TabPanel>
    </TabContext>
  )
}
