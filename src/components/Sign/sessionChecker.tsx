import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SessionChecker = () => {
    const { data: sessionData } = useSession();
    const router = useRouter();
    
    useEffect(() => {
      const redirectTimeout = setTimeout(() => {
        if (!sessionData) {
          notifications.show({
            title: "Error",
            message: "Debe ingresar a su cuenta primero",
            color: "red",
            autoClose: 3000,
          });
          void router.push("/sign");
        }
      }, 50000);
      return () => clearTimeout(redirectTimeout);
    }, [router, sessionData]);

    return null;
}

export default SessionChecker;