import React from 'react';
import '../../Assets/css/injury.css';

const injuryData1 = [
  {
    name: 'Jacob Toppin',
    pos: 'F',
    returnDate: 'Apr 10',
    status: 'Out',
    statusColor: 'red',
    comment:
      'Apr 7: Toppin is out for Tuesday\'s game against the Magic with a left calf strain.',
  },
  {
    name: 'Trae Young',
    pos: 'PG',
    returnDate: 'Apr 8',
    status: 'Day-To-Day',
    statusColor: 'yellow',
    comment:
      'Apr 7: Young is probable for Tuesday\'s game against the Magic with right Achilles tendinitis...',
  },
];

const injuryData2 = [
  {
    name: 'Larry Nance Jr.',
    pos: 'PF',
    returnDate: 'May 1',
    status: 'Out',
    statusColor: 'red',
    comment:
      'Mar 26: The Hawks announced Wednesday that Nance (knee) will miss the rest of the season...',
  },
  {
    name: 'Clint Capela',
    pos: 'C',
    returnDate: 'Apr 15',
    status: 'Out',
    statusColor: 'red',
    comment:
      'Mar 21: Capela underwent an MRI on Monday that revealed a ligament injury...',
  },
];

const InjuryTable = ({ teamName, teamLogo, data }) => (
  <div className="injury-container">
    <div className="team-header">
      <img src={teamLogo} alt={teamName} className="team-logo" />
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
        {data.map((player, index) => (
          <tr key={index}>
            <td className="name">{player.name}</td>
            <td>{player.pos}</td>
            <td>{player.returnDate}</td>
            <td>
              <span className={`status-dot ${player.statusColor}`}></span>{' '}
              {player.status}
            </td>
            <td className="comment">{player.comment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const NBAInjuryTable = () => {
  return (
    <>
      <h2 className="injury-title">NBA Injuries</h2>

      <InjuryTable
        teamName="Atlanta Hawks"
        teamLogo="https://loodibee.com/wp-content/uploads/nba-atlanta-hawks-logo.png"
        data={injuryData1}
      />

      <InjuryTable
        teamName="New Orleans Pelicans"
        teamLogo="https://loodibee.com/wp-content/uploads/nba-new-orleans-pelicans-logo.png"
        data={injuryData2}
      />
    </>
  );
};

export default NBAInjuryTable;
