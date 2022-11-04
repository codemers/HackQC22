import Authenticated from "../../../../layout";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import TerminalButton from "../../../../components/TerminalButton/TerminalButton";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, database } from "../../../../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; 
import Link from "next/link";

export default function List() {
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const [terminals, setTerminals] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            if(!user) return;
            const usersRef = doc(database, "users", user.uid);
            const docSnap = await getDoc(usersRef);

            if (docSnap.exists()) {
                setTerminals(docSnap.data().terminals);
            } else {
                console.log("No such document!");
            }
        }

        fetchData()
        .catch(console.error);
    }, [user]);

    return (
        <Authenticated adminView={true} className="bg-slate-100 h-full">
            <div className="h-14 text-xl grid grid-cols-5 border-b-2 bg-white">
                <p className="col-span-3 col-start-2 m-auto text-center">
                    Mes bornes de recharge
                </p>
                <p className="col-span-1 m-auto text-center text-[#50B0C6]">
                    Modifier
                </p>
            </div>
            <Link href="/app/terminal/step1">
                <div className="block m-6 p-3 border-solid border rounded-md bg-white text-[#50B0C6]">
                    <span><PlusCircleIcon className="w-8 h-8 mr-8 inline-block float-left"/></span>
                    <span>Ajouter une borne de recharge</span>
                </div>
            </Link>
            <div id="terminal-list" className="mb-4">
                {
                    terminals && terminals.map((terminal: any) => {
                        return (
                            <TerminalButton key={terminal.uid} uid={terminal.uid} name={terminal.name} address={terminal.address} image="/images/terminal-list/terminal-image-test.png"/>
                        )
                    })
                }
            </div>
        </Authenticated>
    )
}