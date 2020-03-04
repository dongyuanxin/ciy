#!/bin/bash

# 生成过程
# key：私钥
# => csr：证书申请文件
# => crt: 生成证书
# => 添加到系统中，并且默认为全信任

# 参考：
#   1. openssl生成过程：https://blog.csdn.net/liuchunming033/article/details/48470575
#   2. 证书缺少主题备用名称SAN：https://github.com/3gstudent/3gstudent.github.io/blob/master/_posts/2018-4-18-CIA%20Hive%20Beacon%20Infrastructure%E5%A4%8D%E7%8E%B02%E2%80%94%E2%80%94%E4%BD%BF%E7%94%A8Apache%20mod_rewrite%E5%AE%9E%E7%8E%B0https%E6%B5%81%E9%87%8F%E5%88%86%E5%8F%91.md
#   3. HTTPS加密过程和TLS证书验证:https://juejin.im/post/5a4f4884518825732b19a3ce
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout localhost.key -out localhost.crt \
    -config req.cnf -sha256
