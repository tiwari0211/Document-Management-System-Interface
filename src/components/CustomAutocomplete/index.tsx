import * as React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CustomTextField, { CustomTextFieldBorder } from "../CustomTextfield";
import { Chip } from "@mui/material";
import { StopScroll } from "../../constants/Regex";
import { ObjectValues } from "../../interfaces";
import globalColors from "../../themes/globalColors";
const filter = createFilterOptions<ObjectValues>();

export interface inputProp {
  defaultValue?: { value?: string; id?: any };
  label: string;
  listFilter?(data: any): any;
  max?: number;
  min?: number;
  minDate?: any;
  maxDate?: any;
  doRefresh?(): void;
  button?: { onClick: any; label: any };
  checkMax?(data: any,ar?:any): any;
  grid?: any;
  fullWidth?: true;
  pinned?: true;
  api?: string;
  not_send_id?: true;
  placeholder?: string;
  only_number?: true;
  multiple?: true;
  value: any;
  dontsendid?: any;
  border?: any;
  autoFocus?: boolean;
  //  string|ObjectValues;
  error: boolean;
  helperText: string;
  onChange?: any;
  onUpdate?: any;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  type?: "password";
  fieldType?:
    | "text"
    | "select"
    | "cktextEditor"
    | "autocomplete"
    | "date"
    | "extra"
    | "image"
    | "checkbox"
    | "radio";
  multiline?: number;
  list?: ObjectValues[];
  disabled?: boolean;
  not_required?: true;
  listLabel?: string;
  freeSolo?: {
    dialog?: boolean;
    content?: ObjectValues;
    addText?: string;
  };
  dataType?: "number" | "option"|"text";
  collection_name?: string;
  validate?(data: any, data1?: any): any;
  showhelperText?: any;
  newValueCheck?: any;
  updateError?(data: any): void;
}
export default function CustomAutocomplete(inp: inputProp) {
  const {
    list,
    listLabel,
    freeSolo,
    helperText,
    error,
    onChange,
    disabled,
    value,
    dataType,
    only_number,
    collection_name,
    endAdornment,
    border,
    placeholder,
    showhelperText,
    autoFocus,
    newValueCheck,
    updateError,
  } = inp;
  const label = listLabel ?? "";

  const addToDoc = async (newValue: any) => {
    if (freeSolo && newValue && newValue.inputValue && collection_name) {
      if (
        (newValueCheck &&
          newValueCheck(newValue.inputValue).success === true) ||
        !newValueCheck
      ) {
        // const submitData: any = {
        //   [label]:
        //     dataType === "number"
        //       ? Number(newValue.inputValue)
        //       : newValue.inputValue,
        // };
        // const config: requestObject = {
        //   method: "POST",
        //   payload: submitData,
        //   api: collection_name,
        // };
        // const response: any = await apiRequest(config);
        // if(doRefresh){

        //   const response: any = await doRefresh();
        //    if (response && onUpdate) {
        //     console.log(response,"response")
        //     await onUpdate({...submitData,id:response.data});
        //   }
        // }  else{
        // if (response && onUpdate) {
        //   if (doRefresh) {
        //     await doRefresh();
        //   }
        //   await onUpdate(response);
        // }
      } else {
        if (
          newValueCheck &&
          newValueCheck(newValue.inputValue).success === false &&
          updateError
        ) {
          updateError(newValueCheck(newValue.inputValue).msg ?? "");
        }
      }
    }
    // }
  };
  const tfProps = (params: any) => {
    return {
      type: dataType === "number" ? "number" : "text",
      onKeyDown: (evt: any) => {
        if (only_number === true) {
          evt.key === "." && evt.preventDefault();
        }
        if (dataType === "number") {
          evt.key === "e" && evt.preventDefault();

          evt.key === "E" && evt.preventDefault();
          evt.key === "-" && evt.preventDefault();
          evt.keyCode === 38 && evt.preventDefault();
          evt.keyCode === 40 && evt.preventDefault();
        }
      },
      onFocus: dataType === "number" ? StopScroll : () => {},
      ...params,
      helperText: helperText,
      error: error,
      disabled: disabled ?? false,
      InputProps: endAdornment
        ? {
            ...params.InputProps,
            endAdornment: endAdornment,
          }
        : { ...params.InputProps },
    };
  };
  React.useEffect(() => {
    if (autoFocus) {
      const textField = document.getElementById(inp.label);
      if (textField) {
        textField.focus(); // Manually focus the TextField
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (autoFocus) {
      const textField = document.getElementById(inp.label);
      if (textField) {
        textField.focus(); // Manually focus the TextField
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus]);
  return (
    <>
      <Autocomplete
        value={value ?? null}
        disabled={disabled ?? false}
        onChange={(_event, newValue: any) => {
          if (onChange) {
            addToDoc(newValue);
            if (
              freeSolo &&
              newValue &&
              newValue.inputValue &&
              collection_name &&
              newValueCheck &&
              newValueCheck(newValue.inputValue).success === false &&
              updateError
            ) {
            } else {
              onChange(
                newValue && newValue.inputValue
                  ? {
                      [label]: newValue.inputValue,
                    }
                  : newValue
              );
            }
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option[label]
          );
          if (inputValue !== "" && !isExisting && freeSolo) {
            // if(freeSolo.dialog){
            //   setDialog({open:true,value:inputValue})
            // }else{
            filtered.push({
              inputValue,
              [label]: `Add ${inputValue} ${freeSolo.addText ?? ""}`,
            });
            // }
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id={inp.label}
        options={list ?? []}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option[label] ? option[label].toString() : "";
        }}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderOption={(props, option) => (
          <li {...props} style={{ textTransform: "capitalize" }}>
            {option[label]}
          </li>
        )}
        sx={{
          width: "100%",
          padding: "0",
          "& .MuiInputBase-root": { padding: "6px 12px !important" },
          "& .MuiOutlinedInput-input": {
            padding: "0 !important",
          },

          "& .MuiFormHelperText-root": showhelperText
            ? {
                color: `${globalColors.primary.grey} !important`,
                // / sets the color of the helper text to blue
                opacity: `1 !important`,
                background: "transparent",
              }
            : {
                color: globalColors.primary.white, // sets the color of the helper text to blue
                opacity: 0,
                background: "transparent",
              },
          "& .MuiFormHelperText-root.Mui-disabled": showhelperText
            ? {
                color: `${globalColors.primary.grey} !important`,
                opacity: `1 !important`,
                background: "transparent",
              }
            : {},
          "& .MuiFormHelperText-root.Mui-error": {
            color: `#d32f2f !important`,
            opacity: `1 !important`,
          },
        }}
        freeSolo={freeSolo ? true : false}
        renderInput={(params) =>
          border ? (
            <CustomTextFieldBorder
              {...tfProps(params)}
              placeholder={placeholder ?? ""}
            />
          ) : (
            <CustomTextField {...tfProps(params)} />
          )
        }
      />
    </>
  );
}
