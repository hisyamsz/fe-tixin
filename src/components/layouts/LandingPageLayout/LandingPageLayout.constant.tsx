import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

export const NAVBAR_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/event" },
];

export const BUTTON_ITEMS = [
  { label: "Register", href: "/auth/register", variant: "bordered" },
  { label: "Login", href: "/auth/login", variant: "solid" },
];

export const SOCIAL_ITEMS = [
  { label: "Facebook", href: "https://facebook.com", icon: <FaFacebook /> },
  { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
  { label: "Tiktok", href: "https://tiktok.com", icon: <FaTiktok /> },
  { label: "Twitter", href: "https://twitter.com", icon: <FaTwitter /> },
  { label: "Youtube", href: "https://youtube.com", icon: <FaYoutube /> },
];
