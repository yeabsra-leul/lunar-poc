import React from "react";
import "./globals.css";
import Layout from "@/components/Layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="font-sans bg-neutral-50 text-neutral-900 min-h-screen sticky top-0 overflow-y-auto">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
