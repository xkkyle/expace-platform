/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { throttle } from "es-toolkit";

const WAIT_TIME = 300;

const useScroll = () => {
  const [pageYOffset, setPageYOffset] = React.useState(0);

  const handleScroll = throttle(() => {
    setPageYOffset(window.pageYOffset);
  }, WAIT_TIME);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return pageYOffset;
};

export default useScroll;
