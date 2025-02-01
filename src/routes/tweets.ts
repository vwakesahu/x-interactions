import { Router } from "express";
import { getTweets, getLatestTweet } from "../controllers/tweetsController";

const router = Router();

router.post("/tweets", getTweets);
router.post("/tweets/latest", getLatestTweet);

export default router;
