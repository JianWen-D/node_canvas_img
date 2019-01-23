'use strict';

const Controller = require('egg').Controller;
const canvasImgUtil = require('./../utils/canvasImg');
const zip = require('./../utils/zip');

class canvasImg extends Controller {
  // 接收数据
  async index() {
    // 判断是否为数组形式
    // 初始化数据
    const isArr = this.ctx.request.body.isArr;
    const bgSrc = this.ctx.request.body.bgSrc;
    const data = this.ctx.request.body.data;
    const isZip = this.ctx.request.body.zip;
    const fontFamily = this.ctx.request.body.fontFamily;
    const fileName = await canvasImgUtil.index(bgSrc, isArr, data, fontFamily);
    const createZip = isZip ? await zip(fileName) : fileName;
    this.ctx.body = createZip;
  }
}

module.exports = canvasImg;
