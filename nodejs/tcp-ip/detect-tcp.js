// const url = require("url");

// const path =
//   "https://dev1-7go2nihm6af73684.service.tcloudbase.com/info.php?filter[isSticky]=yes&filter[isApproved]=1&filter[isDeleted]=no&filter[categoryId]=0&include=firstPost";

// const Url = new URL(url);

// console.log(Url.searchParams);

const net = require('net');
const { resolve } = require('path');

const socket = new net.Socket();

socket.setTimeout(1000);

socket.once('error', (err) => {
    console.log('探测失败', err);
    socket.destroy();
});

socket.once('timeout', () => {
    console.log('探测超时');
    socket.destroy();
});

socket.connect(4444, '127.0.0.1', () => {
    console.log('探测成功');
    socket.end();
});

// socket.connect(10593, "9.34.100.157");
