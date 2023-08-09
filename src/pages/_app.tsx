import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "../styles/initial.css";
import "../styles/register.css";
import "../styles/login.css";
import "../styles/resetpwd.css";
import Head from "next/head";
import { MantineProvider, ColorSchemeProvider, type ColorScheme } from "@mantine/core";
import { useState } from "react";
import { Notifications } from "@mantine/notifications";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <>
      <Head>
        <title>HelenK</title>
        {/* <link rel="icon" href="/Logo.ico" /> */}
        <meta name="description" content="HelenK" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <SessionProvider session={session}>
            <Notifications />
            <Component {...pageProps} />
          </SessionProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
