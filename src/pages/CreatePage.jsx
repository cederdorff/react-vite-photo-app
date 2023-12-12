import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";

export default function CreatePage() {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const newPost = {
            caption: caption,
            image: image,
            uid: "ZfPTVEMQKf9vhNiUh0bj"
        };

        const url =
            "https://fb-rest-race-default-rtdb.firebaseio.com/posts.json";

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost)
        });

        if (response.ok) {
            navigate("/");
        } else {
            console.log("Something went wrong");
        }
    }

    /**
     * handleImageChange is called every time the user chooses an image in the fire system.
     * The event is fired by the input file field in the form
     */
    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 500000) {
            // image file size must be below 0,5MB
            const reader = new FileReader();
            reader.onload = event => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
            setErrorMessage(""); // reset errorMessage state
        } else {
            // if not below 0.5MB display an error message using the errorMessage state
            setErrorMessage("The image file is too big!");
        }
    }

    return (
        <section className="page">
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Caption
                    <input
                        type="text"
                        placeholder="Type a caption"
                        value={caption}
                        required
                        onChange={event => setCaption(event.target.value)}
                    />
                </label>
                <label>
                    Image
                    <input
                        type="file"
                        className="file-input"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <img
                        className="image-preview"
                        src={image}
                        alt="Choose"
                        onError={event => (event.target.src = imgPlaceholder)}
                    />
                </label>
                <p className="text-error">{errorMessage}</p>
                <button>Create</button>
            </form>
        </section>
    );
}
