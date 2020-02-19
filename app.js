var express = require("express");
var app = express();
var https = require("https");
var fs = require("fs");
var os = require("os");
var path = require("path");
var formidable = require("formidable");
var util = require("util");
var bodyParser = require("body-parser");
app.use(bodyParser());
var port = 8888;

var file_num = 1;

var interfaces = os.networkInterfaces();
for(let k in interfaces){
    for(let k2 in interfaces[k]){
        var address = interfaces[k][k2];
        if(address.family === "IPv4" && !address.internal){
            var host = address.address;
        }
    }
}

app.use("/lib", express.static(__dirname+"/lib"));
//app.use(express.static(__dirname+"/public"));
app.use("/html", express.static(__dirname+"/html"))

// 証明書の設定
var options = {
    key:  fs.readFileSync(__dirname+"/certificate/server.key"),
    cert: fs.readFileSync(__dirname+"/certificate/server.crt")
};
var server = https.createServer(options, app);


app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/post", function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = "./images";
    form.parse(req, function(err, fields, files){
        var oldPath = files.file._writeStream.path;
        // newPath のfiles.file.nameを変更すれば任意のファイル名に変更可能
        var newPath = "./images/"+files.file.name;
        fs.rename(oldPath, newPath, function(err){
            if (err) throw err;
        });
        newPath = path.resolve(newPath);
        //console.log(newPath);

        let {PythonShell} = require("python-shell");
        let python_options = {
            pythonPath: "C:/Users/FusionProj/Anaconda3/envs/stampmaker/python.exe",
            pythonOptions:["-u"]
        };
        let pyshell = new PythonShell("../../tf-pose-estimation-master/my_run.py",
                                    python_options);
        pyshell.send(newPath);

        pyshell.on("message", function(message){
            if(message.substr(0, 2)=="--"){
                console.log(message.substr(3));
                res.writeHead(200, {"Content-Type": "text/html"});
                // ここにjsonをぶちこむ
                res.write(message.substr(3));
                res.end();
            }
        });

        pyshell.end(function(err, code, signal){
            if(err) throw err;
            //console.log("The exit code was: " + code);
            //console.log("The exit signal was: "+signal);
        });
    });
});

/*
app.post("/upload", function(req, res){
    var base = "";
    var tmp = "";

    req.on("data", function(chunk){
        console.log(chunk);
        tmp += chunk;
    });

    console.log(req);

    req.on("end", function(){
        var string = tmp.toString("utf-8", 0, tmp.length);
        var count = 0;

        for(let i = 0; i < string.length; i++){
            if((string[i]=="d") && (string[i+1] == "a") &&
               (string[i+2] == "t") && (string[i+3] == "a") &&
               (string[i+4] == ":") && (string[i+5] == "i")){
                   while(string.length > i){
                       base += string[i];

                       if((string[i]=="\r\n") || (string[i] == "\n"))
                           break;
                        i++;
                   }
                   count++;
            }
            if(count == 1)
                break;
        }

        var base64Data = base.replace(/^data:image\/jpeg;base64,/, "");
        fs.writeFile("./images/saved" + file_num + ".jpg", base64Data, "base64", (err) =>{
            if(err) throw err;
            file_num++;
        });
        
        let {PythonShell} = require("python-shell");
        let python_options = {
            pythonPath: "C:/Users/FusionProj/Anaconda3/envs/stampmaker/python.exe",
            pythonOptions:["-u"]
        };
        let pyshell = new PythonShell("../tf-pose-estimation-master/my_run.py",
                                    python_options);
        pyshell.send("../fusionDesignProjFront/images/saved"+file_num+".jpg");

        pyshell.on("message", function(message){
            //console.log(message);
            if(message.substr(0, 2)=="--"){
                console.log(message.substr(3));
                //res.writeHead(200, {"Content-Type": "text/html"});
                // ここにjsonをぶちこむ
                res.write(message.substr(3));
                res.end();
            }
        });

        pyshell.end(function(err, code, signal){
            if(err) throw err;
            //console.log("The exit code was: " + code);
            //console.log("The exit signal was: "+signal);
        });

    });
});
*/

app.post("/upload", function(req, res){
    const base64 = req.body.pad.split(",")[1];
    const decode = new Buffer.from(base64,"base64");
    fs.writeFile("./images/saved"+file_num+".jpg", decode, (err) =>{
        if(err){
            console.log(err);
        }
        let {PythonShell} = require("python-shell");
        let python_options = {
            pythonPath: "C:/Users/FusionProj/Anaconda3/envs/stampmaker/python.exe",
            pythonOptions:["-u"]
        };
        let pyshell = new PythonShell("../../tf-pose-estimation-master/my_run.py",
                                    python_options);
        pyshell.send("../alsterium/LineStampMaker/images/saved"+file_num+".jpg");
    
        pyshell.on("message", function(message){
            //console.log(message);
            if(message.substr(0, 2)=="--"){
                console.log(message.substr(3));
                res.writeHead(200, {"Content-Type": "text/html"});
                // ここにjsonをぶちこむ
                res.write(message.substr(3));
                res.end();
            }
        });
    
        pyshell.end(function(err, code, signal){
            if(err) throw err;
            //console.log("The exit code was: " + code);
            //console.log("The exit signal was: "+signal);
        });
        file_num++;
    
    });
    
});

server.listen(port, function(){
    console.log("Server is listening at https://"+host+":"+port);
});