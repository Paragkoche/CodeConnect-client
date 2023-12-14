import "./globals.css";
import Navbar from "../../components/all/navbar";
import Footer from "../../components/all/footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
