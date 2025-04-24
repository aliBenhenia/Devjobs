import type { Metadata } from "next";
import "@/styles/globals.css";
import AppLayout from "@/components/layout/AppLayout";

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
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
