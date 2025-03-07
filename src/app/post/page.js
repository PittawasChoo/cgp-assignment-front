"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

    if (!error) return <ErrorPage refetch={fetchPost} />;

    return (
        <div className="board-root">
            <Navbar />
            <div className="board-container">
                <div style={{ width: "280px", minWidth: "280px" }}>
                    <Sidebar />
                </div>

                <div
                    style={{
                        flexShrink: 1,
                        minHeight: "calc(100vh - 60px)",
                        flex: 1,
                        paddingTop: "36px",
                        backgroundColor: "var(--white)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
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
