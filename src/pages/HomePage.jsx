import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";

export default function HomePage() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        async function getPhotos() {
            const url =
                "https://firestore.googleapis.com/v1/projects/race-photo-app/databases/(default)/documents/photos";
            const response = await fetch(url);
            const docs = await response.json();
            console.log(docs);
            const photoDocs = firebaseDataMapper(docs);
            console.log(photoDocs);
            setPhotos(photoDocs);
        }

        getPhotos();
    }, []);

    function firebaseDataMapper(docs) {
        return docs.documents.map(doc => {
            const fields = doc.fields;
            const object = {};
            object.id = doc.name.split("/").pop();
            object.createTime = doc.createTime;
            object.updateTime = doc.updateTime;

            for (const field in fields) {
                object[field] = Object.values(fields[field])[0];
            }
            return object;
        });
    }

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
