import React, { useState, useEffect } from 'react';
import '../../Assets/css/gamestab.css';
import api from '../../api';

const TabsWithMatchups = ({ currentSport }) => {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamsData = async () => {
      setLoading(true);
      setError(null);

      try {
        let apiData;

        switch (currentSport) {
          case 'NBA':
            apiData = await api.getNbaTeamsData();
            break;
          case 'NHL':
            apiData = await api.getNhlTeamsData();
            break;
          case 'MLB':
            apiData = await api.getMlbteamsData();
            break;
          default:
            console.warn("Unknown sport selected:", currentSport);
            return;
        }

        const processedData = processTeamsData(apiData);
        setTeamsData(processedData);
      } catch (err) {
        console.error(`Error fetching ${currentSport} teams data:`, err);
        setError(`Failed to fetch ${currentSport} teams data. Please try again later.`);
        setTeamsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamsData();
  }, [currentSport]);

  const processTeamsData = (apiData) => {
    if (!apiData || !apiData.data) {
      return [];
    }

    const teams = [];

    try {
      // Extract all teams and flatten them into a single array
      Object.entries(apiData.data).forEach(([key, game]) => {
        if (Array.isArray(game) && game.length === 2) {
          teams.push(game[0]); // First team
          teams.push(game[1]); // Second team
        }
      });
    } catch (err) {
      console.error("Error processing teams data:", err);
    }

    return teams;
  };

  return (
    <>
      <h2 className="tab-title team_title">{currentSport} Teams</h2>
      <div className="teams-container">
        {loading ? (
          <div className="loader-container my-5">
            <div className="loader spinner-border text-primary text-center"></div>
            <p className="text-center mt-5"></p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : teamsData.length === 0 ? (
          <div className="no-data-message">No teams found for {currentSport}.</div>
        ) : (
          <div className="teams-grid">
            {teamsData.map((team, index) => (
              <div className="team-card" key={index}>
                <div className="team-number">{index + 1}</div>
                <div className="team-name">{team}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TabsWithMatchups;