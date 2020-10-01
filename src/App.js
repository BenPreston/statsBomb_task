import React from "react";
import { HashRouter, Route } from "react-router-dom";

import ScoreList from "./components/ScoreList";
import MatchReport from "./components/MatchReport";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Route exact path="/games">
          <ScoreList />
        </Route>
        <Route path="/games/:id">
          <MatchReport />
        </Route>
      </HashRouter>
    </div>
  );
}

export default App;
