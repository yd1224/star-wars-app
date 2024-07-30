import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Wars App",
};

// Root layout component for wrapping the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="xzDi9bz9GT4c_oET0O9Ubv4nsAoDPZL9bgYYYT3blXw"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A Star Wars app built with Next.js that shows the list of starwars characters and their individual characteristics"
        />
        <title>Starwars | Discover starwars characters</title>
        <meta
          name="keywords"
          content="starwars, starwars characters, starwars films, starwars species, starwars starships"
        />
        <meta name="author" content="Starwars App" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://star-wars-app-lyart.vercel.app/" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
