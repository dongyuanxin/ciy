// 更好的思路，完美支持ejs语法(#, =, -, %%)
// （我做了一些修改）思路参考：https://div.io/topic/758

// 最初始的转换结果：
// var r=[];
// r.push(" Posts: ");
// r.push(" for(var i = 0; i < post.length; i++) { ");
// r.push("   <a href=\"#\">");
// r.push(" post[i].expert ");
// r.push("</a> ");
// r.push(" } ");
// r.push(" ");
// return r.join("");

// 再处理细节：<%xxx%> 中匹配的xxx可能是js语句，或者输出变量（通过第一个字符确定）

/**
 * @param {string} tpl
 * @return {{error, result}}
 */
function tpl(tpl) {
  const reg = /<%([^%>]+)?%>/g;
  let code = "var r=[];\n";
  let cursor = 0; //指向当前处理到的字符串的下标

  tpl = tpl
    .replace(/[\t\n\r]/g, " ")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");

  /**
   * @param {string} line
   * @param {boolean} isJs
   */
  const add = (line, isJs = false) => {
    if (isJs) {
      if (line[0] === "=" || line[0] === "-") {
        // <%= %> <%- %>
        code = code + `r.push('${line.slice(1)}');\n`;
      } else if (line[0] === "#") {
        // <%# %>
      } else {
        // <% %>
        code += `${line}\n`;
      }
    } else {
      code = code + `r.push('${line}');\n`;
    }
  };

  let match = reg.exec(tpl);
  while (match) {
    //   console.log(match);
    add(tpl.slice(cursor, match.index)); // 非js部分：直接push
    add(match[1], true); // js部分：分多种情况考虑
    cursor = match.index + match[0].length;
    match = reg.exec(tpl);
  }
  add(tpl.substr(cursor, tpl.length - cursor));

  code += 'return r.join("");';
  return code;
}

module.exports.tpl = tpl;
