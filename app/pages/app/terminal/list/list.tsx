import Authenticated from "../../../../layout";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import TerminalButton from "../../../../components/TerminalButton/TerminalButton";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, database } from "../../../../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; 

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
            console.log("Document data:", docSnap.data());
            setTerminals(docSnap.data().terminals);
        } else {
            console.log("No such document!");
        }
    }

    fetchData()
        .catch(console.error);
    }, [user])

    console.log("Terminals", terminals, typeof terminals);

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
                {
                    terminals && terminals.map((terminal: any) => {
                        return (
                            <TerminalButton key={terminal.name} name={terminal.stationName} address={terminal.address} image="/images/terminal-list/terminal-image-test.png"/>
                        )
                    })
                }
            </div>
        </Authenticated>
    )
}