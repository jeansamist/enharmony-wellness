import { SignInEmailTemplate } from "@/components/email/sign-in.email";
import { ReviewNotificationEmailTemplate } from "@/components/email/review-notification.email";
import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);
export const sendSignInEmail = async (to: string, signInLink: string) => {
  // Implementation for sending sign-in email
  try {
    const { error } = await resend.emails.send({
      from: "Enharmony Wellness <onboarding@resend.dev>",
      to: [to],
      subject: "Hello world",
      react: SignInEmailTemplate({ link: signInLink }),
    });
    if (error) {
      console.error("Error sending email:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendReviewNotificationEmail = async (
  to: string,
  postTitle: string,
  link: string
) => {
  try {
    const { error } = await resend.emails.send({
      from: "Enharmony Wellness <onboarding@resend.dev>",
      to: [to],
      subject: "New Post for Review",
      react: ReviewNotificationEmailTemplate({ postTitle, link }),
    });
    if (error) {
      console.error("Error sending email:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
