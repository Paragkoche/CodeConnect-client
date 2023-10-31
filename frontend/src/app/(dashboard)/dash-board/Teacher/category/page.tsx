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
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { alpha, styled, useTheme } from "@mui/material/styles";
import PageTitleWrapper from "@/components/Home/pageTitleWrapper";
import { useAppSelector } from "@/reducers/hook";
import React from "react";
import { useRouter } from "next/navigation";
import {
  delete_catalog_api,
  get_catalog_api,
  teacher_dashboard_api,
} from "@/api";
import { toast } from "react-toastify";
// import { Chart } from "@/mui/components/Chart";
import Chart from "react-apexcharts";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
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
                onClick={() => route.push("/dash-board/Teacher/category/add")}
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
