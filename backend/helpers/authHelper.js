const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { hashPassword };