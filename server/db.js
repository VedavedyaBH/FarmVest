const db = require("mongoose");

db.connect(
    "mongodb-url"
);

const UsersSchema = new db.Schema({
    userId: String,
    email: String,
    username: String,
    password: String,
    profilePicture: String,
    purchasedItems: [
        {
            type: String,
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

const WalletSchema = new db.Schema({
    walletId: String,
    userId: {
        type: String,
        ref: "users",
        required: true,
    },
    balance: Number,
});

const Users = db.model("users", UsersSchema);
const Admins = db.model("admins", AdminsSchema);
const Farms = db.model("farms", FarmsSchema);
const Wallet = db.model("wallet", WalletSchema);

module.exports = {
    Users,
    Admins,
    Farms,
    Wallet,
};
