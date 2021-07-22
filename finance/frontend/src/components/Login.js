import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Login() {
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('none')
  const [modalStyle, setModalStyle] = useState({ opacity: "0%", zIndex: "-1" });
  const [submitValue, setSubmitValue] = useState("Log In");
  const [viewPass, setViewPass] = useState("password");
  const [style, setStyle] = useState({
    opacity: "0%",
    animation: "fadeIn 2s forwards 1s",
  });

  const handleEyeClick = () => {
    setStyle({
      animation: "none",
    });
    if (viewPass === "password") {
      setViewPass("text");
    } else {
      setViewPass("password");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmitValue(<i className="fa fa-spinner fa-spin btnStyleSubmit"></i>)
    axios.post('http://localhost:5000/login/user-login', {
      email: data.email,
      password: data.password,
    }).then(res => {
      if (res.data._id) {
        setUser(res.data);
        history.push('/main')
      } else if (res.data === 'incorrect password') {
        setSubmitValue("Log In");
        setErrorMessage('Incorrect Password')
        setModalStyle({ opacity: "100%", zIndex: "1" });
      } else if (res.data === 'email not found') {
        setSubmitValue("Log In");
        setErrorMessage('User email not found')
        setModalStyle({ opacity: "100%", zIndex: "1" });
      }
    })
  };

  if (user) return <Redirect to="/main" />

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
        <div className="modal error-modal-login" style={modalStyle}>
            <p className="description-small no-animate">
              {errorMessage}
            </p>
            <i
              className="fas fa-times"
              onClick={() => setModalStyle({ opacity: "0%", zIndex: "-1" })}
            ></i>
          </div>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              {errors.email ? (
                errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )
              ) : (
                <p className="form-error transparent"></p>
              )}
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: "* Email is required",
                })}
              />
            </div>
            <div className="input-container">
              {errors.password ? (
                errors.password && (
                  <p className="form-error">{errors.password.message}</p>
                )
              ) : (
                <p className="form-error transparent"></p>
              )}
              <input
                type={viewPass}
                id="password"
                name="pssword"
                placeholder="Password"
                {...register("password", {
                  required: "* Password is required",
                })}
              />
            </div>
            <div className="submit-login-container">
              <button type="submit">{submitValue}</button>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
          </form>
          {viewPass === "password" ? (
            <i
              className="fas fa-eye login-eye"
              onClick={handleEyeClick}
              style={style}
            ></i>
          ) : (
            <i
              className="fas fa-eye-slash login-eye"
              onClick={handleEyeClick}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
