const mongoose = require('mongoose');

const fileModel = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  fileType: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  size: {
    type: Number,
    required: true,
  },
});

const file = mongoose.model('File', fileModel);

module.exports = file;
