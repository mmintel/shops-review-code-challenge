import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ShopReviewsPage from "./pages/ShopReviewsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="App">
        <MainNavigation />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/shop/:id/reviews">
            <ShopReviewsPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
