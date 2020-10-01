import React, { useState } from "react";
import { useParams } from "react-router";
import { Table, Container } from "react-bootstrap";
import Select from "react-select";

import StatData from "../data/stat-data.json";
import MatchDataJSON from "../data/match-data.json";
import TeamData from "../data/team-data.json";
import PlayerData from "../data/player-data.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "./matchReport.css";

export default function MatchReport() {
  const { id } = useParams();

  const [playerData, setPlayerData] = useState([
    { stat: "XG", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Shots", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Goals", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Tackles", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Interceptions", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Pressures", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Passes", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Completed Passes", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Left Foot Passes", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Right Foot Passes", value: "-", teamPerc: "-", gamePerc: "-" },
    { stat: "Player Shots Faced", value: "-", teamPerc: "-", gamePerc: "-" },
  ]);

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
        // Take the player id from this data value
        // Look it up from the player data json
        // Find the name of the
        // Add this name property as a new key value pair to the newData object
        // Push the new data to matchData
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

  const Countries = [
    { label: "Albania", value: 355 },
    { label: "Argentina", value: 54 },
    { label: "Austria", value: 43 },
    { label: "Cocos Islands", value: 61 },
    { label: "Kuwait", value: 965 },
    { label: "Sweden", value: 46 },
    { label: "Venezuela", value: 58 },
  ];

  const [homePlayers, setHomePlayers] = useState([]);

  return (
    <div className="data">
      <Container>
        <h1>
          {homeTeam} vs {awayTeam}
        </h1>
        <Table striped bordered hover className="dataTable">
          <thead>
            <tr>
              <th colSpan="4">
                <Select options={Countries} />
              </th>
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
            {playerData.map((stat) => {
              return (
                <tr>
                  <td>{stat.stat}</td>
                  <td>{stat.value}</td>
                  <td>{stat.teamPerc}</td>
                  <td>{stat.gamePerc}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      {console.log(matchData)}
    </div>
  );
}
