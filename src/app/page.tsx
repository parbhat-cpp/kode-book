'use client'

import { HeroMarquee } from "@/components/HeroMarquee";
import LoginButton from "@/components/LoginButton";
import PageWrapper from "@/components/PageWrapper";
import { SupportedLanguages } from "@/components/SupportedLanguages";

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero section */}
      <div className="flex h-[calc(100vh-75px)] bg-lpPrimaryBg hero-clip py-10">
        <div className="flex md:basis-4/6 basis-1 items-center text-white">
          <div className="grid gap-5 text-wrap py-5 px-14">
            <h1>A Social Media for Coders</h1>
            <h2 className="text-lpSecondaryText">Code with your buddies</h2>
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

