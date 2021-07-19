const exp = require("constants");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb connected successfully");
});

const signupRouter = require("./routes/signup");
const emailRouter = require("./routes/email");

app.use("/signup", signupRouter);
app.use("/email", emailRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
