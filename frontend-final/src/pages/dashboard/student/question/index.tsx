/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
  TextField,
  MenuItem,
} from "@mui/material";
import PageTitleWrapper from "../../../../components/Home/pageTitleWrapper";
import { useAppSelector } from "../../../../reducers/hook";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { get_questions_s_api } from "../../../../api";

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);

  const route = useNavigate();
  const [data, setData] = React.useState<any[]>();
  const [dataSlot, setDataSlot] = React.useState<any[]>();
  const [cat_op, setCat_op] = React.useState<string[]>([]);
  const [cat_sel, setCatSel] = React.useState("");
  React.useEffect(() => {
    get_questions_s_api().then((data) => {
      setData(data.data.data);
    });
  }, []);
  React.useEffect(() => {
    if (data?.length !== 0) {
      data?.map((v) => {
        if (v.catalog.length != 0)
          setCat_op((s: any) => [...s, v.catalog[0].name || ""]);
      });
      setCat_op((s) => [...new Set(s)]);
    }
  }, [data]);
  React.useEffect(() => {
    console.log();

    setDataSlot(
      data?.filter((v) => {
        if (v.catalog.length != 0) {
          console.log(v.catalog[0].name);

          return v.catalog[0].name == cat_sel;
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat_sel]);

  if (user.role !== "") {
    if (user.role == "Student") {
      console.log("YOUR Student conform");
    } else {
      route("/");
    }
  } else {
    return (
      <h1>
        loading... login agin <Link to="/login">Link</Link>
      </h1>
    );
  }

  return (
    <>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Questions
            </Typography>
          </Grid>
          <Grid item></Grid>
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
            <TextField
              sx={{
                my: 5,
              }}
              value={cat_sel}
              onChange={(e) => {
                setCatSel(e.target.value);
              }}
              id="outlined-select-currency"
              select
              label="Category"
            >
              {cat_op.map((v, i) => (
                <MenuItem value={v} key={i}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
            <Card>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Questions</TableCell>
                      <TableCell>test case</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      !dataSlot &&
                      data.map((v: any) => (
                        <TableRow>
                          <TableCell>
                            <Link to={`/dash-board/Student/question/${v.id}`}>
                              {v.q}
                            </Link>
                          </TableCell>
                          <TableCell>{v.testCase}</TableCell>
                          <TableCell>{v.catalog[0]?.name || ""}</TableCell>
                        </TableRow>
                      ))}
                    {dataSlot &&
                      dataSlot.map((v: any) => (
                        <TableRow>
                          <TableCell>
                            <Link to={`/dash-board/Student/question/${v.id}`}>
                              {v.q}
                            </Link>
                          </TableCell>
                          <TableCell>{v.testCase}</TableCell>
                          <TableCell>{v.catalog[0]?.name || ""}</TableCell>
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
