import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export default function RadarChartWidget({ homeTeamData, awayTeamData }) {
  const data = [];

  Object.keys(homeTeamData).map((key) => {
    let maxScore;

    if (homeTeamData[key] >= awayTeamData[key]) {
      maxScore = homeTeamData[key];
    } else {
      maxScore = awayTeamData[key];
    }

    data.push({
      type: key,
      home: homeTeamData[key],
      away: awayTeamData[key],
      topScore: maxScore,
    });
  });

  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="type" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      <Radar
        name="Mike"
        dataKey="home"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Radar
        name="Lily"
        dataKey="away"
        stroke="#82ca9d"
        fill="#82ca9d"
        fillOpacity={0.6}
      />
      <Legend />
    </RadarChart>
  );
}
