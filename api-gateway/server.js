const express = require('express');
const url = require('./src/config/serviceURL');
const app = express();
require('dotenv').config();
const logger = require('./src/loggers/logger');
const {createProxyMiddleware} = require('http-proxy-middleware');
const authenticateUser = require('./src/middleware/authenticateUser');
const authorizeRole = require('./src/middleware/authorizeUser');


const PORT = process.env.PORT;

app.use('/api/auth',createProxyMiddleware({target: url.authServiceUrl,changeOrigin:true}));
app.use('/api/users',authenticateUser,createProxyMiddleware({target:url.userServiceUrl,changeOrigin:true}));
app.use('/api/vehicles',authenticateUser,createProxyMiddleware({target:url.vehicleServiceUrl,changeOrigin:true}));
app.use('/api/trips',authenticateUser,createProxyMiddleware({target:url.tripServiceUrl,changeOrigin:true}));
app.use('/api/realTimeTrack',authenticateUser,createProxyMiddleware({target:url.realtimeServiceUrl,changeOrigin:true}));
app.use('/api/notifications',authenticateUser,createProxyMiddleware({target:url.notificationServiceUrl,changeOrigin:true}));
app.use('/api/maintenance',authenticateUser,createProxyMiddleware({target:url.notificationServiceUrl,changeOrigin:true}));

app.get('/',(req,res) => {
    res.send('🚀 API Gateway is running');
})

app.listen(PORT,() => {
    logger.info(`${process.env.SERVICE} 🗜  started on PORT ${PORT} `);
})