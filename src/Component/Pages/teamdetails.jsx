import React, { useState, useEffect } from "react";
import "../../Assets/css/home.css";
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
    const [error, setError] = useState(null);
    const [tabs, setTabs] = useState([]);
    const [allGames, setAllGames] = useState({ money: [], spread: [], overUnder: [] });
    const [loading, setLoading] = useState(true);
    const moveTab = (fromIndex, toIndex) => {
        const updatedTabs = [...tabs];
        const [movedTab] = updatedTabs.splice(fromIndex, 1);
        updatedTabs.splice(toIndex, 0, movedTab);
        setTabs(updatedTabs);
    };
    const toggleTab = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    useEffect(() => {
        const API_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMDY4MjA3LCJpYXQiOjE3NDI5ODE4MDcsImp0aSI6IjY4YjhhYzg3MWNiOTRmM2JiMmJmNjEwZWY4NGEwNDM2IiwidXNlcl9pZCI6MX0.rFBgiIn3TkkB1jRmHuQHY6k63Rq1bGe4NViJ3k3h8_Y";

        const urls = [
            "http://54.174.64.250:8000/money-data",
            "http://54.174.64.250:8000/spread-data",
            "http://54.174.64.250:8000/over-under-data"
        ];

        setLoading(true);
        Promise.all(
            urls.map(url =>
                fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_Token}`,
                    },
                }).then(response => response.json())
            )
        )
            .then(([moneyData, spreadData, overUnderData]) => {
                const extractGames = (data) => {
                    if (data && data.data) {
                        return Object.values(data.data).flat();
                    }
                    return [];
                };

                setAllGames({
                    money: extractGames(moneyData),
                    spread: extractGames(spreadData),
                    overUnder: extractGames(overUnderData)
                });

                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);



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
                            <h1 className="nba_odds">Minnesota Timberwolves vs Indiana Pacers</h1>
                            <div className="mt-4">
                                <div className="d-flex flex-wrap gap-2">
                                    {[
                                        { id: 1, label: "Main Markets" },
                                        { id: 2, label: "Moneyline" },
                                        { id: 3, label: "Point Spread" },
                                        { id: 4, label: "Total Points" },
                                        { id: 5, label: "1st Quarter Moneyline" },
                                        { id: 6, label: "1st Half Moneyline" },
                                        { id: 7, label: "1st Half Total Points" },
                                        { id: 8, label: "Team Total" },
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
                                                <h1 className="nba_odds">Timberwolves vs Pacers Moneyline </h1>

                                                {allGames?.money?.length === 0 ? (
                                                    <div className="col-12 text-center my-5">
                                                        <p>No upcoming games available at the moment.</p>
                                                    </div>
                                                ) : (
                                                    allGames?.money?.map((gameMatch, gameIndex) => {
                                                        const teamKeys = Object.keys(gameMatch);
                                                        if (teamKeys.length !== 2) return null;

                                                        const awayTeam = teamKeys.find(key => gameMatch[key]["Away Team"])
                                                            ? gameMatch[teamKeys.find(key => gameMatch[key]["Away Team"])]
                                                            : null;

                                                        const homeTeam = teamKeys.find(key => gameMatch[key]["Home Team"])
                                                            ? gameMatch[teamKeys.find(key => gameMatch[key]["Home Team"])]
                                                            : null;

                                                        if (!homeTeam || !awayTeam) return null;

                                                        return (
                                                            <div key={gameIndex} className="col-12 nfl_games mt-3">
                                                                <div className="d-flex px-2 tab_hover">
                                                                    <div className="d-flex py-5 col-3 drag_responsive_one">
                                                                        <div className="pt-2">
                                                                            <div className="d-flex mt-5 gap-1">
                                                                                <div className="image_icon">
                                                                                    <img src={vector5} alt="Team Icon" width={19} height={19} />
                                                                                </div>
                                                                                <h6 className="icon_heading pt-2">
                                                                                    {awayTeam["Away Team"]}
                                                                                </h6>
                                                                            </div>

                                                                            <div className="d-flex gap-1 mt-2">
                                                                                <div className="image_icon">
                                                                                    <img src={vector5} alt="Team Icon" width={19} height={19} />
                                                                                </div>
                                                                                <h6 className="icon_heading pt-2">
                                                                                    {homeTeam["Home Team"]}
                                                                                </h6>
                                                                            </div>
                                                                        </div>

                                                                        <div className="d-flex pt-2 px-2">
                                                                            <div className="text-center px-2">
                                                                                <img src={vector1} alt="Best Odds" />
                                                                                <h6 className="icon_heading">Best Odds</h6>
                                                                                <div className="open_number_one">
                                                                                    {awayTeam["Away Best odds"]}
                                                                                </div>
                                                                                <div className="open_number_one mt-2">
                                                                                    {homeTeam["Home Best odds"]}
                                                                                </div>
                                                                            </div>

                                                                            <div className="text-center px-2">
                                                                                <img src={vector} alt="Open" />
                                                                                <h6 className="icon_heading">Open</h6>
                                                                                <div className="open_number">
                                                                                    {awayTeam["Away Open"]}
                                                                                </div>
                                                                                <div className="open_number mt-2">
                                                                                    {homeTeam["Home Open"]}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex px-2 image_scorll col-9 drag_responsive">
                                                                        <DndProvider backend={HTML5Backend}>
                                                                            <div className="tab-bar mt-4">
                                                                                {loading ? (
                                                                                    <p>Loading data...</p>
                                                                                ) : allGames?.money?.length === 0 ? (
                                                                                    <div className="col-12 text-center my-5">
                                                                                        <p>No upcoming games available at the moment.</p>
                                                                                    </div>
                                                                                ) : (
                                                                                    allGames.money.map((gameMatch, gameIndex) => {
                                                                                        const teamKeys = Object.keys(gameMatch);
                                                                                        if (teamKeys.length !== 2) return null;

                                                                                        const awayTeamKey = teamKeys.find(key => gameMatch[key]["Away Team"]);
                                                                                        const homeTeamKey = teamKeys.find(key => gameMatch[key]["Home Team"]);

                                                                                        if (!awayTeamKey || !homeTeamKey) return null;

                                                                                        const awayTeam = gameMatch[awayTeamKey];
                                                                                        const homeTeam = gameMatch[homeTeamKey];

                                                                                        // Arrays of images for dynamic mapping
                                                                                        const groupImages = [
                                                                                            "/images/group1.png",
                                                                                            "/images/group2.png",
                                                                                            "/images/group3.png",
                                                                                            "/images/group4.png"
                                                                                        ];
                                                                                        const group1Images = [
                                                                                            "/images/group1_1.png",
                                                                                            "/images/group1_2.png",
                                                                                            "/images/group1_3.png",
                                                                                            "/images/group1_4.png"
                                                                                        ];

                                                                                        // Selecting images dynamically using modulo to cycle through the array
                                                                                        const selectedGroupImage = groupImages[gameIndex % groupImages.length];
                                                                                        const selectedGroup1Image = group1Images[gameIndex % group1Images.length];

                                                                                        return (
                                                                                            <div key={gameIndex} className="game-card">
                                                                                                <h3>{awayTeam[""]}  {homeTeam[""]}</h3>

                                                                                                {/* Best Odds & Open Odds Section */}
                                                                                                <div className="d-flex pt-2 px-2">
                                                                                                    <div className="text-center px-2">
                                                                                                        {/* Dynamically mapped image replacing 'group' */}
                                                                                                        <img src={group} alt="" />
                                                                                                        <div className="open_number_one mt-2">{awayTeam["Away Best odds"]}</div>
                                                                                                        <div className="open_number_one mt-2">{homeTeam["Home Best odds"]}</div>
                                                                                                    </div>

                                                                                                    <div className="text-center px-2">
                                                                                                        {/* Dynamically mapped image replacing 'group1' */}
                                                                                                        <img src={group1} alt="" />
                                                                                                        <div className="open_number mt-2">{awayTeam["Away Open"]}</div>
                                                                                                        <div className="open_number mt-2">{homeTeam["Home Open"]}</div>
                                                                                                    </div>
                                                                                                </div>

                                                                                                {/* Betting Platform Odds */}
                                                                                                <div className="d-flex flex-wrap justify-content-center pt-2">
                                                                                                    {[].map((bookmaker) => (
                                                                                                        <div key={bookmaker} className="text-center px-2">
                                                                                                            <div className="open_number mt-2">{awayTeam[`Away ${bookmaker}`]}</div>
                                                                                                            <div className="open_number mt-2">{homeTeam[`Home ${bookmaker}`]}</div>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    })
                                                                                )}
                                                                            </div>
                                                                        </DndProvider>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                                <h1 className="nba_odds my-5">Spurs vs Pistons Point Spread  &nbsp; <a class="rd-text-button Alternate_btn" href="#">View Alternate Lines<i></i></a></h1>
                                                {(() => {
                                                    console.log('Full Spread Data:', allGames?.spread);

                                                    if (!allGames?.spread || allGames.spread.length === 0) {
                                                        return (
                                                            <div className="col-12 text-center my-5">
                                                                <p>No upcoming games available at the moment.</p>
                                                            </div>
                                                        );
                                                    }

                                                    console.log('Spread1 Data:', allGames.spread1);

                                                    return allGames.spread.map((gameMatch, gameIndex) => {
                                                        console.log(`Processing gameMatch ${gameIndex}:`, gameMatch);

                                                        const teamKeys = Object.keys(gameMatch);
                                                        console.log(`Team Keys for game ${gameIndex}:`, teamKeys);

                                                        if (teamKeys.length !== 2) {
                                                            console.warn(`Skipping game ${gameIndex}: Incorrect number of keys`);
                                                            return null;
                                                        }

                                                        const awayTeamKey = teamKeys.find(key => gameMatch[key]?.["Away Team"]);
                                                        const homeTeamKey = teamKeys.find(key => gameMatch[key]?.["Home Team"]);

                                                        if (!awayTeamKey || !homeTeamKey) {
                                                            console.warn(`Skipping game ${gameIndex}: Away or Home Team not found`);
                                                            return null;
                                                        }

                                                        const awayTeam = gameMatch[awayTeamKey];
                                                        const homeTeam = gameMatch[homeTeamKey];

                                                        console.log(`Game ${gameIndex} - Away Team:`, awayTeam);
                                                        console.log(`Game ${gameIndex} - Home Team:`, homeTeam);

                                                        return (
                                                            <div key={gameIndex} className="col-12 nfl_games mt-3">
                                                                <div className="d-flex px-2 tab_hover">
                                                                    <div className="d-flex py-5 col-3 drag_responsive_one">
                                                                        <div className="pt-2">
                                                                            <div className="d-flex mt-5 gap-1">
                                                                                <div className="image_icon">
                                                                                    <img src={vector5} alt="Team Icon" width={19} height={19} />
                                                                                </div>
                                                                                <h6 className="icon_heading pt-2">{awayTeam["Away Team"]}</h6>
                                                                            </div>
                                                                            <div className="d-flex gap-1 mt-2">
                                                                                <div className="image_icon">
                                                                                    <img src={vector5} alt="Team Icon" width={19} height={19} />
                                                                                </div>
                                                                                <h6 className="icon_heading pt-2">{homeTeam["Home Team"]}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex px-2 col-9 drag_responsive">
                                                                        <DndProvider backend={HTML5Backend}>
                                                                            <div className="tab-bar mt-4">
                                                                                {(() => {
                                                                                    console.log('Full Spread Data:', allGames?.spread1);
                                                                                    const spreadData = allGames?.spread1 || [];
                                                                                    console.log('Spread1 Data:', JSON.stringify(spreadData, null, 2));

                                                                                    if (spreadData.length === 0) {
                                                                                        return (
                                                                                            <div className="col-12 text-center my-5">
                                                                                                <p>No spread data available.</p>
                                                                                                <p>Debug Info:
                                                                                                    allGames exists: {allGames ? 'Yes' : 'No'},
                                                                                                    spread1 exists: {allGames?.spread1 ? 'Yes' : 'No'},
                                                                                                    spread1 length: {spreadData.length}
                                                                                                </p>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                    return spreadData.map((spreadMatch, spreadIndex) => {
                                                                                        console.log(`Spread Match ${spreadIndex}:`, spreadMatch);

                                                                                        const teamKeys = Object.keys(spreadMatch);
                                                                                        const awayTeamKey = teamKeys.find(key => key.includes('+'));
                                                                                        const homeTeamKey = teamKeys.find(key => key.includes('-'));

                                                                                        if (!awayTeamKey || !homeTeamKey) {
                                                                                            console.warn(`Skipping spread ${spreadIndex}: Missing away or home key`);
                                                                                            return null;
                                                                                        }

                                                                                        const awayTeamSpread = spreadMatch[awayTeamKey];
                                                                                        const homeTeamSpread = spreadMatch[homeTeamKey];

                                                                                        return (
                                                                                            <div key={spreadIndex} className="spread-card">
                                                                                                <h3>{awayTeamSpread["Away Team"]} vs {homeTeamSpread["Home Team"]}</h3>
                                                                                                <div className="d-flex pt-2 px-2">
                                                                                                    <div className="text-center px-2">
                                                                                                        <div className="open_number_one">{awayTeamSpread["Away Betmgm"]}</div>
                                                                                                        <div className="open_number_one mt-2">{homeTeamSpread["Home Betmgm"]}</div>
                                                                                                    </div>
                                                                                                    <div className="text-center px-2">
                                                                                                        <div className="open_number">{awayTeamSpread["Away Fanduel"]}</div>
                                                                                                        <div className="open_number mt-2">{homeTeamSpread["Home Fanduel"]}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    });
                                                                                })()}
                                                                            </div>
                                                                        </DndProvider>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    });
                                                })()}

                                                <h1 className="nba_odds my-5">Magic vs Hornets Total Points (Over/Under)
                                                    &nbsp; <a class="rd-text-button Alternate_btn" href="#">View Alternate Lines<i></i></a></h1>

                                                {allGames?.over_under1?.length === 0 ? (
                                                    <div className="col-12 text-center my-5">
                                                        <p>No over/under games available at the moment.</p>
                                                    </div>
                                                ) : (
                                                    allGames?.over_under1?.map((gameMatch, gameIndex) => {
                                                        const teamKeys = Object.keys(gameMatch);
                                                        if (teamKeys.length !== 2) return null;

                                                        const awayKey = teamKeys.find(key => key.startsWith("o"));
                                                        const homeKey = teamKeys.find(key => key.startsWith("u"));

                                                        if (!awayKey || !homeKey) return null;

                                                        const awayTeam = gameMatch[awayKey] || {};
                                                        const homeTeam = gameMatch[homeKey] || {};

                                                        return (
                                                            <div key={gameIndex} className="col-12 nfl_games mt-3">
                                                                <div className="d-flex px-2 tab_hover">
                                                                    <div className="d-flex py-5 col-3 drag_responsive_one">
                                                                        <div className="pt-2">
                                                                            <div className="d-flex mt-5 gap-1">
                                                                                <div className="image_icon">
                                                                                    <img src={vector5} alt="Team Icon" width={19} height={19} />
                                                                                </div>
                                                                                <h6 className="icon_heading pt-2">
                                                                                    {awayTeam["Away Team"]}
                                                                                </h6>
                                                                            </div>

                                                                            <div className="d-flex gap-1 mt-2">
                                                                                <div className="image_icon">
                                                                                    <img src={vector5} alt="Team Icon" width={19} height={19} />
                                                                                </div>
                                                                                <h6 className="icon_heading pt-2">
                                                                                    {homeTeam["Home Team"]}
                                                                                </h6>
                                                                            </div>
                                                                        </div>

                                                                        <div className="d-flex pt-2 px-2">
                                                                            <div className="text-center px-2">
                                                                                <img src={vector1} alt="Over" />
                                                                                <h6 className="icon_heading">Over</h6>
                                                                                <div className="open_number_one">
                                                                                    {awayTeam["Away Fanduel"] || "-"}
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-center px-2">
                                                                                <img src={vector} alt="Under" />
                                                                                <h6 className="icon_heading">Under</h6>
                                                                                <div className="open_number">
                                                                                    {homeTeam["Home Fanduel"] || "-"}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="d-flex px-2 image_scorll col-9 drag_responsive">
                                                                        <DndProvider backend={HTML5Backend}>
                                                                            <div className="tab-bar mt-4">
                                                                                {/* Additional content if needed */}
                                                                            </div>
                                                                        </DndProvider>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        </div>

                                    )}

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



                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;