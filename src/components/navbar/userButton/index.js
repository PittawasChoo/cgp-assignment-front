"use client";

import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Offcanvas from "react-bootstrap/Offcanvas";

import UserImage from "components/userImage";

import { AuthContext } from "context/authContext";

import "./styles.css";

const InterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "600",
});

const OffCanvasStyles = {
    backgroundColor: "var(--green500)",
    color: "var(--white)",
    width: "280px",
    padding: "38px 33px",
};

const userButton = ({ username }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { signout } = useContext(AuthContext);

    return (
        <div>
            <div className="user-button-root" onClick={() => setIsOpen(true)}>
                <div className={`name ${InterFont.className}`}>{username}</div>
                <UserImage username={username} />
            </div>

            <div className="mobile-button-root" onClick={() => setIsOpen(true)}>
                <img src="/hamburger.png" width={24} height={24} alt="menu" />
            </div>

            <Offcanvas
                show={isOpen}
                onHide={() => setIsOpen(false)}
                placement="end"
                style={OffCanvasStyles}
            >
                <img
                    src="/arrow-right.png"
                    alt="back"
                    className="slide-pane-arrow-icon"
                    onClick={() => setIsOpen(false)}
                />
                <div
                    className={`${InterFont.className} slide-pane-button`}
                    onClick={() => router.push("/")}
                >
                    <img src="/home.png" alt="home" className="slide-pane-icon" />
                    Home
                </div>
                <div
                    className={`${InterFont.className} slide-pane-button`}
                    onClick={() => router.push("/our-blog")}
                >
                    <img src="/edit.png" alt="our blog" className="slide-pane-icon" />
                    Our Blog
                </div>
                <div className={`${InterFont.className} slide-pane-button`} onClick={signout}>
                    <img src="/logout.png" alt="sign out" className="slide-pane-icon" />
                    Sign Out
                </div>
            </Offcanvas>
        </div>
    );
};

export default userButton;
