import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { Visibility, GetApp } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import FileForm from "./FileForm";
import CustomSearch from "../../components/CustomSearch";
import { ObjectValues } from "../../interfaces";
import { formatTimestamp } from "../../constants/Regex";
import moment from "moment";
import FilePreview from "./FilePreview";

export default function FilesList() {
  const header = [
    {
      label: "Date",
      api: "date",
      format: (row: ObjectValues) => {
        return formatTimestamp(row.date);
      },
    },
    {
      label: "Category",
      api: "category",
    },
    {
      label: "Name/Department",
      api: "name_department",
      format: (row: ObjectValues) => {
        return `${row.category === "Professional" ? row.department : row.name}`;
      },
    },
    {
      label: "Tags",
      api: "tags",
      format: (row: ObjectValues) => {
        return row.tags.map((s: { label: any }) => s.label).join("");
      },
    },

    {
      label: "File",
      api: "file",
      format: (row: ObjectValues) => {
        return `${row.file.name} ${row.file.type ?? ""}`;
      },
    },
    {
      label: "Remark",
      api: "remark",
    },
  ];
  const list: any = [
    {
      date: "2025-03-28T07:00:48.092Z",
      category: "Personal",
      name: "shashwat",
      tags: [
        {
          label: "Tag 1",
        },
      ],
      remark: "ss",
      created_at: "2025-03-28T07:00:57.546Z",
      created_by: "",
      url: "https://pdfobject.com/pdf/sample.pdf",
      file: { name: "Sample file", type: "pdf" },
    },
    {
      date: "2025-03-27T07:10:48.092Z",
      category: "Personal",
      name: "shashwat",
      tags: [
        {
          label: "Tag 1",
        },
      ],
      remark: "ss",
      created_at: "2025-03-28T07:00:57.546Z",
      created_by: "",
      url: "https://pdfobject.com/pdf/sample.pdf",
      file: { name: "Sample file 2", type: "pdf" },
    },
  ];
  const [details, setDetails] = useState<ObjectValues>({
    list: list,
    copy: list,
    recent: 0,
  });

  return (
    <Box sx={{ display: "flex", minHeight: "100%" }}>
      <Box
        sx={{
          p: "24px",
          width: "calc(100% - 48px)",
        }}
      >
        <FilePreview details={details} setDetails={setDetails} />
        <AppBar
          position="static"
          color="transparent"
          elevation={1}
          sx={{ mb: 3, borderRadius: 1, bgcolor: "white", p: 2, width: "100%" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flexGrow: 1, position: "relative", maxWidth: 400 }}>
              <CustomSearch
                filteredData={(list) => {
                  setDetails((pre) => {
                    return { ...pre, list: list };
                  });
                }}
                copyData={details.copy.map((data: ObjectValues) => {
                  return {
                    ...data,
                    formatTimestamp: formatTimestamp(data.date),
                    file_name: data.file.name,
                    tags_: data.tags
                      .map((s: { label: any }) => s.label)
                      .join(""),
                  };
                })}
                fieldName={[
                  "name",
                  "formatTimestamp",
                  "department",
                  "file_name",
                  "tags_",
                  "category",
                ]}
                onClear={() => {
                  setDetails((pre) => {
                    return { ...pre, list: pre.copy };
                  });
                }}
              />
            </Box>
            <FileForm
              onSubmit={(newFile) => {
                setDetails((p) => {
                  return {
                    list: [
                      ...p.list,
                      { ...newFile, url: URL.createObjectURL(newFile.file) },
                    ],
                    copy: [
                      ...p.copy,
                      { ...newFile, url: URL.createObjectURL(newFile.file) },
                    ],
                    recent: p.recent + 1,
                  };
                });
              }}
            />
          </Toolbar>
        </AppBar>

        {/* Info Cards */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
          gap={3}
          mb={3}
        >
          <Card
            sx={{ p: 2, textAlign: "center", boxShadow: 3, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Files
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {details.copy.length}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{ p: 2, textAlign: "center", boxShadow: 3, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Storage Used
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                30GB / 100GB
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{ p: 2, textAlign: "center", boxShadow: 3, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Recent Uploads
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {details.recent}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* File Table */}
        <Paper elevation={3} sx={{ borderRadius: 2, p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#eceff1" }}>
                  {header.map(({ label }) => {
                    return (
                      <TableCell>
                        <Typography fontWeight="bold">{label}</Typography>
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Typography fontWeight="bold">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.list
                  .sort((a: any, b: any) => {
                    // Convert timestamps to Date objects
                    var dateA: any = new Date(
                      moment(new Date(a.date)).format("MMM D YYYY h:mm:ss A")
                    );
                    var dateB: any = new Date(
                      moment(new Date(b.date)).format("MMM D YYYY h:mm:ss A")
                    );

                    // Sort in descending order
                    return dateB - dateA;
                  })
                  .map((file: any, index: Key | null | undefined) => (
                    <TableRow key={index}>
                      {header.map(({ api, format }) => {
                        return (
                          <TableCell>
                            {format ? format(file) : file[api]}
                          </TableCell>
                        );
                      })}

                      <TableCell>
                        <Button
                          size="small"
                          color="primary"
                          startIcon={<Visibility />}
                          onClick={() => {
                            setDetails((pre) => {
                              return { ...pre, url: file };
                            });
                          }}
                        >
                          Preview
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => {
                            window.open(file.url, "_blank");
                          }}
                          startIcon={<GetApp />}
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}
