const zod = require("zod");

exports.sanitize = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        next();
    } catch (error) {
        return res.status(400).send(err.errors);
    }
};

exports.zusername = zod.string().min(3).max(12);
exports.zemail = zod.string().email();
exports.zpassword = zod.string().min(6).max(16);
