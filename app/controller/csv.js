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
          fontFamily: '',
          isArr: false,
          data: [
            { type: 'text', text: datas[0], size: 44, top: 1415, left: 1500 },
            { type: 'text', text: datas[1], size: 44, top: 1500, left: 1500 },
            { type: 'text', text: datas[2], size: 44, top: 1580, left: 1500 },
            { type: 'text', text: datas[3], size: 44, top: 1670, left: 1500 },
            { type: 'text', text: datas[4], size: 44, top: 1750, left: 1500 },
            { type: 'text', text: datas[5], size: 44, top: 1840, left: 1750 },
            { type: 'text', text: datas[6], size: 44, top: 1920, left: 1500 },
            { type: 'text', text: datas[7], size: 44, top: 2010, left: 1600 },
            { type: 'text', text: datas[8], size: 44, top: 2095, left: 1600 },
            { type: 'text', text: datas[9], size: 44, top: 2175, left: 1750 },
            { type: 'text', text: datas[10], size: 44, top: 2260, left: 1600 },
            { type: 'text', text: datas[11], size: 44, top: 2350, left: 1600 },
            { type: 'text', text: datas[12], size: 44, top: 2430, left: 1500 },
            { type: 'text', text: datas[13], size: 44, top: 2520, left: 1600 },
            { type: 'text', text: datas[14], size: 44, top: 2600, left: 1500 },
            { type: 'text', text: datas[15], size: 44, top: 2695, left: 1550 },
            { type: 'text', text: datas[16], size: 44, top: 2190, left: 750 },
            { type: 'text', text: datas[17], size: 44, top: 2275, left: 900 },
            { type: 'text', text: datas[18], size: 44, top: 2360, left: 750 },
            { type: 'text', text: '', size: 44, top: 2430, left: 750 },
            { type: 'text', text: datas[19], size: 44, top: 2530, left: 750 },
            { type: 'text', text: datas[20], size: 44, top: 2610, left: 750 },
            { type: 'text', text: datas[21], size: 44, top: 2690, left: 750 },
            { type: 'img', src: `http://system.ystcsrz-gd.com/system/public/candidatePhoto/${datas[22]}`, width: 500, height: 600, top: 1420, left: 500 },
            { type: 'text', text: `No:${datas[20]}`, size: 44, top: 2690, left: 750, types: true },
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
