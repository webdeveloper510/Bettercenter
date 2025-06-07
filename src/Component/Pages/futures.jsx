import React, { useState } from 'react';
import "../../Assets/css/futures.css";

// Bookmaker logos
import betmgmLogo from "../../Assets/images/betmgm.png";
import draftkingsLogo from "../../Assets/images/draftking.png";
import fanduelLogo from "../../Assets/images/fanduel.webp";
import caesarsLogo from "../../Assets/images/caesors.png";
import betriversLogo from "../../Assets/images/betrivers.png";
import bet365Logo from "../../Assets/images/bet365.webp";
import unibetLogo from "../../Assets/images/unibet.png";

const Futures = () => {
    const [selectedNetwork, setSelectedNetwork] = useState("Fox");
    const [selectedMarket, setSelectedMarket] = useState("nba_futures_special_fixture_8285_2025_nba_playoff_series_finals_to_win");

    const teams = [
        { name: "Chicago White Sox", yes: "+4000", no: "-20000" },
        { name: "Colorado Rockies", yes: "+4000", no: "-20000" },
        { name: "Miami Marlins", yes: "+4000", no: "-20000" },
        { name: "Los Angeles Dodgers", yes: "+4000", no: "-20000" },
    ];

    const logos = [
        betmgmLogo,
        draftkingsLogo,
        fanduelLogo,
        caesarsLogo,
        betriversLogo,
        bet365Logo,
        unibetLogo 
    ];

    return (
        <section className='background_image'>
            <div className='container'>

                {/* Header with Two Select Dropdowns */}
                <div className="futures-header">
                    <h2 className="injury-title">NBA Futures</h2>
                    <div className="dropdown-group">
                        <select
                            className="futures-dropdown"
                            value={selectedNetwork}
                            onChange={(e) => setSelectedNetwork(e.target.value)}
                        >
                            <option value="Fox">Fox</option>
                            <option value="ESPN">ESPN</option>
                            <option value="TNT">TNT</option>
                            <option value="ABC">ABC</option>
                        </select>

                        <select
                            className="futures-dropdown"
                            value={selectedMarket}
                            onChange={(e) => setSelectedMarket(e.target.value)}
                        >
                            <option value="nba_futures_special_fixture_8285_2025_nba_playoff_series_finals_to_win">2024-25 NBA Playoff Series - Finals - To Win</option>
                            <option value="nba_futures_special_fixture_8289_2025_nba_#1_draft_pick">2025 NBA #1 Draft Pick</option>
                            <option value="nba_futures_special_fixture_8286_2025_nba_playoff_series_finals_mvp">2024-25 NBA Playoff Series - Finals - MVP</option>
                            <option value="nba_futures_special_fixture_8290_2025_nba_#2_draft_pick">2025 NBA #2 Draft Pick</option>
                            <option value="nba_futures_special_fixture_8291_2025_nba_#3_draft_pick">2025 NBA #3 Draft Pick</option>
                            <option value="nba_futures_special_fixture_8292_2025_nba_#4_draft_pick">2025 NBA #4 Draft Pick</option>
                            <option value="nba_futures_special_fixture_8293_2025_nba_#5_draft_pick">2025 NBA #5 Draft Pick</option>
                            <option value="nba_futures_special_fixture_8308_2025_nba_#6_draft_pick">2025 NBA #6 Draft Pick</option>
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
                                            <img src={logo} alt={`logo-${index}`} width={50} height={50} className="logo-img" />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='image_scorll'>
                                {teams.map((team, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td rowSpan={2} className="team-name">{team.name}</td>
                                            <td className="option-cell">Yes {team.yes}</td>
                                            {logos.map((_, idx) => (
                                                <td key={`yes-${index}-${idx}`}>N/A</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="option-cell">No {team.no}</td>
                                            {logos.map((_, idx) => (
                                                <td key={`no-${index}-${idx}`}>N/A</td>
                                            ))}
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Futures;
