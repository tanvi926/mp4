import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import styles from "./layout.module.css";
import "./globals.css";

// Title and description for the app.
export const metadata: Metadata = {
  title: "Weather Search",
  description: "Search for current weather by city.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
      <Header />

      {/* Display the current page inside the shared layout. */}
      <main className={styles.main}>{children}</main>
      </body>
      </html>
  );
}

