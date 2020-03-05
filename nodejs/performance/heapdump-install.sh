#!/bin/bash

# Issue: hash md5 error on Mac
# https://github.com/wting/autojump/issues/540

curl 'https://raw.githubusercontent.com/Homebrew/homebrew-core/94d572a132a63651739fef1931f540404b7eaa31/Formula/python%402.rb' \
    > python@2.rb

brew reinstall python@2.rb

cd your_workdir
rm -rf node_modules/
npm install # install again
