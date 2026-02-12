// let courses = [
//   {
//     title: "Event Driven Cakes",
//     cost: 50,
//   },
//   {
//     title: "Asynchronous Artichoke",
//     cost: 25,
//   },
//   {
//     title: "Object Oriented Orange Juice",
//     cost: 10,
//   },
// ];

const Course = require("../models/course");
const httpStatus = require("http-status-codes");
const User = require("../models/user");

module.exports = {
  showCourses: async (req, res, next) => {
    let courses = await Course.find({});

    res.locals.courses = courses; // Always store in res.locals

    // If this is an API route, continue to respondJSON
    if (req.originalUrl.startsWith("/api")) {
      next();
    } else {
      // Otherwise render the view for regular web route
      res.render("courses/index", {
        courses: courses,
      });
    }
  },

  filterUserCourses: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedCourses = res.locals.courses.map((course) => {
        let userJoined = currentUser.courses.some((userCourse) => {
          return userCourse.equals(course._id);
        });
        return Object.assign(course.toObject(), { joined: userJoined });
      });
      res.locals.courses = mappedCourses;
      next();
    } else {
      next();
    }
  },

  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.StatusCodes.OK,
      data: res.locals
    });
  },

  errorJSON: (error, req, res, next) => {
    let errorObject;

    if (error) {
      errorObject = {
        status: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    }

    res.json(errorObject);
  },

  join: async (req, res, next) => {
    let courseId = req.params.id,
      currentUser = req.user;

    if (currentUser) {
      try {
        await User.findByIdAndUpdate(currentUser, {
          $addToSet: {
            courses: courseId,
          },
        });

        res.locals.success = true;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next(new Error("User must log in."));
    }
  },

  new: (req, res) => {
    res.render("courses/new");
  },

  create: async (req, res, next) => {
    try {
      let courseParams = {
        title: req.body.title,
        description: req.body.description,
        cost: req.body.cost,
        items: req.body.items,
        zipCode: req.body.zipCode,
      };

      const course = await Course.create(courseParams);
      res.locals.redirect = "/courses";
      res.locals.course = course;
      next();
    } catch (error) {
      console.log(`Error saving course: ${error.message}`);
      next(error);
    }
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: async (req, res, next) => {
    try {
      let courseId = req.params.id;
      const course = await Course.findById(courseId);
      res.locals.course = course;
      next();
    } catch (error) {
      console.log(`Error fetching course by ID: ${error.message}`);
      next(error);
    }
  },

  showView: (req, res) => {
    res.render("courses/show");
  },

  edit: async (req, res, next) => {
    let courseId = req.params.id;

    try {
      let course = await Course.findById(courseId);
      res.render("courses/edit", { course: course });
    } catch (error) {
      console.log(`Error fetching course by ID: ${error.message}`);
      next(error);
    }
  },

  update: async (req, res, next) => {
    let courseId = req.params.id;

    let courseParams = {
      title: req.body.title,
      description: req.body.description,
      cost: req.body.cost,
      items: req.body.items,
      zipCode: req.body.zipCode,
    };

    try {
      let course = await Course.findByIdAndUpdate(courseId, {
        $set: courseParams,
      });
      res.locals.redirect = `/courses/${courseId}`;
      res.locals.course = course;
      next();
    } catch (error) {
      console.log(`Error updating course by ID: ${error.message}`);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    let courseId = req.params.id;

    try {
      await Course.findByIdAndDelete(courseId);
      res.locals.redirect = "/courses";
      next();
    } catch (error) {
      console.log(`Error deleting course by ID: ${error.message}`);
      next(error);
    }
  },
};

// Code Summary

// This file exports a Course controller module for a Node.js/Express application using MongoDB (via Mongoose). It manages course-related routes for both web pages and API endpoints, including CRUD operations and course enrollment.

// It imports:

// Course model

// User model

// http-status-codes for standardized HTTP responses

// Core Responsibilities

// The controller handles:

// Listing courses (web + API)

// Filtering courses by user enrollment

// Joining courses

// Creating, updating, deleting courses

// Rendering views

// Returning JSON responses

// Error handling

// Function Breakdown
// 1. showCourses
// showCourses: async (req, res, next)


// Fetches all courses from the database.

// Stores them in res.locals.courses.

// If the route starts with /api, it calls next() to allow JSON handling.

// Otherwise, renders the courses/index view for regular web requests.

// Purpose:
// Supports both web page rendering and API responses using shared logic.

// 2. filterUserCourses
// filterUserCourses: (req, res, next)


// Checks if a logged-in user exists (res.locals.currentUser).

// Compares each course against the user's enrolled courses.

// Adds a joined: true/false property to each course object.

// Stores the updated course list back in res.locals.courses.

// Purpose:
// Allows the frontend to know which courses the user has already joined.

// 3. respondJSON
// respondJSON: (req, res)


// Sends a structured JSON response:

// {
//   status: 200,
//   data: res.locals
// }


// Purpose:
// Used for API endpoints.

// 4. errorJSON
// errorJSON: (error, req, res, next)


// Sends a standardized error response:

// Status 500

// Error message (or "Unknown Error")

// Purpose:
// Handles API error responses consistently.

// 5. join
// join: async (req, res, next)


// Gets the course ID from URL params.

// Checks if a user is logged in (req.user).

// Adds the course ID to the user's courses array using $addToSet (prevents duplicates).

// Sets res.locals.success = true.

// If no user is logged in → throws an error.

// Purpose:
// Allows a user to enroll in a course via API.

// CRUD Operations
// 6. new

// Renders the form to create a new course.

// 7. create

// Collects course data from req.body.

// Creates a new course in the database.

// Sets res.locals.redirect = "/courses".

// Stores the created course in res.locals.course.

// Purpose:
// Creates a new course.

// 8. redirectView

// Redirects to res.locals.redirect if set.

// Otherwise calls next().

// Purpose:
// Reusable redirect middleware.

// 9. show

// Fetches a course by ID.

// Stores it in res.locals.course.

// 10. showView

// Renders courses/show.

// 11. edit

// Fetches a course by ID.

// Renders courses/edit with course data.

// 12. update

// Updates a course using $set.

// Sets redirect to /courses/:id.

// Stores updated course in res.locals.course.

// 13. delete

// Deletes a course by ID.

// Redirects to /courses.

// Architectural Pattern

// This controller follows a middleware-based structure:

// Uses res.locals to pass data between middleware.

// Separates:

// Data retrieval

// Business logic

// View rendering

// JSON response handling

// Supports both:

// Server-rendered pages

// REST-style API endpoints

// Overall Functionality

// This controller powers a full course management system that:

// Displays courses

// Lets users join courses

// Tracks user enrollments

// Provides full CRUD functionality

// Supports both browser-based views and JSON API responses

// Uses middleware chaining for flexible route handling

// In short:
// It is a complete Express controller for managing courses and user enrollment in a full-stack web application.
