const express = require("express") ; 
const app = express() ;
const mongoose = require('mongoose');
const Listing = require("./models/listing.js") ;
const path = require("path") ;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate") ;



main().then(() => {
  console.log("I am connecting with database .")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine" , "ejs") ;
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")) ;
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname ,"/public")))
app.use(express.static("public"));


// index route

app.get("/listings" , async(req ,res) => {
  const allStrings = await Listing.find({});
  res.render("index.ejs" ,{allStrings});
  
})

// new route

app.get("/listings/new" ,(req ,res) => {
  res.render("new.ejs") ;
})

//create route
app.post("/listings" ,async(req ,res) => {
  let newListing = new Listing(req.body.listing) ;
  console.log(newListing)
  await newListing.save();
  res.redirect("/listings" );
})

//edit route

app.get("/listings/:id/edit" , async(req ,res) => {
  const {id} = req.params ;
  let lists = await Listing.findById(id)
  res.render("edit.ejs" ,{lists})

})

// update Msg route

app.put("/listings/:id" , async(req , res) => {
  const {id} = req.params ;
  await Listing.findByIdAndUpdate(id , {...req.body.listing})
  res.redirect(`/listings/${id}`) ;
})

// delete route

app.delete("/listings/:id" ,async (req ,res) => {
  let {id} = req.params ;
  await  Listing.findByIdAndDelete(id ,{...req.body.listing}) ;
  res.redirect("/listings") ;
})


// particular route

app.get("/listings/:id" , async(req ,res) => {
  let {id} = req.params ;
  const lists = await Listing.findById(id);
  res.render("show.ejs" , {lists}) ;
  
})





// app.get("/testListing" ,async (req , res) => {
//   let sampleListing = new Listing({
//     title : "My New Villa" ,
//     description : "By the beach" ,
//     // image : "https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     price : 7000 , 
//     location : "Mumbai" ,
//     country : "India" ,
//   })
//   await sampleListing.save().then((res) => {
//     console.log(res) ;
//   }).catch(err => console.log(err)) ;
//   res.send("Connection Succesfully .") ;
// })

app.listen(3000 , (req , res) => {
  console.log("I am listening .")
})

app.get("/" , (req ,res) => {
  res.send("Hi , I am Root .")
})