import React from 'react';
import '../../Assets/css/teammatch.css';

const matches = [
  {
    date: 'Feb 19, Wed',
    match: 'PAKISTAN vs NEW ZEALAND, 1st Match, Group A',
    venue: 'National Stadium, Karachi',
    time: '2:30 PM',
    localTime: '09:00 AM GMT / 02:00 PM LOCAL',
  },
  {
    date: 'Feb 20, Thu',
    match: 'BANGLADESH vs INDIA, 2nd Match, Group A',
    venue: 'Dubai International Cricket Stadium, Dubai',
    time: '2:30 PM',
    localTime: '09:00 AM GMT / 01:00 PM LOCAL',
  },
  {
    date: 'Feb 21, Fri',
    match: 'AFGHANISTAN vs SOUTH AFRICA, 3rd Match, Group B',
    venue: 'National Stadium, Karachi',
    time: '2:30 PM',
    localTime: '09:00 AM GMT / 02:00 PM LOCAL',
  },
  {
    date: 'Feb 22, Sat',
    match: 'AUSTRALIA vs ENGLAND, 4th Match, Group B',
    venue: 'Gaddafi Stadium, Lahore',
    time: '2:30 PM',
    localTime: '09:00 AM GMT / 02:00 PM LOCAL',
  },
  {
    date: 'Feb 23, Sun',
    match: 'PAKISTAN vs INDIA, 5th Match, Group A',
    venue: 'Dubai International Cricket Stadium, Dubai',
    time: '2:30 PM',
    localTime: '09:00 AM GMT / 01:00 PM LOCAL',
  },
];

const MatchesPage = () => {
  return (
    <div className="matches-container">
      <table className="matches-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Match Details</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td className="match-date">{match.date}</td>
              <td className="match-details">
                <div className="match-title">{match.match}</div>
                <div className="match-venue">{match.venue}</div>
                <div className="match-result">{match.result}</div>
              </td>
              <td className="match-time">
                <div>{match.time}</div>
                <div className="local-time">{match.localTime}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchesPage;