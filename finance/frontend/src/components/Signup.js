import React from "react";
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="contact-name">
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="First Name"
                {...register("fname", { required: true })}
              />
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="Last Name"
                {...register("lname", { required: true })}
              />
            </div>
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
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Phone"
              {...register("phone", {
                required: "* Phone is required",
                minLength: { value: 10, message: "* Invalid phone number" },
              })}
            />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              {...register("username", {
                required: "* Username is required",
              })}
            />
            <input
              type="password"
              id="password"
              name="pssword"
              placeholder="Create Password - min 8 characters"
              {...register("password", {
                required: "* Password is required",
                minLength: { value: 8, message: "* Password is too short" },
              })}
            />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirm password", {
                required: "* Confrim Password is required",
              })}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
