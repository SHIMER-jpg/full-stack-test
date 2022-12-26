const express = require("express");
const filesRouter = require("./src/routes/files.route");

const app = express();

const port = 4000;

app.get("/", (_, res) => {
  res.json({ message: "ok" });
});

app.use("/files", filesRouter);

app.listen(port, () => {
  console.log("App listening on port " + port);
});
