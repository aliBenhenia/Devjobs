import type { Metadata } from "next";
import "./globals.css";
import NavbarLayout from "@/components/layout/HeaderLayout";
// import ThemeToggle from "./t";
export const metadata: Metadata = {
  title: "Job board",
  description: "Job board with Next.js 13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="bg-bg dark:bg-bg-dark">
        {/* <ThemeToggle /> */}
        <NavbarLayout>{children}</NavbarLayout>
      </body>
    </html>
  );
}
