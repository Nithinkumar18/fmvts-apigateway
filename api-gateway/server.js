const express = require('express');
const url = require('./src/config/serviceURL');
const app = express();
require('dotenv').config();
const logger = require('./src/loggers/logger');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { validateToken } = require('./src/middleware/authenticateUser');



const PORT = process.env.PORT;

app.use('/api/auth-ms', (req,res,next) => {
    logger.http(`REQUEST sent to service - ${process.env.AS} 🔑  running on port ${process.env.ASPORT} `);
    next()
}, createProxyMiddleware({ target: url.authServiceUrl, changeOrigin: true }));
app.use('/api/users-ms', (req,res,next) => {
    logger.http(`REQUEST sent to service - ${process.env.US} 👤  running on port ${process.env.USPORT} `);
    next();
}, createProxyMiddleware({ target: url.userServiceUrl, changeOrigin: true }));
app.use('/api/vehicles-ms', validateToken, (req, res, next) => {
    if (req.role) {
        req.headers['x-user-role'] = req.role;
    }
    logger.http(`REQUEST sent to service - ${process.env.VS} 🚛  running on port ${process.env.VSPORT} `);
    next();
}, createProxyMiddleware({ target: url.vehicleServiceUrl, changeOrigin: true }));
app.use('/api/trips-ms', validateToken, (req, res, next) => {
    if (req.role) {
        req.headers['x-user-role'] = req.role;
    }
    logger.http(`REQUEST sent to service - ${process.env.TS} 🌎🔄🚚 running on port ${process.env.TSPORT}`);
    next();
}, createProxyMiddleware({ target: url.tripServiceUrl, changeOrigin: true }));
app.use('/api/realTimeTrack-ms', validateToken, (req, res, next) => {
    if (req.role) {
        req.headers['x-user-role'] = req.role;
    }
    logger.http(`REQUEST sent to service - ${process.env.RTS} running on port ${process.env.RTSPORT}`);
    next();
}, createProxyMiddleware({ target: url.realtimeServiceUrl, changeOrigin: true }));
app.use('/api/notifications-ms', validateToken, (req, res, next) => {
    if (req.role) {
        req.headers['x-user-role'] = req.role;
    }
    logger.http(`REQUEST sent to service - ${process.env.NS} running on port ${process.env.NSPORT}`);
    next();
}, createProxyMiddleware({ target: url.notificationServiceUrl, changeOrigin: true }));
app.use('/api/maintenance-ms', validateToken, (req, res, next) => {
    if (req.role) {
        req.headers['x-user-role'] = req.role;
    }
    logger.http(`REQUEST sent to service - ${process.env.MS} running on port ${process.env.MSPORT}`);
    next();
}, createProxyMiddleware({ target: url.maintenanceServiceUrl, changeOrigin: true }));

app.get('/', (req, res) => {
    res.send('🚀 API Gateway is running');
})

app.listen(PORT, () => {
    logger.info(`${process.env.SERVICE} 🗜  started on PORT ${PORT} `);
})