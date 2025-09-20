import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const InjuryModal = ({
  isOpen,
  onClose,
  teamName,
  sport,
  injuryData,
  loading,
  homePitcher,
  awayPitcher,
  clicked,
}) => {
  if (!isOpen) return null;
  const homeTeamData = injuryData?.home_team_data || [];
  const awayTeamData = injuryData?.away_team_data || [];
  const hasInjuryData = homeTeamData.length > 0 || awayTeamData.length > 0;

  const renderInjuryCard = (injury, index) => (
    <div
      key={index}
      className="model_content"
      style={{
        border: "1px solid rgb(221 221 221 / 34%)",
        borderRadius: "6px",
        padding: "15px",
        marginBottom: "10px",
        background: "#1a1d3b",
        boxshadow: "0 5px 15px #0006",
      }}
    >
      <div style={{ fontWeight: "bold", color: "#fff", marginBottom: "5px" }}>
        {injury.player_name || "Unknown Player"}
      </div>
      <div style={{ color: "#fff", marginBottom: "3px" }}>
        <strong>Position:</strong> {injury.pos_text || "N/A"}
      </div>
      <div style={{ color: "#fff", marginBottom: "3px" }}>
        <strong>Status:</strong> {injury.state || "N/A"}
      </div>
      <div style={{ color: "#fff", marginBottom: "8px" }}>
        <strong>Date:</strong> {injury.date || "N/A"}
      </div>
      <div style={{ color: "#fff", fontSize: "14px", lineHeight: "1.4" }}>
        <strong>Description:</strong>{" "}
        {injury.description || "No description available"}
      </div>
    </div>
  );

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content injury_model"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "800px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #eee",
            paddingBottom: "15px",
          }}
        >
          <h3 style={{ margin: 0, color: "#333" }}>
            {teamName} {sport !== "ALL_GAMES" && sport}{" "}
            {sport !== "ALL_GAMES" && "- Injuries"}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="modal-body">
          {sport === "ALL_GAMES" && clicked === "pitchers" && (
            <div>
              <p>
                {teamName.split("vs")[0]} Pitcher :- {homePitcher}
              </p>
              <p>
                {teamName.split("vs")[1]} Pitcher :-{awayPitcher}
              </p>
            </div>
          )}
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p style={{ marginTop: "10px" }}>Loading injury data...</p>
            </div>
          ) : hasInjuryData ? (
            <div>
              {homeTeamData.length > 0 && (
                <div style={{ marginBottom: "30px" }}>
                  <h4
                    style={{
                      marginBottom: "15px",
                      color: "#333",
                      borderLeft: "4px solid #007bff",
                      paddingLeft: "10px",
                    }}
                  >
                    {homeTeamData[0]?.teams_name || "Home Team"} Injuries:
                  </h4>
                  {homeTeamData.map((injury, index) =>
                    renderInjuryCard(injury, `home-${index}`)
                  )}
                </div>
              )}

              {awayTeamData.length > 0 && (
                <div>
                  <h4
                    style={{
                      marginBottom: "15px",
                      color: "#333",
                      borderLeft: "4px solid #28a745",
                      paddingLeft: "10px",
                    }}
                  >
                    {awayTeamData[0]?.teams_name || "Away Team"} Injuries:
                  </h4>
                  {awayTeamData.map((injury, index) =>
                    renderInjuryCard(injury, `away-${index}`)
                  )}
                </div>
              )}
            </div>
          ) : (
            clicked !== "pitchers" && (
              <div
                style={{ textAlign: "center", padding: "20px", color: "#666" }}
              >
                <p>No injury data available for {teamName}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default InjuryModal;
