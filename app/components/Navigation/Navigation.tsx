import Link from "next/link";

export default function Navigation() {
  // Change selon "l'app" sélectionnée
  return (
    <div className="bg-red-50 w-full h-[64px]">
      <div className="flex w-full justify-between">
        <Link href="/app/map">Map</Link>
        <Link href="/app/me">Me</Link>
        <Link href="/signout">signout</Link>
      </div>
    </div>
  );
}
