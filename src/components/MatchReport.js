import React, { useState } from "react";
import { useParams } from "react-router";
import { Table, Container } from "reactstrap";

import StatData from "../data/stat-data.json";
import MatchDataJSON from "../data/match-data.json";
import TeamData from "../data/team-data.json";
import PlayerData from "../data/player-data.json";

import PlayerCard from "./PlayerCard";
import StatSlider from "./StatSlider";

import Slider from "react-slick";
import styled from "styled-components";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./matchReport.css";

export default function MatchReport() {
  const { id } = useParams();

  const [playerData, setPlayerData] = useState({
    completed_passes: 28,
    goals: 1,
    interceptions: 0,
    left_foot_passes: 22,
    match_id: 7175982,
    minutes_played: 97.63,
    passes: 34,
    player_id: 15970,
    player_name: "Samuel Yves Umtiti",
    player_shots_faced: 0,
    pressures: 4,
    right_foot_passes: 4,
    shots: 1,
    tackles: 0,
    team_id: 468227,
    team_possession_percentage: 0.37,
    xg: 0.22,
  });

  const [attackingData, setAttackingData] = useState({
    goals: 1,
    xg: 0.5,
    shots: 3,
    stuff1: 1,
    stuff2: 0.5,
    stuff3: 3,
    stuff4: 1,
    xstuff15: 0.5,
    stuff16: 3,
  });

  const matchData = [];

  const findPlayerName = (player_id) => {
    const player = PlayerData.filter((player) => {
      if (player.player_id == player_id) {
        return player.player_name;
      }
    });
    return player[0].player_name;
  };

  const calculateMatchData = () => {
    StatData.map((data) => {
      if (id == data.match_id) {
        const newData = { ...data };
        newData["player_name"] = findPlayerName(data.player_id);
        matchData.push(newData);
      }
    });
  };

  calculateMatchData();

  let homeTeam, homeTeamID, homeTeamColor, awayTeam, awayTeamID, awayTeamColor;

  const identfityTeamIDs = () => {
    MatchDataJSON.map((match) => {
      if (id == match.match_id) {
        homeTeamID = match.match_home_team_id;
        awayTeamID = match.match_away_team_id;
      }
    });
  };

  identfityTeamIDs();

  const identfityTeamNames = () => {
    TeamData.filter((team) => {
      if (team.team_id === homeTeamID) {
        homeTeam = team.team_name;
        homeTeamColor = team.team_first_color;
      }
      if (team.team_id === awayTeamID) {
        awayTeam = team.team_name;
        awayTeamColor = team.team_first_color;
      }
    });
  };

  identfityTeamNames();

  const calculateTeamData = (homeOrAwayTeam) => {
    let teamID,
      teamName,
      teamData = {
        xg: 0,
        shots: 0,
        goals: 0,
        tackles: 0,
        interceptions: 0,
        pressures: 0,
        passes: 0,
        completed_passes: 0,
        left_foot_passes: 0,
        right_foot_passes: 0,
        player_shots_faced: 0,
      };

    if (homeOrAwayTeam == "home") {
      teamID = homeTeamID;
      teamName = homeTeam;
    }

    if (homeOrAwayTeam == "away") {
      teamID = awayTeamID;
      teamName = awayTeam;
    }

    matchData.filter((data) => {
      if (data.team_id == teamID) {
        teamData.xg += data.xg;
        teamData.shots += data.shots;
        teamData.goals += data.goals;
        teamData.tackles += data.tackles;
        teamData.interceptions += data.interceptions;
        teamData.pressures += data.pressures;
        teamData.passes += data.passes;
        teamData.completed_passes += data.completed_passes;
        teamData.left_foot_passes += data.left_foot_passes;
        teamData.right_foot_passes += data.right_foot_passes;
        teamData.player_shots_faced += data.player_shots_faced;
      }
    });

    teamData.xg = teamData.xg.toFixed(2);

    return teamData;
  };

  const homeTeamData = calculateTeamData("home");
  const awayTeamData = calculateTeamData("away");

  function changeStats(player) {
    setPlayerData(player);
  }

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

  const Body = styled.body`
    background-image: linear-gradient(
      to bottom right,
      ${homeTeamColor} 50%,
      ${awayTeamColor} 50%
    );
  `;

  return (
    <Body>
      {console.log(homeTeamID, homeTeamData)}
      <div className="data">
        <Container>
          <h1>
            {homeTeam} vs {awayTeam}
          </h1>
          {/* Player slider */}
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
          {/* Player slider ends */}

          <StatSlider teamName={homeTeam} teamData={homeTeamData} />
          <StatSlider teamName={awayTeam} teamData={awayTeamData} />

          <Table striped bordered hover className="dataTable">
            <thead>
              <tr>
                <th colSpan="4"></th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
                <th>Team Percentage</th>
                <th>Game Percentage</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(playerData).map(function (keyName, keyIndex) {
                return (
                  <tr>
                    <td>{keyName}</td>
                    <td>{playerData[keyName]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </Body>
  );
}
