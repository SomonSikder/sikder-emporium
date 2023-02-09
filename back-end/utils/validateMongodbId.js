const mongoose = require("mongoose");

const validMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("Id is not valid or Found");
};

module.exports = validMongodbId;
