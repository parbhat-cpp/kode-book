'use client'

import { HeroMarquee } from "@/components/HeroMarquee";
import LoginButton from "@/components/LoginButton";
import PageWrapper from "@/components/PageWrapper";
import { SupportedLanguages } from "@/components/SupportedLanguages";

import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero section */}
      <div className="flex h-[calc(100vh-75px)] bg-lpPrimaryBg hero-clip py-10">
        <div className="flex md:basis-4/6 items-center text-white">
          <div className="grid gap-5 text-wrap py-5 px-14">
            <h1 className="text-4xl sm:text-5xl">A Social Media for Coders</h1>
            <h2 className="text-lpSecondaryText text-2xl sm:text-4xl">Code with your buddies</h2>
            <p className="text-lpSecondaryText">Welcome to **Kode Book** – the social platform for programmers! Connect, collaborate, and code with developers worldwide. Share projects, solve challenges, and grow your skills in a community built just for coders. Join today and start coding together!</p>
            <div>
              <LoginButton btntext="Get Started" />
            </div>
          </div>
        </div>
        <div className="md:flex md:basis-1/3 hidden bg-transparent">
          <HeroMarquee />
        </div>
      </div>

      {/* Key Features */}
      <div className="py-7 px-4">
        <div className="text-center"><h3>Key Features</h3></div>
        <div className="flex">
          <div className="p-5 border-4 border-lpPrimaryBg rounded-xl">
            <div>
              <FaGithub size={45} />
            </div>
            <div className="grid gap-3">
              <h4 className="font-medium">
                Seamless GitHub Integration
              </h4>
              <p>
                Connect your GitHub profile and import repositories directly into Kode Book. Easily manage and showcase your coding projects while contributing to others' work through Kode Book's intuitive interface.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-lpSecondaryBg py-7">
        <div className="text-center">
          <h3>Code in your favorite language</h3>
        </div>
        <div>
          <SupportedLanguages />
        </div>
      </div>
    </PageWrapper>
  );
}

