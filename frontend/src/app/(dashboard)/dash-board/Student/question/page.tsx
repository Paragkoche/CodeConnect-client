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
  Tooltip,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { alpha, styled, useTheme } from "@mui/material/styles";
import PageTitleWrapper from "@/components/Home/pageTitleWrapper";
import { useAppSelector } from "@/reducers/hook";
import React from "react";
import { useRouter } from "next/navigation";
import { get_questions_s_api, delete_question_api } from "@/api";
// import { Chart } from "@/mui/components/Chart";
import Chart from "react-apexcharts";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { toast } from "react-toastify";
import Link from "next/link";
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
  }, [cat_sel]);

  if (user.role !== "") {
    if (user.role == "Student") {
      console.log("YOUR Student conform");
    } else {
      route.push("/");
    }
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
                            <Link href={`/dash-board/Student/question/${v.id}`}>
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
                            <Link href={`/dash-board/Student/question/${v.id}`}>
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
