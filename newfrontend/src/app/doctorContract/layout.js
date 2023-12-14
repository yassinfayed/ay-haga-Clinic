import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }) {
  return (
    <>
      <div className="p-[32px] grow flex-1 flex flex-col">
        {children}
      </div>
    </>
  );
}

