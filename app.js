const express = require("express") ; 
const app = express() ;
const mongoose = require('mongoose');
const Listing = require("./models/listing.js") ;


main().then(() => {
  console.log("I am connecting with database .")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


app.get("/testListing" ,async (req , res) => {
  let sampleListing = new Listing({
    title : "My New Villa" ,
    description : "By the beach" ,
    // image : "https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price : 7000 , 
    location : "Mumbai" ,
    country : "India" ,
  })
  await sampleListing.save().then((res) => {
    console.log(res) ;
  }).catch(err => console.log(err)) ;
  res.send("Connection Succesfully .")

})

app.listen(3000 , (req , res) => {
  console.log("I am listening .")
})

app.get("/" , (req ,res) => {
  res.send("Hi , I am Root .")
})