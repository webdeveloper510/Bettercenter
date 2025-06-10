import React, { useState, useEffect } from 'react';
import api from '../../api';
import "../../Assets/css/futures.css";

// Bookmaker logos
import betmgmLogo from "../../Assets/images/betmgm.png";
import draftkingsLogo from "../../Assets/images/draftking.png";
import fanduelLogo from "../../Assets/images/fanduel.webp";
import caesarsLogo from "../../Assets/images/caesors.png";
import betriversLogo from "../../Assets/images/betrivers.png";
import bet365Logo from "../../Assets/images/bet365.webp";
import unibetLogo from "../../Assets/images/unibet.png";

const Futures = ({ currentSport }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPick, setSelectedPick] = useState("");
  const [futureData, setFutureData] = useState([]);
  const [tableData, setTableData] = useState([]); 
  const [locations, setLocations] = useState([]);
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false); 
  const [error, setError] = useState(null);

  const logos = [
    { img: bet365Logo, name: 'Bet365' },
    { img: caesarsLogo, name: 'Caesars' },
    { img: draftkingsLogo, name: 'DraftKings' },
    { img: fanduelLogo, name: 'FanDuel' },
    { img: betriversLogo, name: 'BetRivers' }
  ];

  const getDropdownApiFunction = () => {
    switch (currentSport?.toUpperCase()) {
      case 'NBA':
        return api.getNbaDropdownData;
      case 'NHL':
        return api.getNhlDropdownData;
      case 'MLB':
        return api.getMlbDropdownData;
      default:
        return null;
    }
  };

  const getFutureApiFunction = () => {
    switch (currentSport?.toUpperCase()) {
      case 'NBA':
        return api.getNbaFutureData;
      case 'NHL':
        return api.getNhlFutureData;
      case 'MLB':
        return api.getMlbFutureData;
      default:
        return null;
    }
  };

  useEffect(() => {
    setSelectedLocation("");
    setSelectedPick("");
    setPicks([]);
    setLocations([]);
    setTableData([]);
    fetchDropdownData();
  }, [currentSport]);

  useEffect(() => {
    if (selectedLocation && futureData.length > 0) {
      const locationData = futureData.find(item => item.location === selectedLocation);
      if (locationData) {
        setPicks(locationData.picks_name || []);
        const firstPick = locationData.picks_name?.[0] || "";
        setSelectedPick(firstPick);
      } else {
        setPicks([]);
        setSelectedPick("");
      }
    } else {
      setPicks([]);
      setSelectedPick("");
    }
    setTableData([]); 
  }, [selectedLocation, futureData]);

  useEffect(() => {
    if (selectedLocation && selectedPick) {
      fetchTableData();
    } else {
      setTableData([]);
    }
  }, [selectedLocation, selectedPick]);

  const fetchDropdownData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiFunction = getDropdownApiFunction();

      if (typeof apiFunction !== 'function') {
        return new Error(`Dropdown API function not found for sport: ${currentSport}`);
      }

      const response = await apiFunction();
      if (response && Array.isArray(response) && response.length > 0) {
        setFutureData(response);
        const uniqueLocations = response.map(item => item.location);
        setLocations(uniqueLocations);
        if (uniqueLocations.length > 0) {
          setSelectedLocation(uniqueLocations[0]);
        }
      } else if (response && response.status === 200 && response.data && Array.isArray(response.data)) {
        setFutureData(response.data);
        const uniqueLocations = response.data.map(item => item.location);
        setLocations(uniqueLocations);
        if (uniqueLocations.length > 0) {
          setSelectedLocation(uniqueLocations[0]);
        }
      } else {
        setError('No dropdown data received or invalid response format');
        setFutureData([]);
        setLocations([]);
      }
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
      setError(err.message || 'Failed to fetch dropdown data');
      setFutureData([]);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async () => {
    if (!selectedLocation || !selectedPick) return;

    setTableLoading(true);
    setError(null);

    try {
      const apiFunction = getFutureApiFunction();

      if (typeof apiFunction !== 'function') {
        return new Error(`Future data API function not found for sport: ${currentSport}`);
      }
      const currentDate = new Date().toISOString().split('T')[0];
      
      const response = await apiFunction(currentDate, selectedLocation, selectedPick);
      let responseData = [];
      if (response && response.data && Array.isArray(response.data)) {
        responseData = response.data[0];
      } else if (response && Array.isArray(response)) {
        responseData = response;
      }
      const transformedData = [];
      
      responseData.forEach(item => {
        if (item.Future && Array.isArray(item.Future)) {
          item.Future.forEach((team, index) => {
            transformedData.push({
              team_name: team,
              consensus: item.Consensus?.[index] || 'Coming Soon',
              bet365_odds: item.Bet365?.[index] || 'N/A',
              caesars_odds: item.Caesars?.[index] || 'N/A',
              draftkings_odds: item.DraftKings?.[index] || 'N/A',
              fanduel_odds: item.FanDuel?.[index] || 'N/A',
              betrivers_odds: item.BetRivers?.[index] || 'N/A'
            });
          });
        }
      });

      setTableData(transformedData);
    } catch (err) {
      console.error('Error fetching table data:', err);
      setError(err.message || 'Failed to fetch table data');
      setTableData([]);
    } finally {
      setTableLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handlePickChange = (e) => {
    setSelectedPick(e.target.value);
  };

  const renderTableRows = () => {
    if (tableLoading) {
      return (
        <tr>
          <td colSpan={2 + logos.length}>Loading table data...</td>
        </tr>
      );
    }

    if (tableData.length === 0) {
      return (
        <tr>
          <td colSpan={2 + logos.length}>No betting data available</td>
        </tr>
      );
    }

    return tableData.map((row, index) => (
      <tr key={index}>
        <td>{row.team_name || 'N/A'}</td>
        <td>{row.consensus || 'Coming Soon'}</td>
        <td>{row.bet365_odds || 'N/A'}</td>
        <td>{row.caesars_odds || 'N/A'}</td>
        <td>{row.draftkings_odds || 'N/A'}</td>
        <td>{row.fanduel_odds || 'N/A'}</td>
        <td>{row.betrivers_odds || 'N/A'}</td>
      </tr>
    ));
  };

  return (
    <section className='background_image'>
      <div className='container'>
        <div className="futures-header">
          <h2 className="injury-title">{currentSport?.toUpperCase()} Futures</h2>
          {loading && <div className="loading">Loading dropdown data...</div>}
          {error && <div className="error">Error: {error}</div>}

          <div className="dropdown-group">
            <select
              className="futures-dropdown"
              value={selectedLocation}
              onChange={handleLocationChange}
              disabled={loading || locations.length === 0}
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>

            <select
              className="futures-dropdown"
              value={selectedPick}
              onChange={handlePickChange}
              disabled={loading || picks.length === 0 || !selectedLocation}
            >
              <option value="">Select Pick Type</option>
              {picks.map((pick, index) => (
                <option key={index} value={pick}>{pick}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className='outer_table'>
          <div className="table-wrapper col-12">
            <table className="futures-table">
              <thead className='futures_checkout'>
                <tr>
                  <th>Futures</th>
                  <th>Consensus</th>
                  {logos.map((logo, index) => (
                    <th key={index}>
                      <img src={logo.img} alt={logo.name} width={50} height={50} className="logo-img" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='image_scorll'>
                {renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Futures;