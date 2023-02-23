import React, { useState } from "react"
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Typography, Collapse, Paper, Box
} from "@mui/material"
import { ExpandMoreRounded, ExpandLessRounded } from '@mui/icons-material'
import parse from "html-react-parser"

const StyledTableRows = ({ isFolder, headersCount, row, rowId, backgroundColor }) => {
  const [isOpen, setIsOpen] = useState(false)

  return isFolder ? (
    <>
      <TableRow key={rowId} sx={{ backgroundColor: backgroundColor || "", cursor: "pointer" }} onClick={() => setIsOpen(!isOpen)}>
        <TableCell sx={{ borderBottom: "0" }} align="center" key={0} colSpan={headersCount - 1}>
          <Typography>
            {typeof row[0] === "string" ? parse(row[0].replace(/\|/g, "<br />")) : row[0]}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "0" }} align="center">
          <Typography>
            {isOpen ? <ExpandLessRounded /> : <ExpandMoreRounded />}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={headersCount}>
          <Collapse in={isOpen} timeout="auto">
            <Box sx={{ margin: 1 }}>
              <Table>
                {row[row.length - 1].map((row, index) => (
                  <StyledTableRows
                    isFolder={headersCount - 1 >= row.length}
                    headersCount={headersCount}
                    row={row}
                    key={rowId + "_" + index}
                    backgroundColor={backgroundColor}
                  />
                ))}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  ) : (
    <TableRow key={rowId} sx={{ backgroundColor: backgroundColor || "" }}>
      {row.map((item, itemIndex) => (
        <TableCell align="center" key={itemIndex}>
          <Typography>
            {typeof item === "string" ? parse(item.replace(/\|/g, "<br />")) : item}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  )
}

export default ({ headers, rows, backgroundColors = [] }) =>
  <Paper sx={{ borderRadius: "20px", overflow: "hidden" }} >
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((item) => (
              <TableCell key={item}>
                <Typography variant="h6" alignContent="center">{item}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRows
              isFolder={headers.length - 1 >= row.length}
              headersCount={headers.length}
              row={row}
              key={index}
              backgroundColor={backgroundColors[index]}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
