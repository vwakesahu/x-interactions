"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleResponse = void 0;
const handleResponse = (res, data, message) => {
    res.status(200).json({ success: true, message, data });
};
exports.handleResponse = handleResponse;
const handleError = (res, error) => {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    res.status(500).json({ success: false, error: errorMessage });
};
exports.handleError = handleError;
