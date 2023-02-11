import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { styled } from "@mui/material/styles"
import parse from "html-react-parser"

const StyledTableCell = styled(TableCell)`
  text-align: center
  padding: 5px
`

export default function TableConstructor({ headers, rows, backgroundColors=[] }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((title) => (
              <StyledTableCell>
                <Typography variant="h6">{title}</Typography>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow sx={{ backgroundColor: backgroundColors[rows.indexOf(row)] }}>
              {row.map(
                item => (typeof item === "string") ?
                  parse(item.replaceAll('|', '<br />')) :
                  item
              ).map(item => <StyledTableCell align="center">{item}</StyledTableCell>)
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
