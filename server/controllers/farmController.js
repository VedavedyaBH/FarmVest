const { zfarm } = require("../util/zodValidation");
const farmServices = require("../services/farmServices");
// const multer = require("multer");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single("itemImage");

exports.getAllFarms = async (req, res) => {
    try {
        const farms = await farmServices.getAllFarms();
        if (farms[0] == null) {
            res.status(200).json({
                message: "No farms",
            });
        }

        res.status(200).json({
            farms,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

exports.getFarmById = async (req, res) => {
    try {
        const itemId = req.body.id;
        console.log({ itemId });
        const farms = await farmServices.getFarmById(itemId);

        if (farms == null) {
            res.status(200).json({
                message: "No farms",
            });
        }

        res.status(200).json({
            farms,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

exports.deleteFarmById = async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log(itemId);
        const farms = await farmServices.deleteFarmById(itemId);

        if (farms == null) {
            res.status(200).json({
                message: "No farms",
            });
        }

        res.status(200).json({
            Message: "deleted",
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

exports.addFarms = async (req, res) => {
    try {
        const fileBuffer = req.file.buffer;
        const { itemname, description, price } = req.body;
        const newFarm = await farmServices.addFarms({
            itemname,
            description,
            price,
            itemImage: fileBuffer.toString("base64"),
        });

        res.status(200).json({
            message: "Added",
            farm: newFarm,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
