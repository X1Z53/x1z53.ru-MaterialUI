import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material"
import { Box, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow as DefaultTableRow, Typography } from "@mui/material"
import { updateHTML, useToggle } from "../hooks"
import { ViewType, TableType } from "../types"


const TableRow = ({ isFolder, headersCount, row, backgroundColor }: TableType) => {
  const [isOpen, toggleOpen] = useToggle(false)

  return isFolder ? (
    <>
      <DefaultTableRow
        sx={{ backgroundColor: backgroundColor, cursor: "pointer" }}
        onClick={toggleOpen}
      >
        <TableCell
          sx={{ borderBottom: "0" }}
          align="center"
          key={0}
          colSpan={headersCount - 1}
        >
          <Typography>{row[0]}</Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "0" }} align="center">
          <Typography>
            {isOpen ? <ExpandLessRounded /> : <ExpandMoreRounded />}
          </Typography>
        </TableCell>
      </DefaultTableRow>
      <DefaultTableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={headersCount}
        >
          <Collapse in={isOpen} timeout="auto">
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableBody>
                  {row[row.length - 1].map((row: any, index: number) =>
                    <TableRow
                      key={index}
                      headersCount={headersCount}
                      isFolder={headersCount - 1 >= row.length}
                      row={row}
                      backgroundColor={backgroundColor}
                    />
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </DefaultTableRow>
    </>
  ) : (
    <DefaultTableRow sx={{ backgroundColor: backgroundColor || "" }}>
      {row.map((item: string, index: number) => (
        <TableCell align="center" key={index}>
          {typeof item === "string" ? updateHTML(item, "|", "<br>") : item}
        </TableCell>
      ))}
    </DefaultTableRow>
  )
}

export default function TableView({ headers = [], database, backgroundColors = [] }: ViewType) {
  return (
    <Paper sx={{ borderRadius: "20px" }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <DefaultTableRow>
              {headers.map((item: any) => (
                <TableCell key={item}>
                  <Typography variant="h6" alignContent="center">
                    {item}
                  </Typography>
                </TableCell>
              ))}
            </DefaultTableRow>
          </TableHead>
          <TableBody>
            {database.map((row: any, index) =>
              <TableRow
                key={index}
                headersCount={headers.length}
                isFolder={headers.length - 1 >= row.length}
                row={row}
                backgroundColor={backgroundColors[index]}
              />

            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
