import React, { useState, useEffect, useRef } from 'react';
import Faq from "./faq";
import TabsWithMatchups from './gametab';
import DatePicker from 'react-datepicker';
import '../../Assets/css/newhome.css';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api'; 
import betmgmLogo from "../../Assets/images/betmgm.png";
import draftkingsLogo from "../../Assets/images/draftking.png";
import fanduelLogo from "../../Assets/images/fanduel.webp";
import caesarsLogo from "../../Assets/images/caesors.png";
import betriversLogo from "../../Assets/images/betrivers.png";
import bet365Logo from "../../Assets/images/bet365.webp";
import unibetLogo from "../../Assets/images/unibet.png";
import Schedule from './Schedule';
import NBAInjuryTable from './injury';


const BOOKMAKER_LOGOS = {
  BetMGM: { logo: betmgmLogo },
  DraftKings: { logo: draftkingsLogo },
  FanDuel: { logo: fanduelLogo },
  Caesars: { logo: caesarsLogo },
  BetRivers: { logo: betriversLogo },
  Bet365: { logo: bet365Logo },
  Unibet: { logo: unibetLogo },
};

const BOOKMAKER_MAP = {
  'Betmgm': 'BetMGM',
  'Caesars': 'Caesars',
  'Fanduel': 'FanDuel',
  'Dk': 'DraftKings',
  'Betrivers': 'BetRivers',
  'Unibetnj': 'Unibet',
  'Bet365': 'Bet365'
};

const isValueChanged = (oldVal, newVal) => {
  if (oldVal === undefined || newVal === undefined) return false;
  if (oldVal === null || newVal === null) return oldVal !== newVal;
  
  const oldNum = typeof oldVal === 'string' ? parseFloat(oldVal.replace(/[+-]/g, '')) : oldVal;
  const newNum = typeof newVal === 'string' ? parseFloat(newVal.replace(/[+-]/g, '')) : newVal;
  
  return oldNum !== newNum;
};

