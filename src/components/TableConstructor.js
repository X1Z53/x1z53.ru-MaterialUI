import { useState } from "react";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Arrows icons
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

const StyledTableCell = styled(TableCell)`
  text-align: center;
  padding: 5px;
`;

function Row(props) {
  const { row, headersCount, withIcons, rowIndex } = props;
  let { backgroundColors } = props;
  backgroundColors = backgroundColors === undefined ? [] : backgroundColors;
  const isFolder = row.length < headersCount - 1;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={(theme) => ({ backgroundColor: backgroundColors[rowIndex] })}
      >
        {!isFolder ? (
          row.map((item) => (
            <StyledTableCell align="center">{item}</StyledTableCell>
          ))
        ) : (
          <StyledTableCell colSpan={headersCount - 2}>{row[0]}</StyledTableCell>
        )}
      </TableRow>
      {!isFolder ? (
        <></>
      ) : (
        <TableRow>
          <StyledTableCell
            sx={{ height: 0, paddingBottom: 0, paddingTop: 0, border: 0 }}
            colSpan={headersCount}
          >
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
  );
}

export default function TableConstructor(props) {
  const { headers, rows, backgroundColors } = props;
  if (!rows) {
    const rows = [];
  }
  const withIcons = headers.indexOf("Icon") !== -1;

  return (
    <TableContainer>
      <Table sx={{ minWidth: "1000px" }}>
        <TableHead key="tableHead">
          <TableRow key="header">
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
  );
}
