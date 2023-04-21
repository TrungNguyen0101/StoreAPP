const mongooseAccount = require("mongoose");
const accountSchema = new mongooseAccount.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
});
module.exports = mongooseAccount.model("Account", accountSchema);
