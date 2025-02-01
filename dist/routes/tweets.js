"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetsController_1 = require("../controllers/tweetsController");
const router = (0, express_1.Router)();
router.post("/tweets", tweetsController_1.getTweets);
router.post("/tweets/latest", tweetsController_1.getLatestTweet);
exports.default = router;
