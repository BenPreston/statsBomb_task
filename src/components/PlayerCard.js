import React from "react";
import "./playerCard.css";

export default function PlayerCard({ player }) {
  return (
    <div>
      <div className="card">
        <h2 className="name">{player.player_name}</h2>
        <div className="title">Position</div>
        <div className="actions">
          <div className="match-rating">
            <span className="match-rating_score">6</span>
            <small>Match Rating</small>
          </div>
          <div className="follow-btn">
            <button>See Player Stats</button>
          </div>
        </div>
      </div>
    </div>
  );
}
