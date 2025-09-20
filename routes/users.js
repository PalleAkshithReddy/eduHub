const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Course = require('../models/Course');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses.course', 'title thumbnail instructor')
      .populate('createdCourses', 'title thumbnail students')
      .select('-password');

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  auth,
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const allowedUpdates = ['name', 'bio', 'avatar'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/enrolled-courses
// @desc    Get user's enrolled courses
// @access  Private
router.get('/enrolled-courses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'enrolledCourses.course',
        populate: {
          path: 'instructor',
          select: 'name email avatar'
        }
      })
      .select('enrolledCourses');

    res.json(user.enrolledCourses);
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/created-courses
// @desc    Get instructor's created courses
// @access  Private (Instructor/Admin)
router.get('/created-courses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('createdCourses')
      .select('createdCourses');

    res.json(user.createdCourses);
  } catch (error) {
    console.error('Get created courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/unenroll/:courseId
// @desc    Unenroll from course
// @access  Private
router.post('/unenroll/:courseId', auth, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    
    // Remove from user's enrolled courses
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { enrolledCourses: { course: courseId } }
    });

    // Remove user from course's students
    await Course.findByIdAndUpdate(courseId, {
      $pull: { students: req.user.id }
    });

    res.json({ message: 'Successfully unenrolled from course' });
  } catch (error) {
    console.error('Unenroll error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/complete-lesson/:courseId/:lessonId
// @desc    Mark lesson as completed
// @access  Private
router.post('/complete-lesson/:courseId/:lessonId', auth, async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    
    const user = await User.findById(req.user.id);
    const enrollment = user.enrolledCourses.find(
      e => e.course.toString() === courseId
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled in this course' });
    }

    // Check if lesson already completed
    if (enrollment.completedLessons.includes(lessonId)) {
      return res.status(400).json({ message: 'Lesson already completed' });
    }

    // Add lesson to completed lessons
    enrollment.completedLessons.push(lessonId);
    
    // Calculate progress
    const course = await Course.findById(courseId);
    enrollment.progress = Math.round(
      (enrollment.completedLessons.length / course.lessons.length) * 100
    );

    await user.save();

    res.json({ 
      message: 'Lesson marked as completed',
      progress: enrollment.progress
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
