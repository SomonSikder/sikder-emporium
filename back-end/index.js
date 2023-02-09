const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const allRoutes = require("./routes/index");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/", allRoutes);
app.use(notFound);
app.use(errorHandler);

dbConnect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`sever is running on PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
