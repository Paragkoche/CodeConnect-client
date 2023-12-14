import {
  Typography,
  Avatar,
  Grid,
  Container,
  Card,
  Box,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PageTitleWrapper from "../../../components/Home/pageTitleWrapper";
import { useAppSelector } from "../../../reducers/hook";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { get_answer_api } from "../../../api";
// import { Chart } from "@/mui/components/Chart";
import Chart from "react-apexcharts";

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);
  const theme = useTheme();
  const hours = new Date().getHours();
  const route = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    get_answer_api().then((data) => {
      console.log(data.data.data.length);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = data.data.data.filter((v: any) => v.states == "Right-answer");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = data.data.data.filter((v: any) => v.states == "Wrong-answer");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inR = data.data.data.filter((v: any) => v.states == "in-review");
      setData([data.data.data.length, r.length, inR.length, w.length]);
    });
  }, []);
  //   const [cat, satCat] = React.useState(0);
  //   React.useEffect(() => {
  //     teacher_dashboard_api().then((data) => {
  //       let ans = 0;
  //       let r_ans = 0;
  //       data.data.data.q.map((v: any) => {
  //         ans += v.solve.length;
  //       });
  //       data.data.data.q.map((v: any) => {
  //         r_ans += v.solve.filter((v: any) => v.state == "right").length;
  //       });
  //       setData([data.data.data.q.length, ans, r_ans]);
  //       satCat(data.data.data.cat.length);
  //     });
  //   }, []);
  if (user.role !== "") {
    if (user.role == "Student") {
      console.log("YOUR Student conform");
    } else {
      route("/dash-board/Teacher");
    }
  } else {
    return (
      <h1>
        loading... login agin <Link to="/login">Link</Link>
      </h1>
    );
  }

  //   const chartSeries = [110, 101, 20];
  return (
    <>
      <PageTitleWrapper>
        <Grid container alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                mr: 2,
                width: theme.spacing(8),
                height: theme.spacing(8),
              }}
              variant="rounded"
              alt={user.name}
              src={user.name}
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Welcome, {user.name}!
            </Typography>
            <Typography variant="subtitle2">
              {hours > 12 ? "Good Afternoon!" : "Good Morning!"}
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
          spacing={4}
        >
          <Grid item xs={12}>
            <Card>
              <Grid spacing={0} container>
                <Grid
                  sx={{
                    position: "relative",
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={12}
                  md={6}
                >
                  <Box
                    component="span"
                    sx={{
                      display: { xs: "none", md: "inline-block" },
                    }}
                  >
                    <Divider absolute orientation="vertical" />
                  </Box>
                  <Box
                    py={4}
                    flex={2}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Chart
                      height={1050}
                      options={{
                        labels: [
                          "Answer",
                          "Right-answer",
                          "in-review",
                          "Wrong-answer",
                        ],
                      }}
                      series={data}
                      type="donut"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PageHeader;
