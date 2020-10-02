import React, { useState } from "react";
import { useParams } from "react-router";
import { Table, Container } from "react-bootstrap";

import StatData from "../data/stat-data.json";
import MatchDataJSON from "../data/match-data.json";
import TeamData from "../data/team-data.json";
import PlayerData from "../data/player-data.json";

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

  const calculateTeamData = () => {
    StatData.map((data) => {
      if (id == data.match_id) {
        const newData = { ...data };
        newData["player_name"] = findPlayerName(data.player_id);
        matchData.push(newData);
      }
    });
  };

  calculateTeamData();

  let homeTeam, homeTeamID, awayTeam, awayTeamID;

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
      }
      if (team.team_id === awayTeamID) {
        awayTeam = team.team_name;
      }
    });
  };

  identfityTeamNames();

  function changeStats(player) {
    setPlayerData(player);
  }

  return (
    <div className="data">
      <Container>
        <h1>
          {homeTeam} vs {awayTeam}
        </h1>
        <h3></h3>
        <div className="playerHolders">
          {matchData.map((data) => {
            return (
              <div className="player" onClick={() => changeStats(data)}>
                {PlayerData.map((player) => {
                  if (player.player_name == data.player_name) {
                    return (
                      <div className="player">
                        <div className="player_name">{player.player_name}</div>
                        <div className="player_dob">
                          {player.player_birth_date}
                        </div>
                        <div className="player_country">
                          {player.country_name}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>

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
  );
}
