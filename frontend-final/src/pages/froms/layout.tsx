import { Providers } from "../../reducers/provider";
import ThemeProvider from "../../mui/provider/themeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
export default function MuiLayout() {
  return (
    <>
      <Providers>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </Providers>
      <ToastContainer />
    </>
  );
}
