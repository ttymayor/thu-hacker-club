import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Typing } from "@/components/react/Typing";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Section({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 200);

  // 段落內容
  const getSectionContent = (id: number) => {
    const sections = [
      {
        title: "114 東海駭客社",
      },
      {
        title: "關於我們",
        content: [
          "資安基礎概念與介紹、資安技術分享、資安競賽參與",
          "還有開發技術分享，解題技巧和開源精神分享，來這裡交朋友吧。",
        ],
      },
      {
        title: "我們的使命",
        content: [
          "提供學習環境，讓大家一起學習資安和開發，一起成長。並專注於：資訊安全、程式開發、解題技巧。",
        ],
      },
      {
        title: "活動內容",
        content: [
          "每週社課：星期四晚上 19:00 ~ 21:00",
          "業界/資安講座：不定期舉辦",
        ],
      },
      {
        title: "加入我們",
        content: [
          "如果你對資訊安全、程式開發或創新技術有興趣，歡迎加入東海駭客社！我們歡迎所有對技術充滿熱忱的同學，一起在這個充滿挑戰與機會的領域中探索與成長。",
        ],
      },
    ];
    return sections[(id - 1) % sections.length];
  };

  const section = getSectionContent(id);

  return (
    <section className="min-h-screen flex justify-center items-center relative p-8 md:p-4 select-none snap-start">
      <div ref={ref} className="max-w-4xl w-full mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/10">
          {id === 1 ? (
            <>
              <h2 className="text-4xl md:text-3xl font-bold mb-6 text-center bg-green-600 dark:bg-green-400 bg-clip-text text-transparent">
                114 東海駭客社
              </h2>
              <div className="flex justify-center">
                <Typing />
              </div>
            </>
          ) : (
            <h2 className="text-4xl md:text-3xl font-bold mb-6 bg-green-600 dark:bg-green-400 bg-clip-text text-transparent">
              {section.title}
            </h2>
          )}
          {section.content?.map((content, index) => (
            <div key={index}>
              <p className="text-lg leading-relaxed text-foreground m-0 md:text-base">
                {content}
              </p>
              {index !== section.content.length - 1 && <br />}
            </div>
          ))}
        </div>
      </div>
      <motion.div
        className="text-green-600 dark:text-green-200 m-0 font-mono text-6xl md:text-5xl font-bold tracking-tighter leading-tight absolute inline-block top-16 right-16 md:right-4 opacity-30"
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
      >
        {`0${id}`}
      </motion.div>
    </section>
  );
}

export default function Parallax() {
  return (
    <div id="example" className="relative snap-y snap-mandatory">
      {[1, 2, 3, 4, 5].map((sectionId) => (
        <Section key={sectionId} id={sectionId} />
      ))}
    </div>
  );
}

export const HomePageMotion = () => {
  return <Parallax />;
};
