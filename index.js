const express = require('express');

const port = 8787;

const app = express();

// const db = require("./config/mongoose");

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mansigohil2003:manc123@cluster0.zsavxm6.mongodb.net/manc", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err))

app.use(express.urlencoded());

const stu = require('./models/Student');

const path = require('path');

const fs = require('fs');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use("/uploads",express.static(path.join(__dirname,'uploads')));


app.post('/addstudentdetalis', stu.uploadImage, async function(req,res){
    // console.log(req.file);
    // console.log(req.body);
    var imagepath ="";
    if(req.file){
        imagepath = stu.imageModelPath + "/" + req.file.filename;
    }
        req.body.adminImage = imagepath;
        await stu.create (req.body);
        return res.redirect('back');
    // let data  = stu.create(req.body);
    // if(data){
    //     console.log("Record is inserted");
    //     return res.redirect('back');
    // }
    // else{
    //     console.log("Something wrong!");
    //     return res.redirect('back');
    // }
});

app.get("/view_detalis",async function(req,res){
    let data = await stu.find({});
    return res.render('view_detalis',{
        stData : data
    });
});


// deleterecord

app.get("/deleterecord/:id" ,async function(req,res){
    console.log(req.params.id);
    let OldData = await stu.findById(req.params.id);
    if(OldData.adminImage){
        let fullPath = path.join(__dirname,OldData.adminImage);
        await fs.unlinkSync(fullPath);
    }
    await stu.findByIdAndDelete(req.params.id);
    return res.redirect('back');
});

// updaterecord

app.get("/updaterecord/:id" , async function(req,res){
    console.log(req.params.id);
    let record = await stu.findById(req.params.id);
    return res.render('update',{
        Oldst : record
    })
});

// changeupdate

app.post("/editstudentdetalis" , async function(req,res){
    // console.log(req.body);
    await stu.findByIdAndUpdate(req.body.EditId,req.body);
    return res.redirect('/view_detalis');
})

app.get("/",function(req,res){
    return res.render('add_detalis');                     
});

app.listen(port,(err)=>{
    if(err){
        console.log('something wait!');
        return false;
    }
    console.log('server is runing on port:',port);
});

