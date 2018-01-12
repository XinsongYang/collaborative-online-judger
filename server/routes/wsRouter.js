const wsRouter = require('koa-router')();
const wsController = require('../controllers/websocket');

wsRouter.all('/ws/edit', wsController.edit);

module.exports = wsRouter;