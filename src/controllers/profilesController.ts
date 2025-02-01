import { Request, Response } from "express";
import { Scraper } from "agent-twitter-client";
import { handleResponse, handleError } from "../utils/responseHandler";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.body; // Accept data from the request body
    if (!username) {
      return res
        .status(400)
        .json({ success: false, error: "Username is required" });
    }

    const scraper = new Scraper();
    await scraper.login(
      process.env.TWITTER_USERNAME || "",
      process.env.TWITTER_PASSWORD || "",
      process.env.TWITTER_EMAIL || "",
      process.env.TWITTER_API_KEY || "",
      process.env.TWITTER_API_SECRET_KEY || "",
      process.env.TWITTER_ACCESS_TOKEN || "",
      process.env.TWITTER_ACCESS_TOKEN_SECRET || ""
    );

    const profile = await scraper.getProfile(username);
    handleResponse(res, profile, "Fetched profile successfully");
  } catch (error) {
    handleError(res, error);
  }
};
