'use strict';

const Controller = require('egg').Controller;
const canvasImgUtil = require('./../utils/canvasImg');
const zip = require('./../utils/zip');

class canvasImg extends Controller {
  // 接收数据
  async index() {
    // 判断是否为数组形式
    // 初始化数据
    const { bgSrc, data, fontFamily } = this.ctx.request.body;
    const result = await canvasImgUtil.index(bgSrc, data, fontFamily);
    // const createZip = await zip(result);
    // console.log(createZip, '111111');
    this.ctx.body = result;
  }
}

module.exports = canvasImg;
