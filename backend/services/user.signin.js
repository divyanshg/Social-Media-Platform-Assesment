const User = require('../models/model.user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (credentials) => new Promise(async (resolve, reject) => {
    try {
        const {
            email,
            password
        } = credentials;

        // Validate user input
        if (!(email && password)) {
            reject("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({
            email
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({
                    user_id: user._id,
                    email
                },
                process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            );

            // return token
            resolve({accessToken: token});
        }
        reject("Invalid Credentials");
    } catch (err) {
        reject(err);
    }
})