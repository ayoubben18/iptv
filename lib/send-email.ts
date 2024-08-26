"use server";

import nodemailer from "nodemailer";
import { ServerEnv } from "./env-server";
import { z } from "zod";
import logger from "./logger";
import { render } from "@react-email/render";
import SupportEmail from "@/constants/SupportEmailTemplate";

const transporter = nodemailer.createTransport({
  service: "titan",
  host: ServerEnv.SMTP_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: ServerEnv.SMTP_SERVER_USERNAME,
    pass: ServerEnv.SMTP_SERVER_PASSWORD,
  },
});

const emailSchema = z.object({
  subject: z.string(),
  text: z.string(),
  name: z.string(),
  email: z.string().email(),
});

const sendSupportEmail = async ({
  subject,
  text,
  name,
  email,
}: z.infer<typeof emailSchema>) => {
  const isVerified = await transporter.verify();
  if (!isVerified) {
    throw new Error("SMTP Server is not verified");
  }

  const emailHtml = render(SupportEmail({ name, email, message: text }));

  const info = await transporter.sendMail({
    from: ServerEnv.SMTP_SERVER_USERNAME,
    to: ServerEnv.SITE_MAIL_RECIEVER,
    subject: `Support Email from ${name}`,
    html: await emailHtml,
  });
  logger.info("New Email sent", { subject, text, info: info.response });
  return info;
};

export { sendSupportEmail };
