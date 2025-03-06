import { Castoro } from "next/font/google";

const CastoroFont = Castoro({
    variable: "--font-castoro",
    subsets: ["latin"],
    weight: "400",
    style: "italic",
});

const LogoText = ({ className }) => {
    return <p className={`${CastoroFont.className} ${className} mb-0`}>a Board</p>;
};

export default LogoText;
