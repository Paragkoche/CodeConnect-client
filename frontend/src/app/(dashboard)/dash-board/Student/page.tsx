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
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import PageTitleWrapper from "@/components/Home/pageTitleWrapper";
import { useAppSelector } from "@/reducers/hook";
import React from "react";
import { useRouter } from "next/navigation";
import { get_answer_api, teacher_dashboard_api } from "@/api";
// import { Chart } from "@/mui/components/Chart";
import Chart from "react-apexcharts";

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
  var hours = new Date().getHours();
  const route = useRouter();
  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    get_answer_api().then((data) => {
      console.log(data.data.data.length);

      const r = data.data.data.filter((v: any) => v.states == "Right-answer");
      const w = data.data.data.filter((v: any) => v.states == "Wrong-answer");
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
      route.push("/dash-board/Teacher");
    }
  }

  const chartSeries = [110, 101, 20];
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
