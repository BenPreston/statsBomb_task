import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function StackedBarChartWidget({ matchData }) {
  const graphData = [];

  matchData.map((playerStats) => {
    const passObj = { successful: 0, unsuccessful: 0, player: "" };

    passObj.successful = playerStats.completed_passes || 0;
    passObj.unsuccessful =
      playerStats.passes - playerStats.completed_passes || 0;
    passObj.player = playerStats.player_name;

    graphData.push(passObj);
  });

  return (
    <BarChart
      width={500}
      height={300}
      data={graphData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="player" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Bar dataKey="successful" stackId="a" fill="#82ca9d" />
      <Bar dataKey="unsuccessful" stackId="a" fill="#FF7F7F" />
    </BarChart>
  );
}
