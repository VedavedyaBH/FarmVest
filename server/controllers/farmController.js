const { zfarm } = require("../util/zodValidation");
const farmServices = require("../services/farmServices");

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
        const itemId = req.params.id;
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
        console.log("guiibiubkb");

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
        const farmsList = req.body;
        const addEach = farmsList.map(async (each) => {
            const validFarm = zfarm.parse(each);

            if (validFarm.error) {
                throw new Error(validFarm.error.message);
            }

            return farmServices.addFarms({
                itemname: each.itemname,
                description: each.description,
                price: each.price,
                itemImage: each.itemImage,
            });
        });

        await Promise.all(addEach);

        res.status(200).json({
            message: "Added",
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
