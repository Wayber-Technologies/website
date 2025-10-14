import { NextResponse } from "next/server";

const footerData = {
  brand: {
    name: "Wayber",
    tagline: "Empowering businesses with innovative solutions. Let's create something amazing together.",
    socialLinks: [
      {
        icon: "/images/home/footerSocialIcon/twitter.svg",
        dark_icon: "/images/home/footerSocialIcon/twitter_dark.svg",
        link: "https://twitter.com",
      },
      {
        icon: "/images/home/footerSocialIcon/linkedin.svg",
        dark_icon: "/images/home/footerSocialIcon/linkedin_dark.svg",
        link: "https://linkedin.com/in",
      },
      {
        icon: "/images/home/footerSocialIcon/dribble.svg",
        dark_icon: "/images/home/footerSocialIcon/dribble_dark.svg",
        link: "https://dribbble.com",
      },
      {
        icon: "/images/home/footerSocialIcon/instagram.svg",
        dark_icon: "/images/home/footerSocialIcon/instagram_dark.svg",
        link: "https://instagram.com",
      },
    ],
  },
  sitemap: {
    name: "Sitemap",
    links: [
      { name: "Contact us", url: "/contact" },
      { name: "About us", url: "/#aboutus" },
      { name: "Work", url: "/#work" },
      { name: "Services", url: "/#services" },
    ],
  },
  otherPages: {
    name: "Other Pages",
    links: [{ name: "Error 404", url: "/not-found" }],
  },
  contactDetails: {
    name: "Contact Details",
    address: "39b Ondo street, Lagos NG.",
    email: "office@waybertechnologies.com",
    phone: "+234 806 111 2232",
  },
  copyright: "©2025 Wayber. All Rights Reserved",
};

export const GET = async () => {
  return NextResponse.json({
    footerData,
  });
};
