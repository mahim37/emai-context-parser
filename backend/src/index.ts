import express, {Request, Response} from 'express';
import config from "config";
import log from "../logger/log";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import router from "../routes/index";
import { googleRouter } from "../routes/authGoogle";
import outlookRouter  from "../routes/authOutlook";


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
      secret: "any_secret_key",
      resave: false,
      saveUninitialized: false,
    })
  );

const port = config.get<number>("port");
const host = config.get<string>("host");


// Routes
app.use("/", googleRouter);
app.use("/api/mail", router);
app.use("/outlook", outlookRouter);

app.get("/", async (req: Request, res: Response) => {
  res.redirect("https://documenter.getpostman.com/view/31971527/2sA35D43FE");
});

app.listen(port, async () => {
    try {
        log.info(`Server running at http://${host}:${port}`);
    }
    catch (err){
        log.error('Failed to start server', err);
        process.exit(1);
    }
});


