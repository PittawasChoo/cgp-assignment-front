"use client";

import { useState } from "react";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import Modal from "react-bootstrap/Modal";

const IBMPlexSansThai = IBM_Plex_Sans_Thai({
    variable: "--font-ibm-plex-sans-thai",
    subsets: ["latin", "thai"],
    weight: "500",
});

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

const DeleteModal = ({ isOpen, postId, onClose, onDeleteSuccess }) => {
    const [fetching, setFetching] = useState(false);
    const [fetchingError, setFetchingError] = useState("");

    const handleCloseModal = () => {
        // clear state
        setFetching(false);
        setFetchingError("");

        onClose();
    };

    const onDeletePost = async (values) => {
        setFetching(true);
        setFetchingError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("authToken") || "",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Delete failed");
            }

            onDeleteSuccess();
            handleCloseModal();
        } catch (err) {
            setFetchingError(err.message);
        } finally {
            setFetching(false);
        }
    };

    return (
        <Modal
            show={isOpen}
            onHide={handleCloseModal}
            dialogClassName="delete-modal-container"
            centered
        >
            <Modal.Body className="delete-modal-body">
                <div className={`${BoldInterFont.className} delete-modal-text-h1`}>
                    Please confirm if you wish to delete the post
                </div>
                <div className={`${InterFont.className} delete-modal-text-h2`}>
                    Are you sure you want to delete the post? Once deleted, it cannot be recovered.
                </div>
                {fetchingError && (
                    <div className="bg-danger ps-3 text-white delete-modal-error-box">
                        {fetchingError}
                    </div>
                )}
                <div className="delete-buttons-container">
                    <button
                        type="submit"
                        className={`btn btn-outline-secondary ${IBMPlexSansThai.className} delete-button`}
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`btn btn-danger ${IBMPlexSansThai.className} delete-button`}
                        onClick={onDeletePost}
                    >
                        {fetching && (
                            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
                        )}
                        Delete
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteModal;
