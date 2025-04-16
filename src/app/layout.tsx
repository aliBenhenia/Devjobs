import type { Metadata } from "next";
import "./globals.css";
import NavbarLayout from "@/components/layout/NavbarLayout";

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
    <html lang="en">
      <body>
        <NavbarLayout>{children}</NavbarLayout>
      </body>
    </html>
  );
}
