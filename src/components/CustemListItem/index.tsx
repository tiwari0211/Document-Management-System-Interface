import React from "react";
import CustomIconButton from "../CustomIconButton";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import CustomPopover from "../CustomPopover";
import { ObjectValues } from "../../interfaces";
import globalColors from "../../themes/globalColors";
interface customListprops {
  avatar?: string;
  icon?: any;
  primary: string;
  secondary?: string;
  action?: { icon?: any; text?: string; onClick?(): void; popperContent?: any };
  onClick?(e?: any): void;
  isSelected?: boolean;
  listItemIconsx?: ObjectValues;
  listItemTextsx?: ObjectValues;
  direction?: "reverse";
  selectedColor?: any;
  ListItemButtonsx?: any;
  keyId: any;
  sx?:ObjectValues;
  disabled?:boolean
}
export const CustomListItem = styled(ListItem)<any>(() => ({
  alignItems: "center",
  ".MuiListItemSecondaryAction-root": {
    position: "relative",
    top: "0",
    right: "0",
    transform: "none",
    marginLeft: "5px", color:"#636b74"
  } as any,
}));
function CustemListItem({
  primary,
  avatar,
  secondary,
  action,
  icon,
  onClick,
  isSelected,
  listItemIconsx,
  listItemTextsx,
  direction,
  selectedColor,
  ListItemButtonsx,
  keyId,sx,disabled
}: customListprops) {
  const text = (
    <ListItemText
      sx={{ ...{ m: "0", p: "0", "& .MuiTypography-root":{fontSize:"0.85rem"}  }, ...listItemTextsx ,
      color:isSelected?"#32383e":"#636b74"}}
      primary={primary ?? ``}
      secondary={
        secondary ? (
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color={globalColors.primary.grey}
            >
              {secondary}
            </Typography>
          </React.Fragment>
        ) : undefined
      }
    />
  );
  const iconContent = icon ? (
    <ListItemIcon
      sx={{
        ...{
          minWidth: 0,
          m: direction ? "0 0 0 10px" : "0 10px 0 0",
          justifyContent: "center",
          color:isSelected?"#32383e":"#636b74"
          // color: isSelected
          //   ? globalColors.primary.white
          //   : globalColors.primary.primary,
        },
        ...listItemIconsx,
      }}
    >
      {typeof icon === "function" ? icon() : icon}
    </ListItemIcon>
  ) : (
    avatar && (
      <ListItemAvatar sx={{ m: "0", p: "0" }}>
        <Avatar
          alt={secondary}
          // src={"s"}
          sx={{ border: `2px solid ${globalColors.primary.darkGrey}` }}
        >
          {secondary && secondary.charAt(0)}
        </Avatar>
      </ListItemAvatar>
    )
  );
  const secondaryAction = action ? (
    action.popperContent ? (
      <CustomPopover content={action.popperContent} />
    ) : (
      <CustomIconButton onClick={action.onClick} content={action.icon}sx={{color:isSelected?"#32383e":"#636b74"}} />
    )
  ) : (
    ""
  );
  //   <SvgPreview svg={action.icon ?? arrowBottom} />
  return onClick ? (
    <CustomListItem
      key={keyId}
      disabled={disabled??false}
      onClick={disabled?()=>{}:onClick}
      secondaryAction={secondaryAction}
      alignItems="flex-start"
      sx={{
        display: "block",
        background: isSelected
          ? selectedColor ?? globalColors.primary.primary
          : "",
        color:
          isSelected && !selectedColor
            ? globalColors.primary.white
            : globalColors.primary.primary,
        borderRadius: "7px",
        transition: "background-color 0.3s ease", // Optional: Add a transition for smoother effect
        "&:hover": isSelected||disabled
          ? { borderRadius: "7px" }
          : {
              // background: globalColors.primary.lightGrey, // Change the background color on hover
              color: globalColors.primary.primary,
              borderRadius: "7px", // Change the text color on hover
            },
        mb: "5px",
        p: "0",
        ...sx,
        PointerEvent:disabled?"none":"inherit"
      }}
    >
      <ListItemButton
        sx={
          direction
            ? {
                maxHeight: "40px",
                p: "8px 12px",
                borderRadius: "0 !important",
                background: "transparent !important",
                display: "flex",
                flexDirection: "row-reverse",
                ...ListItemButtonsx,
              }
            : {
                maxHeight: "40px",
                p: "10px",
                borderRadius: "0 !important",
                background: "transparent !important",
                ...ListItemButtonsx,
              }
        }
      >
        {iconContent}
        {text}
      </ListItemButton>
    </CustomListItem>
  ) : (
    <CustomListItem
      key={keyId}
      secondaryAction={secondaryAction}
      alignItems="flex-start"
      sx={{ m: "0", p: "0" }}
    >
      {iconContent}
      {text}
    </CustomListItem>
  );
}

export default CustemListItem;
