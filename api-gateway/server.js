const express = require('express');
const app = express();
require('dotenv').config();
const logger = require('./src/loggers/logger');


const PORT = process.env.PORT;

app.listen(PORT,() => {
    logger.info(`${process.env.SERVICE} 🗜  started on PORT ${PORT} `);
})