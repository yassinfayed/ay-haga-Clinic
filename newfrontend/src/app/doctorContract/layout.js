import Header from '@/components/Header';

export default async function DashboardLayout({ children }) {
  return (
    <>
      <Header logoutOnly={true}/>
      <div className="p-[32px] grow flex-1 flex flex-col">
        {children}
      </div>
    </>
  );
}
