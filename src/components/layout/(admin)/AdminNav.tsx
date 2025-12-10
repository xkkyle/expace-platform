"use client";

import Link from "next/link";
import React from "react";
import { ArrowRightIcon, Menu, Sparkle, X } from "lucide-react";
import { MotionBlock, Button, UserProfile } from "@/components";
import { routes } from "@/constants/routes";

export default function AdminNav() {
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
  const toggle = () => setIsSideNavOpen((isSideNavOpen) => !isSideNavOpen);

  return (
    <>
      <nav
        id="layout-nav"
        className={`fixed flex justify-center w-full pt-3 px-3 ${
          isSideNavOpen ? "bg-white" : "bg-white"
        } z-40 md:hidden`}
      >
        <div className="flex justify-between items-center flex-1 w-full px-4 py-3 min-h-[--global-layout-nav-height] h-[--layout-nav-height] border border-muted rounded-full bg-white backdrop-blur-lg">
          <h1
            className="text-xl font-bold font-mono"
            onClick={() => setIsSideNavOpen(false)}
          >
            <Link
              href={routes.ADMIN.ROOT}
              className="flex justify-center items-center gap-1 py-1.5 px-2 w-full h-full text-lg font-black font-mono text-center"
            >
              <Sparkle size={21} className="rotate-45" />
            </Link>
          </h1>
          <Button
            type="button"
            size="icon-md"
            variant="neutral"
            onClick={toggle}
          >
            {isSideNavOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      <div
        id="layout-side-navigation"
        className={`fixed top-[calc(var(--global-layout-padding)+var(--global-layout-nav-height))] left-0 right-0 flex flex-col ${
          isSideNavOpen ? "max-h-full" : "max-h-0"
        } px-3 w-full bg-white z-20 overflow-hidden transition-[max-height] duration-200 ease-[cubic-bezier(0.22, 1, 0.36, 1)] md:hidden`}
      >
        <MotionBlock onClick={toggle} className="rounded-lg">
          <Link
            href={routes.ADMIN.ACADEMY}
            className="flex justify-between items-center px-3 w-full min-h-[60px] rounded-lg font-medium cursor-pointer active:bg-gray-50 "
          >
            <span>Academy Register List</span>
            <ArrowRightIcon size={24} />
          </Link>
        </MotionBlock>
        <MotionBlock onClick={toggle} className="rounded-lg">
          <Link
            href={routes.ADMIN.DESIGNTHOU.NEWS}
            className="flex justify-between items-center px-3 w-full min-h-[60px] font-medium rounded-lg cursor-pointer active:bg-gray-50"
          >
            Designthou News
            <ArrowRightIcon size={20} />
          </Link>
        </MotionBlock>
        <div className="flex justify-between items-center min-h-[60px]">
          <UserProfile inSideNav={true} />
          <div className="p-2 border border-muted rounded-full">ENG</div>
        </div>
      </div>
      <div
        id="layout-overlay"
        onClick={toggle}
        className={`fixed top-0 ${
          isSideNavOpen ? "left-0" : "slide-out-to-bottom-full"
        } right-0 bottom-0 h-full bg-muted ${
          isSideNavOpen ? "opacity-80" : "opacity-0"
        } z-10 transition-all duration-300 ease-[cubic-bezier(0.22, 1, 0.36, 1)] cursor-pointer md:hidden`}
      />
    </>
  );
}
