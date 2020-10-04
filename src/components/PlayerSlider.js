import React, { useState } from "react";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PlayerCard from "./PlayerCard";
import PlayerData from "../data/player-data.json";

export default function PlayerSlider({ matchData, playerData, setPlayerData }) {
  const playerCardConfig = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const [playerCardSettings, setPlayerCardSettings] = useState(
    playerCardConfig
  );

  function changeStats(player) {
    setPlayerData(player);
  }

  return (
    <div>
      <Slider {...playerCardSettings}>
        {matchData.map((data) => {
          return (
            <div className="player" onClick={() => changeStats(data)}>
              {PlayerData.map((player) => {
                if (player.player_name == data.player_name) {
                  return <PlayerCard player={player} />;
                }
              })}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
