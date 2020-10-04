import React, { PureComponent } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

export default function ScatterChartWidget({
  homeTeamDataArr,
  homeTeamName,
  homeTeamColor,
  awayTeamDataArr,
  awayTeamName,
  awayTeamColor,
}) {
  return (
    <ScatterChart
      width={400}
      height={400}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid fill="FFFF" />
      <XAxis type="number" dataKey="x" name="xg" />
      <YAxis type="number" dataKey="y" name="shots" />
      <ZAxis type="number" dataKey="z" range={[100, 500]} name="Goals" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend />
      <Scatter
        name={homeTeamName}
        data={homeTeamDataArr}
        fill={homeTeamColor}
        shape="star"
      />
      <Scatter
        name={awayTeamName}
        data={awayTeamDataArr}
        fill={awayTeamColor}
        shape="triangle"
      />
      <LabelList dataKey="x" />
    </ScatterChart>
  );
}
