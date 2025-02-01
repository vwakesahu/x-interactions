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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agent_twitter_client_1 = require("agent-twitter-client");
const path_1 = __importDefault(require("path"));
// Define the cookie file path
const COOKIE_FILE_PATH = path_1.default.join(__dirname, 'cookies.json');
/**
 * Get or create a scraper instance.
 * - If cookies exist and are valid, use them.
 * - Otherwise, log in and cache new cookies.
 */
const getScraper = () => __awaiter(void 0, void 0, void 0, function* () {
    const scraper = new agent_twitter_client_1.Scraper();
    // Check if the scraper is logged in
    const isLoggedIn = yield scraper.isLoggedIn();
    if (!isLoggedIn) {
        console.log('Not logged in. Logging in with credentials...');
        yield scraper.login(process.env.TWITTER_USERNAME || '', process.env.TWITTER_PASSWORD || '', process.env.TWITTER_EMAIL || '', process.env.TWITTER_API_KEY || '', process.env.TWITTER_API_SECRET_KEY || '', process.env.TWITTER_ACCESS_TOKEN || '', process.env.TWITTER_ACCESS_TOKEN_SECRET || '');
    }
    else {
        console.log('Scraper is already logged in.');
    }
    return scraper;
});
exports.default = getScraper;
