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
            balance,
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

        const bal = await walletServices.addBalance({ userId, amount });

        res.status(200).json({
            bal,
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

        const bal = await walletServices.withdrawAmount({ userId, amount });
        console.log(bal);
        if (!bal) {
            res.status(403).json({
                Message: "Insufficient funds",
            });
        }
        res.status(200).json({
            bal,
        });
    } catch (error) {
        res.status(400).json({
            Error: error.message,
        });
    }
};
