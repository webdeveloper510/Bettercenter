import React from 'react';
import '../../Assets/css/gamestab.css';
import t1 from '../../Assets/images/team-1.png';
import t2 from '../../Assets/images/team-2.png';

const gamesData = {
  WEST: [
    ['Golden State Warriors', 'Los Angeles Rams'],
    ['Orlando Magic', 'Seattle Seahawks'],
    ['Team A', 'Team B'],
    ['Team C', 'Team D'],
    ['Team E', 'Team F'],
    ['Team G', 'Team H'],
    ['Team I', 'Team J'],
    ['Team K', 'Team L'],
    ['Team M', 'Team N'],
    ['Team O', 'Team P'],
    ['Team Q', 'Team R'],
    ['Team S', 'Team T'],
  ],
};

const MatchupCards = () => {
  // Group data into chunks of 2 matchups per card
  const matchupsPerCard = 2;
  const groupedMatchups = [];

  for (let i = 0; i < gamesData['WEST'].length; i += matchupsPerCard) {
    groupedMatchups.push(gamesData['WEST'].slice(i, i + matchupsPerCard));
  }

  // Only show first 6 cards
  const cardsToShow = groupedMatchups.slice(0, 8);

  return (
    <div className="matchup-grid">
      {cardsToShow.map((matchupGroup, cardIndex) => (
        <div className="matchup-card" key={cardIndex}>
          <div className="region-label">WEST</div>
          <div className="matchup-content">
            {matchupGroup.map((matchupPair, index) => (
              <div className="matchup-row" key={index}>
                <div className="team-column">
                  <div className="team">
                    <img src={t1} alt={matchupPair[0]} className="team-logo" />
                    <span>{matchupPair[0]}</span>
                  </div>
                </div>
                <div className="divider" />
                <div className="team-column">
                  <div className="team">
                    <img src={t2} alt={matchupPair[1]} className="team-logo" />
                    <span>{matchupPair[1]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchupCards;
