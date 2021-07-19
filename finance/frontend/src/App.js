import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FrontMessage from "./components/FrontPage";
import NavBar from "./components/NavBar";
import Why from "./components/Why";
import Pricing from "./components/Pricing";
import Ready from "./components/Ready";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
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
        component={Ready}
      />
      <Route
        path={["/", "/about", "/contact", "/pricing", "/features"]}
        exact
        component={Contact}
      />
      <Route path="/" exact component={Footer} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default App;
