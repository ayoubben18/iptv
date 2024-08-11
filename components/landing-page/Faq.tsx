import React from "react";
import SectionWrapper from "../shared/SectionWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

// const iptvFAQs = [
//   "What is IPTV and how does it work?",
//   "What devices are compatible with your IPTV service?",
//   "Can I cancel or change my subscription plan anytime?",
//   "How do I sign up for a subscription plan?",
// ];

// question and answer
const iptvFAQs = [
  {
    question: "Available payment methods?",
    answer: "We accept all major credit cards and PayPal.",
  },
  {
    question: "Which devices can be used for IPTV?",
    answer:
      "Our IPTV services are accessible via all smart TV devices (Samsung, Sony, LG…), all Android devices (phones), Apple TV, iPhone, Google Chromecast, MAG box in the STB emulator app and FireStick.",
  },
  {
    question: "Recommended internet speed?",
    answer:
      "We recommend a minimum internet speed of 15 Mbps for a smooth streaming experience.",
  },
  {
    question: "How many connections at once?",
    answer:
      "You may install your account on multiple devices, but keep in mind that it works on 1 at a time.",
  },
];

const Faq = () => {
  return (
    <SectionWrapper className="items-start gap-8">
      {" "}
      <h1 className="text-start text-4xl font-black">FAQ</h1>
      <p className="max-w-4xl">
        Have questions about our IPTV service? Find answers to the most commonly
        asked questions below. If you need further assistance, feel free to
        contact our support team
      </p>
      <AccSection />
    </SectionWrapper>
  );
};

const AccSection = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {iptvFAQs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Faq;
