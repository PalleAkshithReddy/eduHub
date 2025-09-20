# EduHub - Online Learning Platform

A comprehensive online learning platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). EduHub allows instructors to create and manage courses while students can browse, enroll, and learn from various educational content.

## Features

### For Students
- **Browse Courses**: Search and filter courses by category, level, and keywords
- **Course Enrollment**: Enroll in courses and track learning progress
- **Progress Tracking**: Monitor completion status and learning progress
- **User Profile**: Manage personal information and preferences
- **Course Reviews**: Rate and review courses

### For Instructors
- **Course Creation**: Create comprehensive courses with multiple lessons
- **Content Management**: Add, edit, and organize course content
- **Student Management**: Track enrolled students and their progress
- **Course Analytics**: Monitor course performance and student engagement
- **Publishing Control**: Publish/unpublish courses as needed

### General Features
- **User Authentication**: Secure registration and login system
- **Role-based Access**: Different interfaces for students and instructors
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface using Material-UI
- **Real-time Updates**: Live progress tracking and course updates

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Express Validator**: Input validation

### Frontend
- **React.js**: Frontend library
- **Material-UI**: UI component library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Context API**: State management

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/eduhub
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   PORT=5000
   ```

3. **Start the server**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Full Stack Development

To run both backend and frontend simultaneously:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create new course (Instructor)
- `PUT /api/courses/:id` - Update course (Instructor)
- `DELETE /api/courses/:id` - Delete course (Instructor)
- `POST /api/courses/:id/enroll` - Enroll in course (Student)
- `POST /api/courses/:id/lessons` - Add lesson to course (Instructor)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/enrolled-courses` - Get enrolled courses
- `GET /api/users/created-courses` - Get created courses (Instructor)
- `POST /api/users/unenroll/:courseId` - Unenroll from course
- `POST /api/users/complete-lesson/:courseId/:lessonId` - Mark lesson as completed

## Database Schema

### User Model
- Personal information (name, email, bio, avatar)
- Role (student, instructor, admin)
- Enrolled courses with progress tracking
- Created courses (for instructors)

### Course Model
- Course details (title, description, category, level, price)
- Instructor reference
- Lessons array with video URLs and duration
- Student enrollment tracking
- Rating and review system

### Lesson Model (Embedded in Course)
- Lesson content (title, description, video URL)
- Duration and order
- Preview availability

## Usage Guide

### For Students

1. **Registration**: Create an account as a student
2. **Browse Courses**: Use the search and filter options to find relevant courses
3. **Enroll**: Click on a course to view details and enroll
4. **Learn**: Access course content and track your progress
5. **Profile**: Update your personal information and view learning statistics

### For Instructors

1. **Registration**: Create an account as an instructor
2. **Create Course**: Use the "Create Course" option to add a new course
3. **Add Content**: Add lessons with video content and descriptions
4. **Manage Students**: View enrolled students and their progress
5. **Publish**: Make your course available to students

## Project Structure

```
eduhub/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── App.js
│   └── package.json
├── models/                 # MongoDB models
├── routes/                 # API routes
├── middleware/             # Custom middleware
├── server.js              # Express server
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.

---

**EduHub** - Empowering education through technology
