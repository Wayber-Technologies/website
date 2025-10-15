import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../header/Logo";

// Define interfaces for footer data
interface SocialLink {
  link: string;
  icon: string;
  dark_icon: string;
}

interface SitemapLink {
  name: string;
  url: string;
}

interface FooterData {
  brand?: {
    tagline?: string;
    socialLinks?: SocialLink[];
  };
  sitemap?: {
    name?: string;
    links?: SitemapLink[];
  };
  contactDetails?: {
    name?: string;
    address?: string;
    email?: string;
    phone?: string;
  };
  copyright?: string;
}

const Footer = () => {
  const [footerData, setfooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/footer-data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setfooterData(data?.footerData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-white dark:bg-dark_black">
      {/* Top Footer Section */}
      <div>
        <div className="container py-16 lg:py-20">
          <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-16">
            {/* Left Section - Brand */}
            <div className="flex flex-col gap-6 max-w-md">
              <div className="flex flex-col items-start gap-4">
                <div className="flex-shrink-0">
                  <Logo />
                </div>
                <p className="text-dark_black/60 dark:text-white/60 leading-relaxed text-sm pt-2">
                  {footerData?.brand?.tagline}
                </p>
              </div>
              <div className="flex gap-5 pt-2">
                {footerData?.brand?.socialLinks?.map((item: SocialLink, index: number) => {
                  return (
                    <Link
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-300 hover:opacity-70"
                    >
                      <Image src={item.icon} className="dark:hidden" alt="social-icon" height={20} width={20} />
                      <Image
                        src={item.dark_icon}
                        className="dark:block hidden"
                        alt="social-icon"
                        height={20}
                        width={20}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Section - Sitemap and Contact */}
            <div className="flex flex-col sm:flex-row gap-8 justify-end">
              {/* Sitemap Section */}
              {/* <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-dark_black dark:text-white text-sm">{footerData?.sitemap?.name}</h3>
                <ul className="flex flex-col gap-3">
                  {footerData?.sitemap?.links?.map((item: SitemapLink, index: number) => {
                    return (
                      <li key={index}>
                        <Link
                          href={item.url}
                          className="text-dark_black/70 dark:text-white/70 hover:text-dark_black dark:hover:text-white transition-colors duration-300 text-sm"
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div> */}

              {/* Contact Details Section */}
              <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
                <h3 className="font-semibold text-dark_black dark:text-white text-sm">
                  {footerData?.contactDetails?.name}
                </h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-dark_black/50 dark:text-white/50 text-xs font-medium mb-1">Address</p>
                    <p className="text-dark_black dark:text-white text-sm leading-relaxed">
                      {footerData?.contactDetails?.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-dark_black/50 dark:text-white/50 text-xs font-medium mb-2">Contact</p>
                    <div className="flex flex-row gap-2">
                      <Link
                        href={`mailto:${footerData?.contactDetails?.email}`}
                        className="text-dark_black dark:text-white hover:text-dark_black/70 dark:hover:text-white/70 transition-colors duration-300 text-sm"
                      >
                        {footerData?.contactDetails?.email}
                      </Link>
                      <Link
                        href={`tel:${footerData?.contactDetails?.phone}`}
                        className="text-dark_black dark:text-white hover:text-dark_black/70 dark:hover:text-white/70 transition-colors duration-300 text-sm"
                      >
                        {footerData?.contactDetails?.phone}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large Logo Section */}
      {/* <div className="w-full py-8 lg:py-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Logo size="large" />
        </div>
      </div> */}

      {/* Bottom Footer Section */}
      <div className="container border-t border-dark_black/10 dark:border-white/10">
        <div className="container py-6 lg:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-dark_black/60 dark:text-white/60 text-xs">{footerData?.copyright}</p>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 lg:gap-6 text-xs">
              <Link
                href="/about"
                className="text-dark_black/60 dark:text-white/60 hover:text-dark_black dark:hover:text-white transition-colors duration-300"
              >
                About
              </Link>
              <span className="text-dark_black/20 dark:text-white/20">•</span>
              <Link
                href="/sitemap"
                className="text-dark_black/60 dark:text-white/60 hover:text-dark_black dark:hover:text-white transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
