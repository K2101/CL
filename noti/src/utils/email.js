const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "ttmm7945@gmail.com",
    pass: "jzqb lrhn fjdi pymh",
  },
  connectionTimeout: 5 * 60 * 1000,
});

const mailSender = async (to, message, fileName, fileType, url, size) => {
  const info = await transporter.sendMail({
    from: "ttmm7945@gmail.com",
    to, // list of receivers
    subject: 'Central File and Noti assesments',
    text: '',
    html: `<b>${message}</b><br>
    <b>File Name: ${fileName},</b>
      <b> File Type: ${fileType},</b><br>
      <b> URL: ${url}</b><br>
      <b> Size: ${size}  Bytes.</b>`, // html body
  });

  console.log('info', info)

}

module.exports = { mailSender }