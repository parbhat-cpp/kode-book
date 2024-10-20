"use client";

import { DiCode } from "react-icons/di";
import { FaGithub } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { GoCommentDiscussion } from "react-icons/go";
import { MdSettingsVoice } from "react-icons/md";
import { TbHierarchy3 } from "react-icons/tb";

import FeaturesCard from "@/components/homepage/FeaturesCard";
import { HeroMarquee } from "@/components/homepage/HeroMarquee";
import LoginButton from "@/components/LoginButton";
import PageWrapper from "@/components/PageWrapper";
import { SupportedLanguages } from "@/components/homepage/SupportedLanguages";
import GithubStats from "@/components/homepage/GithubStats";

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero section */}
      <div className="flex h-[calc(100vh-75px)] bg-lpPrimaryBg hero-clip py-10">
        <div className="flex md:basis-4/6 items-center text-white">
          <div className="grid gap-5 text-wrap py-5 px-14">
            <h1 className="text-4xl sm:text-5xl">A Social Media for Coders</h1>
            <h2 className="text-lpSecondaryText text-2xl sm:text-4xl">
              Code with your buddies
            </h2>
            <p className="text-lpSecondaryText">
              Welcome to **Kode Book** – the social platform for programmers!
              Connect, collaborate, and code with developers worldwide. Share
              projects, solve challenges, and grow your skills in a community
              built just for coders. Join today and start coding together!
            </p>
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
      <div className="bg-lpSecondaryBg py-7 px-7">
        <div className="text-center mb-5">
          <h3>Key Features</h3>
        </div>
        <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeaturesCard
            icon={<FaGithub size={45} />}
            heading="Seamless GitHub Integration"
            description="Connect your GitHub profile and import repositories directly into Kode Book. Easily manage and showcase your coding projects while contributing to others' work through Kode Book's intuitive interface."
          />
          <FeaturesCard
            icon={<DiCode size={45} />}
            heading="Real-Time Collaborative Coding"
            description="Collaborate in real-time with other developers, regardless of location. Multiple users can code simultaneously on the same project, making brainstorming and solving complex problems a shared experience."
          />
          <FeaturesCard
            icon={<FaUserGroup size={45} />}
            heading="Discover and Code with New Developers"
            description="Find like-minded developers from around the world. Whether you’re looking for a coding partner or a new community, Kode Book helps you connect with coders based on skills, interests, or projects they’re working on."
          />
          <FeaturesCard
            icon={<TbHierarchy3 size={45} />}
            heading="Team Roles and Permissions"
            description="Assign different roles and permissions to team members to control what they can view and edit. For example, project managers can have full control, while developers and designers have specific access based on their roles."
          />
          <FeaturesCard
            icon={<GoCommentDiscussion size={45} />}
            heading="Discussion Threads for Project Decisions"
            description="Each project can have a dedicated space for discussions. Use threaded conversations to talk about task requirements, share ideas, or address concerns. This feature keeps all project-related communication in one place."
          />
          <FeaturesCard
            icon={<MdSettingsVoice size={45} />}
            heading="Integrated Voice Chat for Discussions"
            description="Speak directly with your collaborators while coding. Kode Book’s built-in voice chat feature ensures seamless discussions without needing external platforms, allowing you to brainstorm, ask questions, or work through problems in real-time."
          />
        </div>
      </div>

      {/* Languages */}
      <div className="pt-7">
        <div className="text-center">
          <h3>Code in your favorite language</h3>
        </div>
        <div>
          <SupportedLanguages />
        </div>
      </div>

      {/* GitHub */}
      <div className="bg-lpSecondaryBg py-7">
        <div className="text-center">
          <h3>GitHub Stats</h3>
        </div>
        <GithubStats />
      </div>
    </PageWrapper>
  );
}
