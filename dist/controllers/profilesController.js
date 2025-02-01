"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const agent_twitter_client_1 = require("agent-twitter-client");
const responseHandler_1 = require("../utils/responseHandler");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body; // Accept data from the request body
        if (!username) {
            return res
                .status(400)
                .json({ success: false, error: "Username is required" });
        }
        const scraper = new agent_twitter_client_1.Scraper();
        yield scraper.login(process.env.TWITTER_USERNAME || "", process.env.TWITTER_PASSWORD || "", process.env.TWITTER_EMAIL || "", process.env.TWITTER_API_KEY || "", process.env.TWITTER_API_SECRET_KEY || "", process.env.TWITTER_ACCESS_TOKEN || "", process.env.TWITTER_ACCESS_TOKEN_SECRET || "");
        const profile = yield scraper.getProfile(username);
        (0, responseHandler_1.handleResponse)(res, profile, "Fetched profile successfully");
    }
    catch (error) {
        (0, responseHandler_1.handleError)(res, error);
    }
});
exports.getProfile = getProfile;
