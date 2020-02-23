// 标准输入流读写，可以配合操作系统管道运算符使用
// echo 'abc' | node standard-io.js

process.stdin.setEncoding('utf8')

process.stdin.on('data', (chunk) => {
    process.stdout.write(chunk)
})