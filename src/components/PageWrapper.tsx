"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { creatorPortfolio, routes } from "@/constants/common";
import { List } from "@phosphor-icons/react";
import { IoHammerSharp } from "react-icons/io5";

interface NavbarLinkProps {
  url: string;
  label: string;
  name: string;
}

const NavbarLink = (props: NavbarLinkProps) => {
  return (
    <>
      <div className="group">
        <Link
          className="hover:text-white"
          href={props.url}
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

const PageWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div>
      {/* Navbar */}
      <header className="sticky z-20 top-0 left-0 py-3 px-10 flex justify-between bg-lpPrimaryBg">
        {/* Kode book logo */}
        <div className="flex gap-3">
          <Link href={"/"} className="flex items-center gap-3 text-white">
            <Image
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
              href={creatorPortfolio}
              target="_blank"
              aria-label="Parbhat Sharma | Portfolio"
            >
              Parbhat Sharma
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageWrapper;
