// email to send verification email
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplate.js";
import { mailtrapClient } from "./mailtrapConfig.js";
import { sender } from "./mailtrapConfig.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    // sends the email with the given parameters
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      // token you get from the database
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email send successfully", response);
  } catch (error) {
    console.log("Error sending verification", error);
    // raises and error, interrupting the flow of program execution
    throw new Error("Error sending email verification", error);
  }
};

export const sendPasswordChangeRequest = async (email, url) => {
  const recipient = [{ email }];

  try {
    // sends the email with the given parameters
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset request",
      // token you get from the database
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
      category: "Password reset",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error sending verification", error);
    // raises and error, interrupting the flow of program execution
    throw new Error("Error sending email verification", error);
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  const recipient = [{ email }];

  try {
    // sends the email with the given parameters
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "ae00f373-644c-451e-a9f1-f0755699fd60",
      template_variables: {
        company_info_name: "ThinkBoard - Your Daily Note Taking App",
        first_name: userName,
      },
      // token you get from the database
    });

    console.log("Email send successfully", response);
  } catch (error) {
    console.log("Error sending welcome email", error);
    // raises and error, interrupting the flow of program execution
    throw new Error("Error sending welcome email", error);
  }
  //     const { MailtrapClient } = require("mailtrap");

  // const TOKEN = "<YOUR_API_TOKEN>";

  // const client = new MailtrapClient({
  //   token: TOKEN,
  // });

  // const sender = {
  //   email: "hello@demomailtrap.co",
  //   name: "Mailtrap Test",
  // };
  // const recipients = [
  //   {
  //     email: "sbm7640@outlook.com",
  //   }
  // ];

  // client
  //   .send({
  //     from: sender,
  //     to: recipients,
  //     template_uuid: "ae00f373-644c-451e-a9f1-f0755699fd60",
  //     template_variables: {
  //       "company_info_name": "Test_Company_info_name"
  //     }
  //   })
  //   .then(console.log, console.error);
};

export const sendPasswordResetSuccess = async (email, userName) => {
  const recipient = [{ email }];

  try {
    // sends the email with the given parameters
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error password reset success email", error);
    // raises and error, interrupting the flow of program execution
    throw new Error("Error password reset success email", error);
  }
};
