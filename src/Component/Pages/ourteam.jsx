import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Assets/ourteam.css";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import Faq from "./faq";
import api from "../../api";

const Ourteam = () => {
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modified to use navigate with state
  const handleBuyClick = (adminId, firstName, lastName) => {
    const adminName = `${firstName} ${lastName}`.trim();
    navigate('/allpicks', { 
      state: { 
        adminId,
        adminName 
      } 
    });
  };

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const response = await api.getadmindata();
        if (response.status === 200 && Array.isArray(response.data)) {
          setTeamData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setLoading(false);
      }
    };

    getTeamData();
  }, []);

  return (
    <section className="main">
      <Container>
        <h2 className="text-center our_team_head">OUR TEAM</h2>
        <p className="text-center team-subtitle">
          From winning huge capping contests to features on HBO Sports & ESPN among other networks and publications, our cappers have over 100 years of combined experience backed by a proprietary database.
          <br />
          Whether you need free picks, parlays, teasers, or our most confident picks, we're here to help you build a winning strategy.
        </p>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Row className="justify-content-center tem_menber">
            {teamData.map((member) => (
              <Col md={3} sm={6} key={member.id}>
                <Card className="team-card">
                  {/* Use member profile image if available, otherwise default */}
                  <Card.Img 
                    variant="top" 
                    src={member.profile_image || "/path-to-default-image.png"} 
                    className="team-img" 
                  />
                  <Card.Body className="text-center team_details">
                    <Card.Title className="team-name">
                      {member.firstname !== "None" ? member.firstname : ""}{" "}
                      {member.lastname !== "None" ? member.lastname : ""}
                    </Card.Title>
                    <Card.Text className="team-description">
                      {member.about !== "None" ? member.about : ""}
                   
                    </Card.Text>
                    <Button 
                      variant="outline-light" 
                      className="buy_pick" 
                      onClick={() => handleBuyClick(
                        member.id, 
                        member.firstname !== "None" ? member.firstname : "", 
                        member.lastname !== "None" ? member.lastname : ""
                      )}
                    >
                      BUY PICKS
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Faq />
      </Container>
    </section>
  );
};

export default Ourteam;