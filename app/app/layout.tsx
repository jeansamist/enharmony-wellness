import { AppTopbar } from "@/components/app-topbar";
import { Sidebar } from "@/components/sidebar";
import AuthProvider from "@/providers/auth.provider";
import { getAuthenticatedUser } from "@/services/auth.services";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedUser();
  return (
    <AuthProvider initialUser={user}>
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <AppTopbar />
          <div className="flex-1 w-full overflow-y-auto p-6 md:p-12 pb-0">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
