import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import { mapFirebaseDocuments } from "../helpers/FirebaseDataMapper";

export default function HomePage() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        async function getPhotos() {
            const url = `${import.meta.env.VITE_FIRESTORE_URL}/photos`;
            const response = await fetch(url);
            const docs = await response.json();
            console.log(docs);
            const photoDocs = mapFirebaseDocuments(docs);
            console.log(photoDocs);
            setPhotos(photoDocs);
        }

        getPhotos();
    }, []);

    return (
        <section className="page">
            <h1>Photos</h1>
            <section className="grid">
                {photos.map(photo => (
                    <PhotoCard photo={photo} key={photo.id} />
                ))}
            </section>
        </section>
    );
}
