import express from "express";
import multer from "multer";
import ipfsAPI from "ipfs-api";
import fs from "fs";

const app = express();
const ipfs = ipfsAPI("localhost", "5001", { protocol: "http" });
const PORT = process.env.PORT || 8000;

var upload = multer({ dest: "./uploads/" });

app.post("/upload", upload.single("file"), function (req, res, _next) {

  var data = new Buffer.from(fs.readFileSync(req.file.path));
  ipfs.add(data, (err, file) => {
    if (err) {
      console.log(err);
    }
    console.log(file);
  });

  res.send("Successful");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
