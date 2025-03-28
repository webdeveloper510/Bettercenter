import React, { useState, useEffect } from "react";
import "../../Assets/css/home.css";
import Faq from "./faq";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import vector from "../../Assets/images/Vector.png";
import vector1 from "../../Assets/images/Vector (1).png";
import vector2 from "../../Assets/images/Vector (2).png";
import vector3 from "../../Assets/images/Vector (3).png";
import vector4 from "../../Assets/images/Group 1171276657.png";
import vector5 from "../../Assets/images/Group 1171276542.png";
import group from "../../Assets/images/Group 1171276547.png";
import group1 from "../../Assets/images/Group 1171276551.png";
import { Divide } from "lucide-react";
import group2 from "../../Assets/images/Group 1171276552.png";

import group3 from "../../Assets/images/Group 1171276553.png";
import group4 from "../../Assets/images/Group 1171276554.png";
import group5 from "../../Assets/images/Group 1171276555.png";

import group6 from "../../Assets/images/Group 1171276556.png";
import group7 from "../../Assets/images/Group 1171276556.png";

const Tab = ({ tab, index, moveTab }) => {
    const [, ref] = useDrag({
        type: "TAB",
        item: { index },
    });

    const [, drop] = useDrop({
        accept: "TAB",
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveTab(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });
    return (
        <div ref={(node) => ref(drop(node))} className="tab_drag">
            <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" />
            </svg>

            <div className="">
                <img src={tab.image} alt={tab.title} className="tab-image mt-1" />
                <div className="open_number mt-2">{tab.value}</div>
                <div className="open_number_one mt-2">{tab.title}</div>
            </div>
        </div>
    );
};

const Home = () => {

    const [activeTab, setActiveTab] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [allGames, setAllGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const totalPages = 4;
    const [tabs, setTabs] = useState([
        { id: 1, image: group,  },
        { id: 2, image: group1,  },
        { id: 3, image: group2, },
        { id: 4, image: group3, },
        { id: 5, image: group4,  },
        { id: 6, image: group5,  },
        { id: 7, image: group6,  },
        { id: 8, image: group7, },
    ]);

    const moveTab = (fromIndex, toIndex) => {
        const updatedTabs = [...tabs];
        const [movedTab] = updatedTabs.splice(fromIndex, 1);
        updatedTabs.splice(toIndex, 0, movedTab);
        setTabs(updatedTabs);
    };
    const toggleTab = (tabIndex) => {
        setActiveTab(tabIndex);
    };
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        const API_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMjI5Mzk3LCJpYXQiOjE3NDMxNDI5OTcsImp0aSI6IjM3YWI4MzkxZTg1MDQ2ODBiOWU1NDIxMjFhNGYwY2JlIiwidXNlcl9pZCI6MX0.wyhObqLH1Ro6mJckegd7pnJjgtNdyhHLwGOd1PjW5GE";

        setLoading(true);
        fetch("http://54.174.64.250:8000/money-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_Token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("API Response:", data);
                if (data && data.data) {
                    const extractedGames = Object.values(data.data).map((gameArray) => {
                        const game = gameArray[0]; // Access the first object in each game array
                        const homeTeam = Object.keys(game).find((team) => game[team]["Home Team"]);
                        const awayTeam = Object.keys(game).find((team) => game[team]["Away Team"]);

                        return { homeTeam, awayTeam };
                    });

                    setAllGames(extractedGames);
                } else {
                    setAllGames([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const handleTabClick = (homeTeam, awayTeam) => {
        console.log(`Clicked on: ${homeTeam} vs ${awayTeam}`);
        const url = `/teamdetails`;
        window.open(url, "/teamdetails");
    };
    if (loading) return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading betting odds...</p>
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center my-5 data_page">
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <section className="backgroung_image">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">
                            <h1 className="nba_odds">NBA Odds, Betting Lines, Point Spreads, Totals, Moneylines</h1>
                            <div className="mt-4">
                                <div className="d-flex flex-wrap gap-2">
                                    {[
                                        { id: 1, label: "Overview" },
                                        { id: 2, label: "Games" },
                                        { id: 3, label: "Futures" },
                                        { id: 4, label: "Teams" },
                                        { id: 5, label: "Schedule" },
                                        { id: 6, label: "Injuries" }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            className={`btn_tab ${activeTab === tab.id ? "fw-bold text-white" : "text-dark"}`}
                                            style={{
                                                backgroundColor: activeTab === tab.id ? "#0F93EB" : "transparent",
                                                border: "1px solid #0F93EB",
                                                padding: "7px 30px",
                                                borderRadius: "25px",
                                                cursor: "pointer",
                                                whiteSpace: "nowrap",
                                                color: activeTab === tab.id ? "#fff" : "#0F93EB",
                                            }}
                                            onClick={() => toggleTab(tab.id)}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-5">
                                    {activeTab === 1 && (
                                        <div className="container">
                                            <div className="row">
                                                <h1 className="nba_odds">Upcoming NBA Games</h1>
                                                <div className="col-12 nfl_games mt-3">
                                                    <h6 className="nfl_games_heading">Tomorrow - 5:30AM - NBA</h6>

                                                    {loading ? (
                                                        <p>Loading...</p>
                                                    ) : (
                                                        allGames.map((game, index) => (
                                                            <div
                                                                key={index}
                                                                className="d-flex px-3 tab_hover py-3"
                                                                onClick={() => handleTabClick(game.homeTeam, game.awayTeam)}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <div className="py-2">
                                                                    {/* Away Team */}
                                                                    <div className="d-flex gap-3">
                                                                        <div className="image_icon">
                                                                            <img src={vector5} alt="Away Team" width={19} height={19} />
                                                                        </div>
                                                                        <h6 className="icon_heading pt-2">{game.awayTeam}</h6>
                                                                    </div>

                                                                    {/* Home Team */}
                                                                    <div className="d-flex gap-3 mt-2">
                                                                        <div className="image_icon">
                                                                            <img src={vector5} alt="Home Team" width={19} height={19} />
                                                                        </div>
                                                                        <h6 className="icon_heading pt-2">{game.homeTeam}</h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Remaining tabs (2-6) with placeholder content */}
                                    {[2, 3, 4, 5, 6].map((tabId) => (
                                        activeTab === tabId && (
                                            <div key={tabId} className="container">
                                                <div className="row">
                                                    <h1 className="nba_odds">
                                                        {tabId === 2 ? "NBA Games" :
                                                            tabId === 3 ? "NBA Futures" :
                                                                tabId === 4 ? "NBA Teams" :
                                                                    tabId === 5 ? "NBA Schedule" : "NBA Injuries"}
                                                    </h1>
                                                    <div className="col-12 text-center my-5">
                                                        <p>Content for {["", "Overview", "Games", "Futures", "Teams", "Schedule", "Injuries"][tabId]} tab will be displayed here.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="home_pagination d-flex justify-content-center align-items-center my-5">
                                <button
                                    className="btn me-2"
                                    style={{
                                        backgroundColor: currentPage === 1 ? "#ccc" : "#0F93EB",
                                        color: "white",
                                        padding: "7px 15px",
                                        borderRadius: "15px",
                                        cursor: currentPage === 1 ? "not-allowed" : "pointer"
                                    }}
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const page = index + 1;
                                    return (
                                        <button
                                            key={page}
                                            className={`btn me-2 ${currentPage === page ? "fw-bold text-white" : ""}`}
                                            style={{
                                                backgroundColor: currentPage === page ? "#0F93EB" : "transparent",
                                                border: "1px solid #0F93EB",
                                                padding: "7px 15px",
                                                borderRadius: "15px",
                                                cursor: "pointer",
                                                color: currentPage === page ? "#ffffff" : "#0F93EB",
                                            }}
                                            onClick={() => goToPage(page)}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    className="btn_next"
                                    style={{
                                        backgroundColor: currentPage === totalPages ? "#ccc" : "#0F93EB",
                                        color: "white",
                                        padding: "7px 15px",
                                        borderRadius: "15px",
                                        cursor: currentPage === totalPages ? "not-allowed" : "pointer"
                                    }}
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>

                            {/* FAQ Component */}
                            <Faq />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;