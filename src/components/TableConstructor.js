import React, { useState } from "react"
import {
  Collapse,
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

function Row(props) {
  let { row, headersCount, backgroundColors, withIcons, rowIndex } = props
  backgroundColors = backgroundColors === undefined ? [] : backgroundColors
  row = row.map((item) => {
    if (typeof item === "string") {
      item = parse(item.replaceAll('|', '<br />'))
    }
    return item
  })
  const isFolder = row.length < headersCount - 1
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ backgroundColor: backgroundColors[rowIndex] }}>
        {!isFolder ? (
          row.map((item) => (<StyledTableCell align="center">{item}</StyledTableCell>))
        ) : (
          <StyledTableCell colSpan={headersCount - 2}>{row[0]}</StyledTableCell>
        )}
      </TableRow>
      {!isFolder ? (<></>) : (
        <TableRow>
          <StyledTableCell sx={{ height: 0, paddingBottom: 0, paddingTop: 0, border: 0 }} colSpan={headersCount}>
            <Collapse in={open} unmountOnExit>
              <Table>
                {row[1].map((item) => (
                  <Row row={item} headersCount={headersCount} />
                ))}
              </Table>
            </Collapse>
          </StyledTableCell>
        </TableRow>
      )}
    </>
  )
}

export default function TableConstructor(props) {
  let { headers, rows, backgroundColors } = props
  const withIcons = headers.indexOf("Icon") !== -1

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
            <Row
              row={row}
              headersCount={headers.length}
              withIcons={withIcons}
              backgroundColors={backgroundColors}
              rowIndex={rows.indexOf(row)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
