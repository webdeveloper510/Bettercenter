import React, { useState, useEffect, useRef } from "react";
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
import unibetLogo from "../../Assets/images/unibet.png";

const BOOKMAKER_LOGOS = {
  BetMGM: betmgmLogo,
  betmgm: betmgmLogo,
  DraftKings: draftkingsLogo,
  draftkings: draftkingsLogo,
  dk: draftkingsLogo,
  FanDuel: fanduelLogo,
  fanduel: fanduelLogo,
  Caesars: caesarsLogo,
  caesars: caesarsLogo,
  BetRivers: betriversLogo,
  betrivers: betriversLogo,
  Bet365: bet365Logo,
  Unibet: unibetLogo,
  unibetnj: unibetLogo,
};

const FALLBACK_LOGOS = [
  betmgmLogo,
  draftkingsLogo,
  fanduelLogo,
  caesarsLogo,
  betriversLogo,
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
const getUpdateColor = (updateTimestamp) => {
  if (!updateTimestamp) {
    return ""; // No update, no color
  }

  const now = Date.now();
  const elapsed = now - updateTimestamp;
  if (elapsed < 30000) {
    return "bg-success bg-opacity-25";
  } else if (elapsed < 50000) {
    return "bg-warning bg-opacity-25"; 
  } else {
    return "bg-danger bg-opacity-25"; // Red: 40+ seconds
  }
};

const BookmakerOdds = ({
  bookmakerKey,
  awayTeam,
  homeTeam,
  index,
  onSwap,
  oddsUpdates,
}) => {
  const homeKey = bookmakerKey.replace("Away", "Home");
  const bookmakerName = getBookmakerName(bookmakerKey);
  const logoImage = getBookmakerLogo(bookmakerKey, index)
  const awayUpdateTimestamp = oddsUpdates?.[bookmakerKey]?.timestamp;
  const awayUpdateColor = useUpdateColor(awayUpdateTimestamp);
  const homeUpdateTimestamp = oddsUpdates?.[homeKey]?.timestamp;
  const homeUpdateColor = useUpdateColor(homeUpdateTimestamp);
  const itemData = {
    bookmaker: bookmakerKey,
    bookmakerName,
    image: logoImage,
    awayOdds: awayTeam[bookmakerKey],
    homeOdds: homeTeam[homeKey],
  };

  return (
    <div className="text-center px-2">
      {/* <DraggableItem id={`icon-${index}`} index={index} data={itemData}> */}
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

        <div
          className="bookmaker-logo-container"
          style={{
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={logoImage}
            alt={bookmakerName}
            className="bookmaker-image"
            title={bookmakerName}
            style={{
              maxHeight: "40px",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div
          className={`open_number mt-1 ${awayUpdateColor || ""}`}
          style={{ transition: "background-color 0.5s ease" }}
        >
          {awayTeam[bookmakerKey] ?? "N/A"}
        </div>

        <div
          className={`open_number mt-2 ${homeUpdateColor || ""}`}
          style={{ transition: "background-color 0.5s ease" }}
        >
          {homeTeam[homeKey] ?? "N/A"}
        </div>
      {/* </DraggableItem> */}
    </div>
  );
};
const GameCard = ({ gameMatch, type, onDrop, oddsUpdates }) => {
  const teamKeys = Object.keys(gameMatch);
  if (teamKeys.length !== 2) return null;

  let awayKey = null;
  let homeKey = null;

  if (type === "overUnder") {
    // Find over/under keys (they typically start with o or u)
    awayKey = teamKeys.find((key) => key.startsWith("o"));
    homeKey = teamKeys.find((key) => key.startsWith("u"));
  } else {
    // Original logic for money and spread types
    teamKeys.forEach((key) => {
      if (gameMatch[key]["Away Team"]) awayKey = key;
      if (gameMatch[key]["Home Team"]) homeKey = key;
    });

    if (!awayKey || !homeKey) {
      awayKey = teamKeys.find((key) => key.startsWith("+") || key === "0");
      homeKey = teamKeys.find((key) => key.startsWith("-"));
    }
  }

  const awayTeam = awayKey ? gameMatch[awayKey] : null;
  const homeTeam = homeKey ? gameMatch[homeKey] : null;

  if (!awayTeam || !homeTeam) return null;

  // Get the appropriate keys based on the game type
  let bookmakerKeys = [];
  if (type === "overUnder") {
    // For over/under, get keys that aren't "Away Team" or "Home Team"
    bookmakerKeys = Object.keys(awayTeam).filter(
      (key) =>
        key !== "Away Team" &&
        key !== "Home Team" &&
        key !== "Away Best odds" &&
        key !== "Away Open"
    );
  } else {
    // Original logic for money and spread types
    bookmakerKeys = Object.keys(awayTeam).filter(
      (key) =>
        key.startsWith("Away ") &&
        key !== "Away Team" &&
        key !== "Away Best odds" &&
        key !== "Away Open"
    );
  }

  const swapValues = (index) => {
    const bookmaker = bookmakerKeys[index];
    // For over/under, there's no Away/Home prefix
    const homeBookmakerKey =
      type === "overUnder" ? bookmaker : bookmaker.replace("Away", "Home");

    const newAwayOdds = homeTeam[homeBookmakerKey];
    const newHomeOdds = awayTeam[bookmaker];
    awayTeam[bookmaker] = newAwayOdds;
    homeTeam[homeBookmakerKey] = newHomeOdds;
  };

  // Get color for best odds update - add safeguards for undefined values
  const awayBestOddsColor = getUpdateColor(
    oddsUpdates?.[`${awayKey}_Away Best odds`]?.timestamp || null
  );

  const homeBestOddsColor = getUpdateColor(
    oddsUpdates?.[`${homeKey}_Home Best odds`]?.timestamp || null
  );

  return (
    <div className="col-12 nfl_games mt-3">
      <div className="d-flex px-2 tab_hover">
        <div className="d-flex pt-3 col-3 drag_responsive_one">
          <div className="team_name">
            <div className="d-flex gap-1">
              <div className="image_icon">
                <img src={vector5} alt="Team Icon" width={19} height={19} />
              </div>
              <h6 className="icon_heading pt-2">
                {type === "spread" && awayKey ? `${awayKey} ` : ""}
                {type === "overUnder" && awayKey
                  ? `OVER ${awayKey.substring(1)} `
                  : ""}
                {awayTeam["Away Team"] || ""}
              </h6>
            </div>

            <div className="d-flex gap-1 mt-2">
              <div className="image_icon">
                <img src={vector5} alt="Team Icon" width={19} height={19} />
              </div>
              <h6 className="icon_heading pt-2">
                {type === "spread" && homeKey ? `${homeKey} ` : ""}
                {type === "overUnder" && homeKey
                  ? `UNDER ${homeKey.substring(1)} `
                  : ""}
                {homeTeam["Home Team"] || ""}
              </h6>
            </div>
          </div>

          <div className="d-flex pt-2 px-2">
            <div className="text-center px-2 pt-4">
              <img src={vector1} alt="Best Odds" />
              <h6 className="icon_heading">Best Odds</h6>
              <div className={`open_number_one ${awayBestOddsColor || ""}`}>
                {awayTeam["Away Best odds"] || "N/A"}
              </div>
              <div
                className={`open_number_one mt-2 ${homeBestOddsColor || ""}`}
              >
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
                  {/* <DroppableArea onDrop={onDrop}> */}
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
                            oddsUpdates={oddsUpdates}
                          />
                        ))
                      ) : (
                        <p className="text-center mt-2">No odds available</p>
                      )}
                    </div>
                  {/* </DroppableArea> */}
                </div>
              </DndProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameSection = ({ games, title, type, onDrop, oddsUpdates }) => {
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
            oddsUpdates={oddsUpdates?.[`game_${gameIndex}`]}
          />
        ))
      )}
    </>
  );
};

