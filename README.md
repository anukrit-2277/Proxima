# Proxima - Where Developers Connect

A social networking platform for developers to connect, collaborate, and build amazing projects together. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Developer Feed**: Swipe through developer profiles with like/dislike functionality
- **Profile Management**: Complete profile editing with skills, photos, and bio
- **Connection System**: Send and receive connection requests
- **Smart Feed Algorithm**: Excludes already connected users
- **Responsive Design**: Modern UI with TailwindCSS and DaisyUI

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit
- React Router
- TailwindCSS
- DaisyUI
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
DB_LINK=mongodb://localhost:27017/proxima
SECRET_JWT=your-secret-jwt-key
PORT=1700
CORS_LINK=http://localhost:5173
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🎯 Usage

1. **Sign Up**: Create a new account with your developer profile
2. **Complete Profile**: Add your skills, photo, and bio
3. **Discover**: Swipe through other developers in the feed
4. **Connect**: Like profiles to send connection requests
5. **Manage**: View and respond to incoming requests
6. **Network**: See all your connections in one place

## 🔧 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /logout` - User logout

### User Management
- `GET /user/feed` - Get user feed with pagination
- `GET /user/connections` - Get user's connections
- `GET /user/requests/received` - Get pending requests
- `PUT /profile` - Update user profile

### Connection Requests
- `POST /request/send/:status/:toUserId` - Send like/dislike
- `POST /request/review/:status/:requestId` - Accept/reject requests

## 🎨 UI Components

- **Landing Page**: Beautiful landing page for non-authenticated users
- **Feed**: Swipeable cards with developer profiles
- **Profile**: Complete profile management with editing
- **Connections**: Grid view of all connections
- **Requests**: List of pending connection requests
- **Navigation**: Responsive navbar with user menu

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation
- CORS protection
- Secure cookie handling

## 🚀 Getting Started

1. Clone the repository
2. Set up MongoDB locally or use MongoDB Atlas
3. Configure environment variables
4. Start both backend and frontend servers
5. Open http://localhost:5173 in your browser
6. Sign up and start connecting with developers!

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop
- Tablet
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Happy Coding! 🚀**
