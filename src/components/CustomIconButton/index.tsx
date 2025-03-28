import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CircularBar from "../CircularBar";
export interface CustomIconButtonProps extends ButtonProps {
  content: any;
  loading?: boolean;
  keyId?: any;
  icon?: any;
  noHover?: true;
  tooltip?: any;
}
const textcss: any = {
  textTransform: "capitalize",
  fontWeight: 500,
  fontSize: "0.875rem !important",
  lineHeight: "normal",
};
const CustomIcon = styled(Button)(({ }) => ({
  minWidth: "0",
  // padding: "0",
  padding: "9px 10px",
  // "&:hover": {
  //   backgroundColor:"transparent"
  // },"&:focus": {
  //   backgroundColor:"transparent"
  // },
  ...textcss,
  // color: globalColors.primary.black,
}));
const CustomIconButtonTool = styled(IconButton)(() => ({
  minWidth: "0",
  // padding: "0",
  padding: "9px 10px",
  // "&:hover": {
  //   backgroundColor:"transparent"
  // },"&:focus": {
  //   backgroundColor:"transparent"
  // },
  ...textcss,
  // color: globalColors.primary.black,
}));
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fbfcfe",
    color: "#32383e !important",
    // maxWidth: 250,
    fontSize: "1rem",
    border: "1px solid #dadde9",
  },
}));

function CustomIconButton(props: CustomIconButtonProps) {
  const onclick: any =
    props.loading === true || props.disabled
      ? undefined
      : props.onClick ?? undefined;
  return props.noHover ? (
    <Box
      key={props.keyId ?? "cutsom-utton"}
      // {...{ variant: "text" }}
      // {...{...props,loading:undefined}}
      // disabled={props.loading === true ? true : props.disabled ?? undefined}
      className={props.className ?? ""}
      onClick={onclick}
      sx={{
        ...textcss,
        ...props.sx,
        gap: "5px",
        cursor: props.loading === true || props.disabled ? "auto" : "pointer",
        alignItems: "center",
        display: "flex",
      }}
    >
      {props.loading ? "" : props.icon && props.icon}

      {props.loading ? (
        <CircularBar
          sx={{ height: "25.2px !important", width: "25.2px !important" }}
        />
      ) : (
        props.content
      )}
    </Box>
  ) : props.tooltip ? (
    props.loading === true || props.disabled ? (
      <CustomIconButtonTool
        key={props.keyId ?? "cutsom-utton"}
        {...{ variant: "text" }}
        {...{ ...props, loading: undefined }}
        disabled={true}
        sx={{ ...props.sx, gap: "5px", borderRadius: "4px",textTransform:"capitalize" }}
      >
        {props.loading ? "" : props.icon && props.icon}

        {props.loading ? (
          <CircularBar
            sx={{ height: "25.2px !important", width: "25.2px !important" }}
          />
        ) : (
          props.content
        )}
      </CustomIconButtonTool>
    ) : (
      <HtmlTooltip title={props.tooltip}>
        <CustomIconButtonTool
          key={props.keyId ?? "cutsom-utton"}
          {...{ variant: "text" }}
          {...{ ...props, loading: undefined }}
          sx={{ ...props.sx, gap: "5px", borderRadius: "4px" }}
        >
          {props.loading ? "" : props.icon && props.icon}

          {props.loading ? (
            <CircularBar
              sx={{ height: "25.2px !important", width: "25.2px !important" }}
            />
          ) : (
            props.content
          )}
        </CustomIconButtonTool>
      </HtmlTooltip>
    )
  ) : (
    <CustomIcon
      key={props.keyId ?? "cutsom-utton"}
      {...{ variant: "text" }}
      {...{ ...props, loading: undefined }}
      disabled={props.loading === true ? true : props.disabled ?? undefined}
      sx={{ ...props.sx, gap: "5px" ,textTransform:"capitalize" }}
    >
      {props.loading ? "" : props.icon && props.icon}

      {props.loading ? (
        <CircularBar
          sx={{ height: "25.2px !important", width: "25.2px !important" }}
        />
      ) : (
        props.content
      )}
    </CustomIcon>
  );
}

export default CustomIconButton;
