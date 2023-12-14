/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Typography,
  Grid,
  Container,
  Card,
  Box,
  Button,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import PageTitleWrapper from "../../../../components/Home/pageTitleWrapper";
import { useAppSelector } from "../../../../reducers/hook";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { post_catalog_api } from "../../../../api";
// import { Chart } from "@/mui/components/Chart";

import { ArrowBack } from "@mui/icons-material";
import { toast } from "react-toastify";

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);

  const route = useNavigate();
  const [value, setValue] = React.useState<any>("");

  React.useEffect(() => {}, []);
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
    <>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Add Category
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are your question
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => route("/dash-board/Teacher/category")}
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
          <CardHeader title="Add Category" />
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post_catalog_api({ name: value }).then(() => {
                  toast.success("Category add successfully");
                  route("/dash-board/Teacher/category");
                });
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl>
                  <InputLabel>Name</InputLabel>
                  <OutlinedInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    label="Email"
                    fullWidth
                  />
                </FormControl>
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
