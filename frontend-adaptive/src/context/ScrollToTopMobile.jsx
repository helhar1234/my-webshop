import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Icon, optional andere möglich

function ScrollToTopMobile() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 150);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button className="scroll-to-top-mobile" onClick={scrollToTop} aria-label="Zurück nach oben">
        <ArrowUp size={22} />
      </button>
    )
  );
}

export default ScrollToTopMobile;
