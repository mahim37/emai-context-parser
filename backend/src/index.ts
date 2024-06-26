import express, {Request, Response} from 'express';
import config from "config";
import log from "../logger/log";
// import connectDB from "../utils/connect";
// import router from "../routes";
import cors from "cors";
import helmet from "helmet";




const app = express();


const port = config.get<number>("port");
const host = config.get<string>("host");

//Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(deserializeUser);


// Routes
app.listen(port, async () => {
    try {
        log.info(`Server running at http://${host}:${port}`);
    }
    catch (err){
        log.error('Failed to start server', err);
        process.exit(1);
    }
    await connectDB();
});


