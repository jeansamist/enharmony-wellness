import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface SignInEmailTemplateProps {
  link: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export function SignInEmailTemplate({ link }: SignInEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Sign in to Enharmony Wellness</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src={`${baseUrl}/enharmony-wellness-logo.svg`}
              width="180"
              height="auto"
              alt="Enharmony Wellness"
              style={logo}
            />
          </Section>

          <Section style={contentSection}>
            <Heading style={h1}>Welcome Back!</Heading>
            <Text style={text}>
              Click the button below to sign in to your account. This link will
              expire in 24 hours.
            </Text>

            <Section style={btnContainer}>
              <Button style={button} href={link}>
                Sign In
              </Button>
            </Section>

            <Text style={smallText}>
              Or copy and paste this URL into your browser:
              <br />
              <Link href={link} style={anchor}>
                {link}
              </Link>
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              If you didn&apos;t request this email, you can safely ignore it.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9f8",
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

const contentSection = {
  padding: "0 10px",
  textAlign: "center" as const,
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
  color: "rgba(46, 46, 46, 0.7)",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 26px",
};

const smallText = {
  color: "rgba(46, 46, 46, 0.5)",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "20px 0",
  wordBreak: "break-all" as const,
};

const btnContainer = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#7a9b8c",
  borderRadius: "0px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
  fontWeight: "bold",
  border: "none",
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
