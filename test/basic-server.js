var http = require("http");
var server = http.createServer(function (req,res) {
    res.writeHead(200,{"Content_Type": "text/plain"});
    res.write("hello! This is the first webserver with nodejs");
    res.end();

});
server.listen(3000,function () {
    console.log("Server running with port 3000");

})
