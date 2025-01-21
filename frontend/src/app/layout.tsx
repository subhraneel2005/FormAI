import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FormAI",
  description: "Transform PDFs into structured, actionable data using AI-powered text extraction and classification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
