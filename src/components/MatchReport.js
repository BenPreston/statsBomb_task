import React from "react";
import { useParams } from "react-router";

import StatData from "../data/stat-data.json";

export default function MatchReport() {
  const { id } = useParams();
  return <div>Match: {id}</div>;
}
