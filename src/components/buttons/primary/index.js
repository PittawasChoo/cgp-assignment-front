import { IBM_Plex_Sans_Thai } from "next/font/google";

import "./styles.css";

const IBMPlexSansThai = IBM_Plex_Sans_Thai({
    variable: "--font-ibm-plex-sans-thai",
    subsets: ["latin", "thai"],
    weight: "500",
});

const PrimaryButton = ({ children, className, loading, onClick }) => {
    return (
        <button
            type="submit"
            className={`btn btn-success ${IBMPlexSansThai.className} ${className}`}
            onClick={onClick}
        >
            {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
            {children}
        </button>
    );
};

export default PrimaryButton;
