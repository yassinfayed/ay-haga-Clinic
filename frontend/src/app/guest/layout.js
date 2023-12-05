"use client";
import { Inter } from "next/font/google";
import { ReduxProvider } from "../redux/provider";
import NavbarPatient from "../../../components/NavbarPatient";
import Footer from "../../../components/Footer";
import NavbarDoc from "../../../components/NavbarDoc";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div
      className={`global-text ${inter.className} position-relative `}
      style={{ minHeight: "100vh" }}>
      <div className=" mx-4 " style={{ paddingBottom: "14rem" }}>
        <ReduxProvider> {children} </ReduxProvider>
      </div>
      <Footer />
    </div>
  );
}
