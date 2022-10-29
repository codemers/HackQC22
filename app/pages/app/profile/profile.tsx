import Link from "next/link";
import Authenticated from "../../../layout";

export default function Profile() {
  return (
    <Authenticated>
      <h1>Profile</h1>
      <Link href="/app/me">Admin</Link>
      <Link href="/app/map">Mode normal</Link>
      <Link href="/signout">Signout</Link>
    </Authenticated>
  );
}
