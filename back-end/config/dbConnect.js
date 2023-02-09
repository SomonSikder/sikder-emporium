const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const dbConnect = (url) => {
  return mongoose.connect(url);
};

module.exports = dbConnect;
