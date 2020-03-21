## Docker 概念

docker 就是将环境和软件打包在一起，然后可以直接在不同机器上运行。它是 Linux 容器的最佳实践。

2 个步骤：

- 将程序和环境，打包到 image 文件
- 运行时，image 生成 container 容器：`docker container ls --all` 可以查询所有的容器

在生成 container 时，需要注意：

- 默认运行完后，不会清除。可以增加`--rm`参数来解决：`docker container run --rm -it node:8.4`
- 通过`-p`可以映射端口
- 通过`--volume`可以映射目录
- 如果 dockerfile 没有`CMD`配置，那么可以传入进入后执行的命令

## 容器编排

组合业务容器和数据容器，通过`--link`参数来指定。

注意：因为容器本身就是隔离的，所以通信是“违背原则”。需要显式声明。

通过 docker-compose 可以代替 docker run 来更好的编排。

## 参考

- docker 入门：https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html
- docker 微服务思路：http://www.ruanyifeng.com/blog/2018/02/docker-wordpress-tutorial.html
- docker mysql 数据库：https://blog.csdn.net/u014182411/article/details/81192179
- docker link：https://juejin.im/entry/577a70eac4c97100557b9c5e
- docker compose：https://beginor.github.io/2017/06/08/use-compose-instead-of-run.html
