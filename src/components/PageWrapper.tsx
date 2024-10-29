import React, { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import { creatorPortfolio, routes, websiteKeywords } from "@/constants/common";
import { List } from "@phosphor-icons/react";
import { IoHammerSharp } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface NavbarLinkProps {
  url: string;
  label: string;
  name: string;
}

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
}

const NavbarLink = (props: NavbarLinkProps) => {
  return (
    <>
      <div className="group">
        <Link
          className="hover:text-white"
          to={props.url}
          aria-label={props.label}
          target="_blank"
        >
          {props.name}
        </Link>
        <div className="h-[2px] w-0 group-hover:w-full bg-white transition-all transform duration-300"></div>
      </div>
    </>
  );
};

const PageWrapper = (props: PageWrapperProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <html>
      <head>
        <Helmet>
          {/* Title & description */}
          <title>{props.title || "Kode Book"}</title>
          <meta
            name="description"
            content={
              props.description ||
              "Kode Book, social media for coders, programmer platform, developer community, collaborative coding, GitHub integration, code discussion, coding voice chat, find coders, project collaboration"
            }
          />
          <meta name="author" content="Parbhat Sharma" />

          <link rel="canonical" href={import.meta.env.VITE_BASE_URL} />

          {/* Social data */}
          <meta name="og:title" content={props.ogTitle || "Kode Book"} />
          <meta
            name="og:description"
            content={
              props.ogDescription || "Kode Book - Connect & Code together"
            }
          />
          <meta
            name="og:url"
            content={props.ogUrl || import.meta.env.VITE_BASE_URL}
          />
          <meta name="og:image" content={props.ogImage || ""} />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:url"
            content={props.ogUrl || import.meta.env.VITE_BASE_URL}
          />
          <meta name="twitter:title" content={props.ogTitle || "Kode Book"} />
          <meta
            name="twitter:description"
            content={
              props.ogDescription || "Kode Book - Connect & Code together"
            }
          />
          <meta name="twitter:image" content={props.ogImage || ""} />

          {/* Keywords */}
          <meta name="keywords" content={websiteKeywords.join(", ")} />

          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Helmet>
      </head>

      <body>
        <div>
          {/* Navbar */}
          <header className="sticky z-20 top-0 left-0 py-3 px-10 flex justify-between bg-lpPrimaryBg">
            {/* Kode book logo */}
            <div className="flex gap-3">
              <Link to={"/"} className="flex items-center gap-3 text-white">
                <img
                  src={"/logo.webp"}
                  alt="Kode Book Logo"
                  height={50}
                  width={50}
                />
                <h4>Kode Book</h4>
              </Link>
              <div className="md:flex hidden gap-5 items-center mx-5 text-lpSecondaryText">
                {routes.map((link) => (
                  <NavbarLink
                    key={link.name}
                    label={link.label}
                    name={link.name}
                    url={link.url}
                  />
                ))}
              </div>
            </div>
            {/* Login button */}
            <div className="md:block hidden">
              <LoginButton />
            </div>
            {/* Menu Button for smaller devices */}
            <button className="md:hidden flex items-center justify-center text-white">
              <List size={25} />
            </button>
          </header>
          {props.children}
          {/* Footer */}
          <footer className="flex sm:flex-row flex-col justify-between bg-lpPrimaryBg py-5 px-12 text-white">
            <h5>&copy; Kode Book {date?.getUTCFullYear().toString()}</h5>
            <div className="flex items-center gap-2">
              <IoHammerSharp />
              <div className="flex items-center">
                <p>Created by&nbsp;</p>
                <Link
                  className="hover:underline"
                  to={creatorPortfolio}
                  target="_blank"
                  aria-label="Parbhat Sharma | Portfolio"
                >
                  Parbhat Sharma
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default PageWrapper;
