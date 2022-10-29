/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Authenticated from "../../../layout";
import { InboxIcon, CreditCardIcon, ArrowPathIcon, ClockIcon, 
  GiftIcon, UserCircleIcon, TruckIcon, Cog6ToothIcon, 
  QuestionMarkCircleIcon, InformationCircleIcon, ArrowRightOnRectangleIcon} from "@heroicons/react/20/solid";

import AccountButton from "../../../components/AccountButton/AccountButton";
import AccountButtonGroup from "../../../components/AccountButtonGroup/AccountButtonGroup";

import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, database } from "../../../utils/firebaseConfig";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore"; 

export default function Profile() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if(!user) return;
      const usersRef = doc(database, "users", user.uid);
      const docSnap = await getDoc(usersRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setProfile(docSnap.data());

      } else {
        console.log("No such document!");
      }
    }
  
    fetchData()
      .catch(console.error);
  }, [user])

  return (
    <Authenticated className="m-auto">
      <p className="text-center m-4">
        {profile?.name}
      </p>

      <AccountButtonGroup>
        <AccountButton title="Messagerie" link="/app/messages" icon={<InboxIcon className="w-4 h-4 inline-block" />}/>
      </AccountButtonGroup>

      <AccountButtonGroup>
        <AccountButton title="Méthodes de paiement" link="/app/payment" icon={<CreditCardIcon className="w-4 h-4 inline-block" />}/>
        <AccountButton title="Paiements auto." link="/app/payment-auto" icon={<ArrowPathIcon className="w-4 h-4 inline-block" />}/>
        <AccountButton title="Historique des transactions" link="/app/transactions" icon={<ClockIcon className="w-4 h-4 inline-block" />}/>
      </AccountButtonGroup>
      
      <AccountButtonGroup>
        <AccountButton title="Offrir un cadeau" link="/app/gift" icon={<GiftIcon className="w-4 h-4 inline-block" />}/>
        <AccountButton title="Saisir un code recu" link="/app/gift-code" icon={<GiftIcon className="w-4 h-4 inline-block" />}/>
      </AccountButtonGroup>
      
      <AccountButtonGroup>
        <AccountButton title="Carte de membre" link="/app/transactions" icon={<CreditCardIcon className="w-4 h-4 inline-block" />}/>
      </AccountButtonGroup>

      <AccountButtonGroup>
        <AccountButton title="Mon compte" link="/app/my-account" icon={<UserCircleIcon className="w-4 h-4 inline-block" />}/>
        <AccountButton title="Mes véhicules" link="/app/my-vehicles" icon={<TruckIcon className="w-4 h-4 inline-block" />}/>
        <AccountButton title="Mes bornes" link="/app/me" icon={<TruckIcon className="w-4 h-4 inline-block" />}/>
        <AccountButton title="Préférences" link="/app/settings" icon={<Cog6ToothIcon className="w-4 h-4 inline-block" />}/>
      </AccountButtonGroup>

      <AccountButtonGroup>
        <AccountButton title="Boite à outils - FAQ" link="/app/faq" icon={<QuestionMarkCircleIcon className="w-4 h-4 inline-block" />}/>
        <AccountButton title="À propos" link="/app/about" icon={<InformationCircleIcon className="w-4 h-4 inline-block" />}/>
      </AccountButtonGroup>

      <AccountButtonGroup>
        <AccountButton title="Déconnection" link="/signout" icon={<ArrowRightOnRectangleIcon className="w-4 h-4 inline-block"/>}/>
      </AccountButtonGroup>

    </Authenticated>
  );
}
