
import CustomCard from "../../../components/CustomCard";
import CustomIconButton from "../../../components/CustomIconButton";
import { Box, Grid, Stack } from "@mui/material";
import { styles } from "../../../themes/GlobalStyles";
import moment from "moment";
import globalColors from "../../../themes/globalColors";
import { User } from "../../../redux/user/userSlice";
import { svgs } from "../../../assets";

function Userslist({
  list,
  onUpdate,
}: {
  list: User[];
  onUpdate(row: User): void;
}) {

  return (
    <Stack height="100%" width="100%" sx={{ overflowY: "auto" }}>
      <Grid container spacing={2} m="12px" width="calc(100% - 24px)">
        {list.map((tr) => {
          const { number, full_name,status } = tr;
          return (
            <Grid
              item
              xs={12} // Full width on extra small screens
              sm={6} // 2 cards per row on small screens
              md={4} // 3 cards per row on medium screens
              lg={3} // 4 cards per row on large screens
              key={number}
            >
              <CustomCard
                sx={{
                  width: "calc(100% - 20px)",
                  p: "10px",
                }} // Ensure card fills available space
                content={
                  <Box sx={{ gap: "10px", ...styles.displayColumn }}>
                    <Box sx={{ width: "100%", ...styles.rowSB }}>
                      <Box
                        sx={{
                          ...styles.textEllips,
                          width: "calc(100% - 115.23px)",
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          mr:"10px"
                        }}
                      >
                        {full_name}
                      </Box>
                      <Box sx={{ gap: "5px", ...styles.rowHorizontalCenter }}>
                        {status && (
                          <Box
                            sx={{
                              ...styles.rowVerticalCenter,
                            }}
                          >
                            <Box
                              sx={{
                                textTransform: "capitalize",
                                bgcolor:
                                  globalColors.colorCombinations[status].bg,
                                color:
                                  globalColors.colorCombinations[status].color,
                                p: "5px",
                                borderRadius: "7px",
                                fontWeight: "bold",
                              }}
                            >
                              {status ?? ""}
                            </Box>
                          </Box>
                        )}
                        {
                          <CustomIconButton
                            content={svgs.edit}
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdate(tr);
                            }}
                          />
                        }
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        color: globalColors.primary.normalText,
                      }}
                    >
                      {`Number : ${number ?? ""}`}
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        fontSize: "0.8rem",
                        color: globalColors.primary.grey,
                      }}
                    >
                      {`Created on ${moment("03/28/2025").format("DD MMM YYYY")}`}
                    </Box>
                  </Box>
                }
               
              />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default Userslist;
