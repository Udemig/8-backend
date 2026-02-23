import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const sendMail = async (options) => {
  // maili göndericek sağlayıcının ayarlarını yap
  const transporter = nodemailer.createTransport(
    process.env.NODE_ENV === "development"
      ? {
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        }
      : MailtrapTransport({ token: process.env.EMAIL_TOKEN }),
  );

  // mail içeriğini tanımla
  const prodSender = {
    address: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };
  const devSender = {
    address: "support@tourify.com",
    name: "Tourify",
  };

  const mailOptions = {
    from: process.env.NODE_ENV === "development" ? devSender : prodSender,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  // yukarıda ayarlanan sağlayıcı ve bilgileri kullanarak maili gönder
  await transporter.sendMail(mailOptions);
};

export default sendMail;
