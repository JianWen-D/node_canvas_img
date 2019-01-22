# 基于canvas动态合成图片

janvems

### 参数

```bash
// 生成单张
{
  bgSrc: '',
  fontFamily: '',
  isArr: false,
  zip: false,
  data: [
    { type: 'text', text: '', size: 44, top: 2430, left: 750 },
    { type: 'img', src: '', width: 500, height: 600, top: 1420, left: 500 },
  ],
};
// 生成多张
{
  bgSrc: '',
  fontFamily: '',
  isArr: true,
  zip: true,
  data: [
    [
      { type: 'text', text: '', size: 44, top: 2430, left: 750 },
      { type: 'img', src: '', width: 500, height: 600, top: 1420, left: 500 },
    ]
  ],
};
```