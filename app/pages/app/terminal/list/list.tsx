import Authenticated from "../../../../layout";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import TerminalButton from "../../../../components/TerminalButton/TerminalButton";

export default function List() {
    return (
        <Authenticated adminView={true} className="bg-slate-100">
            <div className="h-14 text-xl grid grid-cols-5 border-b-2 bg-white">
                <p className="col-span-3 col-start-2 m-auto text-center">
                    Mes bornes de recharge
                </p>
                <p className="col-span-1 m-auto text-center text-[#50B0C6]">
                    Modifier
                </p>
            </div>
            <div>
                <div className="block m-6 p-3 border-solid border rounded-md bg-white">
                    <span><PlusCircleIcon className="w-8 h-8 mr-8 inline-block float-left"/></span>
                    <span>Ajouter une borne de recharge</span>
                </div>
            </div>
            <div id="terminal-list" className="mb-4">
                <TerminalButton id="1" title="Tesla Wall Connector" subtitle="1 rue de l'Épée" image="/images/terminal-list/terminal-image-test.png"/>
                <TerminalButton id="2" title="Tesla Wall Connector" subtitle="1 rue de l'Épée" image="/images/terminal-list/terminal-image-test.png"/>
            </div>
        </Authenticated>
    )
}