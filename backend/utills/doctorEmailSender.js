const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

let sentEmails = []; // Store sent emails in memory

function sendEmail({ reciver, subject, text, receivedDate, sentDate }) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "uwihuston@gmail.com",
                pass: "ykam eqoh yimb rknd",
            },
        });
        const mail_configs = {
            from: "uwihuston@gmail.com",
            to: reciver,
            subject: subject,
            text: text,
        };
        transporter.sendMail(mail_configs, (error, info) => {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occurred` });
            }
            sentEmails.push({ reciver, subject, text, receivedDate, sentDate }); // Store sent email
            return resolve({ message: "Email sent successfully" });
        });
    });
}

app.get("/http://localhost:5000/api/v1/email_handle", (req, res) => {
    res.send(sentEmails); // Send sent emails
});

app.post("http://localhost:5000/api/v1/email_handle", (req, res) => {
    console.log(req.body);
    sendEmail(req.body)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = sendEmail;