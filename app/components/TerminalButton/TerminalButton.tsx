/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

type TerminalButtonProps = {
    id: string;
    title: string;
    subtitle: string;
    image: string;
};

export default function TerminalButton(props: TerminalButtonProps) {
    return (
        <Link href={"/app/terminal/list/" + props.id} className="TerminalButton p-3 ml-6 mr-6 bg-white grid grid-cols-6">
            <span className="m-auto text-center">
                <img src={props.image} alt="" className="w-12 h-12"/>
            </span>
            <span className="col-span-4 flex">
                <div className="flex-column flex-grow flex-wrap">
                    <span className="title block">{props.title}</span>
                    <span className="subtitle block">{props.subtitle}</span>
                </div>
            </span>
            <span><ChevronRightIcon className="w-4 h-4 inline-block float-right"/></span>
        </Link>
    )
}