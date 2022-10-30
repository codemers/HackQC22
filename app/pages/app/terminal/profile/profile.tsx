import Authenticated from "../../../../layout";

export default function Profile() {
    return (
        <Authenticated adminView={true}>
            Profile view
        </Authenticated>
    );
}