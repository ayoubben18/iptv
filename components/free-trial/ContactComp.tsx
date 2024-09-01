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
import { MessageCircle, Phone } from "lucide-react";

const ContactComp = () => {
  const phoneNumber = "+212777737974"; // Replace with your actual WhatsApp number
  const message = "Hello! I'd like to get in touch with RONOTV."; // Pre-filled message

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
        <CardDescription>Get in touch with us via WhatsApp</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <Phone className="h-5 w-5 text-green-500" />
          <span>{phoneNumber}</span>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          We're available Monday to Friday, 9am to 5pm.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          <MessageCircle className="mr-2 h-4 w-4" /> Contact via WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactComp;
