import Link from "next/link";
import cx from "classix";

type Props = {
  adminView?: boolean;
};

function BottomNav({ label, href }: { label: string; href?: string }) {
  if (!href) {
    return <span>{label}</span>;
  }

  return (
    <Link href={href}>
      <span className="cursor-pointer px-4">{label}</span>
    </Link>
  );
}

export default function Navigation({ adminView = false }: Props) {
  // Change selon "l'app" sélectionnée
  return (
    <div className={cx("w-full h-[64px] bg-red-50")}>
      <div className="flex w-full justify-between">
        {adminView && (
          <>
            <BottomNav label="Ma borne" href="/app/me" />
            <BottomNav label="Compte" href="/app/profile" />
          </>
        )}

        {!adminView && (
          <>
            <BottomNav label="Bornes" href="/app/map" />
            <BottomNav label="Trajet" />
            <BottomNav label="Recharge" />
            <BottomNav label="Avantage" />
            <BottomNav label="Compte" href="/app/profile" />
          </>
        )}
      </div>
    </div>
  );
}
