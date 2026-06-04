import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_OFFSET = 112;
const SCROLL_RETRY_DELAY = 120;
const MAX_SCROLL_ATTEMPTS = 40;

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let timeoutId: number | undefined;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = hash.replace("#", "");
    let attempts = 0;

    const scrollToElement = () => {
      const element = document.getElementById(id);

      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
        window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });
        return;
      }

      if (attempts < MAX_SCROLL_ATTEMPTS) {
        attempts += 1;
        timeoutId = window.setTimeout(scrollToElement, SCROLL_RETRY_DELAY);
      }
    };

    scrollToElement();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;