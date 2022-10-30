import Authenticated from "../../../../layout";

export default function History() {
    return (
        <Authenticated adminView={true}>
            History view
        </Authenticated>
    );
}