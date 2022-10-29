import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

type AccountButtonProps = {
    icon: string,
    title: string,
    link: string,

};
  
export default function AccountButton(props: AccountButtonProps) {
    return (
        <Link href={props.link} className="block p-2 m-4 border-solid border rounded-md">
            <span className="pl-2 pr-4"><EnvelopeIcon className="w-4 h-4 inline-block" /></span><span className="">{props.title}</span>
        </Link>
    )
}