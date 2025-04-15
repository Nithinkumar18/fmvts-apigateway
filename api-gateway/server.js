const express = require('express');
const url = require('./src/config/serviceURL');
const app = express();
require('dotenv').config();
const logger = require('./src/loggers/logger');
const {createProxyMiddleware} = require('http-proxy-middleware');


const PORT = process.env.PORT;

app.use('/api/auth',createProxyMiddleware({target: url.authServiceUrl,changeOrigin:true}));
app.use('/api/users',createProxyMiddleware({target:url.userServiceUrl,changeOrigin:true}));
app.use('/api/vehicles',createProxyMiddleware({target:url.vehicleServiceUrl,changeOrigin:true}));
app.use('/api/trips',createProxyMiddleware({target:url.tripServiceUrl,changeOrigin:true}));
app.use('/api/realTimeTrack',createProxyMiddleware({target:url.realtimeServiceUrl,changeOrigin:true}));
app.use('/api/notifications',createProxyMiddleware({target:url.notificationServiceUrl,changeOrigin:true}));
app.use('/api/maitenance',createProxyMiddleware({target:url.notificationServiceUrl,changeOrigin:true}));

app.get('/',(req,res) => {
    res.send('🚀 API Gateway is running');
})

app.listen(PORT,() => {
    logger.info(`${process.env.SERVICE} 🗜  started on PORT ${PORT} `);
})