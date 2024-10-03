"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useI18n } from "@/locales/client";
import { MessageCircle, Phone } from "lucide-react";

const ContactComp = () => {
  
  const phoneNumber = "+12342797292"; // Replace with your actual WhatsApp number

  const t = useI18n();
  const handleWhatsAppClick = () => {
    const message = `${t("helloIWantToGetInTouchWithRONOTV")}.`; // Pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("contactUs.title")}
        </CardTitle>
        <CardDescription>{t("contactUs.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <Phone className="h-5 w-5 text-green-500" />
          <span>{phoneNumber}</span>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          {t("contactUs.availability")}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          <MessageCircle className="mr-2 h-4 w-4" />{" "}
          {t("contactUs.contactViaWhatsApp")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactComp;
