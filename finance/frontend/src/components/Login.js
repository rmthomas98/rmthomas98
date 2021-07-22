import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "./UserContext";

function Login() {
  const { user, setUser } = useContext(UserContext);

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
    console.log(data);
  };

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
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              {errors.user ? (
                errors.user && (
                  <p className="form-error">{errors.user.message}</p>
                )
              ) : (
                <p className="form-error transparent"></p>
              )}
              <input
                type="text"
                id="user"
                name="user"
                placeholder="Email"
                {...register("user", {
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
              <button type="submit">Log In</button>
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
