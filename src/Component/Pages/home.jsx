import React, { useState } from "react";
import "../../Assets/css/home.css";
import Faq from "./faq";
import vector from "../../Assets/images/Vector.png"
import vector1 from "../../Assets/images/Vector (1).png"
import vector2 from "../../Assets/images/Vector (2).png"
import vector3 from "../../Assets/images/Vector (3).png"
import vector4 from "../../Assets/images/Group 1171276657.png"
import vector5 from "../../Assets/images/Group 1171276542.png"
import group from "../../Assets/images/Group 1171276547.png"
import group1 from "../../Assets/images/Group 1171276551.png"
import group2 from "../../Assets/images/Group 1171276549.png"
import group3 from "../../Assets/images/Group 1171276550.png"
import group4 from "../../Assets/images/Group 1171276551.png"
import group5 from "../../Assets/images/Group 1171276552.png"
import group6 from "../../Assets/images/Group 1171276553.png"
import group7 from "../../Assets/images/Group 1171276554.png"
import group8 from "../../Assets/images/Group 1171276555.png"
import group9 from "../../Assets/images/Group 1171276556.png"



const Home = () => {
    const [activeTab, setActiveTab] = useState(1); // Default to first tab

    const toggleTab = (tabIndex) => {
        setActiveTab(tabIndex); // Always set a tab, never null
    };
    const totalPages = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <section className='backgroung_image'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 mt-5'>
                            <h1 className='nba_odds'>NBA Odds, Betting Lines, Point Spreads, Totals, Moneylines</h1>
                            <div className="mt-4">
                                <div className="d-flex">
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
                                            className={`btn_tab me-3 ${activeTab === tab.id ? "fw-bold text-white" : ""}`}
                                            style={{
                                                backgroundColor: activeTab === tab.id ? "#0F93EB" : "transparent",
                                                border: "1px solid #0F93EB",
                                                padding: "7px 30px",
                                                borderRadius: "25px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => toggleTab(tab.id)}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-5">
                                    {activeTab === 1 &&
                                        <div className="container">
                                            <div className="row ">
                                                <h1 className="nba_odds">Upcoming NFL Games</h1>
                                                <div className="col-12 nfl_games">
                                                    <h6 className="nfl_games_heading">Tomorrow  -  5:30AM  -  FDFL  |  NSBA</h6>
                                                    <div className="d-flex  px-2 tab_hover">
                                                        <div className="d-flex py-5 col-6 ">
                                                            <div className="pt-3 " >
                                                                <div className="d-flex px-2 mt-4 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                                <div className="d-flex px-2 mt-2 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex  pt-2 px-2">
                                                                <div className="text-center px-2">
                                                                    <img src={vector} alt="" />
                                                                    <h6 className="icon_heading ">Open</h6>
                                                                    <div className="Open_tab ">
                                                                        <div className="open_number">
                                                                            -210
                                                                        </div>
                                                                        <div className="open_number mt-2">
                                                                            -210
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector1} alt="" />
                                                                    <h6 className="icon_heading">Best odds</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector2} alt="" />
                                                                    <h6 className="icon_heading">Cash</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector3} alt="" />
                                                                    <h6 className="icon_heading">Tickets</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector4} alt="" />
                                                                    <h6 className="icon_heading">AI</h6>
                                                                    <div className="open_number_two">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex   px-2 image_scorll col-6">
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group1} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group2} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group3} alt="" className="mb-2" />

                                                                <div className="open_number_two">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group4} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group5} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group6} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group7} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_two mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group8} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group9} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-12 nfl_games mt-5">
                                                    <h6 className="nfl_games_heading">Tomorrow  -  5:30AM  -  FDFL  |  NSBA</h6>
                                                    <div className="d-flex  px-2 tab_hover">
                                                        <div className="d-flex py-5 col-6 ">
                                                            <div className="pt-3 " >
                                                                <div className="d-flex px-2 mt-4 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                                <div className="d-flex px-2 mt-2 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex  pt-2 px-2">
                                                                <div className="text-center px-2">
                                                                    <img src={vector} alt="" />
                                                                    <h6 className="icon_heading ">Open</h6>
                                                                    <div className="Open_tab ">
                                                                        <div className="open_number">
                                                                            -210
                                                                        </div>
                                                                        <div className="open_number mt-2">
                                                                            -210
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector1} alt="" />
                                                                    <h6 className="icon_heading">Best odds</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector2} alt="" />
                                                                    <h6 className="icon_heading">Cash</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector3} alt="" />
                                                                    <h6 className="icon_heading">Tickets</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector4} alt="" />
                                                                    <h6 className="icon_heading">AI</h6>
                                                                    <div className="open_number_two">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex   px-2 image_scorll col-6">
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group1} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group2} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group3} alt="" className="mb-2" />

                                                                <div className="open_number_two">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group4} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group5} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group6} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group7} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_two mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group8} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group9} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-12 nfl_games mt-5">
                                                    <h6 className="nfl_games_heading">Tomorrow  -  5:30AM  -  FDFL  |  NSBA</h6>
                                                    <div className="d-flex  px-2 tab_hover">
                                                        <div className="d-flex py-5 col-6 ">
                                                            <div className="pt-3 " >
                                                                <div className="d-flex px-2 mt-4 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                                <div className="d-flex px-2 mt-2 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex  pt-2 px-2">
                                                                <div className="text-center px-2">
                                                                    <img src={vector} alt="" />
                                                                    <h6 className="icon_heading ">Open</h6>
                                                                    <div className="Open_tab ">
                                                                        <div className="open_number">
                                                                            -210
                                                                        </div>
                                                                        <div className="open_number mt-2">
                                                                            -210
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector1} alt="" />
                                                                    <h6 className="icon_heading">Best odds</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector2} alt="" />
                                                                    <h6 className="icon_heading">Cash</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector3} alt="" />
                                                                    <h6 className="icon_heading">Tickets</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector4} alt="" />
                                                                    <h6 className="icon_heading">AI</h6>
                                                                    <div className="open_number_two">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex   px-2 image_scorll col-6">
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group1} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group2} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group3} alt="" className="mb-2" />

                                                                <div className="open_number_two">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group4} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group5} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group6} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group7} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_two mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group8} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group9} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    {activeTab === 2 &&
                                        <div className="container">
                                            <div className="row ">
                                                <h1 className="nba_odds">Upcoming NFL Games</h1>
                                                <div className="col-12 nfl_games">
                                                    <h6 className="nfl_games_heading">Tomorrow  -  5:30AM  -  FDFL  |  NSBA</h6>
                                                    <div className="d-flex  px-2 tab_hover">
                                                        <div className="d-flex py-5 col-6 ">
                                                            <div className="pt-3 " >
                                                                <div className="d-flex px-2 mt-4 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                                <div className="d-flex px-2 mt-2 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex  pt-2 px-2">
                                                                <div className="text-center px-2">
                                                                    <img src={vector} alt="" />
                                                                    <h6 className="icon_heading ">Open</h6>
                                                                    <div className="Open_tab ">
                                                                        <div className="open_number">
                                                                            -210
                                                                        </div>
                                                                        <div className="open_number mt-2">
                                                                            -210
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector1} alt="" />
                                                                    <h6 className="icon_heading">Best odds</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector2} alt="" />
                                                                    <h6 className="icon_heading">Cash</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector3} alt="" />
                                                                    <h6 className="icon_heading">Tickets</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector4} alt="" />
                                                                    <h6 className="icon_heading">AI</h6>
                                                                    <div className="open_number_two">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex   px-2 image_scorll col-6">
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group1} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group2} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group3} alt="" className="mb-2" />

                                                                <div className="open_number_two">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group4} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group5} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group6} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group7} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_two mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group8} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group9} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    {activeTab === 3 &&
                                        <div className="container">
                                            <div className="row ">
                                                <h1 className="nba_odds">Upcoming NFL Games</h1>
                                                <div className="col-12 nfl_games">
                                                    <h6 className="nfl_games_heading">Tomorrow  -  5:30AM  -  FDFL  |  NSBA</h6>
                                                    <div className="d-flex  px-2 tab_hover">
                                                        <div className="d-flex py-5 col-6 ">
                                                            <div className="pt-3 " >
                                                                <div className="d-flex px-2 mt-4 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                                <div className="d-flex px-2 mt-2 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex  pt-2 px-2">
                                                                <div className="text-center px-2">
                                                                    <img src={vector} alt="" />
                                                                    <h6 className="icon_heading ">Open</h6>
                                                                    <div className="Open_tab ">
                                                                        <div className="open_number">
                                                                            -210
                                                                        </div>
                                                                        <div className="open_number mt-2">
                                                                            -210
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector1} alt="" />
                                                                    <h6 className="icon_heading">Best odds</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector2} alt="" />
                                                                    <h6 className="icon_heading">Cash</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector3} alt="" />
                                                                    <h6 className="icon_heading">Tickets</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector4} alt="" />
                                                                    <h6 className="icon_heading">AI</h6>
                                                                    <div className="open_number_two">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex   px-2 image_scorll col-6">
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group1} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group2} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group3} alt="" className="mb-2" />

                                                                <div className="open_number_two">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group4} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group5} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group6} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group7} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_two mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group8} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group9} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    {activeTab === 4 &&
                                        <div className="container">
                                            <div className="row ">
                                                <h1 className="nba_odds">Upcoming NFL Games</h1>
                                                <div className="col-12 nfl_games">
                                                    <h6 className="nfl_games_heading">Tomorrow  -  5:30AM  -  FDFL  |  NSBA</h6>
                                                    <div className="d-flex  px-2 tab_hover">
                                                        <div className="d-flex py-5 col-6 ">
                                                            <div className="pt-3 " >
                                                                <div className="d-flex px-2 mt-4 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                                <div className="d-flex px-2 mt-2 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex  pt-2 px-2">
                                                                <div className="text-center px-2">
                                                                    <img src={vector} alt="" />
                                                                    <h6 className="icon_heading ">Open</h6>
                                                                    <div className="Open_tab ">
                                                                        <div className="open_number">
                                                                            -210
                                                                        </div>
                                                                        <div className="open_number mt-2">
                                                                            -210
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector1} alt="" />
                                                                    <h6 className="icon_heading">Best odds</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector2} alt="" />
                                                                    <h6 className="icon_heading">Cash</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector3} alt="" />
                                                                    <h6 className="icon_heading">Tickets</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector4} alt="" />
                                                                    <h6 className="icon_heading">AI</h6>
                                                                    <div className="open_number_two">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex   px-2 image_scorll col-6">
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group1} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group2} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group3} alt="" className="mb-2" />

                                                                <div className="open_number_two">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group4} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group5} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group6} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group7} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_two mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group8} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group9} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    {activeTab === 5 &&
                                        <div className="container">
                                            <div className="row ">
                                                <h1 className="nba_odds">Upcoming NFL Games</h1>
                                                <div className="col-12 nfl_games">
                                                    <h6 className="nfl_games_heading">Tomorrow  -  5:30AM  -  FDFL  |  NSBA</h6>
                                                    <div className="d-flex  px-2 tab_hover">
                                                        <div className="d-flex py-5 col-6 ">
                                                            <div className="pt-3 " >
                                                                <div className="d-flex px-2 mt-4 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                                <div className="d-flex px-2 mt-2 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex  pt-2 px-2">
                                                                <div className="text-center px-2">
                                                                    <img src={vector} alt="" />
                                                                    <h6 className="icon_heading ">Open</h6>
                                                                    <div className="Open_tab ">
                                                                        <div className="open_number">
                                                                            -210
                                                                        </div>
                                                                        <div className="open_number mt-2">
                                                                            -210
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector1} alt="" />
                                                                    <h6 className="icon_heading">Best odds</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector2} alt="" />
                                                                    <h6 className="icon_heading">Cash</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector3} alt="" />
                                                                    <h6 className="icon_heading">Tickets</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector4} alt="" />
                                                                    <h6 className="icon_heading">AI</h6>
                                                                    <div className="open_number_two">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex   px-2 image_scorll col-6">
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group1} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group2} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group3} alt="" className="mb-2" />

                                                                <div className="open_number_two">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group4} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group5} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group6} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group7} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_two mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group8} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group9} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    {activeTab === 6 &&
                                        <div className="container">
                                            <div className="row ">
                                                <h1 className="nba_odds">Upcoming NFL Games</h1>
                                                <div className="col-12 nfl_games">
                                                    <h6 className="nfl_games_heading">Tomorrow  -  5:30AM  -  FDFL  |  NSBA</h6>
                                                    <div className="d-flex  px-2 tab_hover">
                                                        <div className="d-flex py-5 col-6 ">
                                                            <div className="pt-3 " >
                                                                <div className="d-flex px-2 mt-4 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                                <div className="d-flex px-2 mt-2 ">
                                                                    <div className="image_icon">
                                                                        <img src={vector5} alt="" srcset="" width={19} height={19} />

                                                                    </div>
                                                                    <h6 className="icon_heading px-2 pt-2 ">Denver
                                                                        Nuggets</h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex  pt-2 px-2">
                                                                <div className="text-center px-2">
                                                                    <img src={vector} alt="" />
                                                                    <h6 className="icon_heading ">Open</h6>
                                                                    <div className="Open_tab ">
                                                                        <div className="open_number">
                                                                            -210
                                                                        </div>
                                                                        <div className="open_number mt-2">
                                                                            -210
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector1} alt="" />
                                                                    <h6 className="icon_heading">Best odds</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector2} alt="" />
                                                                    <h6 className="icon_heading">Cash</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector3} alt="" />
                                                                    <h6 className="icon_heading">Tickets</h6>
                                                                    <div className="open_number_one">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_two mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                                <div className="text-center px-2">
                                                                    <img src={vector4} alt="" />
                                                                    <h6 className="icon_heading">AI</h6>
                                                                    <div className="open_number_two">
                                                                        -210
                                                                    </div>
                                                                    <div className="open_number_one mt-2">
                                                                        -210
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex   px-2 image_scorll col-6">
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group1} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group2} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group3} alt="" className="mb-2" />

                                                                <div className="open_number_two">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group4} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group5} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group6} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group7} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_two mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group8} alt="" className="mb-2" />

                                                                <div className="open_number ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                            <div className="text-center px-2">
                                                                <div className="mb-2">
                                                                    <svg className="draw_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" /></svg>

                                                                </div>
                                                                <img src={group9} alt="" className="mb-2" />

                                                                <div className="open_number_one ">
                                                                    -210
                                                                </div>
                                                                <div className="open_number_one mt-2">
                                                                    -210
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                                <div className="d-flex justify-content-center align-items-center my-5">
                                    <button
                                        className="btn me-2"
                                        style={{ backgroundColor: currentPage === 1 ? "#ccc" : "#0F93EB", color: "white", padding: "7px 15px", borderRadius: "5px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
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
                                                    color: "#ffffff",
                                                }}
                                                onClick={() => goToPage(page)}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: currentPage === totalPages ? "#ccc" : "#0F93EB", color: "white", padding: "7px 15px", borderRadius: "5px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                                <Faq />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home;
