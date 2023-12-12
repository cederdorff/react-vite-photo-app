import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

export default function PostItem({ post }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/posts/${post.id}`);
    }

    return (
        <article key={post.id} onClick={handleClick}>
            <UserAvatar uid={post.uid} />
            <img src={post.image} alt={post.caption} />
            <h3>{post.caption}</h3>
        </article>
    );
}
