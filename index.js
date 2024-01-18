const http = require("http");
const fs = require("fs");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const templateError = fs.readFileSync(
  `${__dirname}/templates/error.html`,
  "utf-8"
);

// Server
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%ProductName%}/g, product.productName);
  output = output.replace(/{%ProductImage%}/g, product.image);
  output = output.replace(/{%ProductFrom%}/g, product.from);
  output = output.replace(/{%ProductNutrients%}/g, product.nutrients);
  output = output.replace(/{%ProductQuantity%}/g, product.quantity);
  output = output.replace(/{%ProductPrice%}/g, product.price);
  output = output.replace(/{%ProductDescription%}/g, product.description);
  output = output.replace(/{%Id%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%Not_Organic%}/g, "not-organic");
  }
  return output;
};

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(url.parse(req.url, true));
  const pathname = req.url;

  // Overview page
  if (pathname == "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardHtml = dataObject
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    // console.log(cardHtml);
    const output = templateOverview.replace('{%Product_card%}', cardHtml)

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.end("this is product");

    // Api
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(templateError);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server running on port : 8000");
});
