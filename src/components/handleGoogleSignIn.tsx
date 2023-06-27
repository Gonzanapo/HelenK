import { signIn, useSession } from "next-auth/react";

export function handleGoogleSignIn() {
  signIn("google", { callbackUrl: "/maps" })
    .then(() => {
      console.log("SignIn completed");
    })
    .catch((error) => {
      console.error("Error occurred during signIn:", error);
    });
}

export function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="button_auth">
      <button className="button_google" onClick={handleGoogleSignIn}>
        {sessionData ? "Sign out" : "Registrarse"}
      </button>
    </div>
  );
}
