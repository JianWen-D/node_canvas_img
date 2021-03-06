'use strict';

const {
	createCanvas,
	loadImage,
	Image,
	registerFont,
} = require('canvas');
const http = require('http');
// const qrcode = require('./qrcode_utils');
const fs = require('fs');
const path = require('path');

class canvasImg {
	async index(bgSrc, data, fontFamily, fileName) {
		const _fileName = fileName ? fileName : Date.now();
		// 判断是否为图片组
		// if (isArr) {
		for (const arr of data) {
			const _ctx = await this.bgImg(bgSrc, fontFamily);
			const ctx = _ctx.ctx;
			const canvas = _ctx.canvas;
			for (const item of arr.dataList) {
				switch (item.type) {
					case 'qrcode':
						await this.qrcodeImg(ctx, item);
						break;
					case 'text':
						await this.drawFont(ctx, item, fontFamily);
						break;
					case 'img':
						await this.publicImg(ctx, item);
						break;
					case 'normalImg':
						await this.normalImg(ctx, item);
						break;
					default:
						break;
				}
			}
			await this.outputImgMerge(canvas, arr.name, _fileName);
		}
		// }
		return _fileName;
	}
	// 加载网络图片
	loadImg(url) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = () => reject(new Error('Failed to load image'));
			http.get(url, res => {
				const chunks = [];
				res.on('error', err => {
					reject(err);
				});
				res.on('data', chunk => {
					chunks.push(chunk);
				});
				res.on('end', () => {
					img.src = Buffer.concat(chunks);
				});
			});
		});
	}
	// 生成合成图片
	createFile(imgName, canvas, fileName) {
		return new Promise(resolve => {
			if (!fs.existsSync(path.join(__dirname, `../public/images/${fileName}`))) {
				fs.mkdirSync(path.join(__dirname, `../public/images/${fileName}`));
			}
			const out = fs.createWriteStream(path.join(__dirname, `../public/images/${fileName}/${imgName}`));
			const stream = canvas.pngStream();
			stream.on('data', chunk => {
				out.write(chunk);
			});
			stream.on('end', () => {
				console.log('saved png');
				resolve(imgName);
			});
		});
	}
	// 生成底层背景图
	async bgImg(url, fontFamily = '') {
		const img = await this.loadImg(url);
		fontFamily ? registerFont(path.join(__dirname, `../public/fonts/${fontFamily}.ttf`), {
			family: 'newFonts',
		}) : '';
		const canvas = createCanvas(img.width, img.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, img.width, img.height);
		return {
			ctx,
			canvas,
		};
	}
	// 合成二维码图片
	async qrcodeImg(ctx, data) {
		// const qrcodePath = await qrcode(data.text, data.width);
		const img = new Image();
		// img.src = fs.readFileSync(qrcodePath);
		ctx.drawImage(img, data.left, data.top, data.width, data.height);
	}
	// 合成普通网络图片
	async publicImg(ctx, data) {
		const img = await this.loadImg(data.src);
		console.log(img);
		ctx.drawImage(img, data.left, data.top, data.width, data.height);
	}
	// 合成普通网络图片
	async normalImg(ctx, data) {
		const img = await this.loadImg(data.src);
		if (img.height >= img.width) {
			ctx.drawImage(img, data.left, data.top, data.width, parseInt(data.width * img.height / img.width));
		} else {
			const num = parseInt(data.width * img.width / img.height) >= 1300 ? 1300 : parseInt(data.width * img.width / img.height)
			console.log(num)
			ctx.translate(0, num);
			ctx.rotate(-90 * Math.PI / 180);
			ctx.drawImage(img, -data.top, data.left, num, data.width);
		}
	}
	async rotate(ctx, data) {
		ctx.font = `${data.size}px newFonts`;
		ctx.translate(995, -750);
		ctx.rotate(90 * Math.PI / 180);
		ctx.fillText(data.text, 2186, 100);
	}
	// 插入文字
	async drawFont(ctx, data, fontFamily = '') {
		if (data && data.rotate) {
			this.rotate(ctx, data);
		} else {
			ctx.font = `${data.size}px ${fontFamily ? 'newFonts' : 'Microsoft YaHei'}`;
			ctx.fillText(data.text, data.left, data.top);
		}
	}
	// 输出整个合成图片
	async outputImgMerge(canvas, imageName, fileName) {
		// const imgName = `${imageName}.png`;
		return await this.createFile(`${imageName}.png`, canvas, fileName);
	}
}
module.exports = new canvasImg();