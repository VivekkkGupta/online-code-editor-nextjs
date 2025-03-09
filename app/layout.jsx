import "./globals.css";
import { APP_NAME, APP_DESCRIPTION } from "../constants/constants";
import { ThemeProvider } from "next-themes";
import { AppContextProvider } from "@/contexts/AppContext";
import {NextAuthProvider} from './providers'

export const metadata = {
  title: `${APP_NAME}`,
  description: `${APP_DESCRIPTION}`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <NextAuthProvider>
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
        </NextAuthProvider>
      </body>
    </html>
  );
}
