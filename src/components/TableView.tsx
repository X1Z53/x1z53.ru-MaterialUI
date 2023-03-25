import React, { useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Collapse, Paper, Box } from "@mui/material"
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material"

import { checkType, updateHTML } from "../hooks"
import { DataView } from "../types"

function generateTableRow(isFolder: boolean, headersCount: number, row: any[], backgroundColor?: string): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  return isFolder ? (
    <>
      <TableRow
        sx={{ backgroundColor: backgroundColor, cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <TableCell
          sx={{ borderBottom: "0" }}
          align="center"
          key={0}
          colSpan={headersCount - 1}
        >
          {row[0]}
        </TableCell>
        <TableCell sx={{ borderBottom: "0" }} align="center">
          <Typography>
            {isOpen ? <ExpandLessRounded /> : <ExpandMoreRounded />}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={headersCount}
        >
          <Collapse in={isOpen} timeout="auto">
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableBody>
                  {row[row.length - 1].map((row: []) => (
                    generateTableRow(headersCount - 1 >= row.length, headersCount, row, backgroundColor)
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  ) : (
    <TableRow sx={{ backgroundColor: backgroundColor || "" }}>
      {row.map((item: string, itemIndex: number) => (
        <TableCell align="center" key={itemIndex}>
          {checkType(item, "string", updateHTML, [item, "|", "<br>"])}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default function TableView({ headers=[], database, backgroundColors = [] }: DataView): JSX.Element {
  return (
    <Paper sx={{ borderRadius: "20px" }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map((item) => (
                <TableCell key={item}>
                  <Typography variant="h6" alignContent="center">
                    {item}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {database.map((row, index) =>
              generateTableRow(headers.length - 1 >= row.length, headers.length, row, backgroundColors[index])
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
