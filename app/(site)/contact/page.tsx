import { Metadata } from "next";

import ContactInfo from "@/components/layout/ContactInfo";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Thông tin liên hệ của chúng tôi: số điện thoại, email, mạng xã hội và địa chỉ cửa hàng.",
};

const ContactPage = () => {
  return <ContactInfo />;
};

export default ContactPage;
