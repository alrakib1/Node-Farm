const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
//   console.log(req.url);
  const pathname = req.url;
  if (pathname == "/" || pathname === "/overview") {
    res.end("this is overview ");
  } else if (pathname === "/product") {
    res.end("this is product");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end('<h1>404 Page not found !!!</h1>');
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server running on port : 8000");
});
