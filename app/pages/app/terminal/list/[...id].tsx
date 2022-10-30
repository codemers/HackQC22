import Authenticated from "../../../../layout";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Terminal() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Authenticated adminView={true} className="bg-slate-100">
            <div className="h-14 text-xl grid grid-cols-5 border-b-2 bg-white">
                <p className="col-span-1 m-auto text-center text-[#50B0C6]">
                    <Link href="/app/terminal/list">
                        <ArrowLeftIcon className="w-6 h-6 inline-block float-right"/>
                    </Link>
                </p>
                <p className="col-span-3 col-start-2 m-auto text-center">
                    { id } - terminal name
                </p>
            </div>
            <div className="bg-slate-100">
                <div className="aboutTerminal">
                    <p>À propos</p>
                    <div className="map">

                    </div>
                </div>
            </div>
        </Authenticated>
    )
}