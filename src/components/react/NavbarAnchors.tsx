import { useState, useEffect, useRef } from "react";
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
  const [isClient, setIsClient] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 確保只在客戶端執行
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // 使用 Intersection Observer 替代 scroll 事件
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // 只有當元素在視窗中央時才觸發
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // 等待 DOM 完全載入後再開始觀察
    const timer = setTimeout(() => {
      const sections = navbarAnchors.map(({ anchor }) => anchor);
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isClient]);

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
