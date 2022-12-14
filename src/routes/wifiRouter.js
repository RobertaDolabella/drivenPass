"use strict";
exports.__esModule = true;
var express_1 = require("express");
var wifiController_1 = require("../controllers/wifiController");
var validateSchema_1 = require("../middlewares/validateSchema");
var wifiSchema_1 = require("../schemas/wifiSchema");
var wifiRouter = (0, express_1.Router)();
wifiRouter.post('/wifis', (0, validateSchema_1.validateSchemaMiddleware)(wifiSchema_1.wifiSchema), wifiController_1.createWifis);
wifiRouter.get('/wifis/:id', wifiController_1.getWifi);
wifiRouter.get('/wifis', wifiController_1.getWifis);
wifiRouter["delete"]('/wifis/:id', wifiController_1.deleteWifis);
exports["default"] = wifiRouter;
