import React from 'react';
import '../../Assets/css/gamestab.css';

const teams = [
  {
    name: 'Boston Celtics',
    logo: 'https://loodibee.com/wp-content/uploads/nba-boston-celtics-logo.png',
    links: [
      { label: 'Statistics', url: '#' },
      { label: 'Schedule', url: '#' },
      { label: 'Roster', url: '#' },
      { label: 'Depth Chart', url: '#' },
      { label: 'Tickets', url: '#' },
    ],
  },
  {
    name: 'Brooklyn Nets',
    logo: 'https://loodibee.com/wp-content/uploads/nba-brooklyn-nets-logo.png',
    links: [
      { label: 'Statistics', url: '#' },
      { label: 'Schedule', url: '#' },
      { label: 'Roster', url: '#' },
      { label: 'Depth Chart', url: '#' },
      { label: 'Tickets', url: '#' },
    ],
  },
  {
    name: 'Boston Celtics',
    logo: 'https://loodibee.com/wp-content/uploads/nba-boston-celtics-logo.png',
    links: [
      { label: 'Statistics', url: '#' },
      { label: 'Schedule', url: '#' },
      { label: 'Roster', url: '#' },
      { label: 'Depth Chart', url: '#' },
      { label: 'Tickets', url: '#' },
    ],
  },
];

const NBATeams = () => {
  return (
    <>
      <h2 className="injury-title">NBA Teams</h2>
      <div className="teams-wrapper">
        {teams.map((team, index) => (
          <div className="team-entry" key={index}>
            <img src={team.logo} alt={team.name} className="team-logo" />
            <div>
              <div className="team-name">{team.name}</div>
              <div className="team-links">
                {team.links.map((link, i) => (
                  <a
                    href={link.url}
                    key={i}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NBATeams;
