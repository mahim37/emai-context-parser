import {
    signin,
    callback,
    getMails,
    readMail,
    getUser,
    sendMail
} from "../controllers/outlook.controller";
import express, { Request, Response } from "express";
import  config from "config";
import { sendOutlookMailViaQueue } from "../controllers/outlookQueue";
import { connection, redisGetToken } from '../middlewares/redis.middleware';

const outlookRouter = express.Router();

outlookRouter.use(express.json());
outlookRouter.use(express.urlencoded({ extended: true }));

// Outlook Routes
outlookRouter.get('/signin', signin);
outlookRouter.get('/callback', callback);
outlookRouter.get('/profile', getUser);
outlookRouter.get('/all-Mails/:email', getMails);
outlookRouter.get('/:email/read-Msg/:message', readMail);

outlookRouter.post("/:email/send-Mail", async (req: Request, res: Response) => {
    try {
        const token = await redisGetToken(req.params.email) || "";
        const result = await sendMail(req.body, token);
        res.status(200).json({ message: "Email sent successfully", result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

outlookRouter.post("/sendone/:email/:id", sendOutlookMailViaQueue);

export default outlookRouter;
