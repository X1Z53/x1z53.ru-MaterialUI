import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  // Collapse,
  Paper
} from "@mui/material";
import parse from "html-react-parser";

const StyledTableRow = ({ row, rowId, backgroundColor }) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const collapsibleContent = row[row.length - 1];

  return (
    <>
      <TableRow key={rowId} sx={{ backgroundColor: backgroundColor || "" }} /*onClick={() => setIsOpen(!isOpen)}*/>
        {row/*.slice(0, -1)*/.map((item, itemIndex) => (
          <TableCell align="center" key={itemIndex}>
            {typeof item === "string" ? parse(item.replace(/\|/g, "<br />")) : item}
          </TableCell>
        ))}
        {/* <TableCell align="center">
          {collapsibleContent && (
            <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
              {isOpen ? "Hide Details" : "Show Details"}
            </Typography>
          )}
        </TableCell> */}
      </TableRow>
      {/* {collapsibleContent && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={row.length}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Typography variant="body2">{collapsibleContent}</Typography>
            </Collapse>
          </TableCell>
        </TableRow>
      )} */}
    </>
  );
};

const TableConstructor = ({ headers, rows, backgroundColors = [] }) => (
  <TableContainer component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          {headers.map((title) => (
            <TableCell key={title}>
              <Typography variant="h6">{title}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <StyledTableRow
            row={row}
            key={index}
            backgroundColor={backgroundColors[index]}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);


export default TableConstructor;
