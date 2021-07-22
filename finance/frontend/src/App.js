import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FrontMessage from "./components/FrontPage";
import NavBar from "./components/NavBar";
import Why from "./components/Why";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/authorized/Main";
import { UserContext } from "./components/UserContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="container">
      <Router>
        <Route
          path={[
            "/",
            "/signup",
            "/login",
            "/pricing",
            "/features",
            "/about",
            "/contact",
          ]}
          exact
          component={NavBar}
        />
        <Route path="/" exact component={FrontMessage} />
        <Route path={["/", "/about"]} exact component={Why} />
        <Route path={["/", "/pricing"]} exact component={Pricing} />
        <Route
          path={["/", "/about", "/contact", "/pricing", "/features"]}
          exact
          component={Contact}
        />
        <Route path="/" exact component={Footer} />
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/main" exactact component={Main} />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
