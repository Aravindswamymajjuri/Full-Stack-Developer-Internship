# Root Level Setup

This is the root directory containing both frontend and backend of the MERN Authentication Application.

## 📂 Directory Overview

- **server/** - Express.js backend with MongoDB
- **client/** - React + Vite frontend

## 🚀 Getting Started

### Option 1: Quick Setup (Recommended)

**Terminal 1 - Backend:**
```bash
cd server
npm install
# Create .env file with MongoDB URI
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
# Create .env file with API URL
npm run dev
```

### Option 2: Step by Step

1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup instructions
2. Read [MERN_DEPLOYMENT_GUIDE.md](MERN_DEPLOYMENT_GUIDE.md) - Deployment instructions

## 📋 What's Included

✅ **Backend (Express.js)**
- JWT Authentication (Signup/Login)
- MongoDB integration with Mongoose
- Password hashing with bcrypt
- Protected routes with middleware
- CORS enabled
- RESTful API design

✅ **Frontend (React + Vite)**
- Responsive UI with CSS
- React Router for navigation
- Signup & Login pages
- Protected Dashboard
- JWT token management
- Axios for API calls

✅ **Security Features**
- Passwords hashed with bcrypt
- JWT tokens with expiration
- Protected routes
- CORS configuration
- Environment variables for secrets

✅ **Deployment Ready**
- Vercel configuration for frontend
- Render configuration for backend
- MongoDB Atlas integration
- Production environment setup

## 🔗 Links

- [Server README](server/README.md) - Backend setup
- [Client README](client/README.md) - Frontend setup
- [Setup Guide](SETUP_GUIDE.md) - Complete guide
- [Deployment Guide](MERN_DEPLOYMENT_GUIDE.md) - Production deployment

## 🎯 Next Steps

1. **Local Development**: Follow [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. **Test Locally**: Signup → Login → Dashboard
3. **Deploy**: Follow [MERN_DEPLOYMENT_GUIDE.md](MERN_DEPLOYMENT_GUIDE.md)

## 📞 Support

Check the README files in `server/` and `client/` for specific setup issues.

---

