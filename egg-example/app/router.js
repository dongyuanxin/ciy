"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/2", controller.home.index2);
  router.get("/news", controller.news.list);
  router.get("/home", controller.home.index2);
};
