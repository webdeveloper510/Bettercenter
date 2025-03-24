import { useState } from "react";

const Data = () => {
    const teams = ["Team A", "Team B", "Team C", "Team D"];
    const [selectedTeam, setSelectedTeam] = useState(null);

    const dummyData = {
        "Team A": { money: "1.8 odds, $100 stake", spread: "-3.5, 2.1 odds", overUnder: "Over: 210.5, Under: 190.5" },
        "Team B": { money: "2.2 odds, $120 stake", spread: "-2.5, 1.9 odds", overUnder: "Over: 220.5, Under: 200.5" },
        "Team C": { money: "1.6 odds, $90 stake", spread: "-4.0, 2.3 odds", overUnder: "Over: 230.5, Under: 210.5" },
        "Team D": { money: "1.9 odds, $110 stake", spread: "-1.5, 2.0 odds", overUnder: "Over: 240.5, Under: 220.5" },
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Teams</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                {teams.map((team, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTeam(team)}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                            backgroundColor: selectedTeam === team ? "#007bff" : "#ddd",
                            color: selectedTeam === team ? "white" : "black",
                            border: "none",
                            borderRadius: "5px",
                        }}
                    >
                        {team}
                    </button>
                ))}
            </div>

            {selectedTeam && (
                <div >
                    
                </div>
            )}
        </div>
    );
};

export default Data;
