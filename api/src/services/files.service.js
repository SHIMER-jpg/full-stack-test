const externalApiRequest = require("../utils/externalApiRequest");
const parseCsv = require("../utils/parseCsv");

const getSingleFile = async (fileName) => {
  const file = await externalApiRequest("/secret/file/" + fileName);
  if (file.status) return file;
  return parseCsv(file);
};

const getAll = async () => {
  const { files } = await externalApiRequest("/secret/files");
  const data = await Promise.all(
    files.map(async (fileItem) => await getSingleFile(fileItem))
  );
  const csvPayload = data.filter(Boolean).filter((item) => !item.status);
  return csvPayload;
};

const getList = async () => {
  const { files } = await externalApiRequest("/secret/files");
  const data = await Promise.all(
    files.map(
      async (fileItem) => await externalApiRequest("/secret/file/" + fileItem)
    )
  );
  return data;
};

module.exports = {
  getSingleFile,
  getAll,
  getList,
};
