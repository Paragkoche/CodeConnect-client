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
import { useNavigate } from "react-router-dom";
import { get_answer_api } from "../../../../api";

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);

  const route = useNavigate();
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    get_answer_api().then((data) => {
      setData(data.data.data);
    });
  }, []);
  if (user.role !== "") {
    if (user.role == "Student") {
      console.log("YOUR Student conform");
    } else {
      route("/dash-board/Student");
    }
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
                      <TableCell>Id</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Comment</TableCell>
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
                        >
                          <TableCell>{v.ans}</TableCell>
                          <TableCell>{v.id}</TableCell>
                          <TableCell>{v.states}</TableCell>
                          <TableCell>{v.comment}</TableCell>
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
