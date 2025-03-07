"use client";

import { Formik, Form } from "formik";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";

import PrimaryButton from "components/buttons/primary";
import SecondaryButton from "components/buttons/secondary";

import { COMMUNITY_OPTIONS } from "constants/communityOptions";

import { validationSchema } from "./validationSchema";
import "./styles.css";

const BoldInterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "600",
});

const PostFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    detail,
    community,
    editForm = false,
    loading = false,
    error = "",
}) => {
    const [inputTitle, setInputTitle] = useState(title);
    const [inputDetail, setInputDetail] = useState(detail);
    const [inputCommunity, setInputCommunity] = useState(community);

    const initialValues = { community, title, detail };

    useEffect(() => {
        setInputTitle(title);
        setInputDetail(detail);
        setInputCommunity(community);
    }, [title, detail, community]);

    const handleCloseModal = () => {
        // clear state
        setInputTitle("");
        setInputDetail("");
        setInputCommunity("");

        onClose();
    };

    return (
        <Modal
            show={isOpen}
            onHide={handleCloseModal}
            dialogClassName="custom-modal-container"
            centered
        >
            <Modal.Body className="custom-modal-body">
                <div className="header-container">
                    <div className={`${BoldInterFont.className} modal-title`}>
                        {editForm ? "Edit Post" : "Create Post"}
                    </div>
                    <div onClick={handleCloseModal} className="close-button">
                        <img src="/close.png" alt="close" width={24} height={24} />
                    </div>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onSubmit({
                            community: values.community,
                            title: values.title,
                            detail: values.detail,
                        });
                    }}
                >
                    {(formProps) => (
                        <Form className="post-form-container">
                            <DropdownButton
                                name="community"
                                as={ButtonGroup}
                                variant={
                                    formProps.touched["community"] && formProps.errors["community"]
                                        ? "outline-danger"
                                        : "outline-success"
                                }
                                title={inputCommunity || "Choose a community"}
                                className={`modal-dropdown-btn ${
                                    formProps.touched["community"] && formProps.errors["community"]
                                        ? "is-invalid"
                                        : ""
                                }`}
                            >
                                {COMMUNITY_OPTIONS.map((option) => (
                                    <Dropdown.Item
                                        key={option}
                                        onClick={() => {
                                            formProps.setFieldValue("community", option);
                                            setInputCommunity(option);
                                        }}
                                        active={inputCommunity === option}
                                    >
                                        {option}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                            <div id="validationTitle" className="invalid-feedback">
                                Please provide post community scope.
                            </div>
                            <div className="title-field-container">
                                <input
                                    name="title"
                                    type="text"
                                    className={`form-control ${
                                        formProps.touched["title"] && formProps.errors["title"]
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Title"
                                    value={inputTitle}
                                    onChange={(e) => {
                                        formProps.setFieldValue("title", e.target.value);
                                        setInputTitle(e.target.value);
                                    }}
                                />
                                <div id="validationTitle" className="invalid-feedback">
                                    Please provide post title.
                                </div>
                            </div>
                            <div className="detail-field-container">
                                <textarea
                                    name="detail"
                                    className={`form-control form-modal-text-area ${
                                        formProps.touched["detail"] &&
                                        formProps.errors["detail"] &&
                                        "is-invalid"
                                    }`}
                                    placeholder="What's on your mind..."
                                    value={inputDetail}
                                    onChange={(e) => {
                                        formProps.setFieldValue("detail", e.target.value);
                                        setInputDetail(e.target.value);
                                    }}
                                />
                                <div id="validationDetail" className="invalid-feedback">
                                    Please provide post content.
                                </div>
                            </div>
                            {error && (
                                <div className="bg-danger text-white p-3 form-modal-error-box">
                                    {error}
                                </div>
                            )}
                            <div className="buttons-container">
                                <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                                <PrimaryButton loading={loading}>Post</PrimaryButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default PostFormModal;
