const User = require('../models/model.user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (_user) => new Promise(async (resolve, reject) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password
        } = _user;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            reject("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({
            email
        });

        if (oldUser) {
            reject("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

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
        resolve({accessToken: token})
    } catch (err) {
        reject(err)
    }
})