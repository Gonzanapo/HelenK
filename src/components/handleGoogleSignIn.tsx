// import { signIn, useSession } from "next-auth/react";
// // import Google from "next-auth/providers/google";
// // import { signIn as signInGoogle } from "next-auth/client";

// // export async function handleGoogleSignIn() {
// //   await signIn("google", { callbackUrl: "/maps" });
// //   console.log("SignIn completed");
// // }
// export const handleGoogleSignIn = async () => {
//     try {
//       await signIn("google", { callbackUrl: "/maps" });
//       console.log("SignIn completed");
//     } catch (error) {
//       console.error("Error occurred during signIn:", error);
//     }
//   };

// export function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   return (
//     <div className="button_auth">
//       <button className="button_google" onClick={handleGoogleSignIn}>
//         {sessionData ? "Sign out" : "Registrarse"}
//       </button>
//     </div>
//   );
// }
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
