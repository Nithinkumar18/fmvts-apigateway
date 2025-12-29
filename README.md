

 # 🚀 FMVTS API Gateway

The **FMVTS API Gateway** acts as the **single entry point** for all client requests in the **Fleet Management and Vehicle Tracking System (FMVTS)**.  
It is responsible for **request routing, authentication, authorization enforcement, and secure communication** between clients and backend microservices.

This gateway ensures that only **authenticated and authorized users** can access protected services, while abstracting internal service endpoints from clients.

---

## 📌 Key Responsibilities

- Acts as a centralized gateway for all microservices
- Routes incoming requests to the appropriate backend service
- Validates user identity using **JWT authentication**
- Enforces **role-based access control (RBAC)**
- Injects the authenticated user’s role into request headers
- Prevents unauthorized access to protected services
- Provides centralized logging for request flow

---

## 🏗️ Architecture Role


The API Gateway communicates with backend services using **HTTP proxy middleware**, ensuring loose coupling and scalability.

---

## 🔐 Authentication & Authorization Flow

1. Client sends request to API Gateway
2. Gateway validates the **JWT token**
3. If token is valid:
   - Extracts user role from JWT
   - Injects role into request headers (`x-user-role`)
   - Proxies the request to the target microservice
4. If token is invalid or missing:
   - Request is rejected with an authorization error

---

## 🔄 Request Routing

The API Gateway routes requests based on URL prefixes:

| Route Prefix | Target Microservice |
|--------------|--------------------|
| `/api/auth-ms` | Auth Microservice |
| `/api/users-ms` | User Microservice |
| `/api/vehicles-ms` | Vehicle Microservice |
| `/api/trips-ms` | Trip Microservice |
| `/api/maintenance-ms` | Maintenance Microservice |
| `/api/notifications-ms` | Notification Microservice |

---

## 🧠 Role Propagation

For protected routes, the gateway:
- Extracts the user role from the JWT token
- Adds it to request headers:
- Downstream services use this header to enforce RBAC rules

---

## 🛠️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – HTTP server and middleware handling
- **http-proxy-middleware** – Request forwarding to backend services
- **JWT** – Authentication and identity validation
- **Winston** – Centralized logging
- **dotenv** – Environment configuration management

---

## ⚙️ Environment Configuration

The API Gateway uses environment variables to configure service endpoints and ports.


## Initialize And Start API-Gateway

📦 Install Dependencies
    
    npm install

🔄 Start Application

  npm run start



