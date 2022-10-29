import Authenticated from "../../../layout";

export default function Me() {
  return (
    <Authenticated adminView>
      <h1>Mes bornes</h1>
    </Authenticated>
  );
}
