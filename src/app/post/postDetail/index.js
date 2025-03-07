"use client";

import { Formik, Form } from "formik";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import pluralize from "pluralize";

import Badge from "components/badge";
import PrimaryButton from "components/buttons/primary";
import SecondaryButton from "components/buttons/secondary";
import UserImage from "components/userImage";

import { AuthContext } from "context/authContext";

import { timeAgo } from "utils/timeAgo";

import { validationSchema } from "./validationSchema";
import "./styles.css";

const InterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "400",
});

const SemiBoldInterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "500",
});

const BoldInterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "600",
});

const PostDetail = ({ postId, post, fetchPost }) => {
    const [showCommentField, setShowCommentField] = useState(false);
    const [detail, setDetail] = useState("");
    const [fetching, setFetching] = useState(false);
    const [fetchingError, setFetchingError] = useState("");

    const router = useRouter();

    const { username } = useContext(AuthContext);

    const onSubmit = async (values) => {
        const { detail } = values;

        setFetching(true);
        setFetchingError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("authToken") || "",
                },
                body: JSON.stringify({ postId: postId, detail }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Comment failed");
            }

            setShowCommentField(false);
            setDetail("");
            fetchPost();
        } catch (err) {
            setFetchingError(err.message);
        } finally {
            setFetching(false);
        }
    };

    const initialValues = {
        detail: "",
    };

    return (
        <div className="post-detail-root">
            <div className="back-button" onClick={() => router.back()}>
                <img src="/arrow-left.png" alt="go back" width={24} height={24} />
            </div>
            <div className="post-owner-container">
                <UserImage username={post.createdBy} size="xl" />
                <span className={`${SemiBoldInterFont.className} post-owner-name`}>
                    {post.createdBy}
                </span>
                <span className={`${InterFont.className} current-post-when`}>
                    {timeAgo(post.timestamp._seconds)}
                </span>
            </div>
            <Badge community={post.community} />
            <div className={`${BoldInterFont.className} post-title`}>{post.title}</div>
            <div className={`${InterFont.className} post-detail`}>{post.detail}</div>
            <div className="comments-summary-container">
                <img src="/comment.png" width={16} height={16} alt="comment" />
                <span className={`${InterFont.className} comments-count`}>
                    {post.comments.length} {pluralize("Comment", post.comments.length)}
                </span>
            </div>

            <div className="add-comment-container">
                {showCommentField ? (
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            onSubmit({
                                detail: values.detail,
                            });
                        }}
                    >
                        {(formProps) => (
                            <Form>
                                <div className="text-area-container">
                                    <textarea
                                        name="detail"
                                        className={`form-control post-text-area ${
                                            formProps.touched["detail"] &&
                                            formProps.errors["detail"] &&
                                            "is-invalid"
                                        }`}
                                        placeholder="What's on your mind..."
                                        value={detail}
                                        onChange={(e) => {
                                            formProps.setFieldValue("detail", e.target.value);
                                            setDetail(e.target.value);
                                        }}
                                    />
                                    <div id="validationDetail" className="invalid-feedback">
                                        Please provide post comment.
                                    </div>
                                </div>
                                {fetchingError && (
                                    <div className="bg-danger text-white p-3 comment-error-box">
                                        {fetchingError}
                                    </div>
                                )}
                                <div className="buttons-container">
                                    <SecondaryButton onClick={() => setShowCommentField(false)}>
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton loading={fetching}>Post</PrimaryButton>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <SecondaryButton
                        className="custom-secondary-btn"
                        onClick={() => {
                            if (!username) {
                                router.push("/signin");
                            } else {
                                setShowCommentField(true);
                            }
                        }}
                    >
                        Add Comment
                    </SecondaryButton>
                )}
            </div>

            {post.comments.length > 0 && (
                <div className="comments-container">
                    {post.comments.map((comment, index) => (
                        <div key={comment.id} className="comment-container">
                            <div className="comment-user-img-container">
                                <UserImage username={comment.createdBy} />
                            </div>
                            <div>
                                <div className="comment-header-container">
                                    <div className={`${SemiBoldInterFont.className} comment-name`}>
                                        {comment.createdBy}
                                    </div>
                                    <div className={`${InterFont.className} comment-when`}>
                                        {timeAgo(comment.timestamp._seconds)}
                                    </div>
                                </div>
                                <div className={`${InterFont.className} comment-detail`}>
                                    {comment.detail}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostDetail;
