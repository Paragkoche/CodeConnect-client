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
  OutlinedInput,
} from "@mui/material";
import PageTitleWrapper from "../../../../components/Home/pageTitleWrapper";
import { useAppSelector } from "../../../../reducers/hook";
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { get_one_ans_api, post_review_api } from "../../../../api";

import { ArrowBack } from "@mui/icons-material";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";
import Markdown from "react-markdown";
import { AxiosError } from "axios";

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);

  const route = useNavigate();
  const para = useParams();
  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    if (para.id && typeof para.id == "string")
      get_one_ans_api(para.id).then((data) => {
        setData(data.data.data);
      });
  }, [para.id]);
  const [value, setValue] = React.useState<any>("");
  const [value2, setValue2] = React.useState<any>("");
  const [cat, setCat] = React.useState<any>("");

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
              Review Answer
            </Typography>
            <Typography variant="subtitle2">{user.name}</Typography>
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
          <CardHeader title="Review Answer" />
          <CardContent>
            <Typography variant="h3">Code</Typography>
            <Markdown>{data && "```js\n" + data.ans + "\n```"}</Markdown>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post_review_api(data.id, {
                  comment: value,
                  status: cat,
                  score: value2,
                }).then(
                  (data) => {
                    console.log(data.data);

                    toast.success("Review Submit");
                  },
                  (err: AxiosError | any) => {
                    toast.error(err.response?.data.message || "");
                  }
                );
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3" component="h3" gutterBottom>
                  Comment
                </Typography>
                <MDEditor
                  data-color-mode="light"
                  height={200}
                  value={value}
                  onChange={setValue}
                />
              </Box>
              <Box
                sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Review"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  <MenuItem value={"Wrong-answer"}>Wrong-answer</MenuItem>
                  <MenuItem value={"Right-answer"}>Right-answer</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3" component="h3" gutterBottom>
                  score
                </Typography>
                <OutlinedInput
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  type={"number"}
                />
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
