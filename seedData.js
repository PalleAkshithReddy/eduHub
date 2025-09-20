const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Course = require('./models/Course');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eduhub';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.log('MongoDB connection error:', err));

// Sample instructors
const instructors = [
  {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@eduhub.com',
    password: 'password123',
    role: 'instructor',
    bio: 'Full-stack developer with 10+ years of experience in web development and teaching.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Prof. Michael Chen',
    email: 'michael.chen@eduhub.com',
    password: 'password123',
    role: 'instructor',
    bio: 'Data science expert and machine learning researcher with PhD in Computer Science.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@eduhub.com',
    password: 'password123',
    role: 'instructor',
    bio: 'UI/UX designer and frontend specialist with expertise in modern design systems.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'David Kim',
    email: 'david.kim@eduhub.com',
    password: 'password123',
    role: 'instructor',
    bio: 'Business strategy consultant and entrepreneurship expert with MBA from Harvard.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

// Sample students
const students = [
  {
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    password: 'password123',
    role: 'student',
    bio: 'Aspiring web developer passionate about learning new technologies.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Jessica Martinez',
    email: 'jessica.martinez@email.com',
    password: 'password123',
    role: 'student',
    bio: 'Marketing professional looking to expand skills in digital marketing and analytics.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Ryan O\'Connor',
    email: 'ryan.oconnor@email.com',
    password: 'password123',
    role: 'student',
    bio: 'Recent computer science graduate eager to learn advanced programming concepts.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

// Sample courses
const courses = [
  {
    title: 'Complete Web Development Bootcamp',
    description: 'Master modern web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and land your dream job as a web developer.',
    shortDescription: 'Learn full-stack web development from scratch with hands-on projects and real-world applications.',
    category: 'programming',
    level: 'beginner',
    price: 99.99,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    tags: ['web development', 'javascript', 'react', 'nodejs', 'mongodb'],
    lessons: [
      {
        title: 'Introduction to Web Development',
        description: 'Learn the fundamentals of web development and set up your development environment.',
        videoUrl: 'https://example.com/video1',
        duration: 45,
        order: 1,
        isPreview: true
      },
      {
        title: 'HTML Fundamentals',
        description: 'Master HTML structure, semantic elements, and best practices.',
        videoUrl: 'https://example.com/video2',
        duration: 60,
        order: 2,
        isPreview: false
      },
      {
        title: 'CSS Styling and Layout',
        description: 'Learn CSS styling, flexbox, grid, and responsive design.',
        videoUrl: 'https://example.com/video3',
        duration: 75,
        order: 3,
        isPreview: false
      },
      {
        title: 'JavaScript Basics',
        description: 'Understand JavaScript fundamentals, variables, functions, and DOM manipulation.',
        videoUrl: 'https://example.com/video4',
        duration: 90,
        order: 4,
        isPreview: false
      },
      {
        title: 'React Introduction',
        description: 'Learn React components, state, props, and hooks.',
        videoUrl: 'https://example.com/video5',
        duration: 120,
        order: 5,
        isPreview: false
      }
    ],
    rating: { average: 4.8, count: 1247 }
  },
  {
    title: 'Data Science and Machine Learning',
    description: 'Comprehensive course covering Python, pandas, NumPy, scikit-learn, TensorFlow, and deep learning. Perfect for beginners and intermediate learners.',
    shortDescription: 'Master data science and machine learning with Python, from data analysis to deep learning models.',
    category: 'data-science',
    level: 'intermediate',
    price: 149.99,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['python', 'machine learning', 'data science', 'tensorflow', 'pandas'],
    lessons: [
      {
        title: 'Python for Data Science',
        description: 'Learn Python fundamentals specifically for data science applications.',
        videoUrl: 'https://example.com/video6',
        duration: 50,
        order: 1,
        isPreview: true
      },
      {
        title: 'Data Analysis with Pandas',
        description: 'Master data manipulation and analysis using pandas library.',
        videoUrl: 'https://example.com/video7',
        duration: 65,
        order: 2,
        isPreview: false
      },
      {
        title: 'Machine Learning Fundamentals',
        description: 'Understand supervised and unsupervised learning algorithms.',
        videoUrl: 'https://example.com/video8',
        duration: 80,
        order: 3,
        isPreview: false
      },
      {
        title: 'Deep Learning with TensorFlow',
        description: 'Build neural networks and deep learning models.',
        videoUrl: 'https://example.com/video9',
        duration: 100,
        order: 4,
        isPreview: false
      }
    ],
    rating: { average: 4.9, count: 892 }
  },
  {
    title: 'UI/UX Design Masterclass',
    description: 'Learn user interface and user experience design principles, tools, and techniques. Create beautiful, user-friendly designs that convert.',
    shortDescription: 'Master UI/UX design with Figma, Adobe XD, and design thinking principles.',
    category: 'design',
    level: 'beginner',
    price: 79.99,
    thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    tags: ['ui design', 'ux design', 'figma', 'adobe xd', 'user research'],
    lessons: [
      {
        title: 'Design Thinking Process',
        description: 'Learn the fundamentals of design thinking and user-centered design.',
        videoUrl: 'https://example.com/video10',
        duration: 40,
        order: 1,
        isPreview: true
      },
      {
        title: 'Figma Basics',
        description: 'Master Figma interface and essential design tools.',
        videoUrl: 'https://example.com/video11',
        duration: 55,
        order: 2,
        isPreview: false
      },
      {
        title: 'Typography and Color Theory',
        description: 'Learn effective typography and color combinations for UI design.',
        videoUrl: 'https://example.com/video12',
        duration: 45,
        order: 3,
        isPreview: false
      },
      {
        title: 'Prototyping and User Testing',
        description: 'Create interactive prototypes and conduct user testing sessions.',
        videoUrl: 'https://example.com/video13',
        duration: 70,
        order: 4,
        isPreview: false
      }
    ],
    rating: { average: 4.7, count: 634 }
  },
  {
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive digital marketing course covering SEO, social media, email marketing, PPC, and analytics. Grow your business online.',
    shortDescription: 'Master digital marketing strategies to grow your business and increase online presence.',
    category: 'marketing',
    level: 'intermediate',
    price: 89.99,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    tags: ['digital marketing', 'seo', 'social media', 'email marketing', 'analytics'],
    lessons: [
      {
        title: 'Digital Marketing Fundamentals',
        description: 'Understand the digital marketing landscape and key concepts.',
        videoUrl: 'https://example.com/video14',
        duration: 35,
        order: 1,
        isPreview: true
      },
      {
        title: 'SEO and Content Marketing',
        description: 'Learn search engine optimization and content strategy.',
        videoUrl: 'https://example.com/video15',
        duration: 60,
        order: 2,
        isPreview: false
      },
      {
        title: 'Social Media Marketing',
        description: 'Master social media platforms and advertising strategies.',
        videoUrl: 'https://example.com/video16',
        duration: 50,
        order: 3,
        isPreview: false
      },
      {
        title: 'Email Marketing and Automation',
        description: 'Build effective email campaigns and marketing automation.',
        videoUrl: 'https://example.com/video17',
        duration: 45,
        order: 4,
        isPreview: false
      }
    ],
    rating: { average: 4.6, count: 456 }
  },
  {
    title: 'Business Strategy and Entrepreneurship',
    description: 'Learn how to start, grow, and scale a successful business. Cover business models, funding, operations, and leadership.',
    shortDescription: 'Master business strategy, entrepreneurship, and leadership skills for startup success.',
    category: 'business',
    level: 'advanced',
    price: 199.99,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    tags: ['entrepreneurship', 'business strategy', 'leadership', 'funding', 'operations'],
    lessons: [
      {
        title: 'Business Model Canvas',
        description: 'Learn to design and validate your business model.',
        videoUrl: 'https://example.com/video18',
        duration: 40,
        order: 1,
        isPreview: true
      },
      {
        title: 'Market Research and Analysis',
        description: 'Conduct effective market research and competitive analysis.',
        videoUrl: 'https://example.com/video19',
        duration: 55,
        order: 2,
        isPreview: false
      },
      {
        title: 'Funding and Investment',
        description: 'Understand different funding options and investor relations.',
        videoUrl: 'https://example.com/video20',
        duration: 65,
        order: 3,
        isPreview: false
      },
      {
        title: 'Operations and Scaling',
        description: 'Build efficient operations and scale your business effectively.',
        videoUrl: 'https://example.com/video21',
        duration: 70,
        order: 4,
        isPreview: false
      }
    ],
    rating: { average: 4.9, count: 312 }
  },
  {
    title: 'Advanced React Development',
    description: 'Deep dive into advanced React concepts including hooks, context, performance optimization, testing, and state management.',
    shortDescription: 'Master advanced React concepts, performance optimization, and modern development practices.',
    category: 'programming',
    level: 'advanced',
    price: 129.99,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    tags: ['react', 'javascript', 'hooks', 'performance', 'testing'],
    lessons: [
      {
        title: 'Advanced Hooks and Context',
        description: 'Master custom hooks, context API, and advanced state management.',
        videoUrl: 'https://example.com/video22',
        duration: 60,
        order: 1,
        isPreview: true
      },
      {
        title: 'Performance Optimization',
        description: 'Learn React performance optimization techniques and best practices.',
        videoUrl: 'https://example.com/video23',
        duration: 75,
        order: 2,
        isPreview: false
      },
      {
        title: 'Testing with Jest and React Testing Library',
        description: 'Write comprehensive tests for React applications.',
        videoUrl: 'https://example.com/video24',
        duration: 80,
        order: 3,
        isPreview: false
      },
      {
        title: 'State Management with Redux',
        description: 'Implement Redux for complex state management in React apps.',
        videoUrl: 'https://example.com/video25',
        duration: 90,
        order: 4,
        isPreview: false
      }
    ],
    rating: { average: 4.8, count: 567 }
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('Cleared existing data');

    // Create instructors
    const createdInstructors = [];
    for (const instructorData of instructors) {
      const instructor = new User(instructorData);
      await instructor.save();
      createdInstructors.push(instructor);
      console.log(`Created instructor: ${instructor.name}`);
    }

    // Create students
    const createdStudents = [];
    for (const studentData of students) {
      const student = new User(studentData);
      await student.save();
      createdStudents.push(student);
      console.log(`Created student: ${student.name}`);
    }

    // Create courses
    for (let i = 0; i < courses.length; i++) {
      const courseData = {
        ...courses[i],
        instructor: createdInstructors[i % createdInstructors.length]._id,
        students: createdStudents.slice(0, Math.floor(Math.random() * 3) + 1).map(s => s._id),
        isPublished: true
      };

      const course = new Course(courseData);
      await course.save();

      // Add course to instructor's created courses
      await User.findByIdAndUpdate(courseData.instructor, {
        $push: { createdCourses: course._id }
      });

      // Add course to students' enrolled courses with random progress
      for (const studentId of courseData.students) {
        const progress = Math.floor(Math.random() * 100);
        const completedLessons = course.lessons.slice(0, Math.floor(progress / 20)).map(l => l._id);
        
        await User.findByIdAndUpdate(studentId, {
          $push: {
            enrolledCourses: {
              course: course._id,
              progress: progress,
              completedLessons: completedLessons
            }
          }
        });
      }

      console.log(`Created course: ${course.title}`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log(`Created ${createdInstructors.length} instructors`);
    console.log(`Created ${createdStudents.length} students`);
    console.log(`Created ${courses.length} courses`);
    console.log('\nYou can now login with:');
    console.log('Instructor: sarah.johnson@eduhub.com / password123');
    console.log('Student: alex.thompson@email.com / password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
