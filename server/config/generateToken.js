const jwt = require('jsonwebtoken');

const generateToken = async ({name,email,id, contactNumber}) => {
    return jwt.sign( 
        {name, email, id, contactNumber},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

module.exports = generateToken;