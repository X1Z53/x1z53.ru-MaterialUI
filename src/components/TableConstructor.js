import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled
} from "@mui/material";
import parse from "html-react-parser";

const StyledTableCell = styled(TableCell)({
  textAlign: "center",
  padding: "5px",
});

const TableConstructor = ({ headers, rows, backgroundColors = [] }) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((title) => (
            <StyledTableCell key={title}>
              <Typography variant="h6">{title}</Typography>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index} sx={{ backgroundColor: backgroundColors[index] || "" }}>
            {row.map((item, itemIndex) => (
              <StyledTableCell align="center" key={itemIndex}>
                {typeof item === "string" ? parse(item.replace(/\|/g, "<br />")) : item}
              </StyledTableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TableConstructor;
