const { zusername, zpassword, zemail } = require("../util/zodValidation");
const walletServices = require("../services/walletServices");

exports.getBalance = async (req, res) => {
    try {
        const userId = req.headers.userid;
        if (!{ userId }) {
            res.status(404).json({
                Message: "Please login",
            });
        }

        const balance = await walletServices.getBalance({ userId });
        res.status(200).json({
            Message: `Balance is Rs.${balance}`,
        });
    } catch (error) {
        res.status(400).json({
            Error: error.message,
        });
    }
};

exports.addBalance = async (req, res) => {
    try {
        const userId = req.headers.userid;
        const amount = req.body.amount;

        if (!{ userId }) {
            res.status(404).json({
                Message: "Please login",
            });
        }

        await walletServices.addBalance({ userId, amount });
        res.status(200).json({
            Message: `Added Rs.${amount}`,
        });
    } catch (error) {
        res.status(400).json({
            Error: error.message,
        });
    }
};

exports.withdrawAmount = async (req, res) => {
    try {
        const userId = req.headers.userid;
        const amount = req.body.amount;

        if (!{ userId }) {
            res.status(404).json({
                Message: "Please login",
            });
        }

        await walletServices.withdrawAmount({ userId, amount });
        res.status(200).json({
            Message: `Withdrawn Rs.${amount}`,
        });
    } catch (error) {
        res.status(400).json({
            Error: error.message,
        });
    }
};
