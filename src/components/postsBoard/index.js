"use client";

import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Link from "next/link";

import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import PostFormModal from "components/postFormModal";
import UserImage from "components/userImage";
import Badge from "components/badge";
import PrimaryButton from "components/buttons/primary";

import { FILTER_COMMUNITY_OPTIONS } from "constants/communityOptions";

import { AuthContext } from "context/authContext";

import "./styles.css";
import Loading from "components/loading";
import ErrorPage from "components/errorPage";

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
    const [isOpen, setIsOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(false);
    const [fetchingError, setFetchingError] = useState("");
    const router = useRouter();
    const { username } = useContext(AuthContext);

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
                    <div className="filter-container">
                        <div className="search-container">
                            <div className="d-flex align-items-center rounded px-3 search-box">
                                <img src="/search.png" width={20} height={20} alt="search" />
                                <input
                                    type="text"
                                    className="form-control border-0 shadow-none search-input"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <DropdownButton
                            as={ButtonGroup}
                            variant="text"
                            title={selectedCommunity === "All" ? "Community" : selectedCommunity}
                            className="dropdown-btn"
                        >
                            {FILTER_COMMUNITY_OPTIONS.map((option) => (
                                <Dropdown.Item
                                    key={option}
                                    onClick={() => setSelectedCommunity(option)}
                                    active={selectedCommunity === option}
                                >
                                    {option}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>

                        <PrimaryButton
                            className="create-btn"
                            onClick={() => {
                                if (!username) {
                                    router.push("/signin");
                                } else {
                                    setIsOpen(true);
                                }
                            }}
                        >
                            Create +
                        </PrimaryButton>

                        <PostFormModal
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            onSubmit={onCreatePost}
                            loading={fetching}
                            error={fetchingError}
                        />
                    </div>
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
                                                            {post.commentsCount} Comments
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
                <div className="right-space"></div>
            </div>
        </div>
    );
};

export default PostsBoard;
