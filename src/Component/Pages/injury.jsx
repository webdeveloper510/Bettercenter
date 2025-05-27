import React, { useState, useEffect } from 'react';
import '../../Assets/css/injury.css';
import api from '../../api';
import { Accordion } from 'react-bootstrap';
const InjuryTable = ({ data }) => {
  return (
    <div className="outer_injurytable">
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

const SportsInjuryTable = ({ currentSport }) => {
  const [injuryData, setInjuryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTeam, setExpandedTeam] = useState(null); // Track which team is open

  useEffect(() => {
    const fetchInjuryData = async () => {
      setLoading(true);
      setError(null);
      setExpandedTeam(null); // Reset the expanded state when fetching new data

      try {
        let data;
        switch (currentSport) {
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

        // Open the first team by default (index 0)
        setExpandedTeam(0);
      } catch (err) {
        console.error(`Error fetching ${currentSport} injury data:`, err);
        setError(`Failed to load ${currentSport.toUpperCase()} injury data. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchInjuryData();
  }, [currentSport]);

  const toggleAccordion = (index) => {
    setExpandedTeam(prev => (prev === index ? null : index)); // Toggle the accordion
  };

  if (loading) {
    return (
      <div className="loader-container my-5">
        <div className="loader spinner-border text-primary text-center"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!injuryData || injuryData.length === 0) {
    return <div className="no-data">No injury data available for {currentSport.toUpperCase()}.</div>;
  }

  return (
    <>
      <h2 className="injury-title">{currentSport.toUpperCase()} Injuries</h2>

      <Accordion defaultActiveKey="0">
        {injuryData.map((teamData, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{teamData.teams_name}</Accordion.Header>
            <Accordion.Body>
              <InjuryTable data={teamData} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <div className="accordion-container">
        {injuryData.map((teamData, index) => (
          <div className="accordion-item" key={index}>
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              <h3>{teamData.teams_name}</h3>
              <span>{expandedTeam === index ? '-' : '+'}</span>
            </div>
            {expandedTeam === index && <InjuryTable data={teamData} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default SportsInjuryTable;
