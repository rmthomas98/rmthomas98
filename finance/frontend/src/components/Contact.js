import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorMonitor } from "events";

function Contact() {
  const [emailStatus, setEmailStatus] = useState("");
  const [submitValue, setSubmitValue] = useState("Send");
  const [msgStyle, setMsgStyle] = useState({ opacity: "0%" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setEmailStatus("");
    setSubmitValue(<i className="fa fa-spinner fa-spin btnStyleSubmit"></i>);
    axios
      .post("http://localhost:5000/email", {
        firstName: data.fname,
        lastName: data.lname,
        email: data.email,
        phone: data.phone,
        message: data.message,
      })
      .then((res) => {
        if (res.data.status === "Email sent") {
          setEmailStatus("Email Successfully Sent!");
          setMsgStyle({ opacity: "100%" });
          setSubmitValue("send");
          reset();
        } else {
          setEmailStatus("Something went wrong. Try again later");
          setSubmitValue("send");
          reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-left">
          <h2 className="questions">Have any Questions?</h2>
          <p className="description-small contact-message">
            Have any questions about our services? Any requests for any features
            that you want added? Let us know and we will get back with you
            promptly.
          </p>
        </div>
        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
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
              {errors.phone ? (
                errors.phone && (
                  <p className="form-error">{errors.phone.message}</p>
                )
              ) : (
                <p className="form-error transparent"></p>
              )}
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
            </div>
            <div className="input-container">
              {errors.message ? (
                errors.message && (
                  <p className="form-error">{errors.message.message}</p>
                )
              ) : (
                <p className="form-error transparent"></p>
              )}
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                {...register("message", { required: "* Message is required" })}
              />
            </div>
            <div className="email-status-container">
              <button type="submit">{submitValue}</button>
              <p className="email-status" style={msgStyle}>
                {emailStatus}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
