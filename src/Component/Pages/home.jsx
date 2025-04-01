import React, { useState, useEffect } from "react";
import "../../Assets/css/home.css";
import api from "../../api";
import Faq from "./faq";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import vector from "../../Assets/images/Vector.png";
import vector1 from "../../Assets/images/Vector (1).png";
import vector2 from "../../Assets/images/Vector (2).png";
import vector3 from "../../Assets/images/Vector (3).png";
import vector4 from "../../Assets/images/Group 1171276657.png";
import vector5 from "../../Assets/images/staticimage.png";
import betmgmLogo from "../../Assets/images/betmgm.png"; // BetMGM
import draftkingsLogo from "../../Assets/images/draftking.png"; // DraftKings
import fanduelLogo from "../../Assets/images/fanduel.webp"; // FanDuel
import caesarsLogo from "../../Assets/images/caesors.png"; // Caesars
import betriversLogo from "../../Assets/images/betrivers.png"; // BetRivers
import bet365Logo from "../../Assets/images/bet365.webp";
import unibetLogo from "../../Assets/images/unibet.png"

const BOOKMAKER_LOGOS = {
  "BetMGM": betmgmLogo,
  "betmgm": betmgmLogo,
  "DraftKings": draftkingsLogo,
  "draftkings": draftkingsLogo,
  "dk": draftkingsLogo, 
  "FanDuel": fanduelLogo,
  "fanduel": fanduelLogo,
  "Caesars": caesarsLogo,
  "caesars": caesarsLogo,
  "BetRivers": betriversLogo,
  "betrivers": betriversLogo,
  "Bet365": bet365Logo, 
  "Unibet": unibetLogo, 
  "unibetnj": unibetLogo, 
};

const FALLBACK_LOGOS = [
  betmgmLogo, draftkingsLogo, fanduelLogo, caesarsLogo, betriversLogo
];
const getBookmakerName = (key) => {
  let name = key.replace(/^(Away|Home)\s+/, "");
  if (name.toLowerCase() === "dk") return "DraftKings";
  if (name.toLowerCase() === "betmgm") return "BetMGM";
  if (name.toLowerCase() === "fanduel") return "FanDuel";
  if (name.toLowerCase() === "caesars") return "Caesars";
  if (name.toLowerCase() === "betrivers") return "BetRivers";
  if (name.toLowerCase() === "unibetnj") return "Unibet";
  if (name.toLowerCase() === "bet365") return "Bet365";
  
  return name;
};
const getBookmakerLogo = (bookmakerKey, index) => {
  const bookmakerName = getBookmakerName(bookmakerKey);
  for (const [key, logo] of Object.entries(BOOKMAKER_LOGOS)) {
    if (bookmakerName.toLowerCase() === key.toLowerCase()) {
      return logo;
    }
  }
  return FALLBACK_LOGOS[index % FALLBACK_LOGOS.length];
};

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
      <svg
        className="draw_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
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
const DraggableItem = ({ id, children, index, data }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ICON",
    item: () => ({ id, index, data }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
};
const DroppableArea = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "ICON",
    drop: (item) => {
      onDrop && onDrop(item.id, item.data);
      return { dropped: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`droppable-area ${isOver ? "droppable-over" : ""}`}
    >
      {children}
    </div>
  );
};

