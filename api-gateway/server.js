const express = require('express');
const url = require('./src/config/serviceURL');
const app = express();
require('dotenv').config();
const logger = require('./src/loggers/logger'); 
const {createProxyMiddleware} = require('http-proxy-middleware');
const {validateToken} = require('./src/middleware/authenticateUser');
const authorizeRole = require('./src/middleware/authorizeUser');


const PORT = process.env.PORT;

app.use('/api/auth-ms',createProxyMiddleware({target: url.authServiceUrl,changeOrigin:true}));
app.use('/api/users-ms',createProxyMiddleware({target:url.userServiceUrl,changeOrigin:true}));
app.use('/api/vehicles-ms',validateToken,createProxyMiddleware({target:url.vehicleServiceUrl,changeOrigin:true}));
app.use('/api/trips-ms',validateToken,createProxyMiddleware({target:url.tripServiceUrl,changeOrigin:true}));
app.use('/api/realTimeTrack-ms',validateToken,createProxyMiddleware({target:url.realtimeServiceUrl,changeOrigin:true}));
app.use('/api/notifications-ms',validateToken,createProxyMiddleware({target:url.notificationServiceUrl,changeOrigin:true}));
app.use('/api/maintenance-ms',validateToken,createProxyMiddleware({target:url.notificationServiceUrl,changeOrigin:true}));

app.get('/',(req,res) => {
    res.send('🚀 API Gateway is running');
})

app.listen(PORT,() => {
    logger.info(`${process.env.SERVICE} 🗜  started on PORT ${PORT} `);
})