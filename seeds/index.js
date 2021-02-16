const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 50; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '602562d6cd018c83dae8ec0a',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consequuntur voluptatibus ratione eligendi officia, explicabo voluptate, aut accusamus nam atque, quos expedita sunt impedit iusto nulla dolorem quod ex sed?",
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/cyclone/image/upload/v1613488460/Yelpcamp/ncvh3csnmhvialkw9ovx.png',
          filename: 'Yelpcamp/ncvh3csnmhvialkw9ovx'
        },
        {
          url: 'https://res.cloudinary.com/cyclone/image/upload/v1613488464/Yelpcamp/rak74fmd8lwcztxzewwp.png',
          filename: 'Yelpcamp/rak74fmd8lwcztxzewwp'
        },
        {
          url: 'https://res.cloudinary.com/cyclone/image/upload/v1613488461/Yelpcamp/mpguhp4imlm4odf2q4dr.png',
          filename: 'Yelpcamp/mpguhp4imlm4odf2q4dr'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})