const BookmakerOdds = ({ bookmakerKey, awayTeam, homeTeam, index, onSwap }) => {
  const homeKey = bookmakerKey.replace("Away", "Home");
  const bookmakerName = getBookmakerName(bookmakerKey);
  const logoImage = getBookmakerLogo(bookmakerKey, index);
  const itemData = {
    bookmaker: bookmakerKey,
    bookmakerName,
    image: logoImage,
    awayOdds: awayTeam[bookmakerKey],
    homeOdds: homeTeam[homeKey],
  };

  return (
    <div className="text-center px-2">
      <DraggableItem id={`icon-${index}`} index={index} data={itemData}>
        <div>
          <svg
            className="draw_icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={() => onSwap(index)}
            style={{ cursor: "pointer" }}
          >
            <path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" />
          </svg>
        </div>

        <div className="bookmaker-logo-container" style={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src={logoImage} 
            alt={bookmakerName} 
            className="bookmaker-image"
            title={bookmakerName}
            style={{ maxHeight: '40px', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>

        <div className="open_number mt-1">
          {awayTeam[bookmakerKey] ?? "N/A"}
        </div>

        <div className="open_number mt-2">
          {homeTeam[homeKey] ?? "N/A"}
        </div>
      </DraggableItem>
    </div>
  );
};

const GameCard = ({ gameMatch, type, onDrop }) => {
  const teamKeys = Object.keys(gameMatch);
  if (teamKeys.length !== 2) return null;

  let awayKey = null;
  let homeKey = null;

  // Different handling based on the game type
  if (type === "overUnder") {
    // Find over/under keys (they typically start with o or u)
    awayKey = teamKeys.find(key => key.startsWith("o"));
    homeKey = teamKeys.find(key => key.startsWith("u"));
  } else {
    // Original logic for money and spread types
    teamKeys.forEach((key) => {
      if (gameMatch[key]["Away Team"]) awayKey = key;
      if (gameMatch[key]["Home Team"]) homeKey = key;
    });
    
    if (!awayKey || !homeKey) {
      awayKey = teamKeys.find(key => key.startsWith("+") || key === "0");
      homeKey = teamKeys.find(key => key.startsWith("-"));
    }
  }

  const awayTeam = awayKey ? gameMatch[awayKey] : null;
  const homeTeam = homeKey ? gameMatch[homeKey] : null;

  if (!awayTeam || !homeTeam) return null;

  // Get the appropriate keys based on the game type
  let bookmakerKeys = [];
  if (type === "overUnder") {
    // For over/under, get keys that aren't "Away Team" or "Home Team"
    bookmakerKeys = Object.keys(awayTeam)
      .filter(key => key !== "Away Team" && key !== "Home Team" && 
              key !== "Away Best odds" && key !== "Away Open");
  } else {
    // Original logic for money and spread types
    bookmakerKeys = Object.keys(awayTeam)
      .filter(key => key.startsWith("Away ") && key !== "Away Team" && 
              key !== "Away Best odds" && key !== "Away Open");
  }

  const swapValues = (index) => {
    const bookmaker = bookmakerKeys[index];
    // For over/under, there's no Away/Home prefix
    const homeBookmakerKey = type === "overUnder" 
      ? bookmaker 
      : bookmaker.replace("Away", "Home");
    
    const newAwayOdds = homeTeam[homeBookmakerKey];
    const newHomeOdds = awayTeam[bookmaker];
    awayTeam[bookmaker] = newAwayOdds;
    homeTeam[homeBookmakerKey] = newHomeOdds;
  };

  return (
    <div className="col-12 nfl_games mt-3">
      <div className="d-flex px-2 tab_hover">
        <div className="d-flex pt-3 col-3 drag_responsive_one">
          <div className="team_name">
            <div className="d-flex gap-1">
              <div className="image_icon">
                <img
                  src={vector5}
                  alt="Team Icon"
                  width={19}
                  height={19}
                />
              </div>
              <h6 className="icon_heading pt-2">
                {type === "spread" && awayKey ? `${awayKey} ` : ""}
                {type === "overUnder" && awayKey ? `OVER ${awayKey.substring(1)} ` : ""}
                {awayTeam["Away Team"] || ""}
              </h6>
            </div>

            <div className="d-flex gap-1 mt-2">
              <div className="image_icon">
                <img
                  src={vector5}
                  alt="Team Icon"
                  width={19}
                  height={19}
                />
              </div>
              <h6 className="icon_heading pt-2">
                {type === "spread" && homeKey ? `${homeKey} ` : ""}
                {type === "overUnder" && homeKey ? `UNDER ${homeKey.substring(1)} ` : ""}
                {homeTeam["Home Team"] || ""}
              </h6>
            </div>
          </div>

          <div className="d-flex pt-2 px-2">
            <div className="text-center px-2 pt-4">
              <img src={vector1} alt="Best Odds" />
              <h6 className="icon_heading">Best Odds</h6>
              <div className="open_number_one">
                {awayTeam["Away Best odds"] || "N/A"}
              </div>
              <div className="open_number_one mt-2">
                {homeTeam["Home Best odds"] || "N/A"}
              </div>
            </div>
            <div className="text-center px-2 pt-4">
              <img src={vector} alt="Open" />
              <h6 className="icon_heading">Open</h6>
              <div className="open_number">
                {awayTeam["Away Open"] || "N/A"}
              </div>
              <div className="open_number mt-2">
                {homeTeam["Home Open"] || "N/A"}
              </div>
            </div>
            
            <div className="d-flex px-2 image_scorll col-9 drag_responsive">
              <DndProvider backend={HTML5Backend}>
                <div className="tab-bar pb-3">
                  <DroppableArea onDrop={onDrop}>
                    <div className="d-flex justify-content-center">
                      {bookmakerKeys.length > 0 ? (
                        bookmakerKeys.map((bookmakerKey, index) => (
                          <BookmakerOdds
                            key={index}
                            index={index}
                            bookmakerKey={bookmakerKey}
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            onSwap={swapValues}
                          />
                        ))
                      ) : (
                        <p className="text-center mt-2">
                          No odds available
                        </p>
                      )}
                    </div>
                  </DroppableArea>
                </div>
              </DndProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameSection = ({ games, title, type, onDrop }) => {
  const altButton =
    type !== "money" ? (
      <a className="rd-text-button Alternate_btn" href="#">
        View Alternate Lines<i></i>
      </a>
    ) : null;

  return (
    <>
      <h1 className="nba_odds">
        {title} {altButton}
      </h1>

      {games?.length === 0 ? (
        <div className="col-12 text-center my-5">
          <p>No upcoming games available at the moment.</p>
        </div>
      ) : (
        games?.map((gameMatch, gameIndex) => (
          <GameCard 
            key={gameIndex} 
            gameMatch={gameMatch} 
            type={type} 
            onDrop={onDrop}
          />
        ))
      )}
    </>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [allGames, setAllGames] = useState({
    money: [],
    spread: [],
    overUnder: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const totalPages = 4;
  const [tabs, setTabs] = useState([
    { name: "Tab 1" },
    { name: "Tab 2" },
    { name: "Tab 3" },
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

  const handleDrop = (id, data) => {
    console.log("Dropped", id, "with data", data);
  };
  const extractGames = (data) => {
    if (data && data.data) {
      return Object.values(data.data).flat();
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moneyData = await api.getMoneyData();
        const spreadData = await api.getSpreadData();
        const overUnderData = await api.getOverUnderData();

        setAllGames({
          money: extractGames(moneyData),
          spread: extractGames(spreadData),
          overUnder: extractGames(overUnderData),
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load betting data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
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

  if (error)
    return (
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
              <h1 className="nba_odds">
                NBA Odds, Betting Lines, Point Spreads, Totals, Moneylines
              </h1>
              <div className="mt-4">
                <div className="d-flex flex-wrap gap-2">
                  {[
                    { id: 1, label: "Overview" },
                    { id: 2, label: "Games" },
                    { id: 3, label: "Futures" },
                    { id: 4, label: "Teams" },
                    { id: 5, label: "Schedule" },
                    { id: 6, label: "Injuries" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`btn_tab ${
                        activeTab === tab.id
                          ? "fw-bold text-white"
                          : "text-dark"
                      }`}
                      style={{
                        backgroundColor:
                          activeTab === tab.id ? "#0F93EB" : "transparent",
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
                        <GameSection
                          games={allGames.money}
                          title="Timberwolves vs Pacers Moneyline"
                          type="money"
                          onDrop={handleDrop}
                        />
                        <GameSection
                          games={allGames.spread}
                          title="Spurs vs Pistons Point Spread"
                          type="spread"
                          onDrop={handleDrop}
                        />
                        <GameSection
                          games={allGames.overUnder}
                          title="Magic vs Hornets Total Points (Over/Under)"
                          type="overUnder"
                          onDrop={handleDrop}
                        />
                      </div>
                    </div>
                  )}

                  {[2, 3, 4, 5, 6].map(
                    (tabId) =>
                      activeTab === tabId && (
                        <div key={tabId} className="container">
                          <div className="row">
                            <h1 className="nba_odds">
                              {tabId === 2
                                ? "NBA Games"
                                : tabId === 3
                                ? "NBA Futures"
                                : tabId === 4
                                ? "NBA Teams"
                                : tabId === 5
                                ? "NBA Schedule"
                                : "NBA Injuries"}
                            </h1>
                            <div className="col-12 text-center my-5">
                              <p>
                                Content for{" "}
                                {
                                  [
                                    "",
                                    "Overview",
                                    "Games",
                                    "Futures",
                                    "Teams",
                                    "Schedule",
                                    "Injuries",
                                  ][tabId]
                                }{" "}
                                tab will be displayed here.
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                  )}
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
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
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
                      className={`btn me-2 ${
                        currentPage === page ? "fw-bold text-white" : ""
                      }`}
                      style={{
                        backgroundColor:
                          currentPage === page ? "#0F93EB" : "transparent",
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
                    backgroundColor:
                      currentPage === totalPages ? "#ccc" : "#0F93EB",
                    color: "white",
                    padding: "7px 15px",
                    borderRadius: "15px",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
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