import { IBM_Plex_Sans_Thai } from "next/font/google";

import "./styles.css";

const IBMPlexSansThai = IBM_Plex_Sans_Thai({
    variable: "--font-ibm-plex-sans-thai",
    subsets: ["latin", "thai"],
    weight: "400",
});

const Badge = ({ community }) => {
    return <div className={`${IBMPlexSansThai.className} badge-root`}>{community}</div>;
};

export default Badge;
