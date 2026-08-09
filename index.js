const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("eres mi cata, como dice la niña jajajajaja!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

