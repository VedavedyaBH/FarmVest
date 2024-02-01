const { Farms, Users } = require("../db");
const uuid = require("uuid");

exports.getAllFarms = async () => {
    try {
        const farms = await Farms.find();
        return farms;
    } catch (error) {
        throw new Error("Could not retrive");
    }
};

exports.getFarmById = async (itemId) => {
    try {
        const farms = await Farms.findOne({ itemId: itemId });
        return farms;
    } catch (error) {
        throw new Error("Could not retrive");
    }
};

exports.deleteFarmById = async (itemId) => {
    try {
        await Users.updateMany(
            { purchasedItems: itemId },
            { $pull: { purchasedItems: itemId } }
        );
        return await Farms.deleteOne({ itemId: itemId });
    } catch (error) {
        throw new Error("Could not delete");
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
