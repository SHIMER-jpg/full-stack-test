const express = require("express");
const https = require("https");

const app = express();
const port = 4000;

const URL = "https://echo-serv.tbxnet.com/v1";
const SECRET = "Bearer aSuperSecretKey";

function fetch(path) {
  const data = [];
  const options = {
    headers: {
      authorization: SECRET,
    },
  };
  return new Promise((resolve, reject) => {
    try {
      https.get(URL + path, options, (response) => {
        response.on("data", (chunk) => {
          data.push(chunk);
        });
        response.on("end", () => {
          response.data = data;
          response.json = () => JSON.parse(Buffer.concat(data).toString());
          response.text = () => Buffer.concat(data).toString();
          resolve(response);
        });
      });
    } catch (e) {
      reject(e.message);
    }
  });
}
const externalApiRequest = async (path) => {
  const response = await fetch(path);

  if (response.headers["content-type"] === "application/json; charset=utf-8")
    return response.json();

  return response.text();
};

const parseCSV = (file) => {
  // TODO
  /**
   * Rename constants
   * Arrange
   * Abstract
   */
  if (typeof file === "object") return;
  const lines = file.split("\n");
  const headers = lines.shift().split(",");
  const fileHeader = headers[0];
  const parsedLines = lines
    .map((line) => line.split(","))
    .filter((parsedLine) => parsedLine.length === headers.length);
  if (parsedLines.length >= 1) {
    return {
      [fileHeader]: parsedLines[0][0],
      lines: parsedLines.map((line) =>
        line.reduce(
          (acc, curr, index) => index > 0 && { ...acc, [headers[index]]: curr },
          {}
        )
      ),
    };
  }
};
// TODO: Use Router
app.get("/files/data", async (req, res) => {
  try {
    const { fileName } = req.query;
    if (fileName) {
      const file = await externalApiRequest("/secret/file/" + fileName);
      console.log("sending single file", parseCSV(file));
      return res.send(parseCSV(file));
    }

    const { files } = await externalApiRequest("/secret/files");
    const data = await Promise.all(
      files.map(
        async (fileItem) => await externalApiRequest("/secret/file/" + fileItem)
      )
    );
    const csvPayload = data.map(parseCSV).filter(Boolean);
    console.log("Returning elements: " + csvPayload.length);
    return res.send(csvPayload);
  } catch (error) {
    res.send(error);
  }
});

// TODO: Use Router
app.get("/files/list", async (req, res) => {
  try {
    const { files } = await externalApiRequest("/secret/files");
    const data = await Promise.all(
      files.map(
        async (fileItem) => await externalApiRequest("/secret/file/" + fileItem)
      )
    );
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});