const useUpdateColor = (updateTimestamp) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (!updateTimestamp) {
      setColor("");
      return;
    }

    const updateColor = () => {
      const now = Date.now();
      const elapsed = now - updateTimestamp;
      if (elapsed < 30000) {
        setColor("bg-success bg-opacity-25");
      } else if (elapsed < 50000) {
        setColor("bg-warning bg-opacity-25"); 
      } else {
        setColor("bg-danger bg-opacity-25"); 
      }
    };

    updateColor(); // Initial color set
    const interval = setInterval(updateColor, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [updateTimestamp]);

  return color;
};

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [allGames, setAllGames] = useState({
    money: [],
    spread: [],
    overUnder: [],
  });

  // Add state for previous games data
  const [prevGames, setPrevGames] = useState({
    money: [],
    spread: [],
    overUnder: [],
  });

  // State to track odds updates and their timestamps
  const [oddsUpdates, setOddsUpdates] = useState({
    money: {},
    spread: {},
    overUnder: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
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
    // Handle drop functionality
  };

  const extractGames = (data) => {
    if (data && data.data) {
      return Object.values(data.data).flat();
    }
    return [];
  };

  // Compare old and new odds data to detect changes
  const detectChanges = (oldData, newData, gameType) => {
    const updates = {};
    if (
      !Array.isArray(oldData) ||
      !Array.isArray(newData) ||
      oldData.length === 0
    ) {
      return updates;
    }

    // Process each game in the new data
    newData.forEach((newGame, gameIndex) => {
      const oldGame = gameIndex < oldData.length ? oldData[gameIndex] : null;

      if (!oldGame) {
        return;
      }

      // Create a game updates object keyed by game index
      if (!updates[`game_${gameIndex}`]) {
        updates[`game_${gameIndex}`] = {};
      }

      // Compare each team's data in the game
      Object.keys(newGame).forEach((teamKey) => {
        const newTeam = newGame[teamKey];

        // Make sure the team exists in both old and new data
        if (!oldGame[teamKey] || typeof oldGame[teamKey] !== "object") {
          return;
        }
        const oldTeam = oldGame[teamKey];

        // Check each odds value
        Object.keys(newTeam).forEach((key) => {
          // Skip team names and null/undefined values
          if (key === "Away Team" || key === "Home Team") return;
          if (newTeam[key] === null || newTeam[key] === undefined) return;
          if (oldTeam[key] === null || oldTeam[key] === undefined) return;

          const newValue = String(newTeam[key]);
          const oldValue = String(oldTeam[key]);

          // If values are different, record the update with current timestamp
          if (newValue !== oldValue) {
            // Create a more direct access path for the update
            const updateKey = key;
            updates[`game_${gameIndex}`][updateKey] = {
              oldValue,
              newValue,
              timestamp: Date.now(),
            };
          }
        });
      });
    });

    return updates;
  };
  const fetchAllData = async () => {
    try {
      setLoading(true);

      const moneyData = await api.getMoneyData();
      const spreadData = await api.getSpreadData();
      const overUnderData = await api.getOverUnderData();

      const extractedMoneyGames = extractGames(moneyData);
      const extractedSpreadGames = extractGames(spreadData);
      const extractedOverUnderGames = extractGames(overUnderData);

      setPrevGames((prev) => {
        const moneyUpdates = detectChanges(
          prev.money,
          extractedMoneyGames,
          "money"
        );
        const spreadUpdates = detectChanges(
          prev.spread,
          extractedSpreadGames,
          "spread"
        );
        const overUnderUpdates = detectChanges(
          prev.overUnder,
          extractedOverUnderGames,
          "overUnder"
        );

        setOddsUpdates((prevUpdates) => ({
          money: { ...prevUpdates.money, ...moneyUpdates },
          spread: { ...prevUpdates.spread, ...spreadUpdates },
          overUnder: { ...prevUpdates.overUnder, ...overUnderUpdates },
        }));

        return {
          money: extractedMoneyGames,
          spread: extractedSpreadGames,
          overUnder: extractedOverUnderGames,
        };
      });

      // Update current games data
      setAllGames({
        money: extractedMoneyGames,
        spread: extractedSpreadGames,
        overUnder: extractedOverUnderGames,
      });

      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setError(error.message || "Failed to load betting data");
      setLoading(false);
    }
  };

  // Reference to track if this is the first load
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Initial data fetch
    fetchAllData();

    // Set up interval to fetch data every minute (60000 milliseconds)
    const intervalId = setInterval(() => {
      isFirstLoad.current = false;
      fetchAllData();
    }, 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to create a legend for color coding
  const renderColorLegend = () => {
    return (
      <div className="d-flex justify-content-end align-items-center mb-3">
        <div className="me-3">
          <span
            className="badge bg-success bg-opacity-25 me-1"
            style={{ width: "20px", height: "20px" }}
          ></span>
          <small>0-30s</small>
        </div>
        <div className="me-3">
          <span
            className="badge bg-warning bg-opacity-25 me-1"
            style={{ width: "20px", height: "20px" }}
          ></span>
          <small>30-60s</small>
        </div>
        <div>
          <span
            className="badge bg-danger bg-opacity-25 me-1"
            style={{ width: "20px", height: "20px" }}
          ></span>
          <small>60s+</small>
        </div>
      </div>
    );
  };

  if (loading && !lastUpdated) {
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
  }

  if (error && !lastUpdated) {
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
  }

  return (
    <>
      <section className="backgroung_image">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-5">
              {/* Display last updated time */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                {lastUpdated && (
                  <div className="text-muted">
                    <small>
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </small>
                  </div>
                )}

                {!isFirstLoad.current && renderColorLegend()}
              </div>

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
                          oddsUpdates={oddsUpdates.money}
                        />
                        <GameSection
                          games={allGames.spread}
                          title="Spurs vs Pistons Point Spread"
                          type="spread"
                          onDrop={handleDrop}
                          oddsUpdates={oddsUpdates.spread}
                        />
                        <GameSection
                          games={allGames.overUnder}
                          title="Magic vs Hornets Total Points (Over/Under)"
                          type="overUnder"
                          onDrop={handleDrop}
                          oddsUpdates={oddsUpdates.overUnder}
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

              {/* Refresh button */}
              <div className="text-center my-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={fetchAllData}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Refreshing...
                    </>
                  ) : (
                    "Refresh Odds"
                  )}
                </button>
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
