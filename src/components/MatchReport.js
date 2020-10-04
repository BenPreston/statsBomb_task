import React, { useState } from "react";
import { useParams } from "react-router";
import { Container } from "reactstrap";

import StatData from "../data/stat-data.json";
import MatchDataJSON from "../data/match-data.json";
import TeamData from "../data/team-data.json";
import PlayerData from "../data/player-data.json";

import StatSlider from "./StatSlider";
import ScatterChartWidget from "./ScatterChartWidget";
import PlayerSlider from "./PlayerSlider";

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

  const Body = styled.body`
    background-image: linear-gradient(
      to bottom right,
      ${homeTeamColor} 50%,
      ${awayTeamColor} 50%
    );
  `;

  const calcGraphData = (dataArrOfObj, homeOrAwayID, xAxis, yAxis, zAxis) => {
    const graphData = [];

    dataArrOfObj.map((dataObj) => {
      const newObj = {};

      if (dataObj.team_id === homeOrAwayID) {
        newObj.x = 0 + dataObj[xAxis];
        newObj.y = 0 + dataObj[yAxis];
        newObj.z = 100 + dataObj[zAxis] * 100;

        graphData.push(newObj);
      }
    });

    return graphData;
  };

  return (
    <Body>
      <div className="data">
        <Container>
          <h1>
            {homeTeam} vs {awayTeam}
          </h1>
          <h2>Scatter Graph</h2>
          <p>
            This graph demonstrates shots to xg with bigger stars for goals.
            However it's not quite right and needs review
          </p>
          <ScatterChartWidget
            homeTeamName={homeTeam}
            homeTeamColor={homeTeamColor}
            homeTeamDataArr={calcGraphData(
              matchData,
              homeTeamID,
              "xg",
              "shots",
              "goals"
            )}
            awayTeamName={awayTeam}
            awayTeamColor={awayTeamColor}
            awayTeamDataArr={calcGraphData(
              matchData,
              awayTeamID,
              "xg",
              "shots",
              "goals"
            )}
          />
          <StatSlider teamOrPlayerName={homeTeam} dataToMap={homeTeamData} />
          <StatSlider teamOrPlayerName={awayTeam} dataToMap={awayTeamData} />
          <PlayerSlider
            matchData={matchData}
            playerData={playerData}
            setPlayerData={setPlayerData}
          />
          <StatSlider
            teamOrPlayerName={playerData.player_name}
            dataToMap={playerData}
          />
        </Container>
      </div>
    </Body>
  );
}
