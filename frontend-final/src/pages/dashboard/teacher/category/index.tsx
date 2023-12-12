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
import { delete_catalog_api, get_catalog_api } from "../../../../api";
import { toast } from "react-toastify";
// import { Chart } from "@/mui/components/Chart";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);
  const theme = useTheme();
  const route = useNavigate();
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
      route("/dash-board/Student");
    }
  } else {
    return (
      <h1>
        loading... login agin <Link to="/login">Link</Link>
      </h1>
    );
  }

  return (
    data && (
      <>
        <PageTitleWrapper>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" component="h3" gutterBottom>
                Category
              </Typography>
              <Typography variant="subtitle2">
                {user.name}, these are Category
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => route("/dash-board/Teacher/category/add")}
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />}
              >
                Create Category
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
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((v: any) => (
                        <TableRow>
                          <TableCell>{v.id}</TableCell>
                          <TableCell>{v.name}</TableCell>
                          <TableCell>
                            <Tooltip title="Delete Category" arrow>
                              <IconButton
                                onClick={() => {
                                  delete_catalog_api(v.id).then(
                                    () => {
                                      toast.success(
                                        "Category deleted successfully"
                                      );
                                      get_catalog_api().then((data) => {
                                        setData(data.data.data);
                                      });
                                    },
                                    () => {
                                      toast.error("Category Not delete");
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
    )
  );
}

export default PageHeader;
