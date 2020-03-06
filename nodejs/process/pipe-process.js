// spawn串联应用
// spawn本身也支持按流读写，性能更好

const cp = require('child_process')
const cat = cp.spawn('cat', ['./pipe-process.txt'])
const sort = cp.spawn('sort')
const uniq = cp.spawn('uniq')

cat.stdout.pipe(sort.stdin)
sort.stdout.pipe(uniq.stdin)
uniq.stdout.pipe(process.stdout)