"use client";
import {
  Typography,
  Avatar,
  Grid,
  Container,
  ListItemAvatar,
  Card,
  Box,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Button,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import PageTitleWrapper from "@/components/Home/pageTitleWrapper";
import { useAppSelector } from "@/reducers/hook";
import React from "react";
import { useRouter } from "next/navigation";
import {
  get_catalog_api,
  post_question_api,
  teacher_dashboard_api,
} from "@/api";
// import { Chart } from "@/mui/components/Chart";
import Chart from "react-apexcharts";
import { ArrowBack } from "@mui/icons-material";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { toast } from "react-toastify";

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    background: ${
      theme.palette.mode === "dark"
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
  `
);
function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);
  const theme = useTheme();
  const route = useRouter();
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    get_catalog_api().then((data) => {
      setData(data.data.data);
    });
  }, []);
  if (user.role !== "") {
    if (user.role == "Teacher") {
      console.log("YOUR Teacher conform");
    } else {
      route.push("/dash-board/Student");
    }
  }
  const [value, setValue] = React.useState<any>("");
  const [value2, setValue2] = React.useState<any>("");
  const [cat, setCat] = React.useState<any>("");
  return (
    <>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Add Questions
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are your question
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => route.push("/dash-board/Teacher/questions")}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<ArrowBack fontSize="small" />}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <Card>
          <CardHeader title="Add Question" />
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post_question_api({
                  q: value,
                  testCase: value2,
                  Cid: cat,
                }).then((data) => {
                  toast.success("Question add successfully");
                  route.back();
                });
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3" component="h3" gutterBottom>
                  Questions
                </Typography>
                <MDEditor
                  data-color-mode="light"
                  height={200}
                  value={value}
                  onChange={setValue}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3" component="h3" gutterBottom>
                  Test case
                </Typography>
                <MDEditor
                  data-color-mode="light"
                  height={200}
                  value={value2}
                  onChange={setValue2}
                />
              </Box>
              <Box
                sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Category"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  {data &&
                    data.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Box>
              <Box
                sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Button type={"submit"}>Submit</Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default PageHeader;
