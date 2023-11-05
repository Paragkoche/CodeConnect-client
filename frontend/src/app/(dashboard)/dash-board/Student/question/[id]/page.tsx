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
  Drawer,
  ListItem,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { alpha, lighten, styled, useTheme } from "@mui/material/styles";
import PageTitleWrapper from "@/components/Home/pageTitleWrapper";
import { useAppSelector } from "@/reducers/hook";
import React from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import {
  compile,
  get_questions_s_id_api,
  submit_answer_api,
  teacher_dashboard_api,
} from "@/api";
// import { Chart } from "@/mui/components/Chart";
import Chart from "react-apexcharts";
import Scrollbar from "@/mui/components/Scrollbar";
import { List } from "@mui/icons-material";
import Editor from "@monaco-editor/react";
import Markdown from "react-markdown";
import axios, { AxiosError } from "axios";
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
const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
      .MuiList-root {
  
        .MuiListItem-root {
          padding: 1px 0;
  
          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(3.2)};
  
            .MuiBadge-standard {
              background: ${theme.colors.primary.main};
              font-size: ${theme.typography.pxToRem(10)};
              font-weight: bold;
              text-transform: uppercase;
              color: ${theme.palette.primary.contrastText};
            }
          }
      
          .MuiButton-root {
            display: flex;
            color: ${theme.colors.alpha.trueWhite[70]};
            background-color: transparent;
            width: 100%;
            justify-content: flex-start;
            padding: ${theme.spacing(1.2, 3)};
  
            .MuiButton-startIcon,
            .MuiButton-endIcon {
              transition: ${theme.transitions.create(["color"])};
  
              .MuiSvgIcon-root {
                font-size: inherit;
                transition: none;
              }
            }
  
            .MuiButton-startIcon {
              color: ${theme.colors.alpha.trueWhite[30]};
              font-size: ${theme.typography.pxToRem(20)};
              margin-right: ${theme.spacing(1)};
            }
            
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[50]};
              margin-left: auto;
              opacity: .8;
              font-size: ${theme.typography.pxToRem(20)};
            }
  
            &.active,
            &:hover {
              background-color: ${alpha(
                theme.colors.alpha.trueWhite[100],
                0.06
              )};
              color: ${theme.colors.alpha.trueWhite[100]};
  
              .MuiButton-startIcon,
              .MuiButton-endIcon {
                color: ${theme.colors.alpha.trueWhite[100]};
              }
            }
          }
  
          &.Mui-children {
            flex-direction: column;
  
            .MuiBadge-root {
              position: absolute;
              right: ${theme.spacing(7)};
            }
          }
  
          .MuiCollapse-root {
            width: 100%;
  
            .MuiList-root {
              padding: ${theme.spacing(1, 0)};
            }
  
            .MuiListItem-root {
              padding: 1px 0;
  
              .MuiButton-root {
                padding: ${theme.spacing(0.8, 3)};
  
                .MuiBadge-root {
                  right: ${theme.spacing(3.2)};
                }
  
                &:before {
                  content: ' ';
                  background: ${theme.colors.alpha.trueWhite[100]};
                  opacity: 0;
                  transition: ${theme.transitions.create([
                    "transform",
                    "opacity",
                  ])};
                  width: 6px;
                  height: 6px;
                  transform: scale(0);
                  transform-origin: center;
                  border-radius: 20px;
                  margin-right: ${theme.spacing(1.8)};
                }
  
                &.active,
                &:hover {
  
                  &:before {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
      }
  `
);
const MenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      padding: ${theme.spacing(1)};
  
      & > .MuiList-root {
        padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
      }
    }
  
      .MuiListSubheader-root {
        text-transform: uppercase;
        font-weight: bold;
        font-size: ${theme.typography.pxToRem(12)};
        color: ${theme.colors.alpha.trueWhite[50]};
        padding: ${theme.spacing(0, 2.5)};
        line-height: 1.4;
      }
  `
);

function PageHeader() {
  const user = useAppSelector((state) => state.userReducer.value);
  const theme = useTheme();
  var hours = new Date().getHours();
  const route = useRouter();
  const para = useParams();
  const [data, setData] = React.useState<any>(null);
  //   const [cat, satCat] = React.useState(0);
  React.useEffect(() => {
    if (para.id && typeof para.id == "string")
      get_questions_s_id_api(para.id).then((data) =>
        setData(data.data.data[0])
      );
  }, [para.id]);
  if (user.role !== "") {
    if (user.role == "Student") {
      console.log("YOUR Student conform");
    } else {
      route.push("/dash-board/Teacher");
    }
  }
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [output, setOut] = React.useState<any>();
  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "699fc58353msh5a6c3e4f14e91f9p129e98jsnec1f56e4da5d",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOut(response.data);
        toast.success(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    }
  };
  const [process, setProcessing] = React.useState(false);
  return (
    data && (
      <>
        <PageTitleWrapper></PageTitleWrapper>
        <Container maxWidth="lg">
          <Card>
            <Box display="flex" justifyContent={"space-between"}>
              <Box p={2}>
                <Markdown>
                  {"# Problem \n" +
                    data.q +
                    "\n# testCase\n" +
                    data.testCase +
                    ""}
                </Markdown>
                {output && (
                  <Markdown>
                    {"# output\n" + (atob(output.stdout || "") || "")}
                  </Markdown>
                )}
              </Box>
              <Editor
                defaultLanguage="javascript"
                defaultValue="// some comment"
                height="50vh"
                width={"50%"}
                value={code}
                onChange={(e) => setCode(e || "")}
              />
            </Box>
            <Button
              onClick={() => {
                compile(code, "", "")
                  .then((data) => {
                    setProcessing(true);
                    checkStatus(data.data.token);
                    // console.log(data.data);
                  })
                  .catch((err: AxiosError) => {
                    if (err.response?.status === 429) {
                      console.log("too many requests", status);

                      toast.error(
                        `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`
                      );
                    }
                  });
              }}
              disabled={process}
            >
              {process ? "compiling" : "Run"}
            </Button>
            <Button
              onClick={() => {
                submit_answer_api({
                  ans: code,
                  states: "in-review",
                  q: para.id,
                }).then((data) => {
                  console.log(data.data);
                  toast.success("Answer submit");
                  route.back();
                });
              }}
              disabled={process}
            >
              Submit
            </Button>
          </Card>
        </Container>
      </>
    )
  );
}

export default PageHeader;
