const zod = require("zod");
const { createToken } = require("../util/jwtAuth");
const { zusername, zpassword, zemail } = require("../util/zodValidation");
const userServices = require("../services/userServices");

exports.userSignup = async (req, res) => {
    try {
        const { username, password, email } = req.headers;
        const validateUsername = zusername.parse(username);
        const validatePassword = zpassword.parse(password);
        const validateEmail = zemail.parse(email);
        console.log({ username, password, email });

        if (
            validateUsername.error ||
            validatePassword.error ||
            validateEmail.error
        ) {
            console.log("Hi");
            return res.status(400).json("Missmatcgh");
        }
        console.log("kkjansdkjakjdnk");

        const user = await userServices.createUser({
            username,
            password,
            email,
        });

        console.log(user.userId);

        if (user) {
            const token = createToken(user.userId);
            return res
                .status(200)
                .json({ token: token, message: "User created succesfully!" });
        }
    } catch (error) {
        console.log("Hioiiiiiiiiiii");
        return res.status(400).send({
            error: error.message,
        });
    }
};
