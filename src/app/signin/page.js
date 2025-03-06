"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

import PrimaryButton from "components/buttons/primary";
import LogoText from "components/logoText";

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
    const router = useRouter();

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

            localStorage.setItem("jwt", data.jwt);
            localStorage.setItem("username", data.username);
            router.push("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="root">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    padding: "16px",
                }}
            >
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
                    <PrimaryButton className="sign-in-btn" loading={loading}>
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
