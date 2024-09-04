import Link from "next/link";
import WhatsappIcon from "./whatsapp-svgrepo-com.svg";

const phoneNumber = "+212777737974"; // Replace with your actual WhatsApp number
const message = "Hello! I'd like to get in touch with RONOTV."; // Pre-filled message

export default function Component() {
  // Replace this with your actual WhatsApp number or group invite link
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return (
    <div className="group fixed bottom-4 right-4 z-50">
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-green-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        aria-label="Chat on WhatsApp"
      >
        <WhatsappIcon className="size-8 sm:size-10" />
      </Link>
      <div className="absolute bottom-full right-0 mb-2 w-auto min-w-max origin-bottom-right scale-0 rounded-lg bg-white p-2 text-sm font-medium text-gray-900 shadow-lg transition-all duration-300 group-hover:scale-100">
        Chat with us
        <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-white"></div>
      </div>
    </div>
  );
}
