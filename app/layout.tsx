import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Storyteller AI",
  description: "App that generates a children's short story and visuals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gradient-to-r from-pink-100 to-blue-200">
        <Header />
        {children}
        <Toaster duration={8000} position="bottom-right" />
      </body>
    </html>
  );
}
