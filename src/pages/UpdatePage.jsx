import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdatePage() {
    const [post, setPost] = useState({});
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const url = `
    https://fb-rest-race-default-rtdb.firebaseio.com/posts/${params.postId}.json
    `;

    useEffect(() => {
        async function getPost() {
            const response = await fetch(url);
            const data = await response.json();
            setPost(data);
            setCaption(post.caption);
            setImage(post.image);
        }

        getPost();
    }, [post.caption, post.image, url]);

    async function handleSubmit(event) {
        event.preventDefault();
        const postToUpdate = {
            caption: caption,
            image: image,
            uid: post.uid
        };

        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(postToUpdate)
        });

        if (response.ok) {
            navigate("/");
        } else {
            console.log("Something went wrong");
        }
    }

    async function handleDelete() {
        const wantToDelete = confirm("Are you sure you want to delete?");

        if (wantToDelete) {
            const response = await fetch(url, {
                method: "DELETE"
            });

            if (response.ok) {
                navigate("/");
            } else {
                console.log("Something went wrong");
            }
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
            <h1>Update Page</h1>
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
                    <img className="image-preview" src={image} alt="Choose" />
                </label>
                <p className="text-error">{errorMessage}</p>
                <button>Save</button>
            </form>
            <button onClick={handleDelete}>Delete</button>
        </section>
    );
}
