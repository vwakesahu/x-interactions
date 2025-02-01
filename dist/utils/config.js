"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const constants_1 = require("./constants");
exports.config = {
    endpoint: constants_1.OLLAMA_ENDPOINT,
    model: constants_1.OLLAMA_MODEL,
    weights: {
        clarity: 0.3,
        specificity: 0.3,
        context: 0.2,
        effort: 0.2,
    },
};
