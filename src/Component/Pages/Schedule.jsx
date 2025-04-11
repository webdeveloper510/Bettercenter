import React, { useState, useEffect, useCallback } from 'react';
import "../../Assets/css/Schedule.css";
import groumig from "../../Assets/images/14357 3.png";
import group55b from "../../Assets/images/Group 1171276784.png";
import vect from "../../Assets/images/Vector (4).png";
import api from '../../api';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Schedule = ({ currentSport, selectedDate, setSelectedDate }) => {
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchScheduleData = useCallback(async () => {
        if (currentSport !== 'NBA') return;
        
        try {
            setLoading(true);
            setError(null);

            const formattedDate = format(selectedDate, 'yyyy-MM-dd');     
            const data = await api.getNbaScheduleData(formattedDate);
        const groupedGames = {};
            if (Array.isArray(data)) {
                data.forEach(game => {
                    const dateKey = game.date; 
                    if (!groupedGames[dateKey]) {
                        groupedGames[dateKey] = [];
                    }
                    groupedGames[dateKey].push(game);
                });
            } else {
                console.error("Unexpected data format:", data);
                setError("Received invalid data format from server");
            }
            
            setScheduleData(groupedGames);
        } catch (err) {
            console.error("Error fetching schedule data:", err);
            setError("Failed to load schedule data. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [selectedDate, currentSport]);
    useEffect(() => {
        fetchScheduleData();
    }, [fetchScheduleData]);

    const formatDateForDisplay = (dateString) => {
        try {
            const date = new Date(dateString);
            return format(date, 'EEEE, MMMM dd yyyy');
        } catch (error) {
            return dateString; 
        }
    };

    const handleDateChange = (date) => {
        if (setSelectedDate) {
            setSelectedDate(date);
        }
    };
    const isEmpty = (value) => {
        return value === null || 
               value === undefined || 
               value === "None" || 
               value === "" || 
               value === "-";
    };
    const getVisibleColumns = (games) => {
        const columns = {
            result: false,
            winnerHigh: false,
            looserHigh: false,
            time: false,
            tv: false,
            team1: false,
            team2: false
        };
    
        games.forEach(game => {
            if (!isEmpty(game.result) || !isEmpty(game.venue)) {
                columns.result = true;
            }
    
            if (!isEmpty(game.winner_high)) {
                columns.winnerHigh = true;
            }
            if (!isEmpty(game.looser_high)) {
                columns.looserHigh = true;
            }
        
            if (!isEmpty(game.time)) {
                columns.time = true;
            }
            
            if (!isEmpty(game.tv)) {
                columns.tv = true;
            }
        });
        
        return columns;
    };

    const renderMatchup = (game) => {
        const team1 = game.team1 || game.home_team;
        const team2 = game.team2 || game.away_team
        const hasTeam1 = !isEmpty(team1);
        const hasTeam2 = !isEmpty(team2);
        
        if (hasTeam1 && hasTeam2) {
            return (
                <span className='heading_team'>
                    {team1} vs {team2}
                </span>
            );
        } else if (hasTeam1) {
            return (
                <span className='heading_team'>
                    {team1}
                </span>
            );
        } else if (hasTeam2) {
            return (
                <span className='heading_team'>
                    {team2}
                </span>
            );
        } else {
            return <span className='heading_team'>TBD</span>;
        }
    };

    return (
        <>
            <h2 className="injury-title">NBA Schedule</h2>
            
            <section className='backgroung_image'>
                <div className='contanier'>
                    <div className='row'>
                        {loading ? (
                            <div className="col-12 text-center py-5">Loading schedule data...</div>
                        ) : error ? (
                            <div className="col-12 text-center py-5 text-danger">{error}</div>
                        ) : Object.keys(scheduleData).length > 0 ? (
                            Object.keys(scheduleData).map((dateKey) => {
                            
                                const visibleColumns = getVisibleColumns(scheduleData[dateKey]);
                            
                                const matchupWidth = 3; 
                                const visibleCount = [
                                    visibleColumns.result,
                                    visibleColumns.winnerHigh,
                                    visibleColumns.looserHigh,
                                    visibleColumns.time,
                                    visibleColumns.tv
                                ].filter(Boolean).length;
                                
                                const otherColumnWidth = visibleCount > 0 ? Math.floor(9 / visibleCount) : 0;
                                
                                return (
                                    <div key={dateKey} className='col-11 my-5 schedule_checkout'>
                                        <h1 className="schedule_heading text-uppercase fs-6 fw-bold">
                                            {formatDateForDisplay(dateKey)}
                                        </h1>
                                        
                                        <div className="row schedule-header">
                                            <div className={`col-${matchupWidth}`}>Matchup</div>
                                            
                                            {visibleColumns.result && (
                                                <div className={`col-${otherColumnWidth}`}>Result</div>
                                            )}
                                            
                                            {visibleColumns.winnerHigh && (
                                                <div className={`col-${otherColumnWidth}`}>Winner High</div>
                                            )}
                                            
                                            {visibleColumns.looserHigh && (
                                                <div className={`col-${otherColumnWidth}`}>Loser High</div>
                                            )}
                                            
                                            {visibleColumns.time && (
                                                <div className={`col-${otherColumnWidth}`}>Time</div>
                                            )}
                                            
                                            {visibleColumns.tv && (
                                                <div className={`col-${otherColumnWidth}`}>TV</div>
                                            )}
                                        </div>
                                        
                                        {scheduleData[dateKey].map((game, gameIndex) => (
                                            <React.Fragment key={gameIndex}>
                                                {gameIndex > 0 && <hr className='team_border py-1' />}
                                                <div className='row py-2 align-items-center'>
                                                    <div className={`col-${matchupWidth}`}>
                                                        {renderMatchup(game)}
                                                    </div>
                                                    
                                                    {visibleColumns.result && !isEmpty(game.result) && (
                                                        <div className={`col-${otherColumnWidth}`}>
                                                            <span className='heading_team'>{game.result || game.venue || ""}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {visibleColumns.winnerHigh && !isEmpty(game.winner_high) && (
                                                        <div className={`col-${otherColumnWidth}`}>
                                                            <span className='heading_team'>{game.winner_high || ""}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {visibleColumns.looserHigh && !isEmpty(game.looser_high) && (
                                                        <div className={`col-${otherColumnWidth}`}>
                                                            <span className='heading_team'>{game.looser_high || ""}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {visibleColumns.time && !isEmpty(game.time) && (
                                                        <div className={`col-${otherColumnWidth}`}>
                                                            <div className='d-flex gap-2'>
                                                                <img src={vect} alt="" width={22} height={22} />
                                                                <span className='heading_team'>{game.time}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {visibleColumns.tv && !isEmpty(game.tv) && (
                                                        <div className={`col-${otherColumnWidth}`}>
                                                            <span className='heading_team'>{game.tv}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-12 text-center py-5">
                                <p>No games scheduled for {format(selectedDate, 'MMMM dd, yyyy')}.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Schedule;