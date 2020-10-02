import React from "react";
import { Link } from "react-router-dom";

import "./scoreList.css";

import matchData from "../data/match-data.json";
import teamData from "../data/team-data.json";

export default function ScoreList() {
  const findTeamDetail = (team_id, property) => {
    const teamObj = teamData.filter((team) => {
      return team.team_id === team_id;
    });

    return teamObj[0][property];
  };

  const caclulateResultText = (match) => {
    if (!match.match_home_penalty_score) {
      return null;
    } else {
      return `${match.match_home_penalty_score} - ${match.match_away_penalty_score} on pens`;
    }
  };

  return (
    <div className="matches">
      {matchData.map((match) => {
        return (
          <Link to={`/games/${match.match_id}`}>
            <div className="match" key={match.match_id}>
              <div className="date">{match.match_date}</div>
              <div className="teamInfo">
                <span
                  className="teamName"
                  style={{
                    color: findTeamDetail(
                      match.match_home_team_id,
                      "team_first_color"
                    ),
                  }}
                >
                  {findTeamDetail(match.match_home_team_id, "team_name")}
                </span>
                <span className="teamScore">{match.match_home_score}</span>
                <span className="teamScore">{match.match_away_score}</span>

                <span
                  className="teamName"
                  style={{
                    color: findTeamDetail(
                      match.match_away_team_id,
                      "team_first_color"
                    ),
                  }}
                >
                  {findTeamDetail(match.match_away_team_id, "team_name")}
                </span>
              </div>
              <div className="penaltyInfo">{caclulateResultText(match)}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
