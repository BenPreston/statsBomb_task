import React from "react";
import { useParams } from "react-router";

export default function MatchReport() {
  const { id } = useParams();
  return <div>Match: {id}</div>;
}
