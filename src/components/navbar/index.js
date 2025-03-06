"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import LogoText from "components/logoText";
import PrimaryButton from "components/buttons/primary";

import { AuthContext } from "context/authContext";

import UserButton from "./userButton";
import "./styles.css";

const Navbar = () => {
    const router = useRouter();
    const { username } = useContext(AuthContext);

    return (
        <div className="nb-container">
            <Link href="/">
                <LogoText className="logo-text-navbar" />
            </Link>
            {username ? (
                <UserButton username={username} />
            ) : (
                <PrimaryButton className="sign-in-btn" onClick={() => router.push("/signin")}>
                    Sign in
                </PrimaryButton>
            )}
        </div>
    );
};

export default Navbar;
