import { SignInEmailTemplate } from "@/components/email/sign-in.email";
import { ReviewNotificationEmailTemplate } from "@/components/email/review-notification.email";
import { NewsletterEmailTemplate } from "@/components/email/newsletter.email";
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

export const sendNewsletterEmail = async (
  to: string,
  postTitle: string,
  postDescription: string,
  readMoreLink: string,
  unsubscribeLink: string,
  campaignId?: bigint,
  subscriberId?: bigint
) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    let finalReadMoreLink = readMoreLink;
    let trackingPixel = "";

    if (campaignId && subscriberId) {
      finalReadMoreLink = `${baseUrl}/api/newsletter/tracking/click?c=${campaignId}&s=${subscriberId}&d=${encodeURIComponent(
        readMoreLink
      )}`;
      const openTrackingUrl = `${baseUrl}/api/newsletter/tracking/open?c=${campaignId}&s=${subscriberId}`;
      trackingPixel = `<img src="${openTrackingUrl}" alt="" width="1" height="1" style="display:none;" />`;
    }

    // We need to inject the tracking pixel into the email template.
    // Ideally, the template should accept 'trackingPixel' as a prop.
    // For now, we will just render the component and if needed, we might need to modify the template.
    // Actually, let's update the template call below.
    
    // Note: Since Resend React templates are components, we'll pass the tracking info to the component 
    // or we rely on the component to render children. 
    // Let's assume we modify the template to accept trackingPixel or we wrap the logic here.
    
    // Simpler: Just rely on Resend's tracking if available? No, we built our own.
    // We need to update NewsletterEmailTemplate to accept `trackingUrl` (for the pixel image source).

    const { error } = await resend.emails.send({
      from: "Enharmony Wellness <onboarding@resend.dev>",
      to: [to],
      subject: `Latest Post: ${postTitle}`,
      react: NewsletterEmailTemplate({
        postTitle,
        postDescription,
        readMoreLink: finalReadMoreLink,
        unsubscribeLink,
        trackingPixelUrl: campaignId && subscriberId ? `${baseUrl}/api/newsletter/tracking/open?c=${campaignId}&s=${subscriberId}` : undefined,
      }),
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
