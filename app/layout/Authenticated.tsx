import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Authenticated({ children }: Props) {
  // Authenticated logic...

  return <>{children}</>;
}
