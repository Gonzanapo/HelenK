import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { useEffect } from "react";

const SessionChecker = () => {
    const { data: sessionData, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      console.log(sessionData)
      console.log("hola");
      const redirectTimeout = setTimeout(() => {
        if (!sessionData) {
          notifications.show({
            title: "Error",
            message: "Debe ingresar a su cuenta primero",
            color: "red",
            autoClose: 2000,
          });
              void router.push("/sign");
        }
      }, 2000);
      return () => clearTimeout(redirectTimeout);
    }, [router, sessionData]);

    return null;
}

export default SessionChecker;