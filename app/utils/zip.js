'use strict';

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

module.exports = fileName => {
  const output = fs.createWriteStream(path.join(__dirname, `./../public/zip/${fileName}.zip`));
  const deleteFolderRecursive = path => {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function(file) {
        const curPath = path + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };
  const archive = archiver('zip', {
    zlib: { level: 5 }, // Sets the compression level.
  });

  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    deleteFolderRecursive(path.join(__dirname, `./../public/images/${fileName}`));
  });

  output.on('end', function() {
    // deleteFolderRecursive(path.join(__dirname, `./../public/${fileName}`));
    console.log('Data has been drained');
  });


  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
    // log warning
    } else {
    // throw error
      throw err;
    }
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  archive.directory(path.join(__dirname, `./../public/images/${fileName}`), false);

  archive.finalize();
  return `${fileName}.zip`;
};

