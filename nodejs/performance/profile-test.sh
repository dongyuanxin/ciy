#!/bin/bash

# 参考链接：https://nodejs.org/zh-cn/docs/guides/simple-profiling/
# 1. 观察Summary，查看c++/js占比
# 2. 再观察占比高的部分，进行分析
# 3. Bottom up (heavy) profile 部分是函数调用占用

# Ctrl+C after 10seconds
node --prof profile-test.js

# log file => result
node --prof-process your_log_file > result.txt
