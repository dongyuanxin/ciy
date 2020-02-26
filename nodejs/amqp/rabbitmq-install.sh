#!/bin/bash
# 国内brew安装rabbit过慢的解决方法

# step0: 用vpn代理shell命令行
export http_proxy=$YOUR_VPN_HTTP_PROXY
export https_proxy=$YOUR_VPN_HTTP_PROXY


# step1: 更新brew的git地址
# 注意：如果step0中shell已经设置代理，那么就不需要更新git地址

# 官方源：https://github.com/Homebrew/brew.git
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

# 官方源：https://github.com/Homebrew/homebrew-core.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

# step2: 更新
brew update --verbose

# step3: 安装
brew install rabbitmq

# step4: 启动
# 参考链接： https://www.rabbitmq.com/install-homebrew.html
# 命令安装在：/usr/local/Cellar/rabbitmq 
export PATH=$PATH:/usr/local/opt/rabbitmq/sbin # 暴露到环境变量中可以直接使用
rabbitmq-server # url: localhost:15672; usr: guest; pwd: guest