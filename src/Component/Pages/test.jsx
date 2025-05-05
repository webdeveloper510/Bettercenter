import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const GameSelector = () => {
  const [sport, setSport] = useState('NBA');
  const [marketType, setMarketType] = useState('SPREAD');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState(''); // Set default tab if needed

  const handleSportChange = (e) => {
    const selectedSport = e.target.value;
    setSport(selectedSport);

    // Reset market type based on sport
    if (selectedSport === 'NBA') {
      setMarketType('SPREAD');
    } else {
      setMarketType('MONEYLINE');
    }
  };

  const handleMarketTypeChange = (e) => {
    setMarketType(e.target.value);
  };

  const getMarketOptions = () => {
    if (sport === 'NBA') {
      return (
        <>
          <option value="SPREAD">SPREAD/Total</option>
          <option value="MONEYLINE">MONEYLINE</option>
        </>
      );
    }
    return (
      <>
        <option value="MONEYLINE">MONEYLINE</option>
        <option value="TOTAL">MONEYLINE/TOTAL</option>
      </>
    );
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  return (
    <div className="nfl-games-container">
      <div className="selectors">
        <select value={sport} onChange={handleSportChange}>
          <option value="NBA">NBA</option>
          <option value="NHL">NHL</option>
          <option value="MLB">MLB</option>
        </select>

        {activeTab !== 'INJURIES' &&
          activeTab !== 'SCHEDULE' &&
          activeTab !== 'TEAMS' &&
          activeTab !== 'FUTURES' && (
            <select value={marketType} onChange={handleMarketTypeChange}>
              {getMarketOptions()}
            </select>
          )}

        {activeTab !== 'TEAMS' &&
          activeTab !== 'FUTURES' &&
          activeTab !== 'INJURIES' && (
            <div className="date-picker-wrapper">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="EEE MMM dd"
                className="calendar-input"
                popperPlacement="bottom"
                maxDate={activeTab === 'OVERVIEW' ? getTomorrowDate() : null}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default GameSelector;
