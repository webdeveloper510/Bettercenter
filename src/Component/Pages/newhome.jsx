import React, { useState, useEffect, useRef } from "react";
import Faq from "./faq";
import TabsWithMatchups from "./gametab";
import DatePicker from "react-datepicker";
import "../../Assets/css/newhome.css";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api";
import betmgmLogo from "../../Assets/images/betmgm.png";
import draftkingsLogo from "../../Assets/images/draftking.png";
import fanduelLogo from "../../Assets/images/fanduel.webp";
import caesarsLogo from "../../Assets/images/caesors.png";
import betriversLogo from "../../Assets/images/betrivers.png";
import bet365Logo from "../../Assets/images/bet365.webp";
import unibetLogo from "../../Assets/images/unibet.png";
import Schedule from "./Schedule";
import NBAInjuryTable from "./injury";
import Futures from "./futures";
import MatchesPage from "./gameteamtab";
import PromoBanner from "./homebanner";
import HomeBlog from "./homeblog";
import StaticInfo from "./staticcontent";
import { useNavigate } from "react-router-dom";
import Teamstab from "./teamstab";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
import InjuryModal from "./injuryModal";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const BOOKMAKER_LOGOS = {
  BetMGM: { logo: betmgmLogo },
  DraftKings: { logo: draftkingsLogo },
  FanDuel: { logo: fanduelLogo },
  Caesars: { logo: caesarsLogo },
  BetRivers: { logo: betriversLogo },
  Bet365: { logo: bet365Logo },
  // Unibet: { logo: unibetLogo },
};
const getTimezoneFromIP = async () => {
  try {
    const response = await fetch("https://ipapi.co/timezone/");
    const timezone = await response.text();
    return timezone.trim();
  } catch (error) {
    console.error("Failed to get timezone from IP:", error);
    return moment.tz.guess();
  }
};
const formatDateForAPI = async (date) => {
  if (!date) return "";

  const timezone = await getTimezoneFromIP();
  const momentDate = moment(date).tz(timezone);
  const formattedDate = momentDate.format("YYYY-MM-DD");
  return {
    date: formattedDate,
    timezone: timezone,
  };
};
const BOOKMAKER_MAP = {
  Betmgm: "BetMGM",
  Caesars: "Caesars",
  Fanduel: "FanDuel",
  Dk: "DraftKings",
  Betrivers: "BetRivers",
  Unibetnj: "Unibet",
  Bet365: "Bet365",
};

const isValueChanged = (oldVal, newVal) => {
  if (oldVal === undefined || newVal === undefined) return false;
  if (oldVal === null || newVal === null) return oldVal !== newVal;

  const oldNum =
    typeof oldVal === "string"
      ? parseFloat(oldVal.replace(/[+-]/g, ""))
      : oldVal;
  const newNum =
    typeof newVal === "string"
      ? parseFloat(newVal.replace(/[+-]/g, ""))
      : newVal;

  return oldNum !== newNum;
};

const Games = () => {
  const [sport, setSport] = useState("ALL");
  const [marketType, setMarketType] = useState("DEFAULT");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allSportsData, setAllSportsData] = useState({
    nbaSpread: [],
    nhlMoneyline: [],
    mlbMoneyline: [],
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    teamName: "",
    sport: "",
    injuryData: [],
    loading: false,
  });
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const [socket, setSocket] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const initialDataFetchedRef = useRef(false);
  const allSportsDataCache = useRef(null);
  const lastAllSportsFetchTime = useRef(null);

  const tabs = [
    "OVERVIEW",
    // "GAMES",
    "FUTURES",
    // "TEAMS",
    // "SCHEDULE",
    // "INJURIES",
  ];
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousDataRef = useRef([]);
  const changeTimestampsRef = useRef({});
  const isFirstLoadRef = useRef(true);
  const navigate = useNavigate();
  const [bookmarkedGames, setBookmarkedGames] = useState([]);
  const currentSportMarketRef = useRef("");

  const totalPages = 4;
  const isCurrentDate = () => {
    const today = new Date();
    const selected = new Date(selectedDate);
    return (
      today.getDate() === selected.getDate() &&
      today.getMonth() === selected.getMonth() &&
      today.getFullYear() === selected.getFullYear()
    );
  };
  const handleAiPicksClick = (gameIndex) => {
    navigate("/aipicks");
  };

  const toggleBookmark = (gameIndex) => {
    setBookmarkedGames((prev) => {
      if (prev.includes(gameIndex)) {
        return prev.filter((index) => index !== gameIndex);
      } else {
        return [...prev, gameIndex];
      }
    });
  };
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
  }, []);

const handleEyeIconClick = async (homeTeam, awayTeam, sportType, e) => {
  e.stopPropagation();
  
  setModalState({
    isOpen: true,
    teamName: `${awayTeam} vs ${homeTeam}`,
    sport: sportType,
    injuryData: { home_team_data: [], away_team_data: [] },
    loading: true
  });

  try {
    let injuryResponse = null;
    const payload = {
      home_team: homeTeam,
      away_team: awayTeam
    };
    
    switch (sportType.toLowerCase()) {
      case 'nba':
        injuryResponse = await api.getNbaSortedInjury(payload);
        break;
      case 'nhl':
        injuryResponse = await api.getNhlSortedInjury(payload);
        break;
      case 'mlb':
        injuryResponse = await api.getMlbSortedInjury(payload);
        break;
      default:
        console.error('Unknown sport type:', sportType);
        injuryResponse = { home_team_data: [], away_team_data: [] };
    }
    
    setModalState(prev => ({
      ...prev,
      injuryData: {
        home_team_data: injuryResponse?.home_team_data || [],
        away_team_data: injuryResponse?.away_team_data || []
      },
      loading: false
    }));

  } catch (error) {
    console.error('Error fetching injury data:', error);
    
    setModalState(prev => ({
      ...prev,
      injuryData: { home_team_data: [], away_team_data: [] },
      loading: false
    }));
  }
};

  const closeModal = () => {
    setModalState({
      isOpen: false,
      teamName: "",
      sport: "",
      injuryData: [],
      loading: false,
    });
  };
