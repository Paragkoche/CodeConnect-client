/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Typography,
  Grid,
  Container,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import PageTitleWrapper from "../../../../components/Home/pageTitleWrapper";
import { useAppSelector } from "../../../../reducers/hook";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { get_questions_api } from "../../../../api";

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);

  const route = useNavigate();
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    get_questions_api().then((data) => {
      const s: any[] = [];
      data.data.data.map((v: any) => {
        s.push(...v.solve);
      });
      setData(s);
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
              Answer
            </Typography>
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
                      <TableCell>Ans</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      data.map((v: any) => (
                        <TableRow
                          hover
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            route("/dash-board/Teacher/answers/" + v.id);
                          }}
                        >
                          <TableCell>{v.ans}</TableCell>
                          <TableCell>{v.AnsBy[0].name}</TableCell>
                          <TableCell>{v.states}</TableCell>
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
