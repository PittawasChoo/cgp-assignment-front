import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

import "./styles.css";

const InterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "600",
});

const Sidebar = () => {
    const router = useRouter();

    return (
        <div
            style={{
                height: "calc(100vh - 60px)",
                width: "280px",
                backgroundColor: "var(--grey100)",
                position: "fixed",
                padding: "40px 28px",
            }}
        >
            <div
                className={`${InterFont.className} side-bar-button`}
                onClick={() => router.push("/")}
            >
                <img src="/home-black.png" alt="home" className="side-bar-icon" />
                Home
            </div>
            <div
                className={`${InterFont.className} side-bar-button`}
                onClick={() => router.push("/our-blog")}
            >
                <img src="/edit-black.png" alt="our blog" className="side-bar-icon" />
                Our Blog
            </div>
        </div>
    );
};

export default Sidebar;
