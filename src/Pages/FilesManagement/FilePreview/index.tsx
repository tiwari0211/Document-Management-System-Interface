import { Box, Dialog, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useContext } from "react";
import CustomIconButton from "../../../components/CustomIconButton";
import { MobileProvider } from "../../../providers/IsMobileProvider";
import globalColors from "../../../themes/globalColors";
import { displayColumn, rowHorizontalEnd } from "../../../themes/GlobalStyles";
import { formatTimestamp } from "../../../constants/Regex";

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FilePreview({ details, setDetails, onClose }: any) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setDetails((prev: any) => ({
      ...prev,
      url: null,
    }));
  };
  const isMobile: boolean | null = useContext(MobileProvider);
  const openPDF = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    details.url && (
      <Dialog
        fullScreen={true}
        sx={{
          m: "0",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          border: "none",
        }}
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            height: "100vh",
            bgcolor: globalColors.primary.white,
            ...displayColumn,
          }}
        >
          <Box
            sx={{
              width: "calc(100% - 10px)",
              ...rowHorizontalEnd,
              p: "5px",
              bgcolor: globalColors.primary.primary,
            }}
          >
            <CustomIconButton
              variant="contained"
              content={"Close"}
              onClick={handleClose}
              sx={{
                bgcolor: globalColors.primary.white,
                color: globalColors.primary.primary,
              }}
              onMouseDown={(e: { preventDefault: () => void }) => {
                e.preventDefault();
              }}
            />
          </Box>
          <Box
            height={"calc(100% - 56px)"}
            width="100%"
            sx={isMobile ? { overflowY: "auto" } : {}}
          >
            <Box
              m="15px 15px 0 15px"
              height={isMobile ? "auto" : "calc(100% - 15px)"}
              maxHeight={"calc(100% - 15px)"}
              width="calc(100% - 30px)"
              display={"flex"}
              flexDirection={isMobile ? "column" : "row"}
              // gridTemplateColumns="minMax(60%, 700px) auto"
            >
              <Box
                flex={isMobile ? "" : "8"}
                width={isMobile ? "100%" : "70%"}
                maxHeight="100%"
                minHeight="250px"
                maxWidth="750px"
                overflow={"hidden"}
              >
                {details.url.file &&
                details.url.file.type.startsWith("image") ? (
                  <img
                    src={details.url.url}
                    alt="Preview"
                    className="preview-container"
                  />
                ) : (
                  <iframe
                    src={details.url.url}
                    className="preview-container"
                    title="PDF Preview"
                  ></iframe>
                )}
              </Box>
              <Box
                minWidth={"calc(100% - 750px)"}
                width={isMobile ? "100%" : "30%"}
              >
                <Box
                  flex="8"
                  m={isMobile ? "10px 0 0 0" : "0 10px"}
                  sx={
                    isMobile
                      ? { ...displayColumn }
                      : { ...displayColumn, overflowY: "auto" }
                  }
                  justifyContent={"center"}
                  gap="10px"
                >
                  <Typography
                    color={globalColors.primary.black}
                    fontWeight={700}
                    fontSize={"1.1rem"}
                    pl={isMobile ? "0" : "10px"}
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {details.url.file.name}
                  </Typography>
                  <Typography
                    color={globalColors.primary.black}
                    fontWeight={400}
                    pl={isMobile ? "0" : "10px"}
                    sx={{
                      textTransform: "capitalize",
                      textAlign: "justify",
                      wordWrap: "break-word",
                    }}
                  >
                    {details.url.category}{" "}
                    {`(${formatTimestamp(details.url.date)})`}
                  </Typography>
                  <Typography
                    color={globalColors.primary.black}
                    fontWeight={400}
                    pl={isMobile ? "0" : "10px"}
                    sx={{
                      textTransform: "capitalize",
                      textAlign: "justify",
                      wordWrap: "break-word",
                    }}
                  >
                    {`${details.url.category === "Professional" ? details.url.department : details.url.name}`}
                  </Typography>
                  <Typography
                    color={globalColors.primary.black}
                    fontWeight={400}
                    pl={isMobile ? "0" : "10px"}
                    sx={{
                      textTransform: "capitalize",
                      textAlign: "justify",
                      wordWrap: "break-word",
                    }}
                  >
                    {details.url.remark}
                  </Typography>
                  <Box p="10px">
                    {" "}
                    {details.url.tags.map(({ label }: any) => {
                      return <Box>{label}</Box>;
                    })}
                  </Box>
                  <Box
                    width="calc(100% - 30px)"
                    p={isMobile ? "15px 0" : "15px"}
                    display="flex"
                    flexWrap="wrap"
                    gap="10px"
                  >
                    <CustomIconButton
                      variant="contained"
                      content={"Download"}
                      onClick={() => {
                        openPDF(details.url.url);
                      }}
                      sx={{
                        bgcolor: globalColors.primary.primary,
                        color: globalColors.primary.white,
                        borderRadius: "20px",
                        px: "10px",
                        minWidth: "150px",
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    )
  );
}

export default FilePreview;
