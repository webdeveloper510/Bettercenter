import React, { useState, useEffect } from 'react';
import '../../Assets/css/injury.css';
import api from '../../api'; // Assuming this is where your API functions are defined

const InjuryTable = ({ teamName, data }) => {
  // Check if we have valid data for this team
  if (!data || !data.name || data.name.length === 0) {
    return null;
  }

  return (
    <div className="injury-container">
      <div className="team-header">
        <h3>{teamName}</h3>
      </div>
      <table className="injury-table">
        <thead>
          <tr>
            <th className='name_th'>NAME</th>
            <th>POS</th>
            <th className='name_th'>EST. RETURN DATE</th>
            <th className='name_th'>STATUS</th>
            <th>COMMENT</th>
          </tr>
        </thead>
        <tbody>
          {data.name.map((playerName, index) => {
            // Map status to status color
            let statusColor = 'green';
            if (data.state[index] === 'Out' || data.state[index] === 'Injured Reserve') {
              statusColor = 'red';
            } else if (data.state[index] === 'Day-To-Day') {
              statusColor = 'yellow';
            }

            return (
              <tr key={index}>
                <td className="name">{playerName}</td>
                <td>{data.pos_text[index]}</td>
                <td>{data.date[index] || 'N/A'}</td>
                <td>
                  <span className={`status-dot ${statusColor}`}></span>{' '}
                  {data.state[index]}
                </td>
                <td className="comment">{data.description[index] || 'No additional information'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const SportsInjuryTable = ({ currentSport = 'nba' }) => {
  const [injuryData, setInjuryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInjuryData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data;
        
        // Fetch data based on the selected sport
        switch (currentSport.toLowerCase()) {
          case 'NBA':
            data = await api.getNbaInjuriesData();
            break;
          case 'MLB':
            data = await api.getMlbInjuriesData();
            break;
          case 'NHL':
            data = await api.getNhlInjuriesData();
            break;
          default:
            data = await api.getNbaInjuriesData(); // Default to NBA
        }
        
        setInjuryData(data);
      } catch (err) {
        console.error(`Error fetching ${currentSport} injury data:`, err);
        setError(`Failed to load ${currentSport.toUpperCase()} injury data. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchInjuryData();
  }, [currentSport]);

  if (loading) {
    return <div className="loading">Loading injury data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Handle case when data is empty
  if (!injuryData || injuryData.length === 0) {
    return <div className="no-data">No injury data available for {currentSport.toUpperCase()}.</div>;
  }

  return (
    <>
      <h2 className="injury-title">{currentSport.toUpperCase()} Injuries</h2>
      
      {injuryData.map((teamData, index) => (
        <InjuryTable
          key={index}
          teamName={teamData.teams_name}
          data={teamData}
        />
      ))}
    </>
  );
};

export default SportsInjuryTable;