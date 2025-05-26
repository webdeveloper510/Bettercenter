import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import '../../Assets/css/teamtab.css';
import api from '../../api';
const NBATeamCard = ({ name, logo }) => (
  <div className="d-flex align-items-center mb-3">
    <Image
      src={logo}
      alt={name}
      roundedCircle
      width={32}
      height={32}
      className="me-2"
    />
    <div>
      <strong>{name}</strong>
    </div>
  </div>
);

const Teamstab = ({ currentSport = 'NBA' }) => {
  const [teamsData, setTeamsData] = useState({});
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
        setTeamsData({});
      } finally {
        setLoading(false);
      }
    };

    fetchTeamsData();
  }, [currentSport]);

  const processTeamsData = (apiData) => {
  
    try {

      const divisionsData = apiData.data;
      const processedDivisions = {};
      Object.entries(divisionsData).forEach(([divisionName, teams]) => {
        if (Array.isArray(teams)) {
          processedDivisions[divisionName] = teams.map(team => ({
            name: team.team_name,
            logo: team.logo_url
          }));
        }
      });

      return processedDivisions;

    } catch (err) {
      console.error("Error processing teams data:", err);
      return {};
    }
  };



  if (loading) {
    return (
      
      <Container className="mt-4">
        <div className="loader-container my-5">
          <div className="loader spinner-border text-primary text-center"></div>
          <p className="text-center mt-5">Loading {currentSport} teams...</p>
        </div>
        
      </Container>
      
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div className="error-message alert alert-danger">{error}</div>
      </Container>
    );
  }

  if (Object.keys(teamsData).length === 0) {
    return (
      <Container className="mt-4">
        <div className="no-data-message alert alert-info">
          No teams found for {currentSport}.
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style ={{color: "white"}}>
          <div className="outer_teamtab">
      <h4 className="mb-4">{currentSport} Teams</h4>
      <Row>
        {Object.entries(teamsData).map(([divisionName, teams], divIndex) => (
          <Col md={6} key={divIndex} className="mb-4">
            <h6 className="border-bottom pb-2">{divisionName}</h6>
            {teams.map((team, idx) => (
              <NBATeamCard key={idx} name={team.name} logo={team.logo} />
            ))}
          </Col>
        ))}
      </Row>
      </div>
    </Container>
  );
};

export default Teamstab;