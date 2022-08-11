const express = require('express');
const router = express.Router();
const { createFile, getFiles, getFile } = require('./filesService.js');

router.post('/', createFile);

router.get('/', getFiles);

router.get('/:filename', getFile);

// Other endpoints - put, delete.

module.exports = {
  filesRouter: router
};
