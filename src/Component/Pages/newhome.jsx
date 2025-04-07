import React, { useState } from 'react';
import Faq from "./faq";
import DatePicker from 'react-datepicker';
import '../../Assets/css/newhome.css';
import 'react-datepicker/dist/react-datepicker.css';

import betmgmLogo from "../../Assets/images/betmgm.png";
import draftkingsLogo from "../../Assets/images/draftking.png";
import fanduelLogo from "../../Assets/images/fanduel.webp";
import caesarsLogo from "../../Assets/images/caesors.png";
import betriversLogo from "../../Assets/images/betrivers.png";
import bet365Logo from "../../Assets/images/bet365.webp";
import unibetLogo from "../../Assets/images/unibet.png";

const BOOKMAKER_LOGOS = {
  BetMGM: { logo: betmgmLogo },
  DraftKings: { logo: draftkingsLogo },
  FanDuel: { logo: fanduelLogo },
  Caesars: { logo: caesarsLogo },
  BetRivers: { logo: betriversLogo },
  Bet365: { logo: bet365Logo },
  Unibet: { logo: unibetLogo },
};

const NFLGames = () => {
  const [sport, setSport] = useState('NFL');
  const [marketType, setMarketType] = useState('SPREAD');
  const [selectedDate, setSelectedDate] = useState(new Date('2025-04-04'));
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [currentPage, setCurrentPage] = useState(1);
  const tabs = ['OVERVIEW', 'GAMES', 'FUTURES', 'TEAMS', 'SCHEDULE', 'INJURIES'];

  const totalPages = 4;

  const toggleTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <section className="backgroung_image">
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <div className="nfl-games-container">
              <h1 className="nba_odds">Upcoming NFL Games</h1>

              {/* Selectors */}
              <div className="selectors">
                <select value={sport} onChange={(e) => setSport(e.target.value)}>
                  <option value="NFL">NFL</option>
                  <option value="NBA">NBA</option>
                  <option value="MLB">MLB</option>
                </select>

                <select value={marketType} onChange={(e) => setMarketType(e.target.value)}>
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
                <div className="betting-table-wrapper">
                  <table className="betting-table">
                    <thead>
                      <tr>
                        <th>MATCHUP</th>
                        <th>SCORE</th>
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
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                        <tr key={index}>
                          <td>
                            <div className="game-time">TODAY · 7:30AM · NFL · NBA</div>
                            <div className="team-name">Sacramento Kings</div>
                            <div className="team-name">Detroit Pistons</div>
                          </td>
                          <td>
                            <div className="odd_n">+210</div>
                            <div className="odd_n">-190</div>
                          </td>
                          <td>
                            <div className="odd_y">+210</div>
                            <div className="odd_g">-190</div>
                          </td>
                          <td>
                            <div className="odd_n">+210</div>
                            <div className="odd_n">-190</div>
                          </td>
                          {Object.keys(BOOKMAKER_LOGOS).map((_, i) => (
                            <td key={i}>
                              <div className="odd positive odd_red">+240</div>
                              <div className="odd negative odd_n">-258</div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {
                activeTab === 'GAMES' && (
                  <div><Faq /></div>
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
                className={`btn me-2 ${currentPage === page ? "fw-bold text-white" : ""
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
        <Faq />
      </div>
    </section>
  );
};

export default NFLGames;
