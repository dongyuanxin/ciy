// nodejs基准测试
// benchmark.js的作者是lodash作者，设计原理请见：https://calendar.perfplanet.com/2010/bulletproof-javascript-benchmarks/

const Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

suite.add('call function', () => useCall('abc')) // 添加测试
    .add('apply function', () => useApply('abc'))
    .on('cycle', (event) => console.log(String(event.target))) // 每个测试结束后输出结果
    .on('complete', function () { // 全部结束后性能比较
        console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    .run({ async: true })

function useCall(str) {
    return [].slice.call(str)
}

function useApply(str) {
    return [].slice.call(str)
}