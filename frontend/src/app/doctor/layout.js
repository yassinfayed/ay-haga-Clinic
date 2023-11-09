import FooterDoc from "../../../components/FooterDoc";
import NavbarDoc from "../../../components/NavbarDoc";
import Sidebar from "./Sidebar";


export default function RootLayout({ children }) {
  return (
    <div className="d-flex flex-row min-vh-100">
      <Sidebar />
      <div className="d-flex flex-fill">
        {children}
      </div>
    </div>
  );
}
