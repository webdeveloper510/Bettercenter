import React from 'react';
import "../../Assets/css/futures.css";
import betmgmLogo from "../../Assets/images/betmgm.png";
import draftkingsLogo from "../../Assets/images/draftking.png";
import fanduelLogo from "../../Assets/images/fanduel.webp";
import caesarsLogo from "../../Assets/images/caesors.png";
import betriversLogo from "../../Assets/images/betrivers.png";
import bet365Logo from "../../Assets/images/bet365.webp";
import unibetLogo from "../../Assets/images/unibet.png";

const Futures = () => {
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
                <h2 className="injury-title">NBA Futures</h2>

             <div className='outer_table'>     
                <div className="table-wrapper col-12 ">
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