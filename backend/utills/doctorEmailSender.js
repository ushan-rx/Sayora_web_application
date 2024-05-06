const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { google } = require("googleapis");
const app = express();
const port = 5000;
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cors()); // Enable CORS for cross-origin requests

let sentEmails = []; // In-memory storage for simplicity (replace with database for production)

// Using basic authentication
async function sendEmail(emailData) {
    const user = "uwihuston@gmail.com"; // Replace with your actual email
    const pass = "ykam eqoh yimb rknd"; // Replace with your actual password

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user,
            pass
        }
    });

    const mail_configs = {
        from: user,
        to: emailData.reciver,
        subject: emailData.subject,
        text: emailData.text
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mail_configs, (error, info) => {
            if (error) {
                console.error(error);
                return reject({ message: `An error has occurred` });
            }
            sentEmails.push(emailData); // Store sent email
            return resolve({ message: "Email sent successfully" });
        });
    });
}