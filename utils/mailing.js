import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});


export const registerUserMailTemplate = `
<div>
<h1> Welcome to our platform </h1>
<p> You have successfully registered on our platform. </p>
</div>`;
