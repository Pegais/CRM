var jwt = require('jsonwebtoken');
const createAccessJwt = (payload) => {
    
    var accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_TOKEN,{expiresIn:'15m'});
    return Promise.resolve(accessToken)
}

const createRefreshJwt = (payload) => {
    
    var refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_TOKEN,{expiresIn:'30d'});
    return Promise.resolve(refreshToken)
}


module.exports = {
    createAccessJwt,
    createRefreshJwt,
}

