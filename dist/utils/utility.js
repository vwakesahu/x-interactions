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
exports.generateContentForPostingTweet = generateContentForPostingTweet;
const constants_1 = require("./constants");
function generateContentForPostingTweet(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const systemPrompt = `You are a social media expert crafting engaging tweets. 
                Your task is to write ONE short, impactful tweet.
                Rules:
                - Keep it under 280 characters
                - Be concise and engaging
                - Include relevant hashtags when appropriate
                - Don't use emojis unless specifically requested
                - Focus on value and clarity
                
                Remember: Write ONLY the tweet content, nothing else.`;
            const response = yield fetch(`${constants_1.OLLAMA_ENDPOINT}/api/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: constants_1.OLLAMA_MODEL,
                    prompt: `${systemPrompt}\n\nTopic to tweet about: ${prompt}\n\nTweet:`,
                    stream: false,
                    options: {
                        temperature: 0.7,
                        top_k: 50,
                        top_p: 0.7,
                        max_tokens: 300,
                    },
                }),
            });
            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.statusText}`);
            }
            const data = yield response.json();
            let content = data.response
                .trim()
                .replace(/^["']|["']$/g, "")
                .replace(/^Tweet:\s*/i, "");
            if (content.length > 280) {
                content = content.substring(0, 277) + "...";
            }
            return content;
        }
        catch (error) {
            console.error("Error generating content with Llama:", error);
            throw error;
        }
    });
}
