import Sidebar from "@/components/Sidebar";
import DrawerNavigation from "./components/RightBar";

export default async function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />

      <div className="p-[32px] grow flex-1 sm:ml-64 flex flex-col">
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
}
