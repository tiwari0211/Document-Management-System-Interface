import { useContext, useEffect, useState } from "react";
import CustomTextField from "../CustomTextfield";
import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepConnector,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { StopScroll, isPhoneNumberValid } from "../../constants/Regex";
import { subHeading } from "../CustomTexts";
import {
  rowSB,
  displayRow,
  rowHorizontalEnd,
  alignC,
} from "../../themes/GlobalStyles";
import CustomContainedButton from "../CustomContainedButton";
import { MobileProvider } from "../../providers/IsMobileProvider";
import CustomIconButton from "../CustomIconButton";

import Checkbox from "@mui/material/Checkbox";
import styled from "@emotion/styled";
import globalColors from "../../themes/globalColors";
import { inputProp, ObjectValues } from "../../interfaces";
import CustomDatePicker from "../CustomDatePicker";
import MultipleAutoComplete from "../MultipleAutoComplete";
import CustomAutocomplete from "../CustomAutocomplete";
import { useSelector } from "react-redux";

export const CssStepperVertical: any = styled(Stepper)(
  () =>
    ({
      display: "flex",
      padding: "0",
      backgroundColor: "transparent",
      width: "100%",
      "& .MuiStepContent-root": {
        borderLeft: `1px dashed ${globalColors.primary.primary} !important`,
      },
      "& .MuiStepLabel-label": {
        marginLeft: "10px !important",
        "& .MuiStepIcon-text": {
          fill: "white !important",
          color: "white !important",
        },
      },
      "& .MuiStepIcon-text": {
        fill: "white !important",
        color: "white !important",
      },
      "& .MuiStepConnector-vertical": {
        maxWidth: "1px !important",
        padding: "0px",
      },
      "& .MuiStepConnector-lineVertical": {
        maxWidth: "2.67px !important",
        minWidth: "2.67px !important",
        overflow: "hidden !important",
        marginLeft: "0 !important",
        marginRight: "0 !important",
        marginTop: "3px !important",
        minHeight: "1px !important",
        borderLeft: `1px dashed ${globalColors.primary.primary} !important`,
        borderRight: "none !important",
        borderTop: "none !important",
        borderBottom: "none !important",
        // padding: "0px",
      },
      "&.MuiStepper-horizontal": {
        alignItems: "center",
        display: "flex",
        flexDirection: " row",
      },
      "& .MuiStep-horizontal": {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
      "& .MuiStepIcon-root.MuiStepIcon-active": {
        color: globalColors.primary.primary,
        fill: globalColors.primary.primary,
        height: "24px",
      },
      "& .MuiStepLabel-iconContainer ": {
        paddingRight: " 0px",
        cursor: "pointer",
      },
      "& .MuiStepIcon-root.MuiStepIcon-completed": {
        color: globalColors.primary.primary,
      },
      "& .MuiStepIcon-root": {
        color: globalColors.primary.primary,
        fill: globalColors.primary.primary,
      },
      "& .MuiStepConnector-root": {
        //flex: "1 1 auto",
        display: "flex",
        alignItems: "center",
      },
      "&.MuiStepConnector-line": {
        display: "none",
        borderColor: " #bdbdbd",
      },
      "&.MuiStepIcon-active ": {
        color: globalColors.primary.primary,
      },
    }) as any
);
const QontoConnector = styled(StepConnector)(() => ({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: globalColors.primary.primary,
      border: `1px dashed ${globalColors.primary.primary}`,
    },
  },
  completed: {
    "& $line": {
      borderColor: globalColors.primary.primary,
      border: `1px dashed ${globalColors.primary.primary}`,
    },
  },
  line: {
    borderRadius: 1,
    border: `1px dashed ${globalColors.primary.primary} !important`,
    width: "100%",
    minWidth: "40px",
    marginLeft: "5px",
    marginRight: "2px !important",
  },
}));

