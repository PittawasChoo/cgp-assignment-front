"use client";

import React, { createContext, useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken") || "";
        if (token) {
            const tokenObj = jwtDecode(token);
            const username = tokenObj.username;
            setUsername(username);
        }
    }, [username]);

    const signin = (token) => {
        const tokenObj = jwtDecode(token);
        const username = tokenObj.username;

        setUsername(username);
        localStorage.setItem("authToken", token);
        router.push("/");
    };

    const signout = () => {
        setUsername(null);
        localStorage.removeItem("authToken");
        router.push("/");
    };

    const contextValue = { username, signin, signout };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
