import Link from "next/link";

type AccountButtonProps = {
    icon: JSX.Element,
    title: string,
    link: string,

};
  
export default function AccountButton(props: AccountButtonProps) {
    return (
        <Link href={props.link} className="AccountButton block p-2 border-solid border rounded-md">
            <span className="pl-2 pr-4">
                {props.icon}
            </span>
            <span className="">{props.title}</span>
        </Link>
    )
}