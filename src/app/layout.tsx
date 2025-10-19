import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reveel - Competitive Intelligence",
  description: "Track competitors, detect changes, and generate AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
