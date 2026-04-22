# MERN Auth Frontend

## Setup Instructions

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Configure Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` with your API URL:
```
VITE_API_URL=http://localhost:5000
```

### 3. Run Development Server
```bash
npm run dev
```

Server will start at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

This creates optimized files in the `dist/` folder.

## File Structure

```
client/
├── src/
│   ├── pages/           # Page components (Signup, Login, Dashboard)
│   ├── components/      # Reusable components (ProtectedRoute)
│   ├── services/        # API service (api.js with axios)
│   ├── styles/          # CSS files
│   ├── App.jsx          # Main app component with routing
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── vercel.json          # Vercel routing configuration
└── package.json         # Dependencies
```

## Authentication Flow

1. **Signup**: User registers with name, email, password
   - Password is hashed on backend
   - JWT token is returned
   - Token is saved to localStorage

2. **Login**: User logs in with email and password
   - Backend verifies credentials
   - JWT token is returned
   - Token is saved to localStorage

3. **Protected Route**: Only authenticated users can access dashboard
   - ProtectedRoute checks for token in localStorage
   - If no token, redirects to login
   - If token exists, allows access

4. **API Requests**: Token is automatically added to all requests
   - Axios interceptor adds Authorization header
   - If 401 error, token is cleared and user is redirected to login

## Deployment on Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

The `vercel.json` file handles routing for React Router single-page application.

## Testing

### Test Signup
1. Go to http://localhost:5173/signup
2. Fill in name, email, password
3. Click "Sign Up"
4. Should redirect to dashboard

### Test Login
1. Go to http://localhost:5173/login
2. Enter email and password from signup
3. Click "Login"
4. Should redirect to dashboard

### Test Protected Route
1. Go to http://localhost:5173/dashboard without token
2. Should redirect to login page

### Test Logout
1. On dashboard page, click "Logout"
2. Token should be cleared
3. Should redirect to login page