const Games = () => {
  const [sport, setSport] = useState('NHL');
  const [marketType, setMarketType] = useState('SPREAD');
  const [selectedDate, setSelectedDate] = useState(new Date('2025-04-04'));
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [currentPage, setCurrentPage] = useState(1);
  const tabs = ['OVERVIEW', 'GAMES', 'FUTURES', 'TEAMS', 'SCHEDULE', 'INJURIES'];
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousDataRef = useRef([]);
  const changeTimestampsRef = useRef({});
  const isFirstLoadRef = useRef(true);
  const currentSportMarketRef = useRef('');

  const totalPages = 4;
  
  const formatOdds = (odds) => {
    if (odds === null || odds === undefined) return "-";
    
    if (typeof odds === 'string') {
      odds = odds.trim();
      if (odds === "0") return "-";
      if (odds === "-" || odds.startsWith("+") || odds.startsWith("-")) {
        return odds;
      }
      odds = parseFloat(odds);
    }
    return odds > 0 ? `+${odds}` : `${odds}`;
  };
const [colorRefreshTrigger, setColorRefreshTrigger] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setColorRefreshTrigger(prev => prev + 1);
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
const getCellColor = (key, value) => {
  if (isFirstLoadRef.current) return '';
  
  const changeKey = `${key}-${value}`;
  const timestamp = changeTimestampsRef.current[changeKey];
  
  if (!timestamp) return '';
  
  const secondsSinceChange = (Date.now() - timestamp) / 1000;
  
  if (secondsSinceChange <= 20) {
    return 'changed-green';
  } else if (secondsSinceChange <= 40) {
    return 'changed-yellow';
  } else if (secondsSinceChange <= 60) {
    return 'changed-red';
  }
  
  return '';
};
const updateChangeTimestamps = (newData) => {
  const oldData = previousDataRef.current;
  const newTimestamps = {...changeTimestampsRef.current}; 
  const now = Date.now();
  newData.forEach((game, gameIndex) => {
    if (!oldData[gameIndex]) return;
    
    Object.keys(game).forEach(key => {
      const value = game[key];
      if (value === undefined || value === null || value === '-') return;
      
      const oldValue = oldData[gameIndex][key];
      
      if (isValueChanged(oldValue, value)) {
        const changeKey = `${gameIndex}-${key}-${value}`;
       ;
        newTimestamps[changeKey] = now;
      }
    });
  });

  Object.keys(newTimestamps).forEach(key => {
    if ((now - newTimestamps[key]) / 1000 > 60) {
      delete newTimestamps[key];
    }
  });
  
  changeTimestampsRef.current = newTimestamps;
  previousDataRef.current = JSON.parse(JSON.stringify(newData));
};


  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let apiData;
      let processedData = [];
      
      switch (sport) {
        case 'NBA':
          switch (marketType) {
            case 'MONEYLINE':
              apiData = await api.getMoneyData();
              processedData = processMoneylineData(apiData);
              break;
            case 'SPREAD':
              apiData = await api.getSpreadData();
              processedData = processSpreadData(apiData);
              break;
            case 'TOTAL':
              apiData = await api.getOverUnderData();
              processedData = processTotalData(apiData);
              break;
            default:
              apiData = await api.getSpreadData();
              processedData = processSpreadData(apiData);
          }
          break;
        
        case 'MLB':
          switch (marketType) {
            case 'MONEYLINE':
              apiData = await api.getMlbMoneyData();
              processedData = processMoneylineData(apiData);
              break;
            case 'SPREAD':
              apiData = await api.getMlbSpreadData();
              processedData = processSpreadData(apiData);
              break;
            case 'TOTAL':
              apiData = await api.getMlbOverUnderData();
              processedData = processTotalData(apiData);
              break;
            default:
              apiData = await api.getMlbSpreadData();
              processedData = processSpreadData(apiData);
          }
          break;
        
        case 'NHL':
          switch (marketType) {
            case 'MONEYLINE':
              apiData = await api.getNhlMoneyData();
              processedData = processMoneylineData(apiData);
              break;
            case 'SPREAD':
              apiData = await api.getNhlSpreadData();
              processedData = processSpreadData(apiData);
              break;
            case 'TOTAL':
              apiData = await api.getNhlOverUnderData();
              processedData = processTotalData(apiData);
              break;
            default:
              apiData = await api.getNhlSpreadData();
              processedData = processSpreadData(apiData);
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
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(`Failed to fetch ${sport} ${marketType.toLowerCase()} data. Please try again later.`);
      setGamesData([]);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  const fetchAndUpdateData = async () => {
    setLoading(true);
    try {
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  fetchAndUpdateData(); 
  const interval = setInterval(fetchAndUpdateData, 60000);
  
  return () => clearInterval(interval);
}, [sport, marketType]);
  const processSpreadData = (apiData) => {
    if (!apiData || !apiData.data) return [];
    
    const processedGames = [];
    Object.keys(apiData.data).forEach(spreadKey => {
      if (Array.isArray(apiData.data[spreadKey]) && apiData.data[spreadKey].length > 0) {
        const spreadEntry = apiData.data[spreadKey][0];
        const spreadValues = Object.keys(spreadEntry);
        
        if (spreadValues.length === 2) {
          const value1 = spreadValues[0];
          const value2 = spreadValues[1];
          
          const data1 = spreadEntry[value1];
          const data2 = spreadEntry[value2];
          let homeTeamData, awayTeamData, homeSpread, awaySpread;
          
          if (data1["Home Team"]) {
            homeTeamData = data1;
            homeSpread = value1;
            awayTeamData = data2;
            awaySpread = value2;
          } else {
            homeTeamData = data2;
            homeSpread = value2;
            awayTeamData = data1;
            awaySpread = value1;
          }
          
          const game = {
            homeTeam: homeTeamData["Home Team"],
            awayTeam: awayTeamData["Away Team"],
            homeSpread: homeSpread,
            awaySpread: awaySpread,
            homeOpen: formatOdds(homeTeamData["Home Open"]),
            awayOpen: formatOdds(awayTeamData["Away Open"]),
            homeBestOdds: formatOdds(homeTeamData["Home Best odds"]),
            awayBestOdds: formatOdds(awayTeamData["Away Best odds"]),
            date: "TODAY",
            time: "7:30PM",
          };
          
          Object.keys(BOOKMAKER_MAP).forEach(apiBookmaker => {
            const componentBookmaker = BOOKMAKER_MAP[apiBookmaker];
            const homeOddsKey = `Home ${apiBookmaker}`;
            if (homeTeamData[homeOddsKey] && homeTeamData[homeOddsKey] !== 0) {
              game[`${componentBookmaker.toLowerCase()}HomeOdds`] = homeTeamData[homeOddsKey];
            }
            const awayOddsKey = `Away ${apiBookmaker}`;
            if (awayTeamData[awayOddsKey] && awayTeamData[awayOddsKey] !== 0) {
              game[`${componentBookmaker.toLowerCase()}AwayOdds`] = awayTeamData[awayOddsKey];
            }
          });
            
          processedGames.push(game);
        }
      }
    });
         
    return processedGames;
  };

  const processMoneylineData = (apiData) => {
    if (!apiData || !apiData.data) return [];
    
    const processedGames = [];
    Object.keys(apiData.data).forEach(gameKey => {
      if (gameKey.startsWith('game') && Array.isArray(apiData.data[gameKey]) && apiData.data[gameKey].length > 0) {
        const gameEntry = apiData.data[gameKey][0];
        const teamNames = Object.keys(gameEntry);
        
        if (teamNames.length === 2) {
          let homeTeamData, awayTeamData;
          
          if (gameEntry[teamNames[0]]["Home Team"]) {
            homeTeamData = gameEntry[teamNames[0]];
            awayTeamData = gameEntry[teamNames[1]];
          } else {
            homeTeamData = gameEntry[teamNames[1]];
            awayTeamData = gameEntry[teamNames[0]];
          }
  
          const game = {
            homeTeam: homeTeamData["Home Team"],
            awayTeam: awayTeamData["Away Team"],
            homeOpen: formatOdds(homeTeamData["Home Open"]),
            awayOpen: formatOdds(awayTeamData["Away Open"]),
            homeBestOdds: formatOdds(homeTeamData["Home Best odds"]),
            awayBestOdds: formatOdds(awayTeamData["Away Best odds"]),
            date: "TODAY",
            time: "7:30PM",
          };
          
          Object.keys(BOOKMAKER_MAP).forEach(apiBookmaker => {
            const componentBookmaker = BOOKMAKER_MAP[apiBookmaker];
            const homeOddsKey = `Home ${apiBookmaker}`;
            if (homeTeamData[homeOddsKey] !== undefined && homeTeamData[homeOddsKey] !== 0) {
              game[`${componentBookmaker.toLowerCase()}HomeOdds`] = formatOdds(homeTeamData[homeOddsKey]);
            }
            const awayOddsKey = `Away ${apiBookmaker}`;
            if (awayTeamData[awayOddsKey] !== undefined && awayTeamData[awayOddsKey] !== 0) {
              game[`${componentBookmaker.toLowerCase()}AwayOdds`] = formatOdds(awayTeamData[awayOddsKey]);
            }
          });
          
          processedGames.push(game);
        }
      }
    });
    
    return processedGames;
  };

  const processTotalData = (apiData) => {
    if (!apiData || !apiData.data) return [];
    
    const processedGames = [];
    const gameMap = {};
    
    Object.keys(apiData.data).forEach(gameKey => {
      if (gameKey.startsWith('over_under') && Array.isArray(apiData.data[gameKey]) && apiData.data[gameKey].length > 0) {
        const gameEntry = apiData.data[gameKey][0];
        const lineKeys = Object.keys(gameEntry);
        
        if (lineKeys.length === 2) {
          let overKey, underKey, overData, underData;
          
          overKey = lineKeys.find(key => key.startsWith('o'));
          underKey = lineKeys.find(key => key.startsWith('u'));
          
          if (overKey && underKey) {
            overData = gameEntry[overKey];
            underData = gameEntry[underKey];
            
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
            const totalValue = overKey.substring(1);
            
            const matchupKey = `${awayTeam}-${homeTeam}`;
            
            if (!gameMap[matchupKey]) {
              gameMap[matchupKey] = {
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                overValue: totalValue,
                homeOpen: formatOdds(homeTeamData["Home Open"]),
                awayOpen: formatOdds(awayTeamData["Away Open"]),
                homeBestOdds: formatOdds(homeTeamData["Home Best odds"]),
                awayBestOdds: formatOdds(awayTeamData["Away Best odds"]),
                underValue: totalValue,
                date: "TODAY",
                time: "7:30PM",
              };
            }
            
            const game = gameMap[matchupKey];
            
            Object.keys(BOOKMAKER_MAP).forEach(apiBookmaker => {
              const componentBookmaker = BOOKMAKER_MAP[apiBookmaker];
              
              const awayOddsKey = `Away ${apiBookmaker}`;
              if (awayTeamData[awayOddsKey] !== undefined && awayTeamData[awayOddsKey] !== 0) {
                game[`${componentBookmaker.toLowerCase()}AwayOdds`] = formatOdds(awayTeamData[awayOddsKey]);
              }
              
              const homeOddsKey = `Home ${apiBookmaker}`;
              if (homeTeamData[homeOddsKey] !== undefined && homeTeamData[homeOddsKey] !== 0) {
                game[`${componentBookmaker.toLowerCase()}HomeOdds`] = formatOdds(homeTeamData[homeOddsKey]);
              }
            });
          }
        }
      }
    });

    Object.values(gameMap).forEach(game => {
      processedGames.push(game);
    });
    
    return processedGames;
  };

  const toggleTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
    if (typeof odds === 'string') {
      return odds.trim().startsWith('+');
    }
    return odds > 0;
  };

  return (
    <section className="backgroung_image">
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <div className="nfl-games-container">
              <h1 className="nba_odds">Upcoming {sport} Games</h1>

              {/* Selectors */}
              <div className="selectors">
                <select value={sport} onChange={handleSportChange}>
                  <option value="NHL">NHL</option>
                  <option value="NBA">NBA</option>
                  <option value="MLB">MLB</option>
                </select>

                <select value={marketType} onChange={handleMarketTypeChange}>
                  <option value="SPREAD">SPREAD</option>
                  <option value="MONEYLINE">MONEYLINE</option>
                  <option value="TOTAL">TOTAL</option>
                </select>

                <div className="date-picker-wrapper">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="EEE MMM dd"
                    className="calendar-input"
                    popperPlacement="bottom"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={tab === activeTab ? 'active' : ''}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Table: Only show when active tab is OVERVIEW */}
              {activeTab === 'OVERVIEW' && (
                <div className="betting-table-wrapper table_flow">
                  {loading ? (
                    <div className="text-center py-4">Loading data...</div>
                  ) : error ? (
                    <div className="text-center py-4 text-danger">{error}</div>
                  ) : (
                    <table className="betting-table">
                      <thead>
                        <tr>
                          <th>MATCHUP</th>
                          <th>{marketType === 'SPREAD' ? 'SPREAD' : (marketType === 'TOTAL' ? 'TOTAL' : 'Odds')}</th>
                          <th>OPEN</th>
                          <th>BEST ODDS</th>
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
                            <tr key={index}>
                              <td>
                                <div className="game-time">{game.date} · {game.time} · {sport}</div>
                                <div className="team-name">{game.homeTeam}</div>
                                <div className="team-name">{game.awayTeam}</div>
                              </td>
                              <td>
                                {marketType === 'SPREAD' ? (
                                  <>
                                    <div className={`odd_n ${getCellColor(`${index}-homeSpread`, game.homeSpread)}`}>
                                      {game.homeSpread}
                                    </div>
                                    <div className={`odd_n ${getCellColor(`${index}-awaySpread`, game.awaySpread)}`}>
                                      {game.awaySpread}
                                    </div>
                                  </>
                                ) : marketType === 'TOTAL' ? (
                                  <>
                                    <div className={`odd_n ${getCellColor(`${index}-overValue`, game.overValue)}`}>
                                      O {game.overValue || "0"}
                                    </div>
                                    <div className={`odd_n ${getCellColor(`${index}-underValue`, game.underValue)}`}>
                                      U {game.underValue || "0"}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className={`odd_${isPositiveOdds(game.homeBestOdds) ? 'y' : 'n'} ${getCellColor(`${index}-homeBestOdds`, game.homeBestOdds)}`}>
                                      {formatOdds(game.homeBestOdds || 0)}
                                    </div>
                                    <div className={`odd_${isPositiveOdds(game.awayBestOdds) ? 'y' : 'g'} ${getCellColor(`${index}-awayBestOdds`, game.awayBestOdds)}`}>
                                      {formatOdds(game.awayBestOdds || 0)}
                                    </div>
                                  </>
                                )}
                              </td>
                              <td>
                                <div className={`odd_${isPositiveOdds(game.homeOpen) ? 'y' : 'n'} ${getCellColor(`${index}-homeOpen`, game.homeOpen)}`}>
                                  {game.homeOpen || "-"}
                                </div>
                                <div className={`odd_${isPositiveOdds(game.awayOpen) ? 'y' : 'g'} ${getCellColor(`${index}-awayOpen`, game.awayOpen)}`}>
                                  {game.awayOpen || "-"}
                                </div>
                              </td>
                              <td>
                                <div className={`odd_${isPositiveOdds(game.homeBestOdds) ? 'y' : 'n'} ${getCellColor(`${index}-homeBestOdds`, game.homeBestOdds)}`}>
                                  {game.homeBestOdds || "-"}
                                </div>
                                <div className={`odd_${isPositiveOdds(game.awayBestOdds) ? 'y' : 'n'} ${getCellColor(`${index}-awayBestOdds`, game.awayBestOdds)}`}>
                                  {game.awayBestOdds || "-"}
                                </div>
                              </td>
                              {Object.keys(BOOKMAKER_LOGOS).map((bookmaker, i) => {
                                const bookmakerKey = bookmaker.toLowerCase();
                                const homeOddsKey = `${bookmakerKey}HomeOdds`;
                                const awayOddsKey = `${bookmakerKey}AwayOdds`;
                                return (
                                  <td key={i}>
                                    <div className={`odd ${isPositiveOdds(game[awayOddsKey]) ? 'positive odd_red' : 'negative odd_n'} ${getCellColor(`${index}-${awayOddsKey}`, game[awayOddsKey])}`}>
                                      {game[awayOddsKey] || "-"}
                                    </div>
                                    <div className={`odd ${isPositiveOdds(game[homeOddsKey]) ? 'positive odd_red' : 'negative odd_n'} ${getCellColor(`${index}-${homeOddsKey}`, game[homeOddsKey])}`}>
                                      {game[homeOddsKey] || "-"}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))
                        ) : (
                          [1, 2, 3, 4].map((_, index) => (
                            <tr key={index}>
                              <td colSpan={4 + Object.keys(BOOKMAKER_LOGOS).length} className="text-center py-4">
                                {loading ? "" : "No data available for the selected sport and market type."}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
              {
                activeTab === 'GAMES' && (
                  <div><Faq /></div>
                )
              }
              {
                activeTab === 'TEAMS' && (
                  <div><TabsWithMatchups currentSport={sport} /></div>
                )
              }
              {
                activeTab === 'SCHEDULE' && (
                  <div><Schedule /></div>
                )
              }
               {
                activeTab ==='INJURIES' && (
                    <div><NBAInjuryTable currentSport={sport}/></div>
                )
              }
              
            </div>
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
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <Faq />
      </div>
    </section>
  );
};

export default Games;