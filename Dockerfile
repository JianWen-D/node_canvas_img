FROM hiromis/ubuntu1604-node8-ffmpeg-im

# 安装node-canvas的必要环境
RUN apt-get update
RUN apt-get -y install libcairo2-dev
RUN apt-get -y install libjpeg-dev
RUN apt-get -y install libpango1.0-dev
RUN apt-get -y install libgif-dev
RUN apt-get -y install build-essential
RUN apt-get -y install g++

RUN node -v
RUN npm -v

# 前往工作目录
WORKDIR   /app

COPY . .

EXPOSE 7777

# RUN npm run build
# CMD [ "npm","install"]

CMD ["npm","run","dev"]