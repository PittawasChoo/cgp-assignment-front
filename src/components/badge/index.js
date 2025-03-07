import { IBM_Plex_Sans_Thai } from "next/font/google";

const IBMPlexSansThai = IBM_Plex_Sans_Thai({
    variable: "--font-ibm-plex-sans-thai",
    subsets: ["latin", "thai"],
    weight: "400",
});

const Badge = ({ community }) => {
    return (
        <div
            className={`${IBMPlexSansThai.className}`}
            style={{
                textTransform: "capitalize",
                fontSize: "12px",
                height: "24px",
                padding: "4px 8px",
                backgroundColor: "#F3F3F3",
                color: "#4A4A4A",
                borderRadius: "16px",
                width: "fit-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {community}
        </div>
    );
};

export default Badge;
