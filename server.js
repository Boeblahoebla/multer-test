const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        console.log(req.body);
        console.log(file);
        callback(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage : storage }).array('userPhoto',2);

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo', (req, res) => {
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});