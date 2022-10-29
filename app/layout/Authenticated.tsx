import Head from "next/head";
import Image from "next/image";
import Navigation from "../components/Navigation/Navigation";
import styles from "../styles/Home.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Authenticated({ children }: Props) {
  // Authenticated logic...

  return (
    <div
      className="flex flex-col justify-between overflow-scroll"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div>{children}</div>
      <div className="absolute bottom-0 w-full">
        <Navigation />
      </div>
    </div>
  );
}
