const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path:"./config.env"})
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true, useUnifiedTopology:true})
const video = require("./models/video.js")
app.set("view engine","ejs")
const path = require("path")
app.use(express.static((path.join(__dirname, "/public"))))

app.get("/",async(req,res)=>{
    let doc = await video.find({}).sort({_id:-1})
    res.render("index",{videos:doc})
})
app.post("/search",async(req,res)=>{
// we are searching for the video with the help of regex, so that if the user writes even half the title,
// we are able to retrieve the video from database
let doc = await video.find({title:{ $regex: req.body.search_query, $options: 'i' }})
if(doc[0] != undefined)
res.send({videos:doc[0]})
else
res.send("nothing")
})
app.post("/add-new-data",async(req,res)=>{
    let videos = req.body.videos
    
    let docc = await videos.find({videoId:videos[0].id.videoId})
    //if the id of the latest video(videos[0]) obtained in the array(req.body.videos)
    //is present in the database, we don't go into if-condition and directly move
    //on to else-condition
    if(docc[0] == undefined){
        videos.items.forEach(async(vid) => {
            let doc = await video.find({videoId:vid.id.videoId})
            if(doc[0] == undefined){
                const data = new video({
                    title:vid.snippet.title,
                    videoId:vid.id.videoId
                })
                await data.save()
                
            }
            
            
        });
        res.send("done")
    }
  else{
      res.send("nothing_changed")
  } 
})

app.listen(3000 || process.env.PORT,()=>{console.log("listening")})