const { Users, Wallet } = require("../db");
const mongoose = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const farmServices = require("../services/farmServices");
const walletServices = require("../services/walletServices");

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
        console.log(user.userId);

        await Wallet.create({
            walletId: uuid.v4(),
            userId: user.userId,
            balance: 0,
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
        const user = await Users.findOne({
            email: email,
        });

        if (!user) {
            return null;
        }

        if (user) {
            return user;
        }
    } catch (error) {
        throw new Error("Could not find");
    }
};

exports.getUserByUsername = async ({ username }) => {
    try {
        const user = await Users.findOne({
            username: username,
        });

        if (!user) {
            return null;
        }

        if (user) {
            return user;
        }
    } catch (error) {
        throw new Error("Could not find");
    }
};

exports.getAllOrders = async (userid) => {
    try {
        const orders = await Users.findOne({
            userId: userid,
        }).select("purchasedItems");

        return orders ? orders.purchasedItems : [];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.placecOrder = async ({ userId, itemid }) => {
    try {
        const validOrder = await farmServices.getFarmById(itemid);

        const session = await mongoose.startSession();
        session.startTransaction();

        if (!validOrder) {
            throw new ReferenceError(
                "Cannot place order of non-existing item "
            );
        }
        const balance = await walletServices.getBalance({ userId });

        if (validOrder.price > balance) {
            throw new ReferenceError("Insufficient funds");
        }
        const orders = Users.updateOne(
            { userId: userId },
            {
                $push: {
                    purchasedItems: itemid,
                },
            }
        );

        const amount = validOrder.price;
        await walletServices.withdrawAmount({ userId, amount });
        session.commitTransaction();
        return orders;
    } catch (error) {
        if (!ReferenceError) {
            throw new Error(error.message);
        }

        throw new Error(error.message);
    }
};

exports.removeOrder = async ({ userId, itemid }) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const item = await farmServices.getFarmById(itemid);

        const orders = Users.updateOne(
            { userId: userId },
            {
                $pull: { purchasedItems: itemid },
            }
        );

        const amount = item.price;
        await walletServices.addBalance({ userId, amount });

        session.commitTransaction();
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
};
