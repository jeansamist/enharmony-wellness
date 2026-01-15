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
      <div className="h-screen flex">
        <Sidebar />
        <main className="flex-1">
          <AppTopbar />
          <div className="h-[calc(100vh-6rem)] w-full overflow-y-auto px-6 md:px-12">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
