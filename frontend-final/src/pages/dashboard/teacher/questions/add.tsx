/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Typography,
  Grid,
  Container,
  Card,
  Box,
  Button,
  CardHeader,
  CardContent,
  MenuItem,
  TextField,
} from "@mui/material";
import PageTitleWrapper from "../../../../components/Home/pageTitleWrapper";
import { useAppSelector } from "../../../../reducers/hook";
import React from "react";
import { useNavigate } from "react-router-dom";
import { get_catalog_api, post_question_api } from "../../../../api";
import { ArrowBack } from "@mui/icons-material";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);

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
  }
  const [value, setValue] = React.useState<any>("");
  const [value2, setValue2] = React.useState<any>("");
  const [cat, setCat] = React.useState<any>("");
  return (
    <>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Add Questions
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are your question
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => route("/dash-board/Teacher/questions")}
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
          <CardHeader title="Add Question" />
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post_question_api({
                  q: value,
                  testCase: value2,
                  Cid: cat,
                }).then(() => {
                  toast.success("Question add successfully");
                  route("/dash-board/Teacher/questions");
                });
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3" component="h3" gutterBottom>
                  Questions
                </Typography>
                <MDEditor
                  data-color-mode="light"
                  height={200}
                  value={value}
                  onChange={setValue}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3" component="h3" gutterBottom>
                  Test case
                </Typography>
                <MDEditor
                  data-color-mode="light"
                  height={200}
                  value={value2}
                  onChange={setValue2}
                />
              </Box>
              <Box
                sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Category"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  {data &&
                    data.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>
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
