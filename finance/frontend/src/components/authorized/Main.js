import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";

function Main() {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <div>hello, {user.firstName}</div>;
}

export default Main;
