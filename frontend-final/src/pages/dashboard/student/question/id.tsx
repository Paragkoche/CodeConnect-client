/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Container,
  Card,
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import PageTitleWrapper from "../../../../components/Home/pageTitleWrapper";
import { useAppSelector } from "../../../../reducers/hook";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import {
  compile,
  get_questions_s_id_api,
  submit_answer_api,
} from "../../../../api";
// import { Chart } from "@/mui/components/Chart";
import Editor from "@monaco-editor/react";
import Markdown from "react-markdown";
import axios, { AxiosError } from "axios";
import { loader } from "@monaco-editor/react";

const monacoThemes: any = {
  active4d: "Active4D",
  "all-hallows-eve": "All Hallows Eve",
  amy: "Amy",
  "birds-of-paradise": "Birds of Paradise",
  blackboard: "Blackboard",
  "brilliance-black": "Brilliance Black",
  "brilliance-dull": "Brilliance Dull",
  "chrome-devtools": "Chrome DevTools",
  "clouds-midnight": "Clouds Midnight",
  clouds: "Clouds",
  cobalt: "Cobalt",
  dawn: "Dawn",
  dreamweaver: "Dreamweaver",
  eiffel: "Eiffel",
  "espresso-libre": "Espresso Libre",
  github: "GitHub",
  idle: "IDLE",
  katzenmilch: "Katzenmilch",
  "kuroir-theme": "Kuroir Theme",
  lazy: "LAZY",
  "magicwb--amiga-": "MagicWB (Amiga)",
  "merbivore-soft": "Merbivore Soft",
  merbivore: "Merbivore",
  "monokai-bright": "Monokai Bright",
  monokai: "Monokai",
  "night-owl": "Night Owl",
  "oceanic-next": "Oceanic Next",
  "pastels-on-dark": "Pastels on Dark",
  "slush-and-poppies": "Slush and Poppies",
  "solarized-dark": "Solarized-dark",
  "solarized-light": "Solarized-light",
  spacecadet: "SpaceCadet",
  sunburst: "Sunburst",
  "textmate--mac-classic-": "Textmate (Mac Classic)",
  "tomorrow-night-blue": "Tomorrow-Night-Blue",
  "tomorrow-night-bright": "Tomorrow-Night-Bright",
  "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
  "tomorrow-night": "Tomorrow-Night",
  tomorrow: "Tomorrow",
  twilight: "Twilight",
  "upstream-sunburst": "Upstream Sunburst",
  "vibrant-ink": "Vibrant Ink",
  "xcode-default": "Xcode_default",
  zenburnesque: "Zenburnesque",
  iplastic: "iPlastic",
  idlefingers: "idleFingers",
  krtheme: "krTheme",
  monoindustrial: "monoindustrial",
};
const languageOptions = [
  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
  },
  {
    id: 45,
    name: "Assembly (NASM 2.14.02)",
    label: "Assembly (NASM 2.14.02)",
    value: "assembly",
  },
  {
    id: 46,
    name: "Bash (5.0.0)",
    label: "Bash (5.0.0)",
    value: "bash",
  },
  {
    id: 47,
    name: "Basic (FBC 1.07.1)",
    label: "Basic (FBC 1.07.1)",
    value: "basic",
  },
  {
    id: 75,
    name: "C (Clang 7.0.1)",
    label: "C (Clang 7.0.1)",
    value: "c",
  },
  {
    id: 76,
    name: "C++ (Clang 7.0.1)",
    label: "C++ (Clang 7.0.1)",
    value: "cpp",
  },
  {
    id: 48,
    name: "C (GCC 7.4.0)",
    label: "C (GCC 7.4.0)",
    value: "c",
  },
  {
    id: 52,
    name: "C++ (GCC 7.4.0)",
    label: "C++ (GCC 7.4.0)",
    value: "cpp",
  },
  {
    id: 49,
    name: "C (GCC 8.3.0)",
    label: "C (GCC 8.3.0)",
    value: "c",
  },
  {
    id: 53,
    name: "C++ (GCC 8.3.0)",
    label: "C++ (GCC 8.3.0)",
    value: "cpp",
  },
  {
    id: 50,
    name: "C (GCC 9.2.0)",
    label: "C (GCC 9.2.0)",
    value: "c",
  },
  {
    id: 54,
    name: "C++ (GCC 9.2.0)",
    label: "C++ (GCC 9.2.0)",
    value: "cpp",
  },
  {
    id: 86,
    name: "Clojure (1.10.1)",
    label: "Clojure (1.10.1)",
    value: "clojure",
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
    label: "C# (Mono 6.6.0.161)",
    value: "csharp",
  },
  {
    id: 77,
    name: "COBOL (GnuCOBOL 2.2)",
    label: "COBOL (GnuCOBOL 2.2)",
    value: "cobol",
  },
  {
    id: 55,
    name: "Common Lisp (SBCL 2.0.0)",
    label: "Common Lisp (SBCL 2.0.0)",
    value: "lisp",
  },
  {
    id: 56,
    name: "D (DMD 2.089.1)",
    label: "D (DMD 2.089.1)",
    value: "d",
  },
  {
    id: 57,
    name: "Elixir (1.9.4)",
    label: "Elixir (1.9.4)",
    value: "elixir",
  },
  {
    id: 58,
    name: "Erlang (OTP 22.2)",
    label: "Erlang (OTP 22.2)",
    value: "erlang",
  },
  {
    id: 44,
    label: "Executable",
    name: "Executable",
    value: "exe",
  },
  {
    id: 87,
    name: "F# (.NET Core SDK 3.1.202)",
    label: "F# (.NET Core SDK 3.1.202)",
    value: "fsharp",
  },
  {
    id: 59,
    name: "Fortran (GFortran 9.2.0)",
    label: "Fortran (GFortran 9.2.0)",
    value: "fortran",
  },
  {
    id: 60,
    name: "Go (1.13.5)",
    label: "Go (1.13.5)",
    value: "go",
  },
  {
    id: 88,
    name: "Groovy (3.0.3)",
    label: "Groovy (3.0.3)",
    value: "groovy",
  },
  {
    id: 61,
    name: "Haskell (GHC 8.8.1)",
    label: "Haskell (GHC 8.8.1)",
    value: "haskell",
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java (OpenJDK 13.0.1)",
    value: "java",
  },

  {
    id: 78,
    name: "Kotlin (1.3.70)",
    label: "Kotlin (1.3.70)",
    value: "kotlin",
  },
  {
    id: 64,
    name: "Lua (5.3.5)",
    label: "Lua (5.3.5)",
    value: "lua",
  },

  {
    id: 79,
    name: "Objective-C (Clang 7.0.1)",
    label: "Objective-C (Clang 7.0.1)",
    value: "objectivec",
  },
  {
    id: 65,
    name: "OCaml (4.09.0)",
    label: "OCaml (4.09.0)",
    value: "ocaml",
  },
  {
    id: 66,
    name: "Octave (5.1.0)",
    label: "Octave (5.1.0)",
    value: "octave",
  },
  {
    id: 67,
    name: "Pascal (FPC 3.0.4)",
    label: "Pascal (FPC 3.0.4)",
    value: "pascal",
  },
  {
    id: 85,
    name: "Perl (5.28.1)",
    label: "Perl (5.28.1)",
    value: "perl",
  },
  {
    id: 68,
    name: "PHP (7.4.1)",
    label: "PHP (7.4.1)",
    value: "php",
  },
  {
    id: 43,
    label: "Plain Text",
    name: "Plain Text",
    value: "text",
  },
  {
    id: 69,
    name: "Prolog (GNU Prolog 1.4.5)",
    label: "Prolog (GNU Prolog 1.4.5)",
    value: "prolog",
  },
  {
    id: 70,
    name: "Python (2.7.17)",
    label: "Python (2.7.17)",
    value: "python",
  },
  {
    id: 71,
    name: "Python (3.8.1)",
    label: "Python (3.8.1)",
    value: "python",
  },
  {
    id: 80,
    name: "R (4.0.0)",
    label: "R (4.0.0)",
    value: "r",
  },
  {
    id: 72,
    name: "Ruby (2.7.0)",
    label: "Ruby (2.7.0)",
    value: "ruby",
  },
  {
    id: 73,
    name: "Rust (1.40.0)",
    label: "Rust (1.40.0)",
    value: "rust",
  },
  {
    id: 81,
    name: "Scala (2.13.2)",
    label: "Scala (2.13.2)",
    value: "scala",
  },
  {
    id: 82,
    name: "SQL (SQLite 3.27.2)",
    label: "SQL (SQLite 3.27.2)",
    value: "sql",
  },
  {
    id: 83,
    name: "Swift (5.2.3)",
    label: "Swift (5.2.3)",
    value: "swift",
  },
  {
    id: 74,
    name: "TypeScript (3.7.4)",
    label: "TypeScript (3.7.4)",
    value: "typescript",
  },
  {
    id: 84,
    name: "Visual Basic.Net (vbnc 0.0.0.5943)",
    label: "Visual Basic.Net (vbnc 0.0.0.5943)",
    value: "vbnet",
  },
];

