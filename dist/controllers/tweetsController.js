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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestTweet = exports.getTweets = void 0;
const scraper_1 = __importDefault(require("../utils/scraper"));
const responseHandler_1 = require("../utils/responseHandler");
const getTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        const { user, maxTweets } = req.body;
        if (!user) {
            return res
                .status(400)
                .json({ success: false, error: "User is required" });
        }
        const scraper = yield (0, scraper_1.default)();
        const tweets = [];
        try {
            for (var _d = true, _e = __asyncValues(scraper.getTweets(user, parseInt(maxTweets) || 2)), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const tweet = _c;
                tweets.push({ tweetID: tweet.id, text: tweet.text });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        (0, responseHandler_1.handleResponse)(res, tweets, "Fetched tweets successfully");
    }
    catch (error) {
        (0, responseHandler_1.handleError)(res, error);
    }
});
exports.getTweets = getTweets;
const getLatestTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        if (!user) {
            return res
                .status(400)
                .json({ success: false, error: "User is required" });
        }
        const scraper = yield (0, scraper_1.default)();
        const tweet = yield scraper.getLatestTweet(user);
        (0, responseHandler_1.handleResponse)(res, tweet, "Fetched latest tweet successfully");
    }
    catch (error) {
        (0, responseHandler_1.handleError)(res, error);
    }
});
exports.getLatestTweet = getLatestTweet;
