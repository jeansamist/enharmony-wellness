import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface NewsletterEmailTemplateProps {
  postTitle: string;
  postDescription: string;
  readMoreLink: string;
  unsubscribeLink: string;
  trackingPixelUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export function NewsletterEmailTemplate({
  postTitle,
  postDescription,
  readMoreLink,
  unsubscribeLink,
  trackingPixelUrl,
}: NewsletterEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{postTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src={`${baseUrl}/enharmony-wellness-logo.svg`}
              width="180"
              height="auto"
              alt="Enharmony Wellness"
              style={logo}
            />
          </Section>

          {/* Hero Image */}
          <Section style={heroSection}>
            <Img
              src={`${baseUrl}/article-cover.png`}
              width="100%"
              height="auto"
              alt="Cover"
              style={heroImage}
            />
          </Section>

          {/* Content */}
          <Section style={contentSection}>
            <Heading style={h1}>{postTitle}</Heading>
            <Text style={text}>{postDescription}</Text>
            
            <Section style={btnContainer}>
              <Button style={button} href={readMoreLink}>
                Read full article
              </Button>
            </Section>
            
            <Hr style={hr} />
            
            <Text style={footer}>
              You are receiving this email because you subscribed to Enharmony Wellness.
              <br />
              <Link href={unsubscribeLink} style={anchor}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
        {trackingPixelUrl && (
          <Img
            src={trackingPixelUrl}
            alt=""
            width="1"
            height="1"
            style={{ display: "none" }}
          />
        )}
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9f8", // Very light greenish/gray hint to match brand
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const logoSection = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "32px",
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const heroSection = {
  marginBottom: "32px",
};

const heroImage = {
  borderRadius: "0px", // Flat design
};

const contentSection = {
  padding: "0 10px",
};

const h1 = {
  color: "#2e2e2e",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
  padding: "0",
  lineHeight: "1.3",
};

const text = {
  color: "rgba(46, 46, 46, 0.7)", // 70% opacity of #2e2e2e
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 26px",
};

const btnContainer = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#7a9b8c", // Brand primary color
  borderRadius: "0px", // Flat
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
  fontWeight: "bold",
  border: "none", // Flat
};

const hr = {
  borderColor: "#e6ebed",
  margin: "20px 0",
};

const footer = {
  color: "rgba(46, 46, 46, 0.5)",
  fontSize: "12px",
  lineHeight: "1.5",
  textAlign: "center" as const,
  marginTop: "20px",
};

const anchor = {
  color: "#7a9b8c",
  textDecoration: "underline",
};