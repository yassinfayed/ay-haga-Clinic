"use client"
import { Inter } from "next/font/google";
import { ReduxProvider } from "../redux/provider";
import AdminNavbar from "../../../components/AdminNavbar";
import { useDispatch } from "react-redux";
import { authedAction } from "../redux/actions/authActions";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  dispatch(authedAction('user'));

  return (
      <div className={`global-text ${inter.className}`}>
        <AdminNavbar />
        <div className="p-2 m-5">
          {children}
        </div>
      </div>
  );
}
