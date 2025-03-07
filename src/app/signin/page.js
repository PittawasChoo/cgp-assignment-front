"use client";

import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import LogoText from "components/logoText";
import PrimaryButton from "components/buttons/primary";

import { AuthContext } from "context/authContext";

import "./styles.css";

const InterFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "600",
});

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { signin } = useContext(AuthContext);
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("authToken");
            if (token) {
                router.replace(redirectTo);
            }
        }
    }, []);

    const handleSignIn = async () => {
        if (!username.trim()) {
            setError("Username is required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Sign in failed");
            }

            signin(data.jwt, redirectTo);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sign-in-root">
            <div className="custom-form-container">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSignIn();
                    }}
                >
                    <label className={`form-label ${InterFont.className}`}>Sign In</label>
                    <input
                        type="text"
                        className="form-control"
                        id="usernameInput"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {error && <div className="bg-danger text-white p-3 error-box">{error}</div>}
                    <PrimaryButton className="long-sign-in-btn" loading={loading}>
                        Sign In
                    </PrimaryButton>
                </form>
            </div>
            <div className="logo-container">
                <img src="/logo.png" alt="Logo image" className="logo-image" />
                <LogoText className={`logo-text`} />
            </div>
        </div>
    );
};

export default SignIn;
