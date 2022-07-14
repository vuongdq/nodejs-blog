var http = require("http");
var server = http.createServer(function (req, res){
    // res.writeHead(200,{"Content-Type":"text/plain"});
    // res.write("This is the First Server with node Js");
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>This is HTML</h1>");

    res.end();
});

server.listen(3000,function (){
    console.log("Server is running on port 3000");
});

