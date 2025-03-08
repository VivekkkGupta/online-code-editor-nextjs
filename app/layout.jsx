import "./globals.css";
import { SessionProvider } from "next-auth/react"
import { APP_NAME, APP_DESCRIPTION } from "../constants/constants";
import { ThemeProvider } from "next-themes";
import { AppContextProvider } from "@/contexts/AppContext";
import Header from "@/components/Header/Header";

export const metadata = {
  title: `${APP_NAME}`,
  description: `${APP_DESCRIPTION}`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        {/* <SessionProvider session={session}> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <AppContextProvider>

            {children}
          </AppContextProvider>
        </ThemeProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
