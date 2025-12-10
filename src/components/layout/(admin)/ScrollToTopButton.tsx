"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components";
import { useScroll } from "@/hooks";

const topPositionToStartShowing = 300;

export default function ScrollToTopButton() {
  const pageYOffset = useScroll();
  console.log(pageYOffset);
  return (
    <Button
      type="button"
      variant="default"
      size="icon-md"
      className={`${pageYOffset >= topPositionToStartShowing ? "fixed" : "hidden"} bottom-4 right-4`}
      aria-label="Scroll To Top of the Window Button"
      onClick={() => {
        if (typeof window !== "undefined") {
          console.log("here");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <ArrowUp />
    </Button>
  );
}
