const { tplEngine } = require("./tpl");

const html = `
<ul>
<% console.log("模版运行", this.obj); %>
<% if (this.obj.show) { %>
    <% for (var i = 0; i < this.obj.users.length; i++) { %>
        <li>
            <a href="<%= this.obj.users[i].url %>">
                <%= this.obj.users[i].name %>
            </a>
        </li>
    <% } %>
<% } else { %>
    <p>不展示列表</p>
<% } %>
</ul>
`;

const obj = {
  users: [
    {
      name: "dongyuanxin",
      url: "xxoo521.com"
    }
  ],
  show: true
};

const { error, result } = tplEngine(html, { obj });
if (error) {
  throw error;
}
console.log("渲染结果是", result);
