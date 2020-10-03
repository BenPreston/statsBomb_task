import React from "react";
import "./statCard.css";

export default function StatCard({ statVal, statName }) {
  {
    console.log(statName, statVal);
  }
  return (
    <div>
      <div className="stat_card">
        <span className="stat_score">{statVal}</span>
        <small>{statName}</small>
      </div>
    </div>
  );
}
