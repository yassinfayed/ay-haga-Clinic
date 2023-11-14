'use client'
import { Inter } from "next/font/google";
import { ReduxProvider } from "../redux/provider";
import NavbarPatient from "../../../components/NavbarPatient";
import Footer from "../../../components/Footer";
import NavbarDoc from "../../../components/NavbarDoc";

const inter = Inter({ subsets: ["latin"] });


const role = JSON.parse(localStorage.getItem('userInfo')).data.user.role;


export default function RootLayout({ children }) {
  return (
      <div className={`global-text ${inter.className}`}>
        {role==='patient' && <NavbarPatient />}
        {role==='doctor' &&<NavbarDoc />}
        <div className="p-2 my-5 mx-4">
        <ReduxProvider> {children} </ReduxProvider>
        </div>
        <Footer/>
      </div>
  );
}
