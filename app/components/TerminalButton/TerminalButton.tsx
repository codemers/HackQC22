import {ChevronRightIcon, PlusCircleIcon} from "@heroicons/react/24/outline";

type TerminalButtonProps = {
    title: string;
    subtitle: string;
    icon: any;
};
  
export default function TerminalButton(props: TerminalButtonProps) {
    return (
        <div className="TerminalButton flex p-3 ml-6 mr-6 bg-white">
            <span><PlusCircleIcon className="w-8 h-8 mr-8 inline-block float-left"/></span>
            <div className="w-4/5">
                <div className="flex-column flex-grow flex-wrap">
                    <span className="title block">{props.title}</span>
                    <span className="subtitle block">{props.subtitle}</span>
                </div>
            </div>
            <span><ChevronRightIcon className="w-4 h-4 inline-block float-right"/></span>
        </div>
    )
}