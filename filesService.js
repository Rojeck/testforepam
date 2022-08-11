const path = require('path');
const fs = require('fs');

const files = path.resolve(__dirname,'files');
const allowedExt = ['txt', 'js', 'log', 'json', 'yaml', 'xml'];
const isAllowedExtFile = (ext) => allowedExt.includes(ext);


function createFile (req, res, next) {
  const { filename, content } = req.body;
  if (!isAllowedExtFile(filename.split('.')[1])) {
    res.status(400).send({ message: 'Failed. There is no allowed extansion file', status: 400 });
    return;
  }
  fs.writeFile(path.join(files, filename), content, function (error) {
    if (error) throw error;
    res.status(200).send({ "message": "File created successfully" });
  });
}

function getFiles (req, res, next) {
  const filesArray = [];
  fs.readdirSync(files).forEach(file => {
    filesArray.push(file);
  });
  res.status(200).send({
    "message": "Success",
    "files": filesArray});
}

const getFile = (req, res, next) => {
  const filename = req.params;
  fs.readFile(path.join(files, filename), { encoding: 'utf-8' }, function (err, data) {
    if (err) {
      if (err.code == 'ENOENT') {
        res.status(400).send({ message: 'Failed. Wrong name', status: 400 });
      } else {
        res.status(500).send({ message: 'Failed. Server error', status: 500 });
      }
    }
    const fileContent = fs.readFileSync(`${files}+${filename}`, "utf8");
    res.status(200).send({
        "message": "Success",
        "filename": filename,
        "content": fileContent,
        "extension": path.extname(path.join(files, filename)),
        "uploadedDate": fs.statSync(path.join(files, filename)).mtime
  });
  })};

// Other functions - editFile, deleteFile

// path.extName('file.txt') ---> '.txt'
// fs.writeFile ({ flag: 'a' }) ---> adds content to the file

module.exports = {
  createFile,
  getFiles,
  getFile
}
