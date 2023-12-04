"use client";
import { Inter } from "next/font/google";
import { ReduxProvider } from "../redux/provider";
import NavbarPatient from "../../../components/NavbarPatient";
import Footer from "../../../components/Footer";
import NavbarDoc from "../../../components/NavbarDoc";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authedAction } from "../redux/actions/authActions";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  dispatch(authedAction('patient'));
  const role = JSON.parse(localStorage.getItem("userInfo")).data.user.role;

  return (
    <div
      className={`global-text ${inter.className} min-vh-100 d-flex flex-column`}
    >
      {role === "patient" && <NavbarPatient />}
      {role === "doctor" && <NavbarDoc />}
      <div className=" mx-4 ">
        <ReduxProvider> {children} </ReduxProvider>
      </div>
      <Footer />
    </div>
  );
}
