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

const Board = () => {
    const [selectedCommunity, setSelectedCommunity] = useState("All");
    const [isOpen, setIsOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    //   const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");
    const [fetching, setFetching] = useState(false);
    const [fetchingError, setFetchingError] = useState("");
    const router = useRouter();
    const { username } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`);
                if (!res.ok) throw new Error("Failed to fetch posts");

                const data = await res.json();
                setPosts(data);
            } catch (err) {
                // setError(err.message);
            } finally {
                // setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const onSubmit = async (values) => {
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
        console.log("searchLoweCase", searchLowerCase);

        const matchedPosts = posts.filter((post) =>
            post.title.toLowerCase().match(searchLowerCase)
        );
        console.log("matchedPosts", matchedPosts);

        return matchedPosts;
    };

    const filteredPosts = getFilteredPosts();

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
                        width: "798px",
                        paddingTop: "34px",
                        paddingBottom: "34px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            height: "40px",
                            marginBottom: "24px",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                height: "40px",
                                color: "#5B5B5B",
                                flex: 1,
                            }}
                        >
                            <div
                                className="d-flex align-items-center rounded px-3"
                                style={{ border: "1px solid #D8E9E4" }}
                            >
                                <img src="/search.png" width={20} height={20} alt="search" />
                                <input
                                    type="text"
                                    className="form-control border-0 shadow-none"
                                    placeholder="Search"
                                    style={{ background: "transparent" }}
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
                            onSubmit={onSubmit}
                            loading={fetching}
                            error={fetchingError}
                        />
                    </div>

                    <div
                        style={{
                            backgroundColor: "var(--white)",
                            borderRadius: "12px",
                        }}
                    >
                        {filteredPosts.map((post, index) => (
                            <Link href={`/post?id=${post.id}`} key={post.id}>
                                <div
                                    style={{
                                        padding: "20px 22px",
                                        borderBottom:
                                            index === filteredPosts.length - 1
                                                ? "0"
                                                : "1px solid var(--grey100)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <UserImage username={post.createdBy} size="sm" />
                                        <span
                                            className={`${InterFont.className}`}
                                            style={{ color: "var(--grey300)", fontSize: "14px" }}
                                        >
                                            {post.createdBy}
                                        </span>
                                    </div>
                                    <Badge community={post.community} />
                                    <div
                                        className={`${BoldInterFont.className}`}
                                        style={{
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            marginTop: "5px",
                                            color: "#101828",
                                        }}
                                    >
                                        {post.title}
                                    </div>
                                    <div
                                        className={`${InterFont.className} post-detail-truncate`}
                                        style={{
                                            fontSize: "12px",
                                            lineHeight: "14px",
                                            marginTop: "2px",
                                            color: "#101828",
                                        }}
                                    >
                                        {post.detail}
                                    </div>
                                    {post.commentsCount > 0 && (
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <img
                                                src="/comment.png"
                                                width={16}
                                                height={16}
                                                alt="comment"
                                            />
                                            <span
                                                className={`${InterFont.className}`}
                                                style={{
                                                    marginLeft: "5px",
                                                    fontSize: "12px",
                                                    color: "var(--grey300)",
                                                }}
                                            >
                                                {post.commentsCount} Comments
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="right-space"></div>
            </div>
        </div>
    );
};

export default Board;
