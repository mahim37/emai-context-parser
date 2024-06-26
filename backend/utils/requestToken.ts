import axios, { AxiosRequestConfig } from "axios";
import config from 'config';
import log from '../logger/log';


const OPENAI_SECRET_KEY = config.get<string>("OPENAI_SECRET_KEY");
const GOOGLE_CLIENT_ID = config.get<string>("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = config.get<string>("GOOGLE_CLIENT_SECRET");
const GOOGLE_REDIRECT_URI = config.get<string>("GOOGLE_REDIRECT_URI");


const options: AxiosRequestConfig = {
  method: 'POST',
  url: 'https://oauth2.googleapis.com/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    code: '4/0AeaYSHDS9CE9BtWxbNYokh7CvJeIFdIhtTWjvcsu_ffdGphZSq3oh0LSng7R5_ez1nvpDQ',
    redirect_uri: 'https://reachinbox-assignment-4rf9.onrender.com/auth/google/callback'
  })
};

axios.request(options).then(response => {
  log.info(response.data);
}).then(data => log.info(data))
.catch(error => {
  log.error(error);
});
