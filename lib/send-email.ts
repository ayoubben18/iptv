"use server";

import nodemailer from "nodemailer";
import { ServerEnv } from "./env-server";
import { z } from "zod";
import logger from "./logger";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: ServerEnv.SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: ServerEnv.SMTP_SERVER_USERNAME,
    pass: ServerEnv.SMTP_SERVER_PASSWORD,
  },
});

const emailSchema = z.object({
  subject: z.string(),
  text: z.string(),
});

const sendEmail = async ({ subject, text }: z.infer<typeof emailSchema>) => {
  const isVerified = await transporter.verify();
  if (!isVerified) {
    throw new Error("SMTP Server is not verified");
  }

  const info = await transporter.sendMail({
    from: ServerEnv.SMTP_SERVER_USERNAME,
    to: ServerEnv.SITE_MAIL_RECIEVER,
    subject: subject,
    text: text,
    html: "",
  });
  logger.info("New Email sent", { subject, text, info: info.response });
  return info;
};

export { sendEmail };
