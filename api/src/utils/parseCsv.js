/**
 *
 * @param file Text data to parse
 * @returns custom CSV json with file and lines keys
 */
const parseCsv = (file) => {
  // If the file was an error object then it shouldn't be parsed
  const lines = file.split("\n");

  //If we only get a header we should not parse the file
  if (lines.length === 1) return;

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

module.exports = parseCsv;
