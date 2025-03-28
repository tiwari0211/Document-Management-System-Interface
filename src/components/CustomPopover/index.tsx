import {
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  
} from "@mui/material";
import React, { useEffect } from "react";
import CustomIconButton from "../CustomIconButton";
import { rowVerticalCenter } from "../../themes/GlobalStyles"
import { svgs } from "../../assets";
function CustomPopover({
  content,
  icon,
  mt,
}: {
  content: any;
  icon?: any;
  mt?: any;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
 
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== "bottom-end" || !prev);
    setPlacement("bottom-end");
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Close the popover if the click is outside the popover content
      if (anchorEl && !anchorEl.contains(event.target as Node)) {
        handleClose();
      }
    };

    // Attach the event listener to the document body
    document.body.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);
  return (
    <>
      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 9999999, mt: mt ? mt : "28px !important" ,boxShadow:"0px 0px 4px 0px rgba(0, 0, 0, 0.25)"}}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ p: "5px" }}>{content ?? ""}</Paper>
          </Fade>
        )}
      </Popper>
      <CustomIconButton onClick={handleClick} content={icon ?? svgs.arrowBottom} noHover={true}
      sx={{height:"100%",...rowVerticalCenter}}

      />
    </>
  );
}

export default CustomPopover;
