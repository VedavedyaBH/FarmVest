const { createToken } = require("../util/jwtAuth");
const { zusername, zpassword, zemail } = require("../util/zodValidation");
const userServices = require("../services/userServices");

exports.userSignup = async (req, res) => {
    try {
        const { username, password, email } = req.headers;
        const validateUsername = zusername.parse(username);
        const validatePassword = zpassword.parse(password);
        const validateEmail = zemail.parse(email);

        if (
            validateUsername.error ||
            validatePassword.error ||
            validateEmail.error
        ) {
            return res.status(400).json({ error: error.message });
        }

        const user = await userServices.createUser({
            username,
            password,
            email,
        });

        if (user) {
            const token = createToken(user.userId);
            return res
                .status(200)
                .json({ token: token, message: "User created succesfully!" });
        }
    } catch (error) {
        return res.status(400).send({
            error: error.message,
        });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validateEmail = zemail.parse(email);
        const validatePassword = zpassword.parse(password);

        if (validatePassword.error || validateEmail.error) {
            return res.status(400).json({ error: error.message });
        }

        const user = await userServices.loginUser({
            password,
            email,
        });

        if (!user) {
            res.status(403).json({
                message: "Could not login",
            });
        }
        const token = createToken(user.userId);
        res.status(200).json({
            token,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
