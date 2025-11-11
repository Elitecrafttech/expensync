import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./mycomponent/navbar";
import { ThemeProvider } from "./theme-provider";
import Sidebar from "./mycomponent/Sidebar";
import { ExpenseProvider } from "./context/ExpenseContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExpenSync – Expense Tracker",
  description: "Track expenses with live currency conversion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <ExpenseProvider>

          {/* <Navbar />
          {children} */}



           <div className="flex flex-col min-h-screen">
              <Navbar />    
              <div className="flex flex-1 overflow-hidden  min-h-0"  >
                <Sidebar /> 
                <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-[13px] lg:p-6 rounded-[50px] lg:rounded-none">{children}</main>
              </div>
            </div>
           </ExpenseProvider>   
        </ThemeProvider>
      </body>
    </html>
  );
}
