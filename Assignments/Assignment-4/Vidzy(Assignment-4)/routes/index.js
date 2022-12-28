var express = require("express");
var router = express.Router();

var monk = require("monk");

var db = monk("localhost:27017/vidzy");
var collection = db.get("videos");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/videos");
});

router.get("/videos", function (req, res) {
  //initial page with all videos
  if((!req.query.genre && !req.query.title) || (req.query.genre == "all" && req.query.title=="")) {
    collection.find({}, function (err, videos) {
      if (err) throw err;
      res.render("index", { results: videos });
    });
  }

  // filter based on genre
  if (req.query.genre && !req.query.title) {
    var genre = new RegExp([req.query.genre].join(""), "i");
    collection.find({ genre: genre }, function (err, videos) {
      if (err) throw err;
      res.render("index", { results: videos });
    });
  }

  // filter based on genre and title
  if (req.query.genre && req.query.title) {
    var genre = new RegExp([req.query.genre].join(""), "i");
    var title = new RegExp([req.query.title].join(""), "i");
    collection.find({ title: title, genre: genre }, function (err, videos) {
      if (err) throw err;
      res.render("index", { results: videos });
    });
  }

  // filter based on title
  if (req.query.title) {
    var title = new RegExp([req.query.title].join(""), "i");
    collection.find({ title: title }, function (err, videos) {
      if (err) throw err;
      res.render("index", { results: videos });
    });
  }

});


//add new video
router.get("/videos/new", function (req, res, next) {
  res.render("new");
});

//post new video to mongodb
router.post('/videos', function(req, res) {
  collection.insert({

    title: req.body.title,
    genre: req.body.genre,
    image: req.body.image,
    description: req.body.desc

  }, function(err, video){

    if (err) throw err;
    // if update is successful, return updated video object as a response
    // res.json(video);
    res.redirect("/videos");
  });
});

// //show video
router.get("/videos/:id", function (req, res) {
  collection.findOne({ _id: req.params.id }, function (err, video) {
    if (err) throw err;
    res.render("show", { video: video });
  });
});

//edit video
router.get("/videos/:id/edit", function (req, res) {
  collection.findOne({ _id: req.params.id }, function (err, video) {
    if (err) throw err;
    res.render("edit", { video: video });
  });
});

//update an existing video
router.put('/videos/:id', function(req, res) {
  collection.update({_id: req.params.id},
    { $set :
      {
        title: req.body.title,
        genre: req.body.genre,
        image: req.body.image,
        description: req.body.desc

      }}, function(err, video){

        if (err) throw err;
    // if update is successful, return updated video object as a response
    // res.json(video);
    res.redirect("/videos");
  });
});

//delete an existing video
router.delete('/videos/:id', function(req, res) {
  collection.remove({_id: req.params.id},function(err, video){

    if (err) throw err;
    // if update is successful, return updated video object as a response
    // res.json(video);
    res.redirect("/videos");
  });
});

module.exports = router;
