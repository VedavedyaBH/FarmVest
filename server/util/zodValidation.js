const zod = require("zod");

exports.zusername = zod.string().min(3).max(12);
exports.zemail = zod.string().email();
exports.zpassword = zod.string().min(6).max(16);

exports.zfarm = zod.object({
    itemname: zod.string().min(2),
    description: zod.string().max(30),
    price: zod.number(),
    itemImage: zod.string().nullable(),
});
