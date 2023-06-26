import { signIn, signOut, useSession } from "next-auth/react";



export async function handleGoogleSignIn(){
    
    signIn("google",{callbackUrl:"/maps"})
}

export function AuthShowcase() {
    const { data: sessionData } = useSession();

    return (
        <div className="button_auth">
            <button
                className="button_google"
                onClick={ handleGoogleSignIn}
            >
                {sessionData ? "Sign out" : "Registrarse"}
            </button>
        </div>
    );
}