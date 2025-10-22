import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reveel - Competitive Intelligence Platform",
  description: "Monitor competitor websites, detect changes instantly, and get AI-powered insights to make smarter business decisions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
