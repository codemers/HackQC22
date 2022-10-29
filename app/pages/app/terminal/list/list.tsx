import Authenticated from "../../../../layout";

export default function List() {
    return (
        <Authenticated adminView={true}>
            List view
        </Authenticated>
    );
}