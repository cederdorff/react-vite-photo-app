import { useEffect, useState } from "react";

export default function UserAvatar({ uid }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        async function getUser() {
            const url = `https://fb-rest-race-default-rtdb.firebaseio.com/users/${uid}.json`;
            const response = await fetch(url);
            const data = await response.json();
            setUser(data);
        }
        getUser();
    }, [uid]);

    return (
        <div className="avatar">
            <img src={user?.image} alt={user?.id} />
            <span>
                <h3>{user?.name}</h3>
                <p>{user?.title}</p>
            </span>
        </div>
    );
}
