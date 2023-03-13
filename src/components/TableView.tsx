import React, { useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Collapse, Paper, Box } from "@mui/material"
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material"
import parse from "html-react-parser"

type Props = {
  headers: string[],
  rows: any[],
  backgroundColors?: string[]
}

type StyledTableRowsProps = {
  isFolder: boolean,
  headersCount: number,
  row: any,
  backgroundColor?: string
}

const StyledTableRows = ({ isFolder, headersCount, row, backgroundColor }: StyledTableRowsProps) => {
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
          {typeof row[0] === "string" ? (
            <Typography>{parse(row[0].replace(/\|/g, "<br />"))}</Typography>
          ) : (
            row[0]
          )}
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
                  {row[row.length - 1].map((row: any, index: number) => (
                    <StyledTableRows
                      isFolder={headersCount - 1 >= row.length}
                      headersCount={headersCount}
                      row={row}
                      key={index}
                      backgroundColor={backgroundColor}
                    />
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
      {row.map((item: any, itemIndex: number) => (
        <TableCell align="center" key={itemIndex}>
          {typeof item === "string" ? (
            <Typography>{parse(item.replace(/\|/g, "<br />"))}</Typography>
          ) : (
            item
          )}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default ({ headers, rows, backgroundColors = [] }: Props) => (
  <Paper sx={{ borderRadius: "20px", overflow: "hidden" }}>
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
)
