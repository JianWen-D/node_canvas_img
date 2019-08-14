'use strict';

const Controller = require('egg').Controller;
const canvasImgUtil = require('./../utils/canvasImg');
// const zip = require('./../utils/zip');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');


class canvasImg extends Controller {
  // 接收数据
  async index() {
    const stream = fs.createReadStream(path.join(__dirname, './../public/统计2.csv'));
    const csvStream = csv
      .parse()
      .on('data', async datas => {
        const _data = {
          bgSrc: 'http://cdn.ystcsrz-gd.com/cert2.png',
          fontFamily: '原版宋体',
          isArr: false,
          zip: false,
          data: [
            { type: 'text', text: datas[0], size: 44, top: 1418 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[1], size: 44, top: 1503 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[2], size: 44, top: 1583 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[3], size: 44, top: 1673 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[4], size: 44, top: 1753 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[5], size: 44, top: 1843 - 5, left: 1720 + 18 },
            { type: 'text', text: datas[6], size: 44, top: 1923 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[7], size: 44, top: 2013 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[8], size: 44, top: 2098 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[9], size: 44, top: 2178 - 5, left: 1690 + 18 },
            { type: 'text', text: datas[10], size: 44, top: 2263 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[11], size: 44, top: 2353 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[12], size: 44, top: 2433 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[13], size: 44, top: 2523 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[14], size: 44, top: 2603 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[15], size: 44, top: 2698 - 5, left: 1540 + 18 },
            { type: 'text', text: datas[16], size: 44, top: 2183 - 5, left: 690 + 18 },
            { type: 'text', text: datas[17], size: 44, top: 2268 - 5, left: 840 + 18 },
            { type: 'text', text: datas[18], size: 44, top: 2353 - 5, left: 690 + 18 },
            { type: 'text', text: '', size: 44, top: 2413 - 5, left: 690 + 18 },
            { type: 'text', text: datas[19], size: 44, top: 2523 - 5, left: 690 + 18 },
            { type: 'text', text: datas[20], size: 44, top: 2603 - 5, left: 690 + 18 },
            { type: 'text', text: datas[21], size: 44, top: 2683 - 5, left: 690 + 18 },
            { type: 'img', src: `http://system.ystcsrz-gd.com/system/public/candidatePhoto/${datas[22]}`, width: 500, height: 600, top: 1423, left: 440 },
            { type: 'text', text: `No.:${datas[20]}`, size: 44, top: 2693, left: 750, rotate: true },
          ],
        };
        await canvasImgUtil.index(_data.bgSrc, _data.isArr, _data.data, _data.fontFamily);
      })
      .on('end', function() {
        console.log('done');
      });

    stream.pipe(csvStream);
  }
}

module.exports = canvasImg;
