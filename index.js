var sys     = require("sys");
var http    = require("http");
var path    = require("path");
var url     = require("url");
var fs      = require("fs");

http.createServer(function(request,response){

    var req_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(), req_path);

    fs.exists(full_path,function(exists){
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});  
            response.write("404 Not Found\n");  
            response.end();
            return;
        }

        fs.readFile(full_path, "binary", function(err, file) {  
            if(err) {  
                response.writeHeader(500, {"Content-Type": "text/plain"});  
                response.write(err + "\n");  
                response.end();  
                return;
            }

            var mime = null;
            var extname = path.extname(req_path);
            if(extname == '.css'){
                mime = {"Content-Type": "text/css"};
            }
            response.writeHeader(200, mime);  
            response.write(file, "binary");  
            response.end();
        });
    });
}).listen(8080);

sys.puts("Server Running on 8080");    