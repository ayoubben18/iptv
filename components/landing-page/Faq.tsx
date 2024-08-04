import React from "react";
import SectionWrapper from "../shared/SectionWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const iptvFAQs = [
  "What is IPTV and how does it work?",
  "What devices are compatible with your IPTV service?",
  "Can I cancel or change my subscription plan anytime?",
  "How do I sign up for a subscription plan?",
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
          <AccordionTrigger>{faq}</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            vehicula, nisl nec fermentum molestie, nulla nisl fringilla nunc,
            nec tincidunt nunc ligula at nulla. Curabitur auctor, sem sed
            interdum ultricies, lacus nulla mattis nulla, sit amet interdum
            justo odio et libero.
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Faq;
