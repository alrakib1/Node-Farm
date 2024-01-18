const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  const pathname = req.url;
  if (pathname == "/" || pathname === "/overview") {
    res.end("this is overview ");
  } else if (pathname === "/product") {
    res.end("this is product");
  } else if (pathname === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      // console.log(productData);
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>404 Page not found !!!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server running on port : 8000");
});
