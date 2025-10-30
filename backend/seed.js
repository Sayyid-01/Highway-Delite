const mongoose = require('mongoose');
const Experience = require('./models/Experience');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedData = [
  {
    title: "Paris Eiffel Tower",
    description: "Guided tour with skip-the-line access to the Eiffel Tower, including photo opportunities.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmTp_SIvo62A8K5y2M3ytWCUe7bCHJ2tmHeAufHSQ_UGLZkCTUqdEyfgijXNW19V_emc&usqp=CAU",
    price: 4200,
    slots: [
      { date: "2023-11-01", time: "07:00 am", available: true, slotsLeft: 5 },
      { date: "2023-11-01", time: "09:00 am", available: true, slotsLeft: 2 },
      { date: "2023-11-01", time: "11:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-01", time: "01:00 pm", available: true, slotsLeft: 3 },
      { date: "2023-11-03", time: "07:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-03", time: "09:00 am", available: true, slotsLeft: 1 },
      { date: "2023-11-03", time: "11:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-03", time: "01:00 pm", available: true, slotsLeft: 2 }
    ]
  },
  {
    title: "NYC Central Park",
    description: "A peaceful walk through Central Park exploring iconic landmarks, and lakes.",
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxp2VfFX8Lo8pfsMQOTxMUXFhG4KSwcCuyQ6ruJVK1ilP4EZB3rrKBJnpHC4H3-lVq6P0s25hFv0qmhpbnmKHn5Yg-p5hKa28UGppHcz4mTw6G9AhJBeC47DymY3kDOlCEAdNBx=w243-h174-n-k-no-nu",
    price: 2500,
    slots: [
      { date: "2023-11-02", time: "07:00 am", available: true, slotsLeft: 6 },
      { date: "2023-11-02", time: "09:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-02", time: "11:00 am", available: true, slotsLeft: 5 },
      { date: "2023-11-02", time: "01:00 pm", available: false, slotsLeft: 0 },
      { date: "2023-11-04", time: "07:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-04", time: "09:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-04", time: "11:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-04", time: "01:00 pm", available: true, slotsLeft: 2 }
    ]
  },
  {
    title: "Kayaking Adventure",
    description: "Guided kayaking with safety gear and scenic routes. Minimum age 10 years.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1661893427047-16f6ddc173f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2F5YWt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900",
    price: 3500,
    slots: [
      { date: "2023-11-05", time: "07:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-05", time: "09:00 am", available: true, slotsLeft: 2 },
      { date: "2023-11-05", time: "11:00 am", available: true, slotsLeft: 5 },
      { date: "2023-11-05", time: "01:00 pm", available: false, slotsLeft: 0 },
      { date: "2023-11-06", time: "07:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-06", time: "09:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-06", time: "11:00 am", available: true, slotsLeft: 6 },
      { date: "2023-11-06", time: "01:00 pm", available: true, slotsLeft: 4 }
    ]
  },
  {
    title: "Tokyo Street Food ",
    description: "Taste authentic Japanese street food and explore local markets with a culinary expert.",
    imageUrl: "https://media.istockphoto.com/id/1204359693/photo/cheerful-young-woman-eating-street-food-with-friends.webp?a=1&b=1&s=612x612&w=0&k=20&c=kN-4mO0PAmgBXkNzaSMCANj4-a4iD8RHjWmKwYNb07U=",
    price: 5600,
    slots: [
      { date: "2023-11-07", time: "07:00 am", available: true, slotsLeft: 5 },
      { date: "2023-11-07", time: "09:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-07", time: "11:00 am", available: true, slotsLeft: 2 },
      { date: "2023-11-07", time: "01:00 pm", available: true, slotsLeft: 4 },
      { date: "2023-11-08", time: "07:00 am", available: true, slotsLeft: 6 },
      { date: "2023-11-08", time: "09:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-08", time: "11:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-08", time: "01:00 pm", available: true, slotsLeft: 5 }
    ]
  },
  {
    title: "Safari Jeep Ride",
    description: "Wildlife safari through national park with expert ranger and safety briefing.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLbFgMrcPl3Yokxfmu22CRUMs0neTsjK6kgw&s",
    price: 6000,
    slots: [
      { date: "2023-11-09", time: "07:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-09", time: "09:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-09", time: "11:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-09", time: "01:00 pm", available: true, slotsLeft: 5 },
      { date: "2023-11-10", time: "07:00 am", available: true, slotsLeft: 2 },
      { date: "2023-11-10", time: "09:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-10", time: "11:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-10", time: "01:00 pm", available: true, slotsLeft: 3 }
    ]
  },
  {
    title: "Bali Surfing Lesson",
    description: "Professional surfing lessons at Kuta Beach with safety gear and certified instructor.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJgC7sRnEtXzw7UaVCgJr-eSpgrxnQhz34cg&s",
    price: 3800,
    slots: [
      { date: "2023-11-11", time: "07:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-11", time: "09:00 am", available: true, slotsLeft: 2 },
      { date: "2023-11-11", time: "11:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-11", time: "01:00 pm", available: true, slotsLeft: 3 },
      { date: "2023-11-12", time: "07:00 am", available: true, slotsLeft: 5 },
      { date: "2023-11-12", time: "09:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-12", time: "11:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-12", time: "01:00 pm", available: true, slotsLeft: 3 }
    ]
  },
  {
    title: "Venice Gondola Ride",
    description: "Traditional gondola ride through Venice canals with a local guide.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYilAsrD7Nj3hfAXTttY1oHTC2OrOdHzpmRg&s",
    price: 5200,
    slots: [
      { date: "2023-11-13", time: "07:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-13", time: "09:00 am", available: true, slotsLeft: 2 },
      { date: "2023-11-13", time: "11:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-13", time: "01:00 pm", available: true, slotsLeft: 4 },
      { date: "2023-11-14", time: "07:00 am", available: true, slotsLeft: 5 },
      { date: "2023-11-14", time: "09:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-14", time: "11:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-14", time: "01:00 pm", available: true, slotsLeft: 4 }
    ]
  },
  {
    title: "Dubai Desert Safari",
    description: "Experience dune bashing, camel rides, and traditional desert dinner under the stars.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtfzablMBZvmiuWKwJ6gI4119OpQ3nB0wbA&s",
    price: 7500,
    slots: [
      { date: "2023-11-15", time: "07:00 am", available: true, slotsLeft: 5 },
      { date: "2023-11-15", time: "09:00 am", available: true, slotsLeft: 2 },
      { date: "2023-11-15", time: "11:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-15", time: "01:00 pm", available: true, slotsLeft: 5 },
      { date: "2023-11-16", time: "07:00 am", available: true, slotsLeft: 6 },
      { date: "2023-11-16", time: "09:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-16", time: "11:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-16", time: "01:00 pm", available: true, slotsLeft: 3 }
    ]
  },
  {
    title: "Swiss Alps Hiking",
    description: "Scenic hiking experience in the Swiss Alps with an experienced mountain guide.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFwFVS-gtgZqV-zFZHvYbtgapT76Bmeyevg&s",
    price: 8900,
    slots: [
      { date: "2023-11-17", time: "07:00 am", available: true, slotsLeft: 5 },
      { date: "2023-11-17", time: "09:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-17", time: "11:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-17", time: "01:00 pm", available: true, slotsLeft: 2 },
      { date: "2023-11-18", time: "07:00 am", available: true, slotsLeft: 6 },
      { date: "2023-11-18", time: "09:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-18", time: "11:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-18", time: "01:00 pm", available: false, slotsLeft: 0 }
    ]
  },
  {
    title: "Santorini Sunset",
    description: "Luxury sunset cruise along Santorini’s coastline with onboard dinner and live music.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtOGVgK5DXm2PHmmGDz6VVoBu39iuB17-wbQ&s",
    price: 9700,
    slots: [
      { date: "2023-11-19", time: "07:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-19", time: "09:00 am", available: true, slotsLeft: 2 },
      { date: "2023-11-19", time: "11:00 am", available: false, slotsLeft: 0 },
      { date: "2023-11-19", time: "01:00 pm", available: true, slotsLeft: 5 },
      { date: "2023-11-20", time: "07:00 am", available: true, slotsLeft: 3 },
      { date: "2023-11-20", time: "09:00 am", available: true, slotsLeft: 4 },
      { date: "2023-11-20", time: "11:00 am", available: true, slotsLeft: 5 },
      { date: "2023-11-20", time: "01:00 pm", available: false, slotsLeft: 0 }
    ]
  }
];



const seed = async () => {
  await Experience.deleteMany({});
  await Experience.insertMany(seedData);
  console.log('Data seeded');
  process.exit();
};

seed();