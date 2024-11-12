// src/components/CreatePost.js
import React, { useState } from "react";

function CreatePost() {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");

        if (!token) {
            alert("Please log in to create a post.");
            return;
        }

        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            setContent("");
            alert("Post created successfully!");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                />
                <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Post
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
