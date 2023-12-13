import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

export default function PhotoCard({ photo }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/posts/${photo.id}`);
    }

    return (
        <article onClick={handleClick}>
            <UserAvatar uid={photo.uid} />
            <img src={photo.image} alt={photo.caption} />
            <h3>{photo.caption}</h3>
        </article>
    );
}
