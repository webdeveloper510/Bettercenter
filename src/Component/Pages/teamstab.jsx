import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import '../../Assets/css/teamtab.css';

// ——— Data object renamed so it doesn’t clash with the component name ———
const teamsData = {
  Atlantic: [
    { name: "Boston Celtics",      logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bos.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Brooklyn Nets",       logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bkn.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "New York Knicks",     logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/ny.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Philadelphia 76ers",  logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/phi.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Toronto Raptors",     logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/tor.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
  ],
  Pacific: [
    { name: "Golden State Warriors", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/chi.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "LA Clippers",           logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/cle.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Los Angeles Lakers",    logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/det.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Phoenix Suns",          logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/ind.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Sacramento Kings",      logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mil.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
  ],
    Atlantic2: [
    { name: "Boston Celtics",      logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bos.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Brooklyn Nets",       logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bkn.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "New York Knicks",     logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/ny.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Philadelphia 76ers",  logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/phi.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Toronto Raptors",     logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/tor.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
  ],
  Pacific2: [
    { name: "Golden State Warriors", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/chi.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "LA Clippers",           logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/cle.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Los Angeles Lakers",    logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/det.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Phoenix Suns",          logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/ind.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
    { name: "Sacramento Kings",      logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mil.png&scale=crop&cquality=40&location=origin&w=80&h=80" },
  ],
};

// ——— Small reusable card for each team ———
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
      {/* <div className="links text-muted small">
        <a href="#">Statistics</a> · <a href="#">Schedule</a> ·{" "}
        <a href="#">Roster</a> · <a href="#">Depth Chart</a>
      </div> */}
    </div>
  </div>
);

// ——— Your component, now correctly named Teamstab ———
const Teamstab = () => (
  <Container className="mt-4">
    <h4 className="mb-4">NBA Teams</h4>
    <Row>
      <Col md={6}>
        <h6 className="border-bottom pb-2">Atlantic</h6>
        {teamsData.Atlantic.map((team, idx) => (
          <NBATeamCard key={idx} {...team} />
        ))}
      </Col>
      <Col md={6}>
        <h6 className="border-bottom pb-2">Pacific</h6>
        {teamsData.Pacific.map((team, idx) => (
          <NBATeamCard key={idx} {...team} />
        ))}
      </Col>
    </Row>
  </Container>
);

export default Teamstab;
