import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import "./radarChartWidget.css";

export default function RadarChartWidget({
  homeTeamData,
  homeTeamName,
  homeTeamColor,
  awayTeamData,
  awayTeamName,
  awayTeamColor,
}) {
  const data = [];

  Object.keys(homeTeamData).map((key) => {
    let maxScore;

    if (!(key.includes("pass") || key.includes("player_shots_faced"))) {
      if (homeTeamData[key] >= awayTeamData[key]) {
        maxScore = homeTeamData[key];
      } else {
        maxScore = awayTeamData[key];
      }

      data.push({
        type: key,
        home: (maxScore / homeTeamData[key]) * 100,
        away: (awayTeamData[key] / maxScore) * 100,
        topScore: maxScore,
      });
    }
  });

  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
      fill="#8884d8"
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="type" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
      <Radar
        name={homeTeamName}
        dataKey="home"
        stroke={homeTeamColor}
        fill={homeTeamColor}
        fillOpacity={0.6}
      />
      <Radar
        name={awayTeamName}
        dataKey="away"
        stroke={awayTeamColor}
        fill={awayTeamColor}
        fillOpacity={0.6}
      />
      <Legend />
    </RadarChart>
  );
}
