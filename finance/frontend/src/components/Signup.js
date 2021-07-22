import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

function Signup() {
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const [submitValue, setSubmitValue] = useState("Sign Up");
  const [modalStyle, setModalStyle] = useState({ opacity: "0%", zIndex: "-1" });
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
    setSubmitValue(<i className="fa fa-spinner fa-spin btnStyleSubmit"></i>);
    axios
      .post("http://localhost:5000/signup/createAccount", {
        firstName: data.fname,
        lastName: data.lname,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.code === 11000) {
          setSubmitValue("Sign Up");
          setModalStyle({ opacity: "100%", zIndex: "1" });
        } else {
          axios
            .post("http://localhost:5000/signup/findUser", {
              email: data.email,
            })
            .then((res) => {
              console.log(res);
              setUser(res.data);
              history.push("/main");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-left">
          <h2 className="questions">Sign Up</h2>
          <p className="description-small contact-message">
            Create an account with SpeedStats.
          </p>
        </div>
        <div className="contact-right">
          <div className="modal error-modal" style={modalStyle}>
            <p className="description-small email-error-description">
              Email already in use...try using a different email or logging in{" "}
              <b>
                <a href="/login" className="bold-link">
                  Here
                </a>
              </b>
            </p>
            <i
              class="fas fa-times"
              onClick={() => setModalStyle({ opacity: "0%", zIndex: "-1" })}
            ></i>
          </div>
          <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="contact-name">
              <div className="input-container">
                {errors.fname ? (
                  errors.fname && (
                    <p className="form-error">* First name is required</p>
                  )
                ) : (
                  <p className="form-error transparent"></p>
                )}
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="First Name"
                  {...register("fname", { required: true })}
                />
              </div>
              <div className="input-container">
                {errors.lname ? (
                  errors.lname && (
                    <p className="form-error">* Last Name is required</p>
                  )
                ) : (
                  <p className="form-error transparent"></p>
                )}
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Last Name"
                  {...register("lname", { required: true })}
                />
              </div>
            </div>
            <div className="input-container">
              {errors.email ? (
                errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )
              ) : (
                <p className="form-error transparent"></p>
              )}
              <input
                type="email"
                id="email"
                name="fname"
                placeholder="Email"
                {...register("email", {
                  required: "* Email is  required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "* Invalid email address",
                  },
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
                placeholder="Password - min 8 characters"
                {...register("password", {
                  required: "* Password is required",
                  minLength: { value: 8, message: "* Password is too short" },
                  maxLength: { value: 20, message: "* Password is too long" },
                })}
              />
            </div>
            <div className="submit-signup-container">
              <button type="submit">{submitValue}</button>
            </div>
          </form>
          {viewPass === "password" ? (
            <i
              className="fas fa-eye"
              onClick={handleEyeClick}
              style={style}
            ></i>
          ) : (
            <i className="fas fa-eye-slash" onClick={handleEyeClick}></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
