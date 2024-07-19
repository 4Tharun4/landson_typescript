import { Button, Heading, Html, Row, Section } from "@react-email/components";
import * as React from "react";


interface VerficationEmailProps{
    UserName :string,
    Otp : string
}

export default function VerificationEmail({UserName,Otp}:VerficationEmailProps) {

  return (
    <Html>
        <title>Verfication Code</title>
      <Section>
        <Row>
            <Heading as="h2">Hello {UserName},</Heading>
        </Row>
      <Row>
        <Heading as="h4">Your Otp Is {Otp}</Heading>
      </Row>
      </Section>
    </Html>
  );
}