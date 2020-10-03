import React, { useState } from "react";

import StatCard from "./StatCard";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function StatSlider({ teamName, teamData }) {
  const statsCardConfig = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };

  const [statsCardSettings, setStatsCardSettings] = useState(statsCardConfig);

  return (
    <div className="StatSlider">
      <h2>{teamName}</h2>
      <p>Breakdown of all detail for {teamName}</p>
      <Slider {...statsCardSettings}>
        {Object.keys(teamData).map(function (keyName, keyIndex) {
          return <StatCard statVal={teamData[keyName]} statName={keyName} />;
        })}
      </Slider>
    </div>
  );
}
