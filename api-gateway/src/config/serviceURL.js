require('dotenv').config();


module.exports = {
    
    authServiceUrl: process.env.AUTH_SERVICE_URL,
    userServiceUrl: process.env.USER_SERVICE_URL,
    vehicleServiceUrl: process.env.VEHICLE_SERVICE_URL,
    tripServiceUrl: process.env.TRIP_SERVICE_URL,
    realtimeServiceUrl: process.env.REALTIMETRACKING_SERVICE_URL,
    maintenanceServiceUrl: process.env.MAINTENANCE_SERVICE_URL,
    notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL
}


