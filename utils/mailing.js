import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const sendEmail = async (to, subject, text) => {
    const send = await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text
    });
   
    console.log('Message sent: ', send);
};
