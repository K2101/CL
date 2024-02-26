const express = require('express');
const { upload, publicRequest, getFileList } = require('../controllers/file');

const fileRouter = express.Router();

fileRouter.get('/', getFileList);
fileRouter.post('/upload', upload);
fileRouter.post('/data', publicRequest);

module.exports = fileRouter;
