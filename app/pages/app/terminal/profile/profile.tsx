import Link from "next/link";
import Authenticated from "../../../../layout";

export default function Profile() {
  return (
    <Authenticated
      adminView={true}
      className="flex items-center justify-center h-full"
    >
      <Link href="/app/map">
        <button className="w-full h-14 border solid rounded-3xl bg-[#02B3C9] text-white uppercase text-xs mb-4 px-4">
          {`Passer en mode "recherche"`}
        </button>
      </Link>
    </Authenticated>
  );
}
