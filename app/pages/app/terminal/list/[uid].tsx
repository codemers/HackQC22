import Authenticated from "../../../../layout";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, database } from "../../../../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; 

export default function Terminal() {
    const router = useRouter();
    const { uid } = router.query;

    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const [terminal, setTerminal] = useState<any>();

    console.log(uid);

    useEffect(() => {
        const fetchData = async () => {
            if(!user) return;
            const usersRef = doc(database, "users", user.uid);
            const docSnap = await getDoc(usersRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let terminals = docSnap.data().terminals;

                console.log(terminals);
                terminals && terminals.map((thisTerminal: any) => {
                    console.log(thisTerminal, thisTerminal.uid, uid);
                    
                    if(thisTerminal.uid === uid) {
                        console.log("Found terminal", thisTerminal);
                        setTerminal(thisTerminal);
                        return;
                    }
                });
            } else {
                console.log("No such document!");
            }
        }
    fetchData()
        .catch(console.error);
    }, [user, uid]);

    console.log("Terminal", terminal);

    return (
        <Authenticated adminView={true} className="bg-slate-100">
            <div className="h-14 text-xl grid grid-cols-5 border-b-2 bg-white">
                <p className="col-span-1 m-auto text-center text-[#50B0C6]">
                    <Link href="/app/terminal/list">
                        <ArrowLeftIcon className="w-6 h-6 inline-block float-right"/>
                    </Link>
                </p>
                <p className="col-span-3 col-start-2 m-auto text-center">
                    Test
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