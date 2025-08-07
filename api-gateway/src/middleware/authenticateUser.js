
const jwt = require('jsonwebtoken');
const info = require('../constants/statusInfo');
const httpConstants = require('../constants/httpConstants');
require('dotenv').config();
const logger = require('../loggers/logger');

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
        logger.error(`SERVICE: ${info.SERVICE_NAME} | ERR-MESSAGE:${info.TOKEN_EXPIRED}`,err);
        console.log(httpConstants.INTERNAL_SERVER_ERROR);
       return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({message:info.TOKEN_EXPIRED});
    }
}

module.exports = {
    validateToken
}