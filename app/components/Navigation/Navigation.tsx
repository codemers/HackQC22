import Link from "next/link";
import cx from "classix";

type Props = {
  adminView?: boolean;
};

function BottomNav({
  label,
  href,
  icon,
}: {
  label: string;
  href?: string;
  icon?: any;
}) {
  if (!href) {
    return <span>{label}</span>;
  }

  return (
    <Link href={href}>
      <div className="flex items-center flex-col">
        {icon}
        <span className="cursor-pointer px-4 text-sm text-[#00A0B4]">
          {label}
        </span>
      </div>
    </Link>
  );
}

export default function Navigation({ adminView = false }: Props) {
  // Change selon "l'app" sélectionnée
  return (
    <div className={cx("w-full h-[64px] flex items-center")}>
      <div className="flex w-full justify-between items-center">
        {adminView && (
          <>
            <BottomNav label="Ma borne" href="/app/me" />
            <BottomNav label="Compte" href="/app/profile" />
          </>
        )}

        {!adminView && (
          <>
            <BottomNav
              label="Bornes"
              href="/app/map"
              icon={
                <div className="w-6 h-6">
                  <svg
                    viewBox="0 0 73 73"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.5 32.5125C34.2887 32.5125 32.5125 34.2887 32.5125 36.5C32.5125 38.7113 34.2887 40.4875 36.5 40.4875C38.7113 40.4875 40.4875 38.7113 40.4875 36.5C40.4875 34.2887 38.7113 32.5125 36.5 32.5125ZM36.5 0.25C16.49 0.25 0.25 16.49 0.25 36.5C0.25 56.51 16.49 72.75 36.5 72.75C56.51 72.75 72.75 56.51 72.75 36.5C72.75 16.49 56.51 0.25 36.5 0.25ZM44.4387 44.4387L14.75 58.25L28.5613 28.5613L58.25 14.75L44.4387 44.4387Z"
                      fill="#00A0B4"
                    />
                  </svg>
                </div>
              }
            />
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
