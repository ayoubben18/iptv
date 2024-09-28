import React, { Suspense } from "react";
import SectionWrapper from "../shared/SectionWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { getI18n } from "@/locales/server";

const Faq = async () => {
  const t = await getI18n();
  return (
    <SectionWrapper className="items-start gap-8">
      {" "}
      <h1 className="text-start text-4xl font-black">{t("faqTitle")}</h1>
      <p className="max-w-4xl">{t("faqDescription")}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <AccSection />
      </Suspense>
    </SectionWrapper>
  );
};

const AccSection = async () => {
  const t = await getI18n();
  const iptvFAQs = [
    {
      question: t("faqPaymentMethods"),
      answer: t("faqPaymentMethodsAnswer"),
    },
    {
      question: t("faqDevices"),
      answer: t("faqDevicesAnswer"),
    },
    {
      question: t("faqInternetSpeed"),
      answer: t("faqInternetSpeedAnswer"),
    },
    {
      question: t("faqConnections"),
      answer: t("faqConnectionsAnswer"),
    },
  ];
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