const formatOdds = (odds) => {
  if (odds === null || odds === undefined) return "0";
  if (typeof odds !== "string") odds = String(odds);

  odds = odds.trim();
  if (odds === "0 / 0" || odds === "-") return "0";
  if (odds.includes("/")) {
    return odds;
  }

  // ✅ Just this one line added:
  if (/^[-+]?\d{2,}$/.test(odds)) return odds;

  const numeric = parseFloat(odds);
  if (isNaN(numeric)) return odds;

  return numeric > 0 ? `+${numeric}` : `${numeric}`;
};

  const [colorRefreshTrigger, setColorRefreshTrigger] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setColorRefreshTrigger((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
const getCellColor = (key, value, sportType = null) => {
  if (isFirstLoadRef.current) {
    return "";
  }

  let changeKey;
  if (sport === "ALL" && sportType) {
    const keyParts = key.split('-');
    const gameIndex = keyParts[0];
    const fieldName = keyParts.slice(1).join('-');  
    changeKey = `${sportType}-${gameIndex}-${fieldName}-${value}`
  } else {
    changeKey = `${key}-${value}`;
  }
  
  const timestamp = changeTimestampsRef.current[changeKey];
 
  if (!timestamp) return "";

  const secondsSinceChange = (Date.now() - timestamp) / 1000;


  if (secondsSinceChange <= 20) {
    return "changed-green";
  } else if (secondsSinceChange <= 40) {
    return "changed-yellow";
  } else if (secondsSinceChange <= 60) {
    return "changed-red";
  }

  return "";
};
const updateChangeTimestamps = (newData, sportType = null) => {

  const oldData = previousDataRef.current;
  const newTimestamps = { ...changeTimestampsRef.current };
  const now = Date.now();
  
  if (sport === "ALL" && sportType) {
    const sportKey =
      sportType === "nba"
        ? "nbaSpread"
        : sportType === "nhl"
        ? "nhlMoneyline"
        : sportType === "mlb"
        ? "mlbMoneyline"
        : null;

    if (!sportKey || !oldData || !oldData[sportKey]) {
      return;
    }

    const oldSportData = oldData[sportKey];
    newData.forEach((game, gameIndex) => {
      if (!oldSportData[gameIndex]) {
        return;
      }

      Object.keys(game).forEach((key) => {
        const value = game[key];
        if (value === undefined || value === null || value === "-") return;

        const oldValue = oldSportData[gameIndex][key];

        if (isValueChanged(oldValue, value)) {
          const changeKey = `${sportType}-${gameIndex}-${key}-${value}`;
          newTimestamps[changeKey] = now;
        }
      });
    });
  } else {
    if (!Array.isArray(oldData)) {
      return;
    }

    newData.forEach((game, gameIndex) => {
      if (!oldData[gameIndex]) return;

      Object.keys(game).forEach((key) => {
        const value = game[key];
        if (value === undefined || value === null || value === "-") return;

        const oldValue = oldData[gameIndex][key];

        if (isValueChanged(oldValue, value)) {
          const changeKey = `${gameIndex}-${key}-${value}`;
          newTimestamps[changeKey] = now;
        }
      });
    });
  }

  Object.keys(newTimestamps).forEach((key) => {
    if ((now - newTimestamps[key]) / 1000 > 60) {
      delete newTimestamps[key];
    }
  });
  changeTimestampsRef.current = newTimestamps;
  if (sport === "ALL" && sportType) {
    const sportKey =
      sportType === "nba"
        ? "nbaSpread"
        : sportType === "nhl"
        ? "nhlMoneyline"
        : sportType === "mlb"
        ? "mlbMoneyline"
        : null;
    if (sportKey) {
      if (!previousDataRef.current) {
        previousDataRef.current = {};
      }
      previousDataRef.current[sportKey] = JSON.parse(JSON.stringify(newData));
    }
  } else {
    previousDataRef.current = JSON.parse(JSON.stringify(newData));
  }
};

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let apiData;
      let processedData = [];
      const formattedDate = await formatDateForAPI(selectedDate);
      switch (sport) {
        case "NBA":
          switch (marketType) {
            case "MONEYLINE":
              apiData = await api.getMoneyData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processMoneylineData(apiData);
              break;
            case "SPREAD":
              apiData = await api.getSpreadData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processSpreadData(apiData);
              break;
            case "TOTAL":
              apiData = await api.getOverUnderData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processTotalData(apiData);
              break;
            case "DEFAULT":
              apiData = await api.getNbaDefaultData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processDefaultData(apiData);
              break;
            default:
          }
          break;

        case "MLB":
          switch (marketType) {
            case "MONEYLINE":
              apiData = await api.getMlbMoneyData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processMoneylineData(apiData);
              break;
            case "SPREAD":
              apiData = await api.getMlbSpreadData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processSpreadData(apiData);
              break;
            case "TOTAL":
              apiData = await api.getMlbOverUnderData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processTotalData(apiData);
              break;
            case "DEFAULT":
              apiData = await api.getMlbDefaultData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processDefaultData(apiData);
              break;
            default:
          }
          break;

        case "NHL":
          switch (marketType) {
            case "MONEYLINE":
              apiData = await api.getNhlMoneyData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processMoneylineData(apiData);
              break;
            case "SPREAD":
              apiData = await api.getNhlSpreadData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processSpreadData(apiData);
              break;
            case "TOTAL":
              apiData = await api.getNhlOverUnderData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processTotalData(apiData);
              break;
            case "DEFAULT":
              apiData = await api.getNhlDefaultData(
                formattedDate.date,
                formattedDate.timezone
              );
              processedData = processDefaultData(apiData);
              break;
            default:
          }
          break;

        default:
      }

      const newSportMarket = `${sport}-${marketType}`;
      if (currentSportMarketRef.current !== newSportMarket) {
        isFirstLoadRef.current = true;
        currentSportMarketRef.current = newSportMarket;
        changeTimestampsRef.current = {};
      }
      if (!isFirstLoadRef.current) {
        updateChangeTimestamps(processedData);
      }

      setGamesData(processedData);
      if (isFirstLoadRef.current) {
        previousDataRef.current = JSON.parse(JSON.stringify(processedData));
        isFirstLoadRef.current = false;
      }
      if (isCurrentDate()) {
        initialDataFetchedRef.current = true;
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        `Failed to fetch ${sport} ${marketType.toLowerCase()} data. Please try again later.`
      );
      setGamesData([]);
    } finally {
      setLoading(false);
    }
  };
  const previousTabRef = useRef(activeTab);
  useEffect(() => {
    if (activeTab === "OVERVIEW" && previousTabRef.current !== "OVERVIEW") {
    setSport("ALL");
    previousTabRef.current = activeTab;
    return;
  }
  if (activeTab !== "OVERVIEW" && sport === "ALL") {
    setSport("NBA");
    previousTabRef.current = activeTab;
    return;
  }

  previousTabRef.current = activeTab;
    isFirstLoadRef.current = true;
    changeTimestampsRef.current = {};
    previousDataRef.current = [];
    initialDataFetchedRef.current = false;

    const fetchAndUpdateData = async () => {
      setLoading(true);
      try {
        if (sport === "ALL" && activeTab === "OVERVIEW") {
          await fetchAllSportsData();
        } else if (sport !== "ALL") {
          await fetchData();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdateData();

    let interval;
    // if (!isCurrentDate()) {
    //   interval = setInterval(fetchAndUpdateData, 60000);
    // }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [sport, marketType, selectedDate, activeTab]);
  useEffect(() => {
    if (!isCurrentDate()) {
      if (socket) {
        console.log("Closing socket - not current date");
        socket.close();
        setIsSocketConnected(false);
      }
      return;
    }

    const connectWebSocket = () => {
      if (socket) {
        socket.close();
      }

      const wsUrl = `ws://54.209.247.111:8000/ws/chat/`;
      console.log(`Connecting to WebSocket: ${wsUrl}`);

      const newSocket = new WebSocket(wsUrl);

      newSocket.onopen = () => {
        console.log("WebSocket connected");
        setIsSocketConnected(true);
      };

     newSocket.onmessage = (event) => {
  try {
    console.log("📡 Raw WebSocket message received:", event.data);
    const data = JSON.parse(event.data);
    console.log("📡 WebSocket data received:", data);
    
    if (sport === "ALL") {
      const updatedAllSportsData = { ...allSportsData };
      let hasUpdates = false;
      
      if (data.nba_default_data) {
        const processedNbaDefault = processDefaultData({
          data: data.nba_default_data,
        });
        updatedAllSportsData.nbaSpread = processedNbaDefault;
        if (!isFirstLoadRef.current) {
          updateChangeTimestamps(processedNbaDefault, "nba");
        }
        hasUpdates = true;
      }
      
      if (data.nhl_default_data) {
        const processedNhlDefault = processDefaultData({
          data: data.nhl_default_data,
        });
        updatedAllSportsData.nhlMoneyline = processedNhlDefault;
        if (!isFirstLoadRef.current) {
          updateChangeTimestamps(processedNhlDefault, "nhl");
        }
        hasUpdates = true;
      }
      
      if (data.mlb_default_data) {
        const processedMlbDefault = processDefaultData({
          data: data.mlb_default_data,
        });
        updatedAllSportsData.mlbMoneyline = processedMlbDefault;
        if (!isFirstLoadRef.current) {
          updateChangeTimestamps(processedMlbDefault, "mlb");
        }
        hasUpdates = true;
      }

      if (hasUpdates) {
        setAllSportsData(updatedAllSportsData);
      }
      return;
    }
          let processedData = [];

          if (sport === "NBA") {
            if (data.nba_money_data && marketType === "MONEYLINE") {
              processedData = processMoneylineData({
                data: data.nba_money_data,
              });
            } else if (data.nba_spread_data && marketType === "SPREAD") {
              processedData = processSpreadData({ data: data.nba_spread_data });
            } else if (data.nba_total_data && marketType === "TOTAL") {
              processedData = processTotalData({ data: data.nba_total_data });
            } else if (data.nba_default_data && marketType === "DEFAULT") {
              processedData = processDefaultData({
                data: data.nba_default_data,
              });
            }
          } else if (sport === "MLB") {
            if (data.mlb_money_data && marketType === "MONEYLINE") {
              processedData = processMoneylineData({
                data: data.mlb_money_data,
              });
            } else if (data.mlb_spread_data && marketType === "SPREAD") {
              processedData = processSpreadData({ data: data.mlb_spread_data });
            } else if (data.mlb_total_data && marketType === "TOTAL") {
              processedData = processTotalData({ data: data.mlb_total_data });
            } else if (data.mlb_default_data && marketType === "DEFAULT") {
              processedData = processDefaultData({
                data: data.mlb_default_data,
              });
            }
          } else if (sport === "NHL") {
            if (data.nhl_money_data && marketType === "MONEYLINE") {
              processedData = processMoneylineData({
                data: data.nhl_money_data,
              });
            } else if (data.nhl_spread_data && marketType === "SPREAD") {
              processedData = processSpreadData({ data: data.nhl_spread_data });
            } else if (data.nhl_total_data && marketType === "TOTAL") {
              processedData = processTotalData({ data: data.nhl_total_data });
            } else if (data.nhl_default_data && marketType === "DEFAULT") {
              processedData = processDefaultData({
                data: data.nhl_default_data,
              });
            }
          }

          if (processedData && processedData.length > 0) {
            updateChangeTimestamps(processedData);
            setGamesData(processedData);
          }
        } catch (error) {
          console.error("Error processing WebSocket data:", error);
        }
      };
      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsSocketConnected(false);
      };

      newSocket.onclose = () => {
        console.log("WebSocket disconnected");
        setIsSocketConnected(false);
      };

      setSocket(newSocket);
    };

    connectWebSocket();
    return () => {
      if (socket) {
        console.log("Cleaning up WebSocket connection");
        socket.close();
      }
    };
  }, [sport, marketType, selectedDate, activeTab]);
const processSpreadData = (apiData, sport) => {
  if (!apiData || !apiData.data) return [];

  const processedGames = [];

  Object.keys(apiData.data).forEach((spreadKey) => {
    const spreadObject = apiData.data[spreadKey];
    if (
      spreadObject &&
      typeof spreadObject === "object" &&
      Object.keys(spreadObject).length === 2
    ) {
      const [value1, value2] = Object.keys(spreadObject);
      const data1 = spreadObject[value1];
      const data2 = spreadObject[value2];

      let homeTeamData, awayTeamData, homeSpread, awaySpread;
      const isData1Home = !!data1["Home Team"];
      const isData2Home = !!data2["Home Team"];

      if (isData1Home && !isData2Home) {
        homeTeamData = data1;
        awayTeamData = data2;
        homeSpread = value1;
        awaySpread = value2;
      } else if (!isData1Home && isData2Home) {
        homeTeamData = data2;
        awayTeamData = data1;
        homeSpread = value2;
        awaySpread = value1;
      } else if (data1["Home Team"] && data2["Home Team"]) {
        homeTeamData = data1;
        awayTeamData = data2;
        homeSpread = value1;
        awaySpread = value2;
      } else {
        return;
      }

      const game = {
        homeTeam: homeTeamData["Home Team"] || "",
        awayTeam: awayTeamData["Away Team"] || "",
        homeSpread,
        awaySpread,
        homePitcher: homeTeamData["Home Pitcher"] || "N/A",
        awayPitcher: awayTeamData["Away Pitcher"] || "N/A",
        homeOpen: formatOdds(homeTeamData["Home Open"]),
        awayOpen: formatOdds(awayTeamData["Away Open"]),
        homeBestOdds: formatOdds(homeTeamData["Home Best odds"]),
        awayBestOdds: formatOdds(awayTeamData["Away Best odds"]),
        date: homeTeamData?.Date || awayTeamData?.Date || "",
      };

      Object.keys(BOOKMAKER_MAP).forEach((apiBookmaker) => {
        const componentBookmaker = BOOKMAKER_MAP[apiBookmaker];

        const homeOddsKey = `Home ${apiBookmaker}`;
        const awayOddsKey = `Away ${apiBookmaker}`;
        const rawHomeOdds = homeTeamData[homeOddsKey];
        const rawAwayOdds = awayTeamData[awayOddsKey];

        if (rawHomeOdds && rawHomeOdds !== 0) {
          game[`${componentBookmaker.toLowerCase()}HomeOdds`] = formatOdds(rawHomeOdds);
        }

        if (rawAwayOdds && rawAwayOdds !== 0) {
          game[`${componentBookmaker.toLowerCase()}AwayOdds`] = formatOdds(rawAwayOdds);
        }
      });

      processedGames.push(game);
    }
  });

  return processedGames;
};

  const processMoneylineData = (apiData) => {
    if (!apiData || !apiData.data) return [];

    const processedGames = [];

    Object.keys(apiData.data).forEach((gameKey) => {
      if (
        gameKey.startsWith("game") &&
        Array.isArray(apiData.data[gameKey]) &&
        apiData.data[gameKey].length > 0
      ) {
        const gameEntry = apiData.data[gameKey][0];
        const teamNames = Object.keys(gameEntry);

        if (teamNames.length === 2) {
          let homeTeamData, awayTeamData;
          let homeName, awayName;

          if (gameEntry[teamNames[0]]["Home Team"]) {
            homeTeamData = gameEntry[teamNames[0]];
            homeName = teamNames[0];
            awayTeamData = gameEntry[teamNames[1]];
            awayName = teamNames[1];
          } else {
            homeTeamData = gameEntry[teamNames[1]];
            homeName = teamNames[1];
            awayTeamData = gameEntry[teamNames[0]];
            awayName = teamNames[0];
          }

          const game = {
            homeTeam: homeTeamData["Home Team"],
            awayTeam: awayTeamData["Away Team"],
            homePitcher: homeTeamData["Home Pitcher"] || "N/A",
            awayPitcher: awayTeamData["Away Pitcher"] || "N/A",
            date: homeTeamData?.Date || awayTeamData?.Date || "",
          };
          if (sport === "MLB") {
            game.homeOpen = formatOdds(awayTeamData["Away Open"]);
            game.awayOpen = formatOdds(homeTeamData["Home Open"]);
            game.homeBestOdds = formatOdds(awayTeamData["Away Best odds"]);
            game.awayBestOdds = formatOdds(homeTeamData["Home Best odds"]);

            Object.keys(BOOKMAKER_MAP).forEach((apiBookmaker) => {
              const componentBookmaker = BOOKMAKER_MAP[apiBookmaker];
              const homeOddsKey = `Home ${apiBookmaker}`;
              if (
                homeTeamData[homeOddsKey] !== undefined &&
                homeTeamData[homeOddsKey] !== 0
              ) {
                game[`${componentBookmaker.toLowerCase()}AwayOdds`] =
                  formatOdds(homeTeamData[homeOddsKey]);
              }
              const awayOddsKey = `Away ${apiBookmaker}`;
              if (
                awayTeamData[awayOddsKey] !== undefined &&
                awayTeamData[awayOddsKey] !== 0
              ) {
                game[`${componentBookmaker.toLowerCase()}HomeOdds`] =
                  formatOdds(awayTeamData[awayOddsKey]);
              }
            });
          } else {
            game.homeOpen = formatOdds(homeTeamData["Home Open"]);
            game.awayOpen = formatOdds(awayTeamData["Away Open"]);
            game.homeBestOdds = formatOdds(homeTeamData["Home Best odds"]);
            game.awayBestOdds = formatOdds(awayTeamData["Away Best odds"]);
            Object.keys(BOOKMAKER_MAP).forEach((apiBookmaker) => {
              const componentBookmaker = BOOKMAKER_MAP[apiBookmaker];

              const homeOddsKey = `Home ${apiBookmaker}`;
              if (
                homeTeamData[homeOddsKey] !== undefined &&
                homeTeamData[homeOddsKey] !== 0
              ) {
                game[`${componentBookmaker.toLowerCase()}HomeOdds`] =
                  formatOdds(homeTeamData[homeOddsKey]);
              }

              const awayOddsKey = `Away ${apiBookmaker}`;
              if (
                awayTeamData[awayOddsKey] !== undefined &&
                awayTeamData[awayOddsKey] !== 0
              ) {
                game[`${componentBookmaker.toLowerCase()}AwayOdds`] =
                  formatOdds(awayTeamData[awayOddsKey]);
              }
            });
          }

          processedGames.push(game);
        }
      }
    });

    return processedGames;
  };
const processTotalData = (apiData) => {
  if (!apiData || !apiData.data) return [];

  const processedGames = [];

  Object.keys(apiData.data).forEach((gameKey) => {
    if (
      gameKey.includes("over_under") &&
      typeof apiData.data[gameKey] === "object"
    ) {
      const gameEntry = apiData.data[gameKey];
      const lineKeys = Object.keys(gameEntry);
      
      if (lineKeys.length === 2) {
        const overKey = lineKeys.find((key) => key.includes("o"));
        const underKey = lineKeys.find((key) => key.includes("u"));

        if (overKey && underKey) {
          const overData = gameEntry[overKey];
          const underData = gameEntry[underKey];

          let homeTeamData, awayTeamData;

          if (overData["Home Team"] && underData["Away Team"]) {
            homeTeamData = overData;
            awayTeamData = underData;
          } else {
            homeTeamData = underData;
            awayTeamData = overData;
          }

          const awayTeam = awayTeamData["Away Team"];
          const homeTeam = homeTeamData["Home Team"];
          const overValue = overKey;
          const underValue = underKey;

          // Create a unique game object for each total line
          const game = {
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            overValue: overValue,
            underValue: underValue,
            homePitcher: homeTeamData["Home Pitcher"] || "N/A",
            awayPitcher: awayTeamData["Away Pitcher"] || "N/A",
            homeOpen: formatOdds(homeTeamData["Home Open"]),
            awayOpen: formatOdds(awayTeamData["Away Open"]),
            homeBestOdds: formatOdds(homeTeamData["Home Best odds"]),
            awayBestOdds: formatOdds(awayTeamData["Away Best odds"]),
            date: homeTeamData?.Date || awayTeamData?.Date || "",
          };

          // Add bookmaker odds
          Object.keys(BOOKMAKER_MAP).forEach((apiBookmaker) => {
            const componentBookmaker = BOOKMAKER_MAP[apiBookmaker];

            const awayOddsKey = `Away ${apiBookmaker}`;
            const homeOddsKey = `Home ${apiBookmaker}`;

            if (
              awayTeamData[awayOddsKey] !== undefined &&
              awayTeamData[awayOddsKey] !== 0 &&
              awayTeamData[awayOddsKey] !== "0"
            ) {
              game[`${componentBookmaker.toLowerCase()}AwayOdds`] =
                formatOdds(awayTeamData[awayOddsKey]);
            }

            if (
              homeTeamData[homeOddsKey] !== undefined &&
              homeTeamData[homeOddsKey] !== 0 &&
              homeTeamData[homeOddsKey] !== "0"
            ) {
              game[`${componentBookmaker.toLowerCase()}HomeOdds`] =
                formatOdds(homeTeamData[homeOddsKey]);
            }
          });

          // Push each game as a separate entry
          processedGames.push(game);
        }
      }
    }
  });

  return processedGames;
};

  const processDefaultData = (apiData) => {
    if (!apiData || !Array.isArray(apiData.data)) return [];

    const processedGames = [];

    apiData.data.forEach((gameEntry) => {
      const homeTeam = gameEntry["Home Team"];
      const awayTeam = gameEntry["Away Team"];
      const homePitcher = gameEntry["Home Pitcher"] || "N/A";
      const awayPitcher = gameEntry["Away Pitcher"] || "N/A";

      const homeOpen = formatOdds(gameEntry["Home Open"]);
      const awayOpen = formatOdds(gameEntry["Away Open"]);
      const homeBestOdds = formatOdds(gameEntry["Home Best odds"]);
      const awayBestOdds = formatOdds(gameEntry["Away Best odds"]);
      const date = gameEntry?.Date || "";

      const game = {
        homeTeam,
        awayTeam,
        homePitcher,
        awayPitcher,
        homeOpen,
        awayOpen,
        homeBestOdds,
        awayBestOdds,
        date,
      };

      Object.keys(BOOKMAKER_MAP).forEach((apiBookmaker) => {
        const componentBookmaker = BOOKMAKER_MAP[apiBookmaker];

        const homeOddsKey = `Home ${apiBookmaker}`;
        const awayOddsKey = `Away ${apiBookmaker}`;

        if (gameEntry[homeOddsKey] && gameEntry[homeOddsKey] !== "0 / 0") {
          game[`${componentBookmaker.toLowerCase()}HomeOdds`] = formatOdds(
            gameEntry[homeOddsKey]
          );
        }

        if (gameEntry[awayOddsKey] && gameEntry[awayOddsKey] !== "0 / 0") {
          game[`${componentBookmaker.toLowerCase()}AwayOdds`] = formatOdds(
            gameEntry[awayOddsKey]
          );
        }
      });

      processedGames.push(game);
    });

    return processedGames;
  };
const fetchAllSportsData = async () => {
  console.log("🚀 fetchAllSportsData called, isFirstLoad:", isFirstLoadRef.current);
  
  setLoading(true);
  setError(null);

  try {
    const formattedDate = await formatDateForAPI(selectedDate);
    
    const nbaDefaultData = await api.getNbaDefaultData(
      formattedDate.date,
      formattedDate.timezone
    );
    const processedNbaDefault = processDefaultData(nbaDefaultData, "NBA");
    
    const nhlDefaultData = await api.getNhlDefaultData(
      formattedDate.date,
      formattedDate.timezone
    );
    const processedNhlDefault = processDefaultData(nhlDefaultData, "NHL");
    
    const mlbDefaultData = await api.getMlbDefaultData(
      formattedDate.date,
      formattedDate.timezone
    );
    const processedMlbDefault = processDefaultData(mlbDefaultData, "MLB");

    console.log("📊 Processed data lengths:", {
      nba: processedNbaDefault?.length,
      nhl: processedNhlDefault?.length,
      mlb: processedMlbDefault?.length,
      isFirstLoad: isFirstLoadRef.current
    });

    // Initialize previousDataRef for first load
    if (isFirstLoadRef.current) {
      previousDataRef.current = {
        nbaSpread: JSON.parse(JSON.stringify(processedNbaDefault)),
        nhlMoneyline: JSON.parse(JSON.stringify(processedNhlDefault)),
        mlbMoneyline: JSON.parse(JSON.stringify(processedMlbDefault)),
      };
      console.log("🏁 First load - initialized previousDataRef");
      isFirstLoadRef.current = false;
    } else {
      // Update change timestamps for each sport if not first load
      console.log("🔄 Not first load - updating timestamps");
      updateChangeTimestamps(processedNbaDefault, "nba");
      updateChangeTimestamps(processedNhlDefault, "nhl");
      updateChangeTimestamps(processedMlbDefault, "mlb");
    }

    const newAllSportsData = {
      nbaSpread: processedNbaDefault,
      nhlMoneyline: processedNhlDefault,
      mlbMoneyline: processedMlbDefault,
    };

    setAllSportsData(newAllSportsData);
    
  } catch (err) {
    console.error("❌ Error fetching all sports data:", err);
    setError("Failed to fetch all sports data. Please try again later.");
    setAllSportsData({
      nbaSpread: [],
      nhlMoneyline: [],
      mlbMoneyline: [],
    });
  } finally {
    setLoading(false);
  }
};
  const handleSportChange = (e) => {
    setSport(e.target.value);
  };

  const handleMarketTypeChange = (e) => {
    setMarketType(e.target.value);
  };

  const isPositiveOdds = (odds) => {
    if (!odds) return false;
    if (typeof odds === "string") {
      return odds.trim().startsWith("+");
    }
    return odds > 0;
  };
const renderSportTable = (
  sportName,
  marketTypeName,
  gamesData,
  tableTitle,
) => {
  const sportTypeKey = sportName.toLowerCase();

  return (
    <div
      key={`${sportName}-${marketTypeName}`}
      className="sport-table-section mb-5"
    >
      <h2 className="sport-table-title mb-3">{tableTitle}</h2>
      <div className="betting-table-wrapper table_flow">
        <table className="betting-table">
          <thead>
            <tr>
              <th className="matchup_td">MATCHUP</th>
              {sportName === "MLB" && <th>PITCHERS</th>}
              {/* COMMENTED OUT - OPEN, BEST ODDS, AI PICKS COLUMNS */}
              <th>OPEN</th>
              <th>BEST ODDS</th>
              {/* <th>AI PICKS</th> */}
              {Object.entries(BOOKMAKER_LOGOS).map(([name, { logo }], i) => (
                <th key={i}>
                  <div className="logo-header">
                    <img src={logo} alt={name} className="bookmaker-logo" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gamesData.length > 0 ? (
              gamesData.map((game, index) => (
                <tr
                  key={index}
                  className={
                    bookmarkedGames.includes(index) ? "bookmarked-row" : ""
                  }
                  onClick={() => toggleBookmark(index)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div className="game-time">
                      {game.date} · {game.time} · {sportName}
                    </div>

                    <div className="team-name">{game.awayTeam}</div>
                    
                    <div className="team-name">{game.homeTeam}
                       <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    title="View Injuries"
                                    style={{
                                     cursor: "pointer",
                                        color: "#007bff",
                                        position: "absolute",
                                        right: "15px",
                                    }}
                                    onClick={(e) =>
                                      handleEyeIconClick(
                                        game.homeTeam,
                                        game.awayTeam,
                                        sportName, 
                                        e
                                      )
                                    }
                                  />
                    </div>
                    
                  </td>
                  {sportName === "MLB" && (
                    <td>
                      <div className="pitcher-name">
                        {game.awayPitcher || "N/A"}
                      </div>
                      <div className="pitcher-name">
                        {game.homePitcher || "N/A"}
                      </div>
                    </td>
                  )}
                  {/* COMMENTED OUT - OPEN ODDS COLUMN */}
                  <td>
                    <div
                      className={`odd_${
                        isPositiveOdds(game.awayOpen) ? "y" : "g"
                      } ${getCellColor(
                        `${index}-awayOpen`,
                        game.awayOpen,
                        sportTypeKey
                      )}`}
                    >
                      {game.awayOpen || "0"}
                    </div>
                    <div
                      className={`odd_${
                        isPositiveOdds(game.homeOpen) ? "y" : "n"
                      } ${getCellColor(
                        `${index}-homeOpen`,
                        game.homeOpen,
                        sportTypeKey
                      )}`}
                    >
                      {game.homeOpen || "0"}
                    </div>
                  </td>
                  {/* COMMENTED OUT - BEST ODDS COLUMN */}
                  <td>
                    <div
                      className={`odd_${
                        isPositiveOdds(game.awayBestOdds) ? "y" : "n"
                      } ${getCellColor(
                        `${index}-awayBestOdds`,
                        game.awayBestOdds,
                        sportTypeKey
                      )}`}
                    >
                      {game.awayBestOdds || "0"}
                    </div>
                    <div
                      className={`odd_${
                        isPositiveOdds(game.homeBestOdds) ? "y" : "n"
                      } ${getCellColor(
                        `${index}-homeBestOdds`,
                        game.homeBestOdds,
                        sportTypeKey
                      )}`}
                    >
                      {game.homeBestOdds || "0"}
                    </div>
                  </td>
                  {/* COMMENTED OUT - AI PICKS COLUMN */}
                  {/* <td>
                    <button
                      className="ai-picks-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAiPicksClick(index);
                      }}
                      style={{
                        background:
                          "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 4px 12px rgba(102, 126, 234, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Click Here
                    </button>
                  </td> */}
                  {Object.keys(BOOKMAKER_LOGOS).map((bookmaker, i) => {
                    const bookmakerKey = bookmaker.toLowerCase();
                    const homeOddsKey = `${bookmakerKey}HomeOdds`;
                    const awayOddsKey = `${bookmakerKey}AwayOdds`;
                    return (
                      <td key={i}>
                        <div
                          className={`odd ${
                            isPositiveOdds(game[awayOddsKey])
                              ? "positive odd_red"
                              : "negative odd_n"
                          } ${getCellColor(
                            `${index}-${awayOddsKey}`,
                            game[awayOddsKey],
                            sportTypeKey
                          )}`}
                        >
                          {game[awayOddsKey] || "0"}
                        </div>
                        <div
                          className={`odd ${
                            isPositiveOdds(game[homeOddsKey])
                              ? "positive odd_red"
                              : "negative odd_n"
                          } ${getCellColor(
                            `${index}-${homeOddsKey}`,
                            game[homeOddsKey],
                            sportTypeKey
                          )}`}
                        >
                          {game[homeOddsKey] || "0"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    5 + // UPDATED: Changed from 6 to 2 since we removed OPEN, BEST ODDS, AI PICKS columns
                    (sportName === "MLB" ? 1 : 0) +
                    Object.keys(BOOKMAKER_LOGOS).length
                  }
                  className="text-center py-4"
                >
                  No games available for {tableTitle}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
  return (
    <section className="backgroung_image">
      <div className="container new_container">
        <div className="row">
          <div className="top_banner mt-5">
            <PromoBanner />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-2">
            <div className="nfl-games-container">
              <div className="selectors">
                <select value={sport} onChange={handleSportChange}>
                  {activeTab === "OVERVIEW" && (
                    <option value="ALL">ALL SPORTS</option>
                  )}
                  <option value="NBA">NBA</option>
                  <option value="NHL">NHL</option>
                  <option value="MLB">MLB</option>
                </select>
                {sport !== "ALL" &&
                  activeTab !== "INJURIES" &&
                  activeTab !== "SCHEDULE" &&
                  activeTab !== "TEAMS" &&
                  activeTab !== "FUTURES" && (
                    <select
                      value={marketType}
                      onChange={handleMarketTypeChange}
                    >
                      <option value="DEFAULT">
                        {sport === "NBA" ? "Spread/Total" : "Moneyline/Total"}
                      </option>
                      <option value="SPREAD">SPREAD</option>
                      <option value="MONEYLINE">MONEYLINE</option>
                      <option value="TOTAL">TOTAL</option>
                    </select>
                  )}

                {activeTab !== "TEAMS" &&
                  activeTab !== "FUTURES" &&
                  activeTab !== "INJURIES" && (
                    <div className="date-picker-wrapper">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="EEE MMM dd"
                        className="calendar-input"
                        popperPlacement="bottom"
                        maxDate={
                          activeTab === "OVERVIEW" ? getTomorrowDate() : null
                        }
                      />
                    </div>
                  )}
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={tab === activeTab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table: Only show when active tab is OVERVIEW */}
            {activeTab === "OVERVIEW" && (
              <div className="betting-table-wrapper table_flow">
                {sport === "ALL" ? (
                  <div className="all-sports-container">
                    <h1 className="nba_odds mb-4">All Sports Overview</h1>
                    {loading ? (
                      <div className="loader-container my-5">
                        <div className="loader spinner-border text-primary text-center"></div>
                      </div>
                    ) : error ? (
                      <div className="text-center py-4 text-danger">
                        {error}
                      </div>
                    ) : (
                      <>
                        {renderSportTable(
                          "NBA",
                          "SPREAD",
                          allSportsData.nbaSpread,
                          "NBA Spread/Total"
                        )}
                        {renderSportTable(
                          "NHL",
                          "MONEYLINE",
                          allSportsData.nhlMoneyline,
                          "NHL Moneyline/Total"
                        )}
                        {renderSportTable(
                          "MLB",
                          "MONEYLINE",
                          allSportsData.mlbMoneyline,
                          "MLB Moneyline/Total"
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <h1 className="nba_odds">Upcoming {sport} Games</h1>
                    {loading ? (
                      <div className="loader-container my-5">
                        <div className="loader spinner-border text-primary text-center"></div>
                        <p className="text-center mt-5 "></p>
                      </div>
                    ) : error ? (
                      <div className="text-center py-4 text-danger">
                        {error}
                      </div>
                    ) : (
                      <table className="betting-table">
                        <thead>
                          <tr>
                            <th className="matchup_td">MATCHUP</th>
                            {sport === "MLB" && <th>PITCHERS</th>}
                            {(marketType === "SPREAD" ||
                              marketType === "TOTAL") && (
                              <th>
                                {marketType === "SPREAD" ? "SPREAD" : "TOTAL"}
                              </th>
                            )}
                            {/* COMMENTED OUT - OPEN, BEST ODDS, AI PICKS HEADERS */}
                            <th>OPEN</th>
                            <th>BEST ODDS</th>
                            {/* <th>AI PICKS</th> */}
                            {Object.entries(BOOKMAKER_LOGOS).map(
                              ([name, { logo }], i) => (
                                <th key={i}>
                                  <div className="logo-header">
                                    <img
                                      src={logo}
                                      alt={name}
                                      className="bookmaker-logo"
                                    />
                                  </div>
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        {/* Table tbody section - replace your existing tbody */}
                        <tbody>
                          {gamesData.length > 0 ? (
                            gamesData.map((game, index) => (
                              <tr
                                key={index}
                                className={
                                  bookmarkedGames.includes(index)
                                    ? "bookmarked-row"
                                    : ""
                                }
                                onClick={() => toggleBookmark(index)}
                                style={{ cursor: "pointer" }}
                              >
                                <td>
                                  <div className="game-time">
                                    {game.date} · {game.time} · {sport}
                                  </div>

                                  <div className="team-name">
                                    {game.homeTeam}
                                  </div>

                                  <div className="team-name">
                                    {game.awayTeam}
                                    <FontAwesomeIcon
                                      // icon={faEye}
                                      icon={faInfoCircle}
                                      title="View Injuries"
                                      style={{
                                        cursor: "pointer",
                                        color: "#007bff",
                                        position: "absolute",
                                        right: "15px",
                                      }}
                                      onClick={(e) =>
                                        handleEyeIconClick(
                                          game.homeTeam,
                                          game.awayTeam,
                                          sport,
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                </td>
                                {sport === "MLB" && (
                                  <td>
                                    <div className="pitcher-name">
                                      {game.homePitcher || "N/A"}
                                    </div>
                                    <div className="pitcher-name">
                                      {game.awayPitcher || "N/A"}
                                    </div>
                                  </td>
                                )}

                                {(marketType === "SPREAD" ||
                                  marketType === "TOTAL") && (
                                  <td>
                                    {marketType === "SPREAD" ? (
                                      <>
                                        <div
                                          className={`odd_n ${getCellColor(
                                            `${index}-homeSpread`,
                                            game.homeSpread
                                          )}`}
                                        >
                                          {game.homeSpread}
                                        </div>
                                        <div
                                          className={`odd_n ${getCellColor(
                                            `${index}-awaySpread`,
                                            game.awaySpread
                                          )}`}
                                        >
                                          {game.awaySpread}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div
                                          className={`odd_n ${getCellColor(
                                            `${index}-overValue`,
                                            game.overValue
                                          )}`}
                                        >
                                          {game.overValue || "0"}
                                        </div>
                                        <div
                                          className={`odd_n ${getCellColor(
                                            `${index}-underValue`,
                                            game.underValue
                                          )}`}
                                        >
                                          {game.underValue || "0"}
                                        </div>
                                      </>
                                    )}
                                  </td>
                                )}
                                {/* COMMENTED OUT - OPEN ODDS COLUMN */}
                                <td>
                                  {(sport === "NBA" &&
                                    marketType === "SPREAD") ||
                                  (sport === "MLB" &&
                                    marketType === "MONEYLINE") ? (
                                    <>
                                      <div
                                        className={`odd_${
                                          isPositiveOdds(game.awayOpen)
                                            ? "y"
                                            : "g"
                                        } ${getCellColor(
                                          `${index}-awayOpen`,
                                          game.awayOpen
                                        )}`}
                                      >
                                        {game.awayOpen || "0"}
                                      </div>
                                      <div
                                        className={`odd_${
                                          isPositiveOdds(game.homeOpen)
                                            ? "y"
                                            : "n"
                                        } ${getCellColor(
                                          `${index}-homeOpen`,
                                          game.homeOpen
                                        )}`}
                                      >
                                        {game.homeOpen || "-"}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className={`odd_${
                                          isPositiveOdds(game.homeOpen)
                                            ? "y"
                                            : "n"
                                        } ${getCellColor(
                                          `${index}-homeOpen`,
                                          game.homeOpen
                                        )}`}
                                      >
                                        {game.homeOpen || "-"}
                                      </div>
                                      <div
                                        className={`odd_${
                                          isPositiveOdds(game.awayOpen)
                                            ? "y"
                                            : "g"
                                        } ${getCellColor(
                                          `${index}-awayOpen`,
                                          game.awayOpen
                                        )}`}
                                      >
                                        {game.awayOpen || "0"}
                                      </div>
                                    </>
                                  )}
                                </td>
                                {/* COMMENTED OUT - BEST ODDS COLUMN */}
                                <td>
                                  {(sport === "NBA" &&
                                    marketType === "SPREAD") ||
                                  (sport === "MLB" &&
                                    marketType === "MONEYLINE") ? (
                                    <>
                                      <div
                                        className={`odd_${
                                          isPositiveOdds(game.awayBestOdds)
                                            ? "y"
                                            : "n"
                                        } ${getCellColor(
                                          `${index}-awayBestOdds`,
                                          game.awayBestOdds
                                        )}`}
                                      >
                                        {game.awayBestOdds || "0"}
                                      </div>
                                      <div
                                        className={`odd_${
                                          isPositiveOdds(game.homeBestOdds)
                                            ? "y"
                                            : "n"
                                        } ${getCellColor(
                                          `${index}-homeBestOdds`,
                                          game.homeBestOdds
                                        )}`}
                                      >
                                        {game.homeBestOdds || "0"}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className={`odd_${
                                          isPositiveOdds(game.homeBestOdds)
                                            ? "y"
                                            : "n"
                                        } ${getCellColor(
                                          `${index}-homeBestOdds`,
                                          game.homeBestOdds
                                        )}`}
                                      >
                                        {game.homeBestOdds || "0"}
                                      </div>
                                      <div
                                        className={`odd_${
                                          isPositiveOdds(game.awayBestOdds)
                                            ? "y"
                                            : "n"
                                        } ${getCellColor(
                                          `${index}-awayBestOdds`,
                                          game.awayBestOdds
                                        )}`}
                                      >
                                        {game.awayBestOdds || "0"}
                                      </div>
                                    </>
                                  )}
                                </td>

                                {/* COMMENTED OUT - AI PICKS COLUMN */}
                                {/* <td>
                                  <button
                                    className="ai-picks-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAiPicksClick(index);
                                    }}
                                    style={{
                                      background:
                                        "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                                      color: "white",
                                      border: "none",
                                      padding: "8px 16px",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      transition: "all 0.3s ease",
                                      textTransform: "uppercase",
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.transform =
                                        "translateY(-2px)";
                                      e.target.style.boxShadow =
                                        "0 4px 12px rgba(102, 126, 234, 0.4)";
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.transform =
                                        "translateY(0)";
                                      e.target.style.boxShadow = "none";
                                    }}
                                  >
                                    Click Here
                                  </button>
                                </td> */}

                                {Object.keys(BOOKMAKER_LOGOS).map(
                                  (bookmaker, i) => {
                                    const bookmakerKey =
                                      bookmaker.toLowerCase();
                                    const homeOddsKey = `${bookmakerKey}HomeOdds`;
                                    const awayOddsKey = `${bookmakerKey}AwayOdds`;
                                    return (
                                      <td key={i}>
                                        {/* FIXED: Check for MLB moneyline to display in correct order */}
                                        {sport === "MLB" &&
                                        marketType === "MONEYLINE" ? (
                                          <>
                                            <div
                                              className={`odd ${
                                                isPositiveOdds(
                                                  game[awayOddsKey]
                                                )
                                                  ? "positive odd_red"
                                                  : "negative odd_n"
                                              } ${getCellColor(
                                                `${index}-${awayOddsKey}`,
                                                game[awayOddsKey]
                                              )}`}
                                            >
                                              {game[awayOddsKey] || "0"}
                                            </div>
                                            <div
                                              className={`odd ${
                                                isPositiveOdds(
                                                  game[homeOddsKey]
                                                )
                                                  ? "positive odd_red"
                                                  : "negative odd_n"
                                              } ${getCellColor(
                                                `${index}-${homeOddsKey}`,
                                                game[homeOddsKey]
                                              )}`}
                                            >
                                              {game[homeOddsKey] || "0"}
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <div
                                              className={`odd ${
                                                isPositiveOdds(
                                                  game[homeOddsKey]
                                                )
                                                  ? "positive odd_red"
                                                  : "negative odd_n"
                                              } ${getCellColor(
                                                `${index}-${homeOddsKey}`,
                                                game[homeOddsKey]
                                              )}`}
                                            >
                                              {game[homeOddsKey] || "0"}
                                            </div>
                                            <div
                                              className={`odd ${
                                                isPositiveOdds(
                                                  game[awayOddsKey]
                                                )
                                                  ? "positive odd_red"
                                                  : "negative odd_n"
                                              } ${getCellColor(
                                                `${index}-${awayOddsKey}`,
                                                game[awayOddsKey]
                                              )}`}
                                            >
                                              {game[awayOddsKey] || "0"}
                                            </div>
                                          </>
                                        )}
                                      </td>
                                    );
                                  }
                                )}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={
                                  5 + // UPDATED: Changed from 5 to 2 since we removed OPEN, BEST ODDS, AI PICKS columns
                                  (sport === "MLB" ? 1 : 0) +
                                  (marketType === "SPREAD" ||
                                  marketType === "TOTAL"
                                    ? 1
                                    : 0) +
                                  Object.keys(BOOKMAKER_LOGOS).length
                                }
                                className="text-center py-4"
                              >
                                {loading
                                  ? "Loading..."
                                  : "No games available. Try another sport or day."}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
              </div>
            )}
            {activeTab === "GAMES" && (
              <div>
                <MatchesPage />
              </div>
            )}
            {activeTab === "FUTURES" && (
              <div>
                <Futures />
              </div>
            )}

            {activeTab === "TEAMS" && (
              <div>
                <Teamstab currentSport={sport} />
              </div>
            )}
            {activeTab === "SCHEDULE" && (
              <div>
                <Schedule currentSport={sport} selectedDate={selectedDate} />
              </div>
            )}
            {activeTab === "INJURIES" && (
              <div>
                <NBAInjuryTable currentSport={sport} />
              </div>
            )}
          </div>
        </div>
      </div>

      <HomeBlog />

      <StaticInfo />
      <Faq />
      <InjuryModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        teamName={modalState.teamName}
        sport={modalState.sport}
        injuryData={modalState.injuryData}
        loading={modalState.loading}
      />
    </section>
  );
};

export default Games;
