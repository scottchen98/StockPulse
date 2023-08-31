import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Logo from "@/components/Logo";
import MainNav from "@/components/MainNav";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import { DropdownMenu } from "@/components/DropdownMenu";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="flex items-center border-b p-5">
          <Logo />
          <div className="hidden sm:block">
            <MainNav />
          </div>
          <div className="ml-auto">
            <div className="hidden sm:block">
              {/* Render ModeToggle for small and larger screens */}
              <ModeToggle />
            </div>
            <div className="block sm:hidden">
              {/* Render DropdownMenu for extra small screens */}
              <DropdownMenu />
            </div>
          </div>
        </div>
        <main
          className={`grow overflow-y-auto px-5 pt-5 xl:px-10 xl:pt-10 ${inter.className} background-animate dark:to-[#020817]] w-full bg-gradient-to-r from-[#F6F4EB] via-[#91C8E4] to-[#FEBBCC] dark:from-[#020817] dark:via-[#4A5568]`}
        >
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
