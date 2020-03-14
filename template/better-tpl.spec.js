const { tpl } = require("./better-tpl");

const template = `
Posts: <% for(var i = 0; i < post.length; i++) { %>
  <a href="#"><%= post[i].expert %></a>
  <%# console.log('这是注释，不应该被渲染') %>
<% } %>
`;

console.log(tpl(template));

// output:
// var r=[];
// r.push(' Posts: ');
//  for(var i = 0; i < post.length; i++) {
// r.push('   <a href="#">');
// r.push(' post[i].expert ');
// r.push('</a>   ');
// r.push(' ');
//  }
// r.push(' ');
// return r.join("");
