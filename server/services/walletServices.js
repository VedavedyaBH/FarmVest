const { Wallet } = require("../db");
const mongoose = require("mongoose");
const uuid = require("uuid");

exports.getBalance = async ({ userId }) => {
    try {
        const wallet = await Wallet.findOne({
            userId: userId,
        });

        return wallet.balance;
    } catch (error) {
        if (!ReferenceError) {
            throw new Error(error.message);
        }
    }
};

exports.addBalance = async ({ userId, amount }) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const wallet = await Wallet.findOneAndUpdate(
            { userId: userId },
            {
                $inc: {
                    balance: amount,
                },
            }
        );

        await session.commitTransaction();
        const newBal = await this.getBalance({ userId });
        return newBal;
    } catch (error) {
        if (!ReferenceError) {
            throw new Error(error.message);
        }
        throw new Error(error.message);
    }
};

exports.withdrawAmount = async ({ userId, amount }) => {
    const session = await mongoose.startSession();
    try {
        console.log({ userId, amount });

        const isBalanceZero = await this.getBalance({ userId });

        if (isBalanceZero <= amount) {
            throw new ReferenceError("Insufficient balance");
        }
        session.startTransaction();
        await Wallet.findOneAndUpdate(
            { userId: userId },
            {
                $inc: {
                    balance: -amount,
                },
            }
        );
        const balance = await this.getBalance({ userId });

        await session.commitTransaction();
        return balance;
    } catch (error) {
        if (!ReferenceError) {
            throw new Error(error.message);
        }
    }
};
