
const jwt = require('jsonwebtoken');
const info = require('../constants/statusInfo');
const httpConstants = require('../constants/statusInfo');
require('dotenv').config();
const logger = require('../logger/logger');

const validateToken = async(req,res,next) => {
    try{
         const _bToken = req.headers.authorization;
         if(!_bToken || !_bToken.startsWith('Bearer')){
            logger.info(`SERVICE: ${info.SERVICE_NAME} | MESSAGE:${info.TOKEN_UNDEFINED}`);
            return res.status(httpConstants.BAD_REQUEST).json({message:info.TOKEN_UNDEFINED});
         }
         const token = _bToken.split(' ')[1];
         const _verfiedToken = jwt.verify(token,process.env.SECRET);
         req.role = _verfiedToken.role;
         next();
    }
    catch(err){
        logger.info(`SERVICE: ${info.SERVICE_NAME} | ERR-MESSAGE:${info.TOKEN_EXPIRED}`,err);
       return res.status(httpConstants.UNAUTHORIZED).json({message:info.TOKEN_EXPIRED});
    }
}

module.exports = {
    validateToken
}