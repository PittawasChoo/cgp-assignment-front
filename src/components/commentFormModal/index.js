"use client";

import { Formik, Form } from "formik";
import { Inter } from "next/font/google";
import Modal from "react-bootstrap/Modal";

import PrimaryButton from "components/buttons/primary";
import SecondaryButton from "components/buttons/secondary";

import "./styles.css";

const BoldInterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "500",
});

const CommentFormModal = ({
    isOpen,
    onSubmit,
    onClose,
    fetching,
    fetchingError,
    initialValues,
    validationSchema,
    detail,
    setDetail,
}) => {
    return (
        <Modal show={isOpen} onHide={onClose} dialogClassName="comment-modal-container" centered>
            <Modal.Body className="comment-modal-body">
                <div className="header-container">
                    <div className={`${BoldInterFont.className} modal-title`}>Add Comment</div>
                    <div onClick={onClose} className="close-button">
                        <img src="/close.png" alt="close" width={24} height={24} />
                    </div>
                </div>
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
                                <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                                <PrimaryButton loading={fetching}>Post</PrimaryButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default CommentFormModal;
