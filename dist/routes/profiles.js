"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profilesController_1 = require("../controllers/profilesController");
const router = (0, express_1.Router)();
router.post('/', profilesController_1.getProfile); // POST for fetching profiles
exports.default = router;
