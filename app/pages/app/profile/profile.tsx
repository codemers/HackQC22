/* eslint-disable @next/next/no-img-element */
import Authenticated from "../../../layout";

import Image from "next/image";

import { InboxIcon, CreditCardIcon, ArrowPathIcon, ClockIcon, 
  GiftIcon, UserCircleIcon, TruckIcon, Cog6ToothIcon, 
  QuestionMarkCircleIcon, InformationCircleIcon, ArrowRightOnRectangleIcon} from "@heroicons/react/20/solid";

import AccountButton from "../../../components/AccountButton/AccountButton";
import AccountButtonGroup from "../../../components/AccountButtonGroup/AccountButtonGroup";

import terminalImage from "../../../public/images/profile/ma-borne-white.png";

export default function Profile() {
  return (
    <Authenticated className="m-auto">
      <p className="text-center m-4">
        <img
          src="/avatar-3.jpg"
          alt=""
          className="inline-block h-10 w-10 mr-4 flex-none rounded-full"
        />
        Profile
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
      <button className="w-full h-14 border solid rounded-3xl bg-[#02B3C9] text-white uppercase text-sm"><Image src={terminalImage} className="inline h-6 w-6 pr-1" alt=""/>Passer en mode &quot;Ma Borne&quot;</button>
    </Authenticated>
  );
}
