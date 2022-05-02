var http = require('http')
http
.createServer(function(req,res){
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    res.end('Nuttha Ditthaporn\nTime - '+hours+":"+minutes+":"+seconds)
}) 
.listen(2337, '127.0.0.1')
console.log('Server running at http://127.0.0.1:2337/')