import { useContext, useState } from "react";
import CustomDialog from "../../../components/CustomDialog";
import FormComponent from "../../../components/FormComponent";
import { ObjectValues } from "../../../interfaces";
import { MobileProvider } from "../../../providers/IsMobileProvider";
import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { showSnack } from "../../../redux/constants/constantSlice";
import { useDispatch } from "react-redux";

function FileForm({ onSubmit }: { onSubmit(data: ObjectValues): void }) {
  const [details, setDetails] = useState<{ open: boolean; row?: any }>({
    open: false,
  });
  const dispatch = useDispatch();
  const [category, setCategory] = useState<any>();
  const handleClose = () => {
    setDetails({ open: false });
  };

  const isMobile: boolean | null = useContext(MobileProvider);
  const allNames = [{ label: "shashwat" }];
  const allDepartments = [{ label: "shashwat" }];

  const Categories = [
    {
      label: "Personal",
      child: { label: "Names", list: allNames, api: "name" },
    },
    {
      label: "Professional",
      child: { label: "Departments", list: allDepartments, api: "department" },
    },
  ];
  return (
    <div>
      {details.open && (
        <CustomDialog
          open={true}
          title={details.row ? "Update File" : "Create File"}
          sx={{
            "& .MuiDialog-paper": isMobile
              ? {}
              : {
                  borderRadius: "20px",
                  maxHeight: "calc(100% - 64px)",
                  height: "calc(100% - 64px)",
                  minWidth: "50%",
                  width: "calc(100% - 200px)",
                  margin: "32px 100px",
                  padding: "0px",
                  display: "flex",
                },
          }}
          fullScreen={isMobile ? true : false}
          onClose={handleClose}
          content={
            <FormComponent
              inlineCount={1}
              updateOnList={{ category: category }}
              {...{
                successMessage: () => {
                  return "File added";
                },
                formatPayload: (data: ObjectValues) => {
                  return data;
                },
                extraFields: [],
                inputFormArray:
                  category && category.child
                    ? [
                        {
                          label: "Upload Date",
                          placeholder: " ",
                          value: undefined,
                          defaultValue: {
                            value: new Date(),
                          },
                          error: false,
                          helperText: " ",
                          showhelperText: true,
                          endAdornment: "",
                          fieldType: "date",
                          api: "date",
                        },
                        {
                          label: "Categories",
                          placeholder: "Select the Category",
                          value: undefined,
                          error: false,
                          list: Categories,
                          defaultValue: {
                            value: [],
                          },
                          listLabel: "label",
                          helperText: " ",
                          showhelperText: true,
                          fieldType: "autocomplete",
                          api: "category",
                          onChange: async (sub: ObjectValues) => {
                            setCategory(
                              Categories.find(
                                (cat) => cat.label === sub["Categories"]
                              )
                            );
                            return sub;
                          },
                        },
                        {
                          label: category.child.label,
                          placeholder: `Select the ${category.child.label}`,
                          value: undefined,
                          error: false,
                          list: category.child.list,
                          defaultValue: {
                            value: [],
                          },
                          listLabel: "label",
                          helperText: " ",
                          showhelperText: true,
                          fieldType: "autocomplete",
                          api: category.child.api,
                        },
                        {
                          label: "Tags",
                          placeholder: "Select the tags",
                          value: undefined,
                          error: false,
                          list: [{ label: "Tag 1" }, { label: "Tag 2" }],
                          defaultValue: {
                            value: [],
                          },
                          listLabel: "label",
                          helperText: " ",
                          showhelperText: true,
                          fieldType: "autocomplete",
                          api: "tags",
                          multiple: true,
                          freeSolo: true,
                        },
                        {
                          label: "Remark",
                          placeholder: "Optional",
                          value: undefined,
                          dataType: "text",
                          error: false,
                          helperText: "",
                          fieldType: "text",
                          api: "remark",
                          defaultValue: {
                            value: details.row?.remark ?? "",
                          },
                          not_required: true,
                          multiline: 3,
                        },
                        {
                          label: "File Upload Image/PDF",
                          fieldType: "file",
                          api: "file",
                        },
                      ]
                    : [
                        {
                          label: "Upload Date",
                          placeholder: " ",
                          value: undefined,
                          defaultValue: {
                            value: new Date(),
                          },
                          error: false,
                          helperText: " ",
                          showhelperText: true,
                          endAdornment: "",
                          fieldType: "date",
                          api: "date",
                        },
                        {
                          label: "Categories",
                          placeholder: "Select the Category",
                          value: undefined,
                          error: false,
                          list: Categories,
                          defaultValue: {
                            value: [],
                          },
                          listLabel: "label",
                          helperText: " ",
                          showhelperText: true,
                          fieldType: "autocomplete",
                          api: "category",
                          onChange: async (sub: ObjectValues) => {
                            setCategory(
                              Categories.find(
                                (cat) => cat.label === sub["Categories"]
                              )
                            );
                            return sub;
                          },
                        },
                        {
                          label: "Tags",
                          placeholder: "Select the tags",
                          value: undefined,
                          error: false,
                          list: [{ label: "Tag 1" }, { label: "Tag 2" }],
                          defaultValue: {
                            value: [],
                          },
                          listLabel: "label",
                          helperText: " ",
                          showhelperText: true,
                          fieldType: "autocomplete",
                          api: "tags",
                          multiple: true,
                          freeSolo: true,
                        },
                        {
                          label: "Remark",
                          placeholder: "Optional",
                          value: undefined,
                          dataType: "text",
                          error: false,
                          helperText: "",
                          fieldType: "text",
                          api: "remark",
                          defaultValue: {
                            value: details.row?.remark ?? "",
                          },
                          not_required: true,
                          multiline: 3,
                        },
                        {
                          label: "File Upload Image/PDF",
                          fieldType: "file",
                          api: "file",
                        },
                      ],
                header: "wfdw",
                editData: {},
                api: {
                  method: "add",
                  customFunction: (data) => {
                    onSubmit(data);
                  },
                },
                onSubmit: details.row
                  ? () => {
                      dispatch(
                        showSnack({
                          message: "File updated",
                          severity: "success",
                          open: true,
                        })
                      );
                      handleClose();
                      return "";
                    }
                  : () => {
                      dispatch(
                        showSnack({
                          message: "File Created",
                          severity: "success",
                          open: true,
                        })
                      );
                      handleClose();
                      return "";
                    },

                onClear: () => {},
              }}
            />
          }
          actions={[]}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUpload />}
        onClick={() => {
          setDetails({ open: true });
        }}
      >
        {isMobile?"File":"Upload File"}
      </Button>
    </div>
  );
}

export default FileForm;
