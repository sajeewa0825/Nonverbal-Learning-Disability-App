const jwt = require('jsonwebtoken');

const jwtManager = (user) =>{
    const accessToken = jwt.sign({
        _id:user._id,
        name:user.name,
    }, process.env.JWT_SECRET);

    return accessToken;
}

module.exports = jwtManager;