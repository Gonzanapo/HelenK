import Image from "next/image";

export const Semaforo: React.FC = () => {
    return <Image src="/images/semaforo.png" width={100} height={100} alt="semaforo" className="logo"/>
}

export const LogoGoogle: React.FC = () => {
    return <Image src="/images/google.png" width={25} height={25} alt="google" className="logoGoogle" />
}

export const Atras: React.FC = () => {
    return <Image src="/images/previous_white.png" width={30} height={30} alt="previous" className="previous" />
}