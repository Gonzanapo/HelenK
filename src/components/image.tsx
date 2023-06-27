import Image from "next/image";

export const Semaforo: React.FC = () => {
    return <Image src="/images/semaforo.png" width={100} height={100} alt="semaforo" className="logo"/>
}

export const LogoGoogle: React.FC = () => {
    return <Image src="/images/google.png" width={25} height={25} alt="google" className="logoGoogle" />
}

export const Previous: React.FC = () => {
    return <Image src="/images/previousWhite.png" width={30} height={1} alt="previous" className="previous" />
}


export const User: React.FC = () => {
    return <Image src="/images/user.png" width={25} height={25} alt="previous" className="previous" />
}

export const PasswordFill: React.FC = () => {
    return <Image src="/images/padlock.png" width={25} height={25} alt="previous" className="previous" />
}

export const Password: React.FC = () => {
    return <Image src="/images/padlockWhite.png" width={25} height={25} alt="previous" className="previous" />
}
