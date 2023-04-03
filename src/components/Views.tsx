import { GridView as GridIcon, TableView as TableIcon } from "@mui/icons-material"
import { TabContext, TabPanel } from "@mui/lab"
import { Box, Button, FormHelperText, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material"
import { useState } from "react"
import { ViewType } from "../types"
import { GridView, TableView } from "./"



export default function Views({ headers, database, backgroundColors = [], caption = "Источник", url = "", searchPlaces = [0], titleColumn = 1, haveFolders = false, folderColumn = -1 }: ViewType) {
  const [value, setValue] = useState("table")
  const [search, setSearch] = useState("")
  const [searchPlace, setSearchPlace] = useState(searchPlaces[0])

  const transformedDatabase: Record<string | number, any> = {}
  const folders: string[] = []
  const configuredDatabase: any[] = haveFolders ? [] : database
  if (haveFolders) {
    for (const rowIndex in database) {
      const folder = database[rowIndex].at(-1)
      const row = database[rowIndex].slice(0, -1)
      if (folder) {
        if (folders.indexOf(folder) + 1) {
          transformedDatabase[folder].push(row)
        } else {
          folders.push(folder)
          transformedDatabase[folder] = [row]
        }
      } else transformedDatabase[row[titleColumn]] = row
    }

    for (const itemKey in transformedDatabase) {
      if (folders.indexOf(itemKey) + 1) {
        configuredDatabase.push([itemKey, transformedDatabase[itemKey]])
      } else {
        configuredDatabase.push(transformedDatabase[itemKey])
      }
    }
  }

  return (
    <TabContext value={value}>
      <Toolbar variant="dense">
        <Stack flexGrow={1} direction="row" alignItems="center" justifyContent="space-between">
          <ToggleButtonGroup
            size="small"
            value={value}
            exclusive
            onChange={(_, newValue: string) => newValue && setValue(newValue)}
          >
            <ToggleButton value="table" sx={{ borderRadius: "10px" }}>
              <TableIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="grid" sx={{ borderRadius: "10px" }}>
              <GridIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
          <TextField
            autoFocus
            helperText={"Search"}
            FormHelperTextProps={{ sx: { textAlign: "center" } }}
            margin={"dense"}
            variant={"standard"}
            onChange={event => setSearch(event.target.value)}
          />
          <Box>
            <FormHelperText sx={{ textAlign: "center" }}>Search by</FormHelperText>
            <Select

              value={searchPlace}
              onChange={(event) => setSearchPlace(Number(event.target.value))}
              autoWidth
            >
              {headers?.map((header, index) => (
                searchPlaces.indexOf(index) + 1 &&
                <MenuItem key={index} value={index}>{header}</MenuItem>
              ))}
            </Select>
          </Box>
          {url ? <Button href={url} sx={{ borderRadius: "10px" }}>{caption}</Button> : <></>}
        </Stack>
      </Toolbar>
      <TabPanel value="table">
        <TableView
          headers={headers}
          database={
            search ? database.filter((row: any) =>
              row[searchPlace].toLowerCase().includes(search.toLowerCase())
            ) : configuredDatabase
          }
          folderColumn={folderColumn}
          backgroundColors={backgroundColors}
        />
      </TabPanel>
      <TabPanel value="grid">
        <GridView
          database={
            search ? database.filter((row: any) =>
              row[searchPlace].toLowerCase().includes(search.toLowerCase())
            ) : configuredDatabase
          }
          folderColumn={folderColumn}
          backgroundColors={backgroundColors}
        />
      </TabPanel>
    </TabContext >
  )
}



