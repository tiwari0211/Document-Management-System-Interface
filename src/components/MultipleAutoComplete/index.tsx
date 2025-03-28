
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CustomTextField from "../CustomTextfield";
import { Checkbox, Chip } from "@mui/material";
import { inputProp } from "../CustomAutocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ObjectValues } from "../../interfaces";
import globalColors from "../../themes/globalColors";
const filter = createFilterOptions<ObjectValues>();
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultipleAutoComplte({
  list,
  listLabel,
  freeSolo,
  helperText,
  error,
  onChange,
  disabled,
  value,
}: inputProp) {
  // const [newVal, setnewval] = React.useState<any>();
  const newValue =
    value?.length > 0
      ? value.find((ss: { inputValue: any }) => ss && ss.inputValue)
      : null;
  // React.useEffect(()=>{
  //   if(newValue&&list&&list.length>0&&newValue!==null&&value?.length>0){
  //     const newObj=list.find((item)=>item[listLabel??"name"]===newValue.inputValue)
  //   if(onChange){
  //     const allVal=value.filter((ss: { inputValue: any; })=>!ss.inputValue)
  //     allVal.push(newObj)
  //     onChange(allVal)
  //   }
  //   }
  // },[list])

  return (
    <>
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        disableCloseOnSelect
        disabled={disabled ?? false}
        value={
          value
            ? value?.length > 0 && newValue === null
              ? value
              : value.filter((item: { inputValue: any }) => !item.inputValue)
            : []
        }
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option[listLabel ?? ""]
          );
          if (inputValue !== "" && !isExisting && freeSolo) {
            // if(freeSolo.dialog){
            //   setDialog({open:true,value:inputValue})
            // }else{
            filtered.push({
              inputValue,
              [listLabel ?? ""]: `Add ${inputValue} ${freeSolo.addText ?? ""}`,
            });
            // }
          }

          return filtered;
        }}
        onChange={(_event, newValue: any) => {
          // const last = newValue[newValue.length - 1];
          if (onChange) {
            onChange(
              newValue.find((s: any) => s[listLabel ?? ""] === "All") && list
                ? [...list]
                : newValue
            );
          }
          // if (last && last.inputValue) {
          //   setTimeout(() => {
          //     setnewval(last.inputValue);
          //   });
          // }
        }}
        options={list ? [...list] : []}
        freeSolo={freeSolo ? true : false}
        renderTags={(value: any, getTagProps) => {
          return value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
             
              label={option[listLabel ?? ("" as any)]}
              {...getTagProps({ index })}
              key={`${index}-chip`}
            />
          ));
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option[listLabel ?? ""]}
          </li>
        )}
        getOptionLabel={(option: any) => {
          if (typeof option === "string") {
            return option;
          }
          return option[listLabel ?? ""];
        }}
        sx={{
          width: "100%",
          padding: "0",
          "& .MuiInputBase-root": { padding: "6px 12px" },
          "& .MuiOutlinedInput-input": {
            padding: "0 !important",
          },
          "& .MuiFormHelperText-root": {
            color: globalColors.primary.white, // sets the color of the helper text to blue
            opacity: 0,
            background: "transparent",
          },
        }}
        //   defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            helperText={helperText}
            error={error}
            disabled={disabled ?? false}
          />
        )}
      />
    </>
  );
}
