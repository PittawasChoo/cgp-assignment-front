"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ErrorPage from "components/errorPage";
import Loading from "components/loading";
import Navbar from "components/navbar";
import PostDetail from "./postDetail";
import Sidebar from "components/sidebar";

import "./styles.css";

export default function PostPage() {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const postId = searchParams.get("id");

    const fetchPost = async () => {
        if (!postId) return;

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`);
            if (!res.ok) throw new Error("Failed to fetch post");

            const data = await res.json();
            setPost(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [postId]);

    if (error) return <ErrorPage refetch={fetchPost} />;

    return (
        <div className="board-root">
            <Navbar />
            <div className="board-container">
                <div className="side-bar-container">
                    <Sidebar />
                </div>

                <div className="content-container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <PostDetail postId={postId} post={post} fetchPost={fetchPost} />
                    )}
                </div>
            </div>
        </div>
    );
}
