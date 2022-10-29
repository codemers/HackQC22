import Link from "next/link";
import Authenticated from "../../../layout";

import AccountButton from "../../../components/AccountButton/AccountButton";
import AccountButtonGroup from "../../../components/AccountButtonGroup/AccountButtonGroup";

export default function Profile() {
  return (
    <Authenticated className="m-auto">
      <p className="text-center m-4">
        <img src="/avatar-3.jpg" alt="" className="inline-block h-10 w-10 mr-4 flex-none rounded-full" />
        Profile
      </p>

      <AccountButtonGroup>
        <AccountButton title="Messagerie" link="/app/messages" icon="/avatar-3.jpg"/>
      </AccountButtonGroup>

      <AccountButtonGroup>
        <AccountButton title="Méthodes de paiement" link="/app/payment" icon="/avatar-3.jpg"/>
        <AccountButton title="Paiements auto." link="/app/payment-auto" icon="/avatar-3.jpg"/>
        <AccountButton title="Historique des transactions" link="/app/transactions" icon="/avatar-3.jpg"/>
      </AccountButtonGroup>
      
      <AccountButtonGroup>
        <AccountButton title="Offrir un cadeau" link="/app/gift" icon="/avatar-3.jpg"/>
        <AccountButton title="Saisir un code recu" link="/app/gift-code" icon="/avatar-3.jpg"/>
      </AccountButtonGroup>

      <AccountButtonGroup>
        <AccountButton title="Carte de membre" link="/app/transactions" icon="/avatar-3.jpg"/>
      </AccountButtonGroup>
      
      <AccountButtonGroup>
        <AccountButton title="Mon compte" link="/app/my-account" icon="/avatar-3.jpg"/>
        <AccountButton title="Mes véhicules" link="/app/my-vehicles" icon="/avatar-3.jpg"/>
        <AccountButton title="Mes bornes" link="/app/my-terminal" icon="/avatar-3.jpg"/>
        <AccountButton title="Préférences" link="/app/settings" icon="/avatar-3.jpg"/>
      </AccountButtonGroup>
      
      <AccountButtonGroup>
        <AccountButton title="Boite à outils - FAQ" link="/app/faq" icon="/avatar-3.jpg"/>
        <AccountButton title="À propos" link="/app/about" icon="/avatar-3.jpg"/>
      </AccountButtonGroup>

      <AccountButtonGroup>
        <AccountButton title="Admin" link="/app/me" icon="/avatar-3.jpg"/>
        <AccountButton title="Mode normal" link="/app/map" icon="/avatar-3.jpg"/>
        <AccountButton title="Signout" link="/app/signout" icon="/avatar-3.jpg"/>
      </AccountButtonGroup>

    </Authenticated>
  );
}
