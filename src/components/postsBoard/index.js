"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import pluralize from "pluralize";

import Badge from "components/badge";
import DeleteModal from "components/deleteModal";
import ErrorPage from "components/errorPage";
import Loading from "components/loading";
import Navbar from "components/navbar";
import PostFormModal from "components/postFormModal";
import Sidebar from "components/sidebar";
import UserImage from "components/userImage";

import "./styles.css";
import FilterBar from "./filterBar";

const InterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "400",
});

const BoldInterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "600",
});

const PostsBoard = ({ onlyMyPosts = false }) => {
    const [selectedCommunity, setSelectedCommunity] = useState("All");
    const [modal, setModal] = useState({ isOpen: false });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false });
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(false);
    const [fetchingError, setFetchingError] = useState("");
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/${onlyMyPosts ? "my-post" : "post"}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("authToken") || "",
                    },
                }
            );
            if (!res.ok) throw new Error("Failed to fetch posts");

            const data = await res.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const onCreatePost = async (values) => {
        const { community, title, detail } = values;

        setFetching(true);
        setFetchingError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("authToken") || "",
                },
                body: JSON.stringify({ community, title, detail }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Post failed");
            }

            router.push("/post?id=" + data.id);
        } catch (err) {
            setFetchingError(err.message);
        } finally {
            setFetching(false);
        }
    };

    const onUpdatePost = async (values) => {
        const { community, title, detail } = values;

        setFetching(true);
        setFetchingError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${modal.postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("authToken") || "",
                },
                body: JSON.stringify({ community, title, detail }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Update failed");
            }

            router.push("/post?id=" + data.id);
        } catch (err) {
            setFetchingError(err.message);
        } finally {
            setFetching(false);
        }
    };

    const getFilteredPosts = () => {
        const filteredCommunityPosts =
            selectedCommunity === "All"
                ? posts
                : posts.filter((post) => post.community === selectedCommunity);

        if (!search || search.length < 2) {
            return filteredCommunityPosts;
        }

        const searchLowerCase = search.toLowerCase();

        const matchedPosts = posts.filter((post) =>
            post.title.toLowerCase().match(searchLowerCase)
        );

        return matchedPosts;
    };

    const filteredPosts = getFilteredPosts();

    if (error) return <ErrorPage refetch={fetchPosts} />;

    return (
        <div className="board-root">
            <Navbar />
            <div className="board-container">
                <div className="side-bar-container">
                    <Sidebar />
                </div>

                <div className="board-content-container">
                    <FilterBar
                        search={search}
                        setSearch={setSearch}
                        selectedCommunity={selectedCommunity}
                        setSelectedCommunity={setSelectedCommunity}
                        setModal={setModal}
                    />
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            {filteredPosts.length === 0 ? (
                                <div className="no-result">No post found.</div>
                            ) : (
                                <div className="posts-board-container">
                                    {filteredPosts.map((post, index) => (
                                        <Link href={`/post?id=${post.id}`} key={post.id}>
                                            <div
                                                className="post-container"
                                                style={{
                                                    borderBottom:
                                                        index === filteredPosts.length - 1
                                                            ? "0"
                                                            : "1px solid var(--grey100)",
                                                }}
                                            >
                                                <div className="owner-container">
                                                    <div className="owner-name-container">
                                                        <UserImage
                                                            username={post.createdBy}
                                                            size="sm"
                                                        />
                                                        <span
                                                            className={`${InterFont.className} post-when`}
                                                        >
                                                            {post.createdBy}
                                                        </span>
                                                    </div>
                                                    {onlyMyPosts && (
                                                        <div className="post-tools-container">
                                                            <div
                                                                className="post-tools-icon-container"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    event.stopPropagation();
                                                                    setModal({
                                                                        isOpen: true,
                                                                        type: "edit",
                                                                        postId: post.id,
                                                                        community: post.community,
                                                                        title: post.title,
                                                                        detail: post.detail,
                                                                    });
                                                                }}
                                                            >
                                                                <img
                                                                    src="/edit-post.png"
                                                                    width={16}
                                                                    height={16}
                                                                    alt="edit"
                                                                />
                                                            </div>
                                                            <div
                                                                className="post-tools-icon-container"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    event.stopPropagation();
                                                                    setDeleteModal({
                                                                        isOpen: true,
                                                                        postId: post.id,
                                                                    });
                                                                }}
                                                            >
                                                                <img
                                                                    src="/trash.png"
                                                                    width={16}
                                                                    height={16}
                                                                    alt="trash"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <Badge community={post.community} />
                                                <div
                                                    className={`${BoldInterFont.className} post-title`}
                                                >
                                                    {post.title}
                                                </div>
                                                <div
                                                    className={`${InterFont.className} post-detail-truncate`}
                                                >
                                                    {post.detail}
                                                </div>
                                                {post.commentsCount > 0 && (
                                                    <div className="comment-summary-container">
                                                        <img
                                                            src="/comment.png"
                                                            width={16}
                                                            height={16}
                                                            alt="comment"
                                                        />
                                                        <span
                                                            className={`${InterFont.className} comment-count`}
                                                        >
                                                            {post.commentsCount}{" "}
                                                            {pluralize(
                                                                "Comment",
                                                                post.commentsCount
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="right-space" />

                <PostFormModal
                    isOpen={modal.isOpen}
                    onClose={() => {
                        setError("");
                        setModal({ isOpen: false });
                    }}
                    onSubmit={modal.type === "edit" ? onUpdatePost : onCreatePost}
                    editForm={modal.type === "edit"}
                    loading={fetching}
                    error={fetchingError}
                    community={modal.type === "edit" ? modal.community : ""}
                    title={modal.type === "edit" ? modal.title : ""}
                    detail={modal.type === "edit" ? modal.detail : ""}
                    postId={modal.type === "edit" ? modal.postId : ""}
                />
                <DeleteModal
                    isOpen={deleteModal.isOpen}
                    onClose={() => setDeleteModal({ isOpen: false })}
                    postId={deleteModal.postId}
                    onDeleteSuccess={fetchPosts}
                />
            </div>
        </div>
    );
};

export default PostsBoard;
