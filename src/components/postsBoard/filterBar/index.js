"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import PrimaryButton from "components/buttons/primary";

import { FILTER_COMMUNITY_OPTIONS } from "constants/communityOptions";

import { AuthContext } from "context/authContext";

import "./styles.css";

const FilterBar = ({ search, setSearch, selectedCommunity, setSelectedCommunity, setModal }) => {
    const { username } = useContext(AuthContext);
    const router = useRouter();

    return (
        <div className="filter-container">
            <div className="search-container">
                <div className="d-flex align-items-center rounded px-3 search-box">
                    <img src="/search.png" width={20} height={20} alt="search" />
                    <input
                        type="text"
                        className="form-control border-0 shadow-none search-input bg-transparent search-input"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ background: "transparent !important" }}
                    />
                </div>
            </div>

            <DropdownButton
                as={ButtonGroup}
                variant="text"
                title={selectedCommunity === "All" ? "Community" : selectedCommunity}
                className="dropdown-btn"
            >
                {FILTER_COMMUNITY_OPTIONS.map((option) => (
                    <Dropdown.Item
                        key={option}
                        onClick={() => setSelectedCommunity(option)}
                        active={selectedCommunity === option}
                    >
                        {option}
                    </Dropdown.Item>
                ))}
            </DropdownButton>

            <PrimaryButton
                className="create-btn"
                onClick={() => {
                    if (!username) {
                        router.push("/signin");
                    } else {
                        setModal({ isOpen: true, type: "add" });
                    }
                }}
            >
                Create +
            </PrimaryButton>
        </div>
    );
};

export default FilterBar;
