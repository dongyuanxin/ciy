// 模版引擎技术（模仿EJS）的实现
// 1. 「正则」表达式进行替换
// 2. 将模版中的 html结构 和 JavaScript语句、变量 「进行分离」
//    html结构通过push放入数组中
//    JavaScript语句通过`;`来保留
//    变量 <%= %> 将其表达式放入数组
// 3. 拼接结果通过「new Function(xxx)」来运算
// 4. 缓存

// 参考连接：
//  1. https://juejin.im/post/5b3b93115188251afa62ad46
//  2.

const map = {}; // 全局缓存

/**
 * @param {string} str
 * @return {string}
 */
function tpl(str) {
  if (map[str] !== undefined) {
    return map[str];
  }

  let result = `let p = []; p.push('`;

  result += `${str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'") // 处理 ' 和 \
    .replace(/[\r\n\t]/g, "") // 不能存在换行
    .replace(/<%=\s*([^%>]+?)\s*%>/g, "'); p.push($1); p.push('")
    .replace(/<%/g, "');")
    .replace(/%>/g, ";p.push('")}`;

  result += `'); return p.join('');`;
  map[str] = result;
  return result;
}

/**
 *
 * @param {string} str
 * @param {object} data
 * @return {{error, result}}
 */
function tplEngine(str, data) {
  try {
    const template = tpl(str);
    const fn = new Function(template);
    return {
      result: fn.apply(data),
      error: null
    };
  } catch (error) {
    return {
      result: null,
      error: error
    };
  }
}

module.exports.tplEngine = tplEngine;
