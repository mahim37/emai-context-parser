import { Worker, Job } from "bullmq";
import { connection, redisGetToken } from "../middlewares/redis.middleware";
import { parseAndSendoutlookMail } from "./controllers/outlook.queue";
import { parseAndSendMail } from "./controllers/queue.controller";
import {google} from 'googleapis';
import nodemailer from 'nodemailer';
import log from "../logger/log";
import config from 'config';

interface EmailData {
  from: string;
  to: string;
  id: string;
  token: string;
  jobId: string;
}

const sendEmail = async (data: EmailData, jobID: string): Promise<any> => {
  try {
    console.log(data);
    let msg = await parseAndSendMail(data, data.token);
    if (msg) {
      log.info(`Job ${jobID} completed and sent to ${data.to}`);
    }
    return msg;
  } catch (err) {
    log.error(err);
  }
};

const mailWorker = new Worker(
  "email-queue",
  async (job: Job<EmailData>) => {
    const { from, to, id, token, jobId } = job.data;

    log.info(`Job ${job.id} has started`);
    setTimeout(async () => {
      await sendEmail(job.data, String(job.id));
    }, 5000);
    log.info("Job in progress");
  },
  { connection }
);

const sendoutlookmail = async (data: EmailData, jobID: string): Promise<any> => {
  try {
    let msg = await parseAndSendoutlookMail(data, data.token);
    if (msg) {
      log.info(`Job ${jobID} completed and sent to ${data.to}`);
    }
    return msg;
  } catch (err) {
    log.error(err);
  }
};

const outlookmailWorker = new Worker(
  "outlook-queue",
  async (job: Job<EmailData>) => {
    const { from, to, id, jobId } = job.data;

    log.info(`Job ${job.id} has started`);
    setTimeout(async () => {
      await sendoutlookmail(job.data, String(job.id));
    }, 5000);
    log.info("Job in progress");
  },
  { connection }
);
