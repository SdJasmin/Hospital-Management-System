import { Verification_Email_Template, Welcome_Email_Template } from "../libs/EmailTemplate.js";
import { transporter } from "./Emailcong.js";

export const Sendverificationcode = async (email, verificationcode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Arogya Hospital " <sdjasmin7314@gmail.com>',
      to: email,
      subject: "Verify your email",
      text: "Verify your email",
      html: Verification_Email_Template.replace(`{verificationCode}`, verificationcode),
    });
    console.log("Email sent successfully..!!!", response);
  } catch (error) {
    console.log("Email error", error);
  }
};

export const WelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"Hospital management by jasu" <sdjasmin7314@gmail.com>',
      to: email,
      subject: "Welcome email",
      text: "Welcome email",
      html: Welcome_Email_Template.replace(`{name}`, name),
    });
    console.log("Email sent successfully..!!!", response);
  } catch (error) {
    console.log("Email error", error);
  }
};
