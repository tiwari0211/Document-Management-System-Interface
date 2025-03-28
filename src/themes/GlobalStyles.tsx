export const display = { display: "flex" };
export const displayRow = { ...display, flexDirection: "row" };
export const displayColumn = { ...display, flexDirection: "column" };
export const justifC = { justifyContent: "center" };
export const justifSB = { justifyContent: "space-between" };
export const justifEnd = { justifyContent: "flex-end" };
export const alignEnd = { alignItems: "flex-end" };
export const alignS = { alignItems: "flex-start" };
export const alignC = { alignItems: "center" };
export const rowHorizontalCenter = { ...displayRow, ...justifC };
export const rowHorizontalEnd = { ...displayRow, ...justifEnd };
export const rowVerticalCenter = { ...displayRow, ...alignC };
export const rowCenter = { ...displayRow, ...justifC, ...alignC };
export const textEllips = {
  whiteSpace: "nowrap",
  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
};
export const rowSB = { ...displayRow, ...justifSB, ...alignC };
export const columnHorizontalCenter = { ...displayColumn, ...justifC };
export const columnVerticalCenter = { ...displayColumn, ...alignC };
export const columnCenter = { ...displayColumn, ...justifC, ...alignC };

export const columnEnd = { ...displayColumn, ...justifEnd, ...alignC };
export const columnSB = { ...displayColumn, ...justifSB, ...alignC };
export const fullWidth = { height: "100%", width: "100%" };
export const wrapText = {
  flexWrap: "wrap",
  wordBreak: "break-all",
};
export const styles = {
  textEllips,
  fullWidth,
  wrapText,
  columnSB,
  columnEnd,
  columnCenter,
  columnHorizontalCenter,
  columnVerticalCenter,
  rowSB,
  display,
  displayRow,
  displayColumn,
  justifC,
  justifSB,
  justifEnd,
  alignEnd,
  alignS,
  alignC,
  rowHorizontalCenter,
  rowHorizontalEnd,
  rowVerticalCenter,
  rowCenter,
};
