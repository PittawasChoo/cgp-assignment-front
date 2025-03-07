"use client";

import { useRouter } from "next/navigation";

import SecondaryButton from "components/buttons/secondary";

import "./styles.css";

const ErrorPage = ({ refetch }) => {
    const router = useRouter();

    return (
        <div className="error-page-root">
            <div className="error-page-content-container">
                <div className="error-text">Error on fetching data</div>
                <div className="flex">
                    <button
                        type="button"
                        class="btn btn-outline-secondary me-3"
                        onClick={() => router.push("/")}
                    >
                        Home
                    </button>
                    <SecondaryButton onClick={refetch}>Refetch</SecondaryButton>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
