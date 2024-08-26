import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SupportEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function SupportEmail({
  name,
  email,
  message,
}: SupportEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New support message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Support Message</Heading>
          <Text style={text}>
            You have received a new support message from {name}.
          </Text>
          <Section style={messageContainer}>
            <Text style={messageHeader}>From:</Text>
            <Text style={messageContent}>
              {name} ({email})
            </Text>
            <Text style={messageHeader}>Message:</Text>
            <Text style={messageContent}>{message}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            This is an automated message from your support system. Please do not
            reply directly to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "center" as const,
};

const messageContainer = {
  backgroundColor: "#f4f4f4",
  borderRadius: "4px",
  padding: "24px",
  margin: "20px 0",
};

const messageHeader = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "8px",
};

const messageContent = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "16px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
