const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// const Campground = require("../models/campground");

// ***** Express Routing Route for INDEX & CREATE *****
router
  .route("/")
  .get(catchAsync(campgrounds.indexCampground))
  // .post(
  //   isLoggedIn,
  //   validateCampground,
  //   catchAsync(campgrounds.createCampground)
  // );

  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("IT WORKED!");
  });

// ***** NEW *****
router.get("/new", isLoggedIn, campgrounds.newCampground);

// ***** SHOW, UPDATE, DELETE ***** 
router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// ***** EDIT *****
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.editCampground)
);

module.exports = router;
