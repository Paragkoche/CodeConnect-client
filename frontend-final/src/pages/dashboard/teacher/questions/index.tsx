/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Typography,
  Grid,
  Container,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useTheme } from "@mui/material/styles";
import PageTitleWrapper from "../../../../components/Home/pageTitleWrapper";
import { useAppSelector } from "../../../../reducers/hook";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { get_questions_api, delete_question_api } from "../../../../api";
// import { Chart } from "@/mui/components/Chart";
// import Chart from "react-apexcharts";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { toast } from "react-toastify";

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);
  const theme = useTheme();
  const route = useNavigate();
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    get_questions_api().then((data) => {
      setData(data.data.data);
    });
  }, []);
  if (user.role !== "") {
    if (user.role == "Teacher") {
      console.log("YOUR Teacher conform");
    } else {
      route("/dash-board/Student");
    }
  } else {
    return (
      <h1>
        loading... login agin <Link to="/login">Link</Link>
      </h1>
    );
  }
  console.log(data);

  return (
    <>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Questions
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are your question
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => route("/dash-board/Teacher/questions/add")}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Create Question
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Questions</TableCell>
                      <TableCell>test case</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Answers</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      data.map((v: any) => (
                        <TableRow>
                          <TableCell>{v.q}</TableCell>
                          <TableCell>{v.testCase}</TableCell>
                          <TableCell>{v.catalog[0].name}</TableCell>
                          <TableCell>{v.solve.length}</TableCell>
                          <TableCell>
                            <Tooltip title="Delete Question" arrow>
                              <IconButton
                                onClick={() => {
                                  delete_question_api(v.id).then(
                                    () => {
                                      toast.success(
                                        "Question deleted successfully"
                                      );
                                      get_questions_api().then((data) => {
                                        setData(data.data.data);
                                      });
                                    },
                                    () => {
                                      toast.error("Question Not delete");
                                    }
                                  );
                                }}
                                sx={{
                                  "&:hover": {
                                    background: theme.colors.error.lighter,
                                  },
                                  color: theme.palette.error.main,
                                }}
                                color="inherit"
                                size="small"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
            {/* <RecentOrders /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PageHeader;
