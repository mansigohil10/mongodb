const mongoose = require('mongoose');

const multer = require('multer');

const Imagepath = "/uploads";

const path = require('path');

const StudentSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type: String,
        required : true
    },
    hobby : {
        type: Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    adminImage : {
        type : String,
        required : true
    }
}); 

const imgstorage  = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",Imagepath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now());
    }
});

StudentSchema.statics.imageModelPath = Imagepath;
                                                     
StudentSchema.statics.uploadImage = multer({storage : imgstorage}).single("adminImage");
 
const student = mongoose.model('student',StudentSchema);

module.exports = student;