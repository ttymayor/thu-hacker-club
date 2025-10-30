import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface NavbarAnchor {
  title: string;
  anchor: string;
}

const navbarAnchors: NavbarAnchor[] = [
  { title: "首頁", anchor: "intro" },
  { title: "關於我們", anchor: "about" },
  { title: "目標", anchor: "goals" },
  { title: "活動內容", anchor: "activities" },
  { title: "加入我們", anchor: "join" },
];

export function NavbarAnchors() {
  const [activeSection, setActiveSection] = useState<string>("intro");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navbarAnchors.map(({ anchor }) => anchor);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 如果 section 在視窗中央附近，就設為 active
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化時執行一次

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    setIsOpen(false);
  };

  const activeAnchor = navbarAnchors.find(
    (item) => item.anchor === activeSection,
  );

  return (
    <div className="relative">
      {/* 桌面版導航 */}
      <div className="hidden items-center space-x-2 md:flex">
        {navbarAnchors.map((item) => (
          <button
            key={item.anchor}
            onClick={() => scrollToSection(item.anchor)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeSection === item.anchor
                ? "bg-green-600/20 text-green-600 dark:text-green-400"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* 手機版下拉選單 */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-muted/50 text-foreground flex items-center space-x-2 rounded-md px-3 py-1.5 text-sm font-medium"
        >
          <span>{activeAnchor?.title || "導航"}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-background/95 border-border absolute top-full left-0 z-50 mt-2 w-48 rounded-md border shadow-lg backdrop-blur-sm"
          >
            {navbarAnchors.map((item) => (
              <button
                key={item.anchor}
                onClick={() => scrollToSection(item.anchor)}
                className={`hover:bg-muted/50 w-full px-4 py-2 text-left text-sm first:rounded-t-md last:rounded-b-md ${
                  activeSection === item.anchor
                    ? "bg-green-600/20 text-green-600 dark:text-green-400"
                    : "text-foreground"
                }`}
              >
                {item.title}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
