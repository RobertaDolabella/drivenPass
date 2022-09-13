"use strict";
exports.__esModule = true;
var express_1 = require("express");
var credentialsSchema_1 = require("../schemas/credentialsSchema");
var validateSchema_1 = require("../middlewares/validateSchema");
var credentialsController_1 = require("../controllers/credentialsController");
var credentialRouter = (0, express_1.Router)();
credentialRouter.post('/credentials', (0, validateSchema_1.validateSchemaMiddleware)(credentialsSchema_1.credentialsSchema), credentialsController_1.createCredentials);
credentialRouter.get('/credentials/:id', credentialsController_1.getCredentials);
credentialRouter["delete"]('/credentials/:id', credentialsController_1.deleteCredentials);
exports["default"] = credentialRouter;
