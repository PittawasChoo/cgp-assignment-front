"use client";

import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import LogoText from "components/logoText";
import PrimaryButton from "components/buttons/primary";

import { AuthContext } from "context/authContext";

import "./styles.css";
import UserButton from "./userButton";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { username } = useContext(AuthContext);

    return (
        <div className="nb-container">
            <Link href="/">
                <LogoText className="logo-text-navbar" />
            </Link>
            {username ? (
                <UserButton username={username} />
            ) : (
                <PrimaryButton
                    className="sign-in-btn"
                    onClick={() => router.push(`/signin?redirect=${encodeURIComponent(pathname)}`)}
                >
                    Sign in
                </PrimaryButton>
            )}
        </div>
    );
};

export default Navbar;
