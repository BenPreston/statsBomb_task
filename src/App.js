import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ScoreList from "./components/ScoreList";
import MatchReport from "./components/MatchReport";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/games">
          <ScoreList />
        </Route>
        <Route path="/games/:id">
          <MatchReport />
        </Route>
      </Router>
    </div>
  );
}

export default App;
