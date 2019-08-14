# FROM hiromis/ubuntu1604-node8-ffmpeg-im
FROM tbaltrushaitis/ubuntu-nodejs:v9.9.0

# 安装node-canvas的必要环境
# RUN node -v

RUN apt-get update \
&& apt-get -y install build-essential \
&& apt-get -y install libcairo2-dev \
&& apt-get -y install libpango1.0-dev \
&& apt-get -y install libjpeg-dev \
&& apt-get -y install libgif-dev \
&& apt-get -y install librsvg2-dev 

RUN node -v
RUN npm -v

# 前往工作目录
WORKDIR   /app

COPY . .

EXPOSE 7777

RUN rm -rf node_modules

RUN npm install
# CMD [ "npm","install"]

CMD ["npm","run","dev"]