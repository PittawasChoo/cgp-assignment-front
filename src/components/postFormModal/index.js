"use client";

import { Formik, Form } from "formik";
import { Inter } from "next/font/google";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ReactBoostrapModal from "react-bootstrap/Modal";

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
    loading = false,
    error = "",
    editForm = false,
    title = "",
    detail = "",
    community = "",
}) => {
    const [inputTitle, setInputTitle] = useState(title || "");
    const [inputDetail, setInputDetail] = useState(detail || "");
    const [inputCommunity, setInputCommunity] = useState(community || "");

    const initialValues = { community, title, detail };

    return (
        <ReactBoostrapModal show={isOpen} onHide={onClose} dialogClassName="custom-modal-container">
            <ReactBoostrapModal.Body className="custom-modal-body">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "var(--black)",
                        marginBottom: "30px",
                    }}
                >
                    <div className={`${BoldInterFont.className} modal-title`}>
                        {editForm ? "Edit Post" : "Create Post"}
                    </div>
                    <div onClick={onClose} style={{ cursor: "pointer" }}>
                        x
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
                    {(formProps) => {
                        console.log("formProps", formProps);
                        return (
                            <Form>
                                <DropdownButton
                                    name="community"
                                    as={ButtonGroup}
                                    variant={
                                        formProps.touched["community"] &&
                                        formProps.errors["community"]
                                            ? "outline-danger"
                                            : "outline-success"
                                    }
                                    title={inputCommunity || "Choose a community"}
                                    className={`modal-dropdown-btn ${
                                        formProps.touched["community"] &&
                                        formProps.errors["community"]
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
                                <div style={{ margin: "14px 0" }}>
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
                                <div style={{ marginBottom: "10px" }}>
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
                                    <div className="bg-danger text-white p-3 error-box">
                                        {error}
                                    </div>
                                )}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: "12px",
                                    }}
                                >
                                    <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                                    <PrimaryButton loading={loading}>Post</PrimaryButton>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </ReactBoostrapModal.Body>
        </ReactBoostrapModal>
    );
};

export default PostFormModal;
