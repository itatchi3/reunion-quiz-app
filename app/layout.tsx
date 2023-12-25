import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
export const metadata: Metadata = {
  title: "KITANO Reunion 2023",
  description: "Quiz App",
};

const lineSeed = localFont({
  src: [
    {
      path: "./WOFF2/LINESeedJP_OTF_Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./WOFF2/LINESeedJP_OTF_Bd.woff2",
      weight: "600",
      style: "bold",
    },
    {
      path: "./WOFF2/LINESeedJP_OTF_Eb.woff2",
      weight: "900",
      style: "extra-bold",
    },
  ],
  variable: "--lineSeed",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={lineSeed.className}>
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body style={{ backgroundColor: "#FFCC00" }}>{children}</body>
    </html>
  );
}
