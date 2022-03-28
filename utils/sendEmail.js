const nodeMailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMT_SERVICE,

    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

const sendEmailTemplates = ({
  to,
  templateId,
  dynamic_template_data,
}) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail
    .send({
      to,
      from: process.env.SMTP_MAIL,
      templateId,
      dynamic_template_data,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendEmail, sendEmailTemplates };