function PageHeader() {
  const defineTheme = (theme: string) => {
    return new Promise<void>((res) => {
      Promise.all([
        loader.init(),
        import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
      ]).then(([monaco, themeData]) => {
        monaco.editor.defineTheme(theme, themeData);
        res();
      });
    });
  };
  const user = useAppSelector((state) => state.userReducer.value);

  const route = useNavigate();
  const para = useParams();
  const [data, setData] = React.useState<any>(null);
  //   const [cat, satCat] = React.useState(0);
  React.useEffect(() => {
    if (para.id && typeof para.id == "string")
      get_questions_s_id_api(para.id).then((data) =>
        setData(data.data.data[0])
      );
  }, [para.id]);
  function handleThemeChange(th: any) {
    console.log(th);

    const theme = JSON.parse(th.target.value);
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then(() => setTheme(theme));
    }
  }
  const [_theme, setTheme] = useState<any>("cobalt");
  const [language, setLanguage] = useState(JSON.stringify(languageOptions[0]));

  useEffect(() => {
    defineTheme("oceanic-next").then(() =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);
  if (user.role !== "") {
    if (user.role == "Student") {
      console.log("YOUR Student conform");
    } else {
      route("/dash-board/Teacher");
    }
  }
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [output, setOut] = React.useState<any>();
  const checkStatus = async (token: string) => {
    const options = {
      Method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "699fc58353msh5a6c3e4f14e91f9p129e98jsnec1f56e4da5d",
      },
    };
    try {
      const response = await axios.request(options);
      const statusId = response.data.status?.id;

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
  console.log(_theme);

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
              <Box width={"50%"}>
                <Box width={"100%"} gap={2} mx={1} my={2}>
                  <TextField
                    label="Language"
                    id="outlined-select-currency"
                    select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                  >
                    {languageOptions.map((v) => (
                      <MenuItem key={v.id} value={JSON.stringify(v)}>
                        {v.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    sx={{ ml: 2 }}
                    label="Theme"
                    id="outlined-select-currency"
                    select
                    value={JSON.stringify(_theme)}
                    onChange={handleThemeChange}
                  >
                    {Object.entries(monacoThemes)
                      .map(([themeId, themeName]) => ({
                        label: themeName,
                        value: themeId,
                        key: themeId,
                      }))
                      .map((v, i) => (
                        <MenuItem key={i} value={JSON.stringify(v)}>
                          {v.value}
                        </MenuItem>
                      ))}
                  </TextField>
                </Box>
                <Box width={"100%"}>
                  <Editor
                    language={JSON.parse(language).value}
                    defaultValue="// some comment"
                    height="50vh"
                    width={"100%"}
                    value={code}
                    theme={_theme.value}
                    onChange={(e) => setCode(e || "")}
                  />
                </Box>
              </Box>
            </Box>
            <Button
              onClick={() => {
                const matches = (data.testCase as string).match(
                  /\b\d+\b/g
                ) as RegExpMatchArray;

                const inputValues = matches.map(Number);
                compile(code, JSON.parse(language).id, inputValues.toString())
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
                  route("/dash-board/Student/question");
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
