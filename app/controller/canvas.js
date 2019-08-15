'use strict';

const Controller = require('egg').Controller;
const canvasImgUtil = require('./../utils/canvasImg');
const zip = require('./../utils/zip');
const fs = require('fs');
const path = require('path');

class canvasImg extends Controller {
  // 接收数据
  async index() {
    // 判断是否为数组形式
    // 初始化数据
    const { bgSrc, data, fontFamily, fileName, update = true } = this.ctx.request.body;
    if (fs.existsSync(path.join(__dirname, `../public/zip/${fileName}.zip`)) && !update) {
      this.ctx.body = {
        code: 0,
        data: `${fileName}.zip`,
        msg: 'success',
      };
      return;
    }
    const result = await canvasImgUtil.index(bgSrc, data, fontFamily, fileName);
    const createZip = await zip(result);
    this.ctx.body = {
      code: 0,
      data: createZip,
      msg: 'success',
    };
  }
}

module.exports = canvasImg;
