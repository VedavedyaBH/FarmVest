const { Users } = require("../db");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

exports.createUser = async ({ username, password, email }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      userId: uuid.v4(),
      username,
      password: hashedPassword,
      email,
    });
    return user;
  } catch (error) {
    throw new Error("Could not create user");
  }
};
