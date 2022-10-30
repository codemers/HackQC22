import Link from "next/link";
import {ChevronRightIcon} from "@heroicons/react/20/solid";

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
            <div className="inline w-full h-full">
                <span className="">{props.title}</span>
                <span><ChevronRightIcon className="w-4 h-4 inline-block float-right"/></span>
            </div>

        </Link>
    )
}