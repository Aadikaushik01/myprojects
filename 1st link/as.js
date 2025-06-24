let http = require("http");
function handler(req , res){
res.end("hiii");
}

let server = http.createServer(handler);
server.listen(3500);
console.log("server is running ");