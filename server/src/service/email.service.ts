import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const createVerificationToken = (userId: string): string => {
  const token = jwt.sign(
    { userId, purpose: 'email_verification' },
    process.env.JWT_SECRET!,
    { expiresIn: '8h' }
  );
  return token;
};

const verificationEmailTemplate = (
  username: string,
  verificationLink: string
) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .header {
      background-color: #000;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #000;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Mamora!</h1>
    </div>
    <div class="content">
      <h2>Hey ${username},</h2>
      <p>Thanks for signing up for Mamora! Please verify your email address to start using our services.</p>
      <p>This link will expire in 8 hours.</p>
      <a href="${verificationLink}" class="button">Verify Email Address</a>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Mamora. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const sendVerificationEmail = async (
  email: string,
  username: string,
  userId: string
) => {
  const verificationToken = createVerificationToken(userId);
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your Mamora account',
      html: verificationEmailTemplate(username, verificationLink),
    });
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};
