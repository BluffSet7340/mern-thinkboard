import dotenv from "dotenv";
import {MailtrapClient} from "mailtrap";

dotenv.config();

const TOKEN = process.env.MAILTRAP_API_KEY;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
    // can only send emails to yourself
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};
// const recipients = [
//   {
//     email: "sbm7640@outlook.com",
//   }
// ];

// mailtrapClient
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);