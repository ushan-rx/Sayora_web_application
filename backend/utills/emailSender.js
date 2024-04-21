const nodemailer = require('nodemailer');

const sendEmail = async (name,userType,userRole,email,tempUserId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aroshanawap@gmail.com',
      pass: 'kwnq vlab zqpp yzvl',
    },
  });

  const mailOptions = {
    from: 'aroshanawap@gmail.com',
    to: email,
    subject: 'Confirm Your Registration',
    html: `<p>Dear ${name} , you have registered as ${userType}, ${userRole},Please click the link to confirm your registration: <a href="http://localhost:5173/register/${tempUserId}">http://localhost:5173/register/${tempUserId}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;