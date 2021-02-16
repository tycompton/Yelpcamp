const Campground = require("../models/campground");

// ***** INDEX *****
module.exports.indexCampground = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

// ***** NEW *****
module.exports.newCampground = (req, res) => {
  res.render("campgrounds/new");
};

// ***** CREATE *****
module.exports.createCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.author = req.user._id;
  await campground.save();
  console.log(campground);
  req.flash('success', "Successfully created campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

// ***** SHOW *****
module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Campground not found!");
    return res.redirect(`/campgrounds`);
  }
  res.render("campgrounds/show", { campground });
};

// ***** EDIT *****
module.exports.editCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash("error", "Campground not found!");
    return res.redirect(`/campgrounds`);
  }
 
  res.render("campgrounds/edit", { campground });
};

// ***** UPDATE *****
module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash('success', 'Successfully updated campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};

// ***** DELETE *****
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted campground!');
  res.redirect("/campgrounds");
};