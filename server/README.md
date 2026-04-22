# MERN Auth Backend

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` with your values:
- **MONGO_URI**: Your MongoDB Atlas connection string
- **JWT_SECRET**: A strong random secret key
- **FRONTEND_URL**: Your React app URL

### 3. Get MongoDB URI
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create a database user
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/mern_auth?retryWrites=true&w=majority`

### 4. Run Server
**Development (with auto-reload)**:
```bash
npm run dev
```

**Production**:
```bash
npm start
```

### 5. Test Endpoints
Use Postman or curl:

**Signup**:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456","confirmPassword":"123456"}'
```

**Login**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'
```

**Get Profile** (requires token):
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## API Endpoints

### Authentication
- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/login` - Login user

### User (Protected)
- **GET** `/api/user/profile` - Get user profile
- **PUT** `/api/user/profile` - Update user profile

## Deployment on Render

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Create Web Service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT=5000`
   - `FRONTEND_URL=https://your-frontend.vercel.app`
   - `NODE_ENV=production`
5. Deploy

Visit `https://your-backend.onrender.com/api/health` to verify deployment.
