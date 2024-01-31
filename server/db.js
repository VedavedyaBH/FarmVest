const db = require("mongoose");

db.connect(
    "mongodb+srv://ved:N6JFj3TKBmRu5eXa@farmvest.jhzxrch.mongodb.net/DevFarmVestV1"
);

const UsersSchema = new db.Schema({
    userId: String,
    email: String,
    username: String,
    password: String,
    profilePicture: String,
    purchasedItems: [
        {
            type: db.Schema.Types.ObjectId,
            ref: "farms",
        },
    ],
});

const AdminsSchema = new db.Schema({
    adminId: String,
    email: String,
    username: String,
    password: String,
    profilePicture: String,
});

const FarmsSchema = new db.Schema({
    itemId: String,
    itemname: String,
    description: String,
    price: Number,
    itemImage: String,
});

const Users = db.model("users", UsersSchema);
const Admins = db.model("admins", AdminsSchema);
const Farms = db.model("farms", FarmsSchema);

module.exports = {
    Users,
    Admins,
    Farms,
};