export interface formCompProps {
  onClear(data?: any): void;
  onSubmit?(data: any, data1: any): void;
  extraFields?: ObjectValues;
  submitText?: string;
  oldSubmittedData?: ObjectValues;
  nextFunc?(): void;
  addAnother?: any;
  api: {
    sub_collection_name?: string;
    docid?: string;
    method: string;
    merge?: boolean;
    customFunction(data: any): void;
  };
  editData?: ObjectValues | undefined;
  header: string;
  inputFormArray: inputProp[];
  formatPayload?(payload: ObjectValues, data?: any, edit?: any): void;
  successMessage(res: ObjectValues): string;
  customContent?(s: any): any;
  updateOnList?: any;
  inlineCount?: number;
  disabled?: boolean;
  steps?: { from: number; to: number }[];
}
function FormComponent(props: formCompProps) {
  const {
    onClear,
    onSubmit,
    api,
    disabled,
    addAnother,
    editData,
    // header,
    submitText,
    inputFormArray,
    extraFields,
    formatPayload,
    oldSubmittedData,
    // inputSteps,
    customContent,
    updateOnList,
    steps,
  } = props;
  const ss: boolean | null = useContext(MobileProvider);
  const isMobile: boolean | null = ss;
  const [allInputs, setInputs] = useState<inputProp[]>(inputFormArray ?? []);

  useEffect(() => {
    if (updateOnList) {
      setInputs(inputFormArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateOnList, inputFormArray]);
  const [submittedData, setSubmittedData] = useState<ObjectValues>({});
  useEffect(() => {
    if (oldSubmittedData) {
      setSubmittedData(oldSubmittedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldSubmittedData]);
  function renderTextField({
    label,
    placeholder,
    error,
    helperText,
    onChange,
    endAdornment,
    multiline,
    disabled,
    dataType,
    only_number,
    api,
    max,
    checkMax,
    validate,
    showhelperText,
    list,
    autoFocus,
  }: inputProp) {
    return (
      <CustomTextField
        placeholder={placeholder}
        disabled={
          submittedData.loader === true
            ? true
            : (submittedData[`${label}-disabled`] ?? disabled ?? false)
        }
        id={label}
        autoFocus={autoFocus}
        onKeyDown={(evt) => {
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
        }}
        onBlur={async () => {
          const toCheck = validate && submittedData[label];
          if (toCheck) {
            const validateData = await validate(
              submittedData[label],
              submittedData
            );
            if (validateData.check === true) {
            } else {
              if (validateData.msg) {
                setSubmittedData((p) => {
                  return {
                    ...p,
                    [`${label}-error`]: true,
                    [`${label}-msg`]: validateData.msg,
                  };
                });
              }
            }
          }
        }}
        onFocus={dataType === "number" ? StopScroll : () => {}}
        variant="outlined"
        error={
          submittedData[`${label}-error`] &&
          submittedData[`${label}-error`] === true
            ? true
            : api === "phone_number" &&
                submittedData[label] &&
                !isPhoneNumberValid(submittedData[label])
              ? true
              : error
        }
        helperText={
          submittedData[`${label}-error`] &&
          submittedData[`${label}-error`] === true &&
          submittedData[`${label}-msg`]
            ? submittedData[`${label}-msg`]
            : api === "phone_number" &&
                submittedData[label] &&
                !isPhoneNumberValid(submittedData[label])
              ? "Invalid phone number"
              : (submittedData[`${label}-helper`] ?? helperText)
        }
        type={dataType === "number" ? "number" : "text"}
        value={submittedData[label] ? submittedData[label] : ""}
        maxRows={multiline ?? 1}
        minRows={1}
        multiline={multiline ? true : false}
        onChange={async (e) => {
          if (onChange) {
            const value = e.target.value;
            const newV = checkMax
              ? Number(value) > (await checkMax(submittedData, allInputs))
                ? await checkMax(submittedData, allInputs)
                : value
              : max
                ? Number(value) > max
                  ? max
                  : value
                : value;

            const data = { ...submittedData, [label]: newV };
            onChange(data, list ?? []).then((newData: any) => {
              setSubmittedData((prevDetails) => ({
                ...prevDetails,
                ...newData,
                [`${label}-error`]: undefined,
                [`${label}-msg`]: undefined,
              }));
            });
          }
          handleInputChange(label, e.target.value);
        }}
        onKeyPress={async (ev: any) => {
          if (ev.key === "Enter") {
            ev.preventDefault();

            // submit();
          }
        }}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": { padding: "0" },
          "& .MuiInputBase-input": multiline
            ? {
                padding: "6px 12px",
              }
            : {},
          "& .MuiFormHelperText-root": showhelperText
            ? {
                color: `${globalColors.primary.grey} !important`,
                opacity: `1 !important`,
                background: "transparent",

                // .Mui-disabled
              }
            : {},
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
        InputProps={{
          endAdornment,
        }}
        // onInput={
        //   checkMax || max
        //     ? (e: any) => {
        //         const value = e.target.value;
        //         e.target.value =
        //         checkMax
        //           ? Number(value) > checkMax(submittedData)
        //             ? checkMax(submittedData)
        //             : value
        //           : max
        //           ? Number(value) > max
        //             ? max
        //             : value
        //           : value;
        //       }
        //     : undefined
        // }
        inputProps={
          max
            ? {
                // type: details.visible ? "" : type && "password",
                "data-testid": `${label}-input`, // Test ID for testing purposes
                max: max,
              }
            : {
                // type: details.visible ? "" : type && "password",
                "data-testid": `${label}-input`, // Test ID for testing purposes
              }
        }
      />
    );
  }
  const fieldCountAndFinalPayload = () => {
    let submitData: ObjectValues = {}; //new FormData();
    const correctData: any = [];
    allInputs
      .filter((sA) => sA.api)
      .map(async (ss: inputProp) => {
        const {
          api,
          label,
          not_required,
          not_send_id,
          fieldType,
          dataType,
          validate,
          dontsendid,
        } = ss;
        const toCheck =
          validate &&
          (dataType === "number"
            ? submittedData[label]
              ? submittedData[label] !== 0 && submittedData[label] !== "0"
              : false
            : submittedData[label]);
        if (
          toCheck
            ? !submittedData[`${label}-error`]
            : not_required === true ||
              (api === "phone_number" && submittedData[label]
                ? isPhoneNumberValid(submittedData[label])
                : dataType === "number"
                  ? submittedData[label]
                    ? submittedData[label] !== 0 && submittedData[label] !== "0"
                    : false
                  : submittedData[label])
        ) {
          if (api) {
            correctData.push(label);
            submitData[api] = not_send_id
              ? submittedData[label]
              : dataType === "number"
                ? Number(submittedData[label])
                : !dontsendid && submittedData[`${label}Id`]
                  ? submittedData[`${label}Id`] === "-"
                    ? null
                    : submittedData[`${label}Id`]
                  : fieldType === "date" && submittedData[label]
                    ? new Date(submittedData[label])
                    : submittedData[label];
          }
        }
        return ss;
      });

    return { final: submitData, available: correctData };
  };
  const checkAllFields = () => {
    const { available, final } = fieldCountAndFinalPayload();
    return allInputs.filter((sA) => sA.api).length === available.length
      ? final
      : null;
  };
  function renderDropDown({
    label,
    error,
    helperText,
    listLabel,
    list,
    disabled,
  }: inputProp) {
    return (
      <CustomTextField
        required={true}
        disabled={submittedData.loader === true ? true : (disabled ?? false)}
        // error={errorMsg[singleInput.name] ? true : false}
        error={error}
        helperText={helperText}
        autoComplete="off"
        value={submittedData[label] ?? ""}
        sx={{ width: "100%" }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: {
                margin: "1px 0 0 2px",
                borderRadius: "10px", // Customize the border-radius for the dropdown paper
              },
            },
          },
        }}
        id="outlined-select-currency-native"
        select
        variant="outlined"
        onChange={(e) => {
          if (e.target.value) {
            const id = `${label}Id`;
            setSubmittedData((prevDetails) => ({
              ...prevDetails,
              [label]: e.target.value,
              [id]: e.currentTarget?.id ?? "",
              [`${label}-error`]: undefined,
            }));
          }
        }}
      >
        {list?.map((item, i) => (
          <MenuItem
            key={`${item[listLabel ?? "label"]}==${i}`}
            value={item[listLabel ?? "label"]}
            id={item.id ?? item[listLabel ?? "label"]}
            sx={{ textTransform: "capitalize" }}
          >
            {item[listLabel ?? "label"]}
          </MenuItem>
        ))}
      </CustomTextField>
    );
  }
  useEffect(() => {
    if (!oldSubmittedData) {
      const newSubmittedData = submittedData;
      allInputs.map((singleInput) => {
        if (!singleInput.defaultValue && !newSubmittedData[singleInput.label]) {
          if (
            editData &&
            singleInput.api &&
            (editData[singleInput.api] || editData[singleInput.api] === false)
          ) {
            newSubmittedData[singleInput.label] = editData[singleInput.api];
            newSubmittedData[`${singleInput.label}Id`] = editData[
              `${singleInput.api}`
            ]
              ? editData[`${singleInput.api}`]
              : "";

            return newSubmittedData;
          } else {
            return (newSubmittedData[singleInput.label] = "");
          }
        }
        return singleInput;
      });
      setSubmittedData(newSubmittedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  const setInitialData = (arr?: any) => {
    if (!oldSubmittedData) {
      const newSubmittedData: any = {};
      const irar: any = arr ? arr : allInputs;
      irar.map((singleInput: any) => {
        if (singleInput.defaultValue) {
          newSubmittedData[singleInput.label] = singleInput.defaultValue.value
            ? singleInput.defaultValue.value
            : "";

          newSubmittedData[`${singleInput.label}Id`] = singleInput.defaultValue
            .id
            ? singleInput.defaultValue.id
            : "";
        } else {
          return (newSubmittedData[singleInput.label] = "");
        }

        return singleInput;
      });

      setSubmittedData(newSubmittedData);
    }
  };
  useEffect(() => {
    setInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line

  const handleInputChange = (
    label: string,
    value: string | number,
    id?: any
  ) => {
    setSubmittedData((prevDetails) => ({
      ...prevDetails,
      [label]: value,
      [`${label}Id`]: id,
      [`${label}-error`]: undefined,
    }));
  };
  const user: any = useSelector((state) => state.user.user);
  const submit = async (type?: "exit") => {
    const submitData: any = checkAllFields();
    if (submitData !== null) {
      setSubmittedData((pre) => {
        return { ...pre, loader: true, clicked_button_type: type };
      });
      if (extraFields && extraFields.length > 0) {
        extraFields.map((sField: { label: string | number; value: any }) => {
          submitData[sField.label] = sField.value;
          return sField;
        });
      }
      // if (api.method !== "add" && editData) {
      //   submitData["updated_at"] = Timestamp.now();
      //   submitData["updated_by"] = user?.id ?? "";
      // } else {
      submitData["created_at"] = new Date();
      //   submitData["updated_by"] = user?.id ?? "";
      submitData["created_by"] = user?.uid ?? "";
      // }
      const config = formatPayload
        ? formatPayload(submitData, editData, submittedData)
        : submitData;
      // if (api.sub_collection_name) {
      //   config.sub_collection_name = api.sub_collection_name;
      //   if (api.docid) {
      //     config.docid = api.docid;
      //   }
      // }
      const afterApi = async (res: any, data: any) => {
        const response = await res;
        // if (response === undefined || (response && response.error)) {
        //   await setSubmittedData((p) => {
        //     return { ...p, loader: false };
        //   });
        // } else
        if (type) {
          await setSubmittedData((p) => {
            return { ...p, loader: false };
          });
          if (onSubmit) {
            await onSubmit(response, data);
          }
          // await dispatch(
          //   showSnack({
          //     message: successMessage(response) ?? "",
          //     severity: "success",
          //     open: true,
          //   })
          // );
          await onClear();
        } else {
          if (onSubmit) {
            const resp: any = await onSubmit(response, data);
            await setSubmittedData((p) => {
              return { ...p, loader: false };
            });
            if (resp && resp.length > 0) {
              setInputs(resp);

              setInitialData(resp);
            } else {
              setInitialData();
            }
          } else {
            setInitialData();
          }
        }
      };

      const response: any = (await api.customFunction)
        ? api.customFunction(config)
        : () => {};
      await afterApi(response, config);
    }
  };
  const oneContentWidth = {
    width: "100%",
  };
  const fullWidthSx = { width: "100%" };
  const singleForm: any = (input: inputProp, i: number) => {
    const headingContent = (
      <Box
        sx={{
          fontSize: "0.75rem",
          color: "#171a1c",
          fontWeight: 500,
          margin: "0 0 5px 0",
        }}
      >{`${input.label} ${input.not_required === true ? "" : "*"}`}</Box>
    );
    const sx = input.fullWidth || isMobile ? fullWidthSx : oneContentWidth;
    switch (input.fieldType) {
      // case "checkbox":
      //   return (
      //     <Stack
      //       spacing={"5px"}
      //       sx={{
      //         marginTop: i === 1 ? "0 !important" : "",
      //         ...sx,
      //         ...rowHorizontalEnd,
      //         ...alignC,
      //         gap: "10px",
      //       }}
      //     >
      //       <Box
      //         sx={{
      //           fontSize: "0.75rem",
      //           color: "#171a1c",
      //           fontWeight: 500,
      //           m: "5px 0 5px 0 !important",
      //         }}
      //       >{`${input.label} ${input.not_required === true ? "" : "*"}`}</Box>

      //       {/* <CustomSwitch
      //         {...input}
      //         value={submittedData[input.label] ?? null}
      //         disabled={
      //           submittedData.loader === true ? true : input.disabled ?? false
      //         }
      //         onChange={(val: any) => {
      //           handleInputChange(input.label, val);
      //         }}
      //       /> */}
      //       <Checkbox
      //         sx={{ m: "0", padding: "0", "& .MuiCheckbox-root": { m: "0" } }}
      //         disabled={
      //           submittedData.loader === true ? true : input.disabled ?? false
      //         }
      //         checked={submittedData[input.label] ?? false}
      //         onChange={(event: any) => {
      //           handleInputChange(input.label, event.target.checked);
      //         }}
      //       />
      //     </Stack>
      //   );
      case "text":
        return (
          <Stack
            spacing={"5px"}
            sx={{
              marginTop: i === 1 ? "0 !important" : "",
              ...sx,
            }}
          >
            {headingContent}
            {renderTextField(input)}
          </Stack>
        );
      case "select":
        return (
          <Stack
            spacing={"5px"}
            sx={{
              marginTop: i === 1 ? "0 !important" : "",
              ...sx,
            }}
          >
            {headingContent}
            {renderDropDown(input)}
          </Stack>
        );
      case "date":
        return (
          <Stack
            spacing={"5px"}
            sx={{
              marginTop: i === 1 ? "0 !important" : "",
              ...sx,
            }}
          >
            {headingContent}
            <CustomDatePicker
              {...input}
              value={submittedData[input.label] ?? null}
              disabled={
                submittedData.loader === true ? true : (input.disabled ?? false)
              }
              onChange={(val: any) => {
                if (input.onChange) {
                  const data = {
                    ...submittedData,
                    [input.label]: val ? val : null,
                  };
                  input
                    .onChange(data, input.list ?? [])
                    .then((newData: any) => {
                      setSubmittedData((prevDetails) => ({
                        ...prevDetails,
                        ...newData,
                        [`${input.label}-error`]: undefined,
                        [`${input.label}-msg`]: undefined,
                      }));
                    });
                }
                handleInputChange(input.label, val);
              }}
              helperText={
                submittedData[`${input.label}-helper`] ?? input.helperText
              }
            />
          </Stack>
        );
      // ClusterInput
      case "file":
        return (
          <Stack
            spacing={"5px"}
            sx={{
              marginTop: i === 1 ? "0 !important" : "",
              ...sx,
            }}
          >
            {headingContent}
            <input
              accept="image/*,application/pdf"
              ref={(ref) => {
                // setFileInputRef(ref);
              }}
              multiple
              id={"files"}
              style={{
                visibility: "hidden",
                width: "0",
                maxHeight: "0",
              }}
              type="file"
              onChange={(e: {
                preventDefault: () => void;
                stopPropagation: () => void;
                target: { files: any };
              }) => {
                e.preventDefault();
                e.stopPropagation();

                let fileObj = [];
                const fileA: any = [];
                fileObj.push(e.target.files);
                for (let i = 0; i < fileObj[0].length; i++) {
                  fileA.push(fileObj[0][i]);
                }
                setSubmittedData((prev) => {
                  return {
                    ...prev,
                    [input.label]: fileA[0],
                    [`${input.label}Error`]: false,
                  };
                });
              }}
            />

            <label
              htmlFor="files"
              className="btn"
              style={{
                width: "100%",
                borderRadius: "10px",
                border: submittedData[`${input.label}-error`]
                  ? "1px solid red"
                  : "1px solid #dbdbdb",
                display: "flex",
                justifyContent: "space-between",
                maxHeight: "45px",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  width: "calc(100% - 149px)",
                  color: "black",
                  padding: "8.5px 12px",
                }}
                className="textOverflowEllipsis"
              >
                {submittedData[input.label]
                  ? submittedData[input.label].name
                  : ""}
              </Typography>
              <Box
                sx={{
                  backgroundColor: globalColors.primary.primary, // You can customize the background color here
                  color: "white",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  fontSize: "0.875rem !important",
                  borderRadius: "8px",
                  lineHeight: "normal",
                  cursor: "pointer",
                  padding: "0 10px",
                  maxWidth: "125px",
                  height: "41px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Choose image
              </Box>
            </label>
            {/* <FileUpload
  not_required={not_required ?? false}
  value={fieldValue[label] ? fieldValue[label] : ""}
  error={fieldValue[`${label}Error`] ? fieldValue[`${label}Error`] : false}
  {...item}
  onChange={(file: any) => {
    setFieldValue((prev) => {
      return {
        ...prev,
        [label]: file,
        [`${label}Error`]: false,
      };
    });
  }}
/> */}
          </Stack>
        );

      case "radio":
        return (
          <Stack
            spacing={"5px"}
            sx={{
              marginTop: i === 1 ? "0 !important" : "",
              ...sx,
            }}
          >
            <Box
              sx={{
                fontSize: "0.75rem",
                color: "#171a1c",
                fontWeight: 500,
                margin: "0 0 5px 0",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >{`${input.label} ${input.not_required === true ? "" : "*"}`}</Box>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              sx={{ justifyContent: "flex-end" }}
            >
              {input.list
                ? input.list.map((s: any) => {
                    return (
                      <Box>
                        <RadioGroup value={input.defaultValue?.value} row>
                          <FormControlLabel
                            sx={{
                              marginRight: "0 !important",
                              "& .MuiFormControlLabel-label": {
                                fontSize: "0.75rem",
                                color: "#171a1c",
                                fontWeight: 500,
                              },
                              "& .MuiFormControlLabel-root.Mui-disabled": {
                                marginRight: "0",
                              },
                              "& .MuiFormGroup-root": {
                                "& .MuiFormControlLabel-root.Mui-disabled": {
                                  marginRight: "0",
                                },
                              },
                              "& .MuiRadio-root": {
                                p: "1px 5px",
                              },
                              // "& .MuiRadio-root.Mui-disabled":
                              //   { color: globalColors.primary.primary },
                              "& .MuiRadio-root.Mui-checked": {
                                color: `${globalColors.primary.primary} !important`,
                              },
                            }}
                            value={s[input.listLabel ?? ""]}
                            disabled={true}
                            control={<Radio />}
                            label={s[input.listLabel ?? ""]}
                          />
                        </RadioGroup>
                      </Box>
                    );
                  })
                : ""}
            </Box>
          </Stack>
        );

      case "autocomplete":
        const v = input.list?.find(
          (s) => s[input.listLabel ?? "label"] === submittedData[input.label]
        );
        const fv = submittedData[input.label]
          ? {
              [input.listLabel ?? "label"]: submittedData[input.label],
            }
          : null;
        return (
          <Stack
            spacing={"5px"}
            sx={{
              marginTop: i === 1 ? "0 !important" : "",
              ...sx,
            }}
          >
            {headingContent}
            {input.multiple ? (
              <MultipleAutoComplete
                {...input}
                list={
                  input.list
                    ? [
                        // { [input.listLabel ?? ("" as any)]: "All", id: "all", value: "all" },
                        ...input.list,
                      ]
                    : []
                }
                value={
                  submittedData[input.label] ? submittedData[input.label] : []
                }
                onChange={async (val: any) => {
                  handleInputChange(input.label, val ? val : []);
                  if (val && val.id && input.onUpdate) {
                    const data = await input.onUpdate(val);
                    if (data) {
                      setSubmittedData((prevDetails) => ({
                        ...prevDetails,
                        ...data,
                        // [label]: value,
                        // [`${label}Id`]: id,
                        // [`${label}-error`]: undefined,
                      }));
                    }
                  }
                }}
                disabled={
                  submittedData.loader === true
                    ? true
                    : (input.disabled ?? false)
                }
              />
            ) : (
              <CustomAutocomplete
                {...input}
                helperText={
                  submittedData[`${input.label}-error`] &&
                  submittedData[`${input.label}-error`] === true &&
                  submittedData[`${input.label}-msg`]
                    ? submittedData[`${input.label}-msg`]
                    : (submittedData[`${input.label}-helper`] ??
                      input.helperText)
                }
                error={
                  submittedData[`${input.label}-error`] &&
                  submittedData[`${input.label}-error`] === true
                    ? true
                    : false
                }
                value={v ? v : fv}
                updateError={(msg: any) => {
                  setSubmittedData((prevDetails) => ({
                    ...prevDetails,
                    [`${input.label}-error`]: true,
                    [`${input.label}-msg`]: msg ?? "",
                  }));
                }}
                onUpdate={(data: any) => {
                  setSubmittedData((prevDetails) => ({
                    ...prevDetails,
                    [input.label]: data
                      ? data[input.listLabel ?? "label"]
                      : null,
                    [`${input.label}Id`]: data ? data.id : undefined,
                    [`${input.label}-error`]: undefined,
                    [`${input.label}-msg`]: undefined,
                  }));
                }}
                onChange={async (val: any) => {
                  if (input.onChange) {
                    const data = {
                      ...submittedData,
                      [input.label]: val
                        ? val[input.listLabel ?? "label"]
                        : null,
                      [`${input.label}Id`]: val ? val.id : undefined,
                    };
                    input.onChange(data, input.list).then((newData: any) => {
                      setSubmittedData((prevDetails) => ({
                        ...prevDetails,
                        ...newData,
                        [`${input.label}-error`]: undefined,
                        [`${input.label}-msg`]: undefined,
                      }));
                    });
                  }
                  handleInputChange(
                    input.label,
                    val ? val[input.listLabel ?? "label"] : null,
                    val ? val.id : undefined
                  );
                  if (val && val.id && input.onUpdate) {
                    // const data = await input.onUpdate(val);
                    // if (data) {
                    //   setSubmittedData((prevDetails) => ({
                    //     ...prevDetails,
                    //     ...data,
                    //     // [label]: value,
                    //     // [`${label}Id`]: id,
                    //     // [`${label}-error`]: undefined,
                    //   }));
                    // }
                  }
                }}
                disabled={
                  submittedData.loader === true
                    ? true
                    : (submittedData[`${input.label}-disabled`] ??
                      input.disabled ??
                      false)
                }
              />
            )}
          </Stack>
        );
      case "extra":
        return (
          <Stack
            spacing={"5px"}
            sx={{
              marginTop: i === 1 ? "0 !important" : "",
              marginBottom: "20.91px",
              ...sx,
              // height: "100px",
            }}
          ></Stack>
        );
      default:
        return <Grid item xs={singlexs} display="flex" key={"default"}></Grid>;
    }
  };
  const singlexs =
    !oldSubmittedData && allInputs.filter((it) => it.pinned).length > 0 ? 4 : 6;
  const allFormComp: any = (list: inputProp[]) => {
    return list?.map((input: inputProp, i: number) => {
      return isMobile ? (
        <Box key={`${input.label}=${i}`} sx={{ width: "100%" }}>
          {" "}
          {singleForm(input, i)}
        </Box>
      ) : (
        <Box
          key={`${input.label}=${i}`}
          sx={{
            width: "calc(100% - 5px) !important",
            maxHeight: "fit-content",
          }}
        >
          {" "}
          {input.button ? (
            <Box sx={{ width: "100%", mb: "22.91px", ...rowHorizontalEnd }}>
              <CustomContainedButton
                otherProps={{
                  disabled:
                    checkAllFields() === null
                      ? true
                      : (submittedData.loader ?? false),
                  onClick: () => {
                    submit();
                  },
                  sx: { minWidth: "fit-content" },
                }}
                loading={
                  submittedData.loader && submittedData.clicked_button_type
                    ? submittedData.loader
                    : undefined
                }
                content={input.button.label}
              />
            </Box>
          ) : input.fieldType === "checkbox" ? (
            <Stack
              spacing={"5px"}
              sx={{
                marginTop: i === 1 || i === 0 ? "0 !important" : "",
                ...fullWidthSx,
                ...rowHorizontalEnd,
                ...alignC,
                gap: "10px",
              }}
            >
              {subHeading({
                parentSx: { marginTop: "5px !important" },
                text: `${input.label}`,
              })}

              <Checkbox
                sx={{ m: "0", padding: "0", "& .MuiCheckbox-root": { m: "0" } }}
                disabled={
                  submittedData.loader === true
                    ? true
                    : (input.disabled ?? false)
                }
                checked={submittedData[input.label] ?? false}
                onChange={(event: any) => {
                  handleInputChange(input.label, event.target.checked);
                }}
              />
              {/* {renderTextField(input)} */}
            </Stack>
          ) : (
            singleForm(input, i)
          )}
        </Box>
        // <Grid
        //   item
        //   xs={isMobile || input.fullWidth ? 12 : singlexs}
        //   key={`${input.label}=${i}`}
        //   sx={
        //     oldSubmittedData
        //       ? { maxWidth:  "calc(50% - 7.5px) !important" }
        //       : {}
        //   }
        //   {...input.grid}
        // >
        //   {singleForm(input, i)}
        // </Grid>
      );
    });
  };
  return (
    <Stack
      spacing={"13px"}
      height={disabled ? "fit-content" : "100%"}
      justifyContent={"space-between"}
      position={"relative"}
      sx={disabled ? { pointerEvents: "none" } : {}}
      //
    >
      <Stack
        spacing={ "20px"}
        sx={{ height:"calc(100% - 59px)",overflowY: "auto" ,}}
            className="scrollBluePrimarythin"
      >
        {/* p: "20px 20px 0"  */}
        <Stack
          spacing={ "20px"}
          sx={{ flex: "8", p: "11px 20px 0" }}
        >
          <Stack
            sx={{ flex: "8", height: "100%", width: "100%" }}
            direction={"column"}
            spacing={"10px"}
          >
         <Box
                width="100%"
                sx={
                  isMobile
                    ? {}
                    : {
                        flexWrap: "wrap",
                        ...displayRow,
                        gap: "10px",
                        height: "fit-content",
                        maxHeight: "fit-content",
                      }
                }
              >
                {allFormComp(allInputs)}
              </Box>
          </Stack>
        </Stack>
        {disabled ? "" : <Box sx={{ mt: "80px !important" }}></Box>}
      </Stack>

      {disabled ? (
        ""
      ) : (
        <Box
          sx={{
            width: "100%",
            ...rowSB,
            position: "absolute",
            bottom: "20px",
            zIndex: 99999,
          }}
        >
          {/* <CustomIconButton
          key="cancel"
          variant="outlined"
          content="cancel"
          sx={{ minWidth: "180px" }}
          onClick={() => {
            onClear();
          }}
        /> */}

          <Box
            sx={{
              width: "calc(100% - 40px)",
              m: "0 20px",
              background: "white",
              gap: "20px",
              ...rowHorizontalEnd,
            }}
          >
            {addAnother && (
              <CustomIconButton
                {...{
                  disabled:
                    checkAllFields() === null
                      ? true
                      : (submittedData.loader ?? false),
                  onClick: () => {
                    submit();
                  },
                  variant: "outlined",
                  sx: {
                    width: "calc(50% - 10px)",
                    maxWidth: "fit-content",
                    minWidth: "fit-content",
                    textTransform: "inherit",
                    minHeight: "38.66px",
                    borderRadius: "8px",
                  },
                }}
                loading={
                  submittedData.loader && submittedData.clicked_button_type
                    ? submittedData.loader
                    : undefined
                }
                content={`Save and ${addAnother} Another`}
              />
            )}
            <CustomContainedButton
              otherProps={{
                disabled:
                  checkAllFields() === null
                    ? true
                    : (submittedData.loader ?? false),
                onClick: () => {
                  submit("exit");
                },
                sx: {
                  width: "calc(50% - 10px)",
                  maxWidth: "fit-content",
                  minWidth: submitText ? "fit-content" : "169.22px",
                  textTransform: "inherit",
                },
              }}
              loading={
                submittedData.loader && submittedData.clicked_button_type
                  ? submittedData.loader
                  : undefined
              }
              content={
                submitText
                  ? submitText
                  : oldSubmittedData
                    ? "Create"
                    : "Save and Exit"
              }
            />
          </Box>
        </Box>
      )}
    </Stack>
  );
}

export default FormComponent;
