#!/bin/bash
# 跟踪系统级别调用

# 用途1: 追踪程序
sudo strace -o trace.out node os.trace.js 

# 用途2: 追踪进程
sudo strace -p your_node_pid