import React from "react";

function Login() {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-left">
          <h2 className="questions">Log In</h2>
          <p className="description-small contact-message">
            Log in to your SpeedStats account.
          </p>
        </div>
        <div className="contact-right">
          <form className="login-form">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
            <input
              type="password"
              id="password"
              name="pssword"
              placeholder="Password"
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
