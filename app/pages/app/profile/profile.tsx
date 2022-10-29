import Link from "next/link";
import Authenticated from "../../../layout";

import { database, app } from "../../../utils/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import AccountButton from "../../../components/Navigation/AccountButton";

export default function Profile() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  return (
    <Authenticated className="m-auto">
      <p>
        <img src="/avatar-3.jpg" alt="" className="inline-block h-10 w-10 flex-none rounded-full" />
        Profile
      </p>
      <AccountButton title="Messagerie" link="/app/messages" icon="/avatar-3.jpg"/>
      <AccountButton title="Méthodes de paiement" link="/app/payment" icon="/avatar-3.jpg"/>
      <AccountButton title="Paiements auto." link="/app/payment-auto" icon="/avatar-3.jpg"/>
      <AccountButton title="Historique des transactions" link="/app/transactions" icon="/avatar-3.jpg"/>
      <AccountButton title="Offrir un cadeau" link="/app/gift" icon="/avatar-3.jpg"/>
      <AccountButton title="Saisir un code recu" link="/app/gift-code" icon="/avatar-3.jpg"/>
      <AccountButton title="Carte de membre" link="/app/transactions" icon="/avatar-3.jpg"/>
      <AccountButton title="Mon compte" link="/app/my-account" icon="/avatar-3.jpg"/>
      <AccountButton title="Mes véhicules" link="/app/my-vehicles" icon="/avatar-3.jpg"/>
      <AccountButton title="Mes bornes" link="/app/my-terminal" icon="/avatar-3.jpg"/>
      <AccountButton title="Préférences" link="/app/settings" icon="/avatar-3.jpg"/>
      <AccountButton title="Boite à outils - FAQ" link="/app/faq" icon="/avatar-3.jpg"/>
      <AccountButton title="À propos" link="/app/about" icon="/avatar-3.jpg"/>

      <Link href="/app/me" className="block">Admin</Link>
      <Link href="/app/map" className="block">Mode normal</Link>
      <Link href="/signout" className="block">Signout</Link>
    </Authenticated>
  );
}
