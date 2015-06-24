var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs'),
    path = require('path'),
    static = require('node-static'),
    fileServer = new static.Server('./public');

var uploadDir = __dirname + '/upload/';



http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm(); // parse a file upload
        form.uploadDir = uploadDir;
        form.on('file', function(name, file) {
            var fileName = path.basename(file.name);
            var fileSavePath = uploadDir + getUniqueFileName(fileName);
            try{
                fs.renameSync(file.path, fileSavePath);
            } catch(err){
                res.writeHead(200, {
                    'content-type': 'text/json'
                });
                res.write(JSON.stringify({
                    success:0,
                    msg: err
                }));
                res.end();
            }

            res.writeHead(200, {
                'content-type': 'text/json'
            });
            res.write(JSON.stringify({
                success:1,
                href : fileSavePath
            }));
            res.end();
        });
        form.parse(req); // import
        // return;
    } else if (req.url == '/') { //主页
        var file = fs.readFileSync('./demo.html', {
            encoding: 'utf8'
        });
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(file);
        return;
    } else{ //静态服务器
        fileServer.serve(req, res);
    }

}).listen(3000);
console.log('listening on http://localhost:3000/');

function getUniqueFileName(fileName){
    return new Date().getTime() + '.'+ path.basename(fileName);
}
