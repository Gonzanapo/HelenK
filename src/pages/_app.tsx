import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "../styles/initial.css"
import "../styles/register.css"
import "../styles/login.css"
import "../styles/resetpwd.css"
import Head from "next/head";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    
      <>
      <Head>
      <title>HelenK</title>
      {/* <link rel="icon" href="/Logo.ico" /> */}
      <meta name="description" content="HelenK" />
      </Head><SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      </>
    
  );
};

export default api.withTRPC(MyApp);
