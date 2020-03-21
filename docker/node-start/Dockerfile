# image继承（官方推荐）
FROM node:8.4
# 拷贝当前所有内容 (除.dockerignore) 到container的 /app目录下
COPY . /app 
WORKDIR /app
# 编译过程进行安装
RUN npm install --registry=https://registry.npm.taobao.org
# 暴露8000端口，允许外界连接此借口
EXPOSE 8000
# 启动container后，自动运行的命令
# RUN可以由多个，CMD只能有一个
CMD [ "node", "app.js" ]