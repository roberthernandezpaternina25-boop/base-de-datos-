const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("eres mi cata, como dice la niña jajajaj!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

