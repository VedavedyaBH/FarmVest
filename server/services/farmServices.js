const { Farms } = require("../db");
const uuid = require("uuid");

exports.getAllFarms = async () => {
    try {
        const farms = await Farms.find();
        return farms;
    } catch (error) {
        throw new Error("Could not retrive");
    }
};

exports.addFarms = async ({ itemname, description, price, itemImage }) => {
    try {
        const farms = await Farms.create({
            itemId: uuid.v4(),
            itemname: itemname,
            description: description,
            price: price,
            itemImage: itemImage,
        });
        return farms;
    } catch (error) {
        throw new Error("Could not retrive");
    }
};
