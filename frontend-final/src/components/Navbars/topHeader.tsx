"use client";
import Scrollbar from "../../mui/components/Scrollbar";
import TeacherMenu from "./sidebar/teacher.manu";
import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../reducers/hook";
import { chengNav } from "../../reducers/slices/ui.reducer";
import SidebarMenu from "./sidebar/manu";
import logo from "../../static/img/Black_and_White_Monogram_Business_Logo-removebg-preview.png";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.uiReducer.value.navbar);
  const user = useAppSelector((state) => state.userReducer.value);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const theme: any = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          background:
            theme.palette.mode === "dark"
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box mx={2}>
              <img width={200} src={logo} alt="logo" />
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          {user.role == "Student" ? <SidebarMenu /> : <TeacherMenu />}
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        {/* <Box mt={3}>
                    <Box
                        mx={2}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Typography sx={{
                            fontSize: theme.typography.pxToRem(15),
                            fontWeight: theme.typography.fontWeightBold
                        }}>design and develop by <Link style={{
                            textDecoration: "none",
                            color: "inherit",

                        }} target='_blank' href='https://www.webstack.in'>WEBSTACK </Link></Typography>
                    </Box>
                </Box> */}
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={open}
        onClose={() => dispatch(chengNav())}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5),
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box mx={2}>
                <img width={200} src={logo} alt="logo" />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />

            {user.role == "Student" ? <SidebarMenu /> : <TeacherMenu />}
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
