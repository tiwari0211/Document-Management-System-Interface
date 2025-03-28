import { Box, Typography } from "@mui/material";

export const subHeading = ({
  text,
  size,
  weight,
  sx,
  parentSx,
  onClick,
  className,
}: any) => (
  <Box
    sx={parentSx ?? {}}
    onClick={onClick ? onClick : () => {}}
    className={className ? className : ""}
  >
    <Typography
      fontStyle={"normal"}
      fontWeight={weight ?? 500}
      fontSize={size ?? "0.9rem"}
      color={"currentColor"}
      sx={sx ?? {}}
    >
      {text}
    </Typography>
  </Box>
);
