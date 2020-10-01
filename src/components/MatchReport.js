import React from "react";
import { useParams } from "react-router";

import MatchData from "../data/match-data.json";

export default function MatchReport() {
  const { id } = useParams();
  return <div>Match: {id}</div>;
}
