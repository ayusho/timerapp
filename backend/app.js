var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const PDFDocument = require("pdfkit");
const fs = require("fs");
var cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

let questions;
let previousResponse;

app.post("/convert", (req, res) => {
  let body = req.body;
  let fileStream = fs.createWriteStream(path.join(__dirname, "files/output.pdf"));

  const doc = new PDFDocument();
  doc.pipe(fileStream);

  res.setHeader("Content-type", "application/pdf");
  console.log(body);
  for (let question of body.questions) {
    doc.text(question);
  }

  doc.end();
  previousResponse = setTimeout(() => {
    res.download(path.join(__dirname, "files/output.pdf"));
  }, 1000);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'../', 'build', 'index.html'));
});

app.listen(8082, () => {
  console.log("Running...!");
});
