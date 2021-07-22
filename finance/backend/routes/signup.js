const router = require("express").Router();
let User = require("../models/user.model");

router.route("/createAccount").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  newUser
    .save()
    .then((res) => res.json("user added"))
    .catch((err) => res.json(err));
});

router.route("/findUser").post((req, res) => {
  const email = req.body.email;

  User.findOne({ email: email })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

module.exports = router;
