"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import BlobAnimation from "@/components/BlobAnimation";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { store } from './../lib/reduxStore/dataStore';
import { Provider } from "react-redux";
import Head from "next/head";
import ReduxInitializer from "@/components/ReduxInitializer";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
const geistSans = Geist({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
          <Head>
        <title>My Custom Page</title>
        <meta name="description" content="This is a custom description for my page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${roboto.variable} ${geistMono.variable} antialiased`}
      ><AppRouterCacheProvider> 
          <ThemeProvider theme={theme}>
          <Provider store={store}>
          <ReduxInitializer /> 
          <Toaster/>
            <Navbar/>
            {children} </Provider>
          </ThemeProvider>
          
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
