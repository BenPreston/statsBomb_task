import React, { useState } from "react";

import StatCard from "./StatCard";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function StatSlider({ teamOrPlayerName, dataToMap }) {
  const statsCardConfig = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };

  const [statsCardSettings, setStatsCardSettings] = useState(statsCardConfig);

  return (
    <div className="StatSlider">
      <h2>{teamOrPlayerName}: Match Statistics</h2>
      <p>Key numeric metrics for {teamOrPlayerName}</p>
      <Slider {...statsCardSettings}>
        {Object.keys(dataToMap).map(function (keyName, keyIndex) {
          if (
            keyName !== "match_id" &&
            keyName !== "team_id" &&
            keyName !== "player_id" &&
            keyName !== "player_name"
          ) {
            return <StatCard statVal={dataToMap[keyName]} statName={keyName} />;
          }
        })}
      </Slider>
    </div>
  );
}
