const router = require("express").Router();
const nodemailer = require("nodemailer");

router.route("/").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "ryanmthomas01@gmail.com",
    subject: "Customer Inquiry",
    html: `<p><b>First Name:</b> ${firstName}</p><br><p><b>Last Name:</b> ${lastName}</p><br><p><b>Email:</b> ${email}</p><br><p><b>Phone:</b> ${phone}</p><br><p><b>Message:</b> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
      res.json({ status: "Email sent" });
    }
  });
});

module.exports = router;
