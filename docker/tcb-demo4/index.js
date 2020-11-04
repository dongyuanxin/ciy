const puppeteer = require("puppeteer");

let getBrowser = (() => {
  let browser;
  return async (opts = {}) => {
    let { width = 800, height } = opts;
    if (!browser) {
      browser = puppeteer.launch({
        defaultViewport: {
          width,
          height,
        },
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    return browser;
  };
})();

const print = async function (url, opts = {}) {
  let { width = 800, height, quality, type } = opts;

  const browser = await getBrowser(opts);

  const page = await browser.newPage();

  await page.setViewport({
    width,
    height,
  });

  await page.goto(url);

  // await page.waitForNavigation()

  let res;

  let metaData = await page.evaluate(() => {
    let {
      offsetHeight,
      offsetWidth,
      clientHeight,
      clientWidth,
      scrollHeight,
      scrollWidth,
    } = document.documentElement;
    return {
      title: document.title,
      dimensions: {
        offsetHeight,
        offsetWidth,
        clientHeight,
        clientWidth,
        scrollHeight,
        scrollWidth,
      },
    };
  });

  console.log("metaData", metaData);

  if (type === "pdf") {
    res = await page.pdf({
      printBackground: true,
      width,
      height: metaData.dimensions.scrollHeight,
    });
  } else {
    if (type === "png") {
      // png 图片不允许设置图片质量
      quality = undefined;
    }

    if (quality) {
      quality = quality * 1;
    }

    res = await page.screenshot({
      type,
      fullPage: true,
      quality,
    });
  }

  console.log("page viewport:", page.viewport());

  await page.close();

  return { content: res, title: metaData.title };
};

const mimeTypes = {
  png: "image/png",
  jpeg: "image/jpeg",
  pdf: "application/pdf",
};

// 云函数入口函数
exports.main = async (event = {}, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let data,
    isHttp = false;
  // http 触发
  if (event.headers) {
    console.log(event);
    data = event.queryStringParameters || {};
    isHttp = true;
  } else {
    data = event;
  }

  let {
    url = "https://cloudbase.net",
    width = 800,
    height = 600,
    quality,
    type = "png",
    attachment = false,
  } = data;

  if (width) {
    width = width * 1;
  }

  if (height) {
    height = height * 1;
  }

  type = type.toLowerCase();

  if (type === "jpg") {
    type = "jpeg";
  }

  let res = await print(url, { width, height, quality, type });

  if (isHttp) {
    let mimeType = mimeTypes[type] || "application/octet-stream";

    let headers = {
      "Content-Type": mimeType,
      "Access-Control-Allow-Origin": "*",
      "Content-Disposition": `${
        attachment ? "attachment" : "inline"
      }; filename="${encodeURIComponent(res.title)}.${type}"`,
    };

    res = {
      isBase64Encoded: true,
      headers,
      body: res.content.toString("base64"),
    };
  }
  //   console.log(isHttp, res)
  return res;
};
