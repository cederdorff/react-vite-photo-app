import { useEffect, useState } from "react";

export default function UserAvatar({ uid }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        async function getUser() {
            const url = `https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/users/${uid}`;
            const response = await fetch(url);
            const userDoc = await response.json();

            const userObject = {
                name: userDoc.fields.name.stringValue,
                title: userDoc.fields.title.stringValue,
                image: userDoc.fields.image.stringValue
            };

            setUser(userObject);
        }
        getUser();
    }, [uid]);

    return (
        <div className="avatar">
            <img src={user.image} alt={user.name} />
            <span>
                <h3>{user.name}</h3>
                <p>{user.title}</p>
            </span>
        </div>
    );
}
