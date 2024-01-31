const { Users } = require("../db");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

exports.createUser = async ({ username, password, email }) => {
    try {
        const existingUser = await this.getUserByUsername({ username });
        const existingEmail = await this.getUserByEmail({ email });

        if (existingUser) {
            throw new ReferenceError();
        }

        if (existingEmail) {
            throw new ReferenceError();
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            userId: uuid.v4(),
            username,
            password: hashedPassword,
            email,
        });
        return user;
    } catch (error) {
        if (!ReferenceError) {
            throw new Error("Could not create user");
        }
        throw new Error("Email/username exists already");
    }
};

exports.loginUser = async ({ email, password }) => {
    try {
        const user = await this.getUserByEmail({ email });
        if (user == null) {
            return null;
        }

        const validUser = bcrypt.compare(password, user.password);

        if (!validUser) {
            return;
        }
        if (validUser) {
            return user;
        }
    } catch (error) {
        throw new Error("Could not login");
    }
};

exports.getUserByEmail = async ({ email }) => {
    try {
        console.log(email);

        const user = await Users.findOne({
            email: email,
        });

        if (!user) {
            console.log(user);
            return null;
        }

        if (user) {
            console.log(user);
            return user;
        }
    } catch (error) {
        throw new Error("Could not find");
    }
};

exports.getUserByUsername = async ({ username }) => {
    try {
        console.log(username);

        const user = await Users.findOne({
            username: username,
        });

        if (!user) {
            console.log(user);
            return null;
        }

        if (user) {
            console.log(user);
            return user;
        }
    } catch (error) {
        throw new Error("Could not find");
    }
};
