"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PostPage() {
    const searchParams = useSearchParams();
    const postId = searchParams.get("id");
    const [post, setPost] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");

    useEffect(() => {
        if (!postId) {
            setError("Post ID is missing");
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`);
                if (!res.ok) throw new Error("Failed to fetch post");

                const data = await res.json();
                setPost(data);
            } catch (err) {
                // setError(err.message);
            } finally {
                // setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    //   if (loading) return <p>Loading...</p>;
    //   if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p>{post.detail}</p>
            <small className="text-gray-500">Community: {post.community}</small>
        </div>
    );
}
