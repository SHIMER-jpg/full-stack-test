const http = require("http");
const path = require("path");
const fs = require("fs");

http
  .createServer(function (request, response) {
    try {
      let indexPath;
      if (request.url === "/")
        indexPath = path.join(process.cwd(), "/build/index.html");
      else indexPath = path.join(process.cwd(), "/build", request.url);
      fs.readFile(indexPath, (err, data) => {
        if (err) return;
        response.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": data.length,
        });
        response.write(Buffer.from(data).toString());
        response.end();
      });
    } catch (e) {
      response.json({ error: 500, message: e.message });
    }
  })
  .listen(3000);
console.log("Listening on port 3000");
