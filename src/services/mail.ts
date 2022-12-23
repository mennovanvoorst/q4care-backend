import { createTransport } from "nodemailer";
import Email from "email-templates";
import config from "@config";
import path from "path";

const mailConfig = {
  transporter: {
    host: config.mail.host,
    port: Number(config.mail.port) || 465,
    auth: {
      user: config.mail.email,
      pass: config.mail.password,
    },
  },
  template: {
    views: {
      root: path.resolve("src/views/mail/"),
      options: {
        extension: "hbs",
      },
    },
    message: undefined,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        relativeTo: path.resolve("assets"),
        images: true,
      },
    },
  },
};

const transporter = createTransport(mailConfig.transporter);
const templateRenderer = new Email(mailConfig.template);

const send = async (
  options: {
    to: string;
    from: string;
    subject: string;
    attachments?: any;
  },
  template: string = "mail-example",
  vars: any = { message: "message of test" }
) => {
  const html = await templateRenderer.render(template, vars);
  return transporter.sendMail({ ...options, html });
};

export default {
  send,
};
