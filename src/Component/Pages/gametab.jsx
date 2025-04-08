import React, { useState, useEffect } from 'react';
import '../../Assets/css/gamestab.css';
import api from '../../api';

const TabsWithMatchups = ({ currentSport }) => {
  const [matchupsData, setMatchupsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchupsData = async () => {
      setLoading(true);
      setError(null);
  
      try {
        let apiData;
  
        switch (currentSport) {
          case 'NBA':
            apiData = await api.getNbaTeamsData();
            console.log("🚀 ~ NBA API response:", apiData);
            break;
          case 'NHL':
            apiData = await api.getNhlTeamsData();
            console.log("🚀 ~ NHL API response:", apiData);
            break;
          case 'MLB':
            apiData = await api.getMlbteamsData();
            console.log("🚀 ~ MLB API response:", apiData);
            break;
          default:
            console.warn("Unknown sport selected:", currentSport);
            return;
        }
  
        const processedData = processMatchupsData(apiData);
        setMatchupsData(processedData);
      } catch (err) {
        console.error(`Error fetching ${currentSport} matchups data:`, err);
        setError(`Failed to fetch ${currentSport} matchups data. Please try again later.`);
        setMatchupsData([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMatchupsData();
  }, [currentSport]);
  
  const processMatchupsData = (apiData) => {
    if (!apiData || !apiData.data) {
      return [];
    }
  
    const matchups = [];
    
    try {
      Object.entries(apiData.data).forEach(([key, game]) => {
        if (Array.isArray(game) && game.length === 2) {
          matchups.push({
            gameId: key,
            teams: game
          });
        }
      });
    } catch (err) {
      console.error("Error processing matchups data:", err);
    }
  
    return matchups;
  };

  return (
    <div className="teams-container">
      <div className="title-bar">
        <h2>{currentSport} Games</h2>
      </div>
      
      {loading ? (
        <div className="loading-message">Loading games data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="matchup-grid">
          {matchupsData.map((matchup, index) => (
            <div className="matchup-card" key={index}>
              <div className="game-id">{matchup.gameId.replace('_', ' ').toUpperCase()}</div>
              <div className="matchup-content">
                <div className="matchup-row">
                  <div className="team-column">
                    <div className="team">
                      <span>{matchup.teams[0]}</span>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="team-column">
                    <div className="team">
                      <span>{matchup.teams[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabsWithMatchups;
