import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { Typing } from "@/components/react/Typing";
import { Typewriter } from "react-simple-typewriter";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Section({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 200);

  // 控制每段文字是否要開始打字
  const [typedIndex, setTypedIndex] = useState<number[]>([]);

  // 段落內容
  const getSectionContent = (id: number) => {
    const sections = [
      { title: "114 東海駭客社", anchor: "intro" },
      {
        title: "關於我們",
        anchor: "about",
        content: [
          "資安基礎概念與介紹、資安技術分享、資安競賽參與",
          "還有開發技術分享，解題技巧和開源精神分享，來這裡交朋友吧。",
        ],
      },
      {
        title: "目標",
        anchor: "goals",
        content: [
          "提供學習環境，讓大家一起學習資安和開發，一起成長。並專注於：資訊安全、程式開發、解題技巧。",
        ],
      },
      {
        title: "活動內容",
        anchor: "activities",
        content: [
          "每週社課：星期四晚上 19:00 ~ 21:00",
          "業界/資安講座：不定期舉辦",
        ],
      },
      {
        title: "加入我們",
        anchor: "join",
        content: [
          "如果你對資訊安全、程式開發或創新技術有興趣，歡迎加入東海駭客社！我們歡迎所有對技術充滿熱忱的同學，一起在這個充滿挑戰與機會的領域中探索與成長。",
        ],
      },
    ];
    return sections[(id - 1) % sections.length];
  };

  const section = getSectionContent(id);

  return (
    <motion.section
      id={section.anchor}
      initial={{ filter: "blur(10px)" }}
      whileInView={{ filter: "none" }}
      className="relative flex min-h-screen snap-start items-center justify-center p-8 select-none md:p-4"
    >
      <div ref={ref} className="mx-auto w-full max-w-2xl">
        <motion.div
          initial={{ y: 200 }}
          whileInView={{ y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-12 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-lg md:p-8"
        >
          {id === 1 ? (
            <>
              <h2 className="mb-6 bg-green-600 bg-clip-text text-4xl font-bold text-transparent md:text-3xl dark:bg-green-400">
                &gt; 東海駭客社
              </h2>
              <Typing />
            </>
          ) : (
            <h2 className="mb-6 bg-green-600 bg-clip-text text-4xl font-bold text-transparent md:text-3xl dark:bg-green-400">
              &gt; {section.title}
            </h2>
          )}

          {section.content?.map((content, index) => (
            <div key={index}>
              <motion.p
                viewport={{ once: true }}
                onViewportEnter={() => {
                  setTypedIndex((prev) =>
                    prev.includes(index) ? prev : [...prev, index],
                  );
                }}
                className="text-foreground m-0 text-lg leading-relaxed md:text-base"
              >
                {"> "}
                {typedIndex.includes(index) && (
                  <Typewriter
                    words={[content]}
                    loop={1}
                    cursor
                    cursorStyle="▌"
                    typeSpeed={30}
                  />
                )}
              </motion.p>
              {index !== section.content.length - 1 && <br />}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute top-16 right-16 m-0 inline-block font-mono text-6xl leading-tight font-bold tracking-tighter text-green-600 opacity-30 md:right-4 md:text-5xl dark:text-green-200"
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
      >
        {`0${id}`}
      </motion.div>
    </motion.section>
  );
}

export default function HomePageMotion() {
  return (
    <div className="relative snap-y snap-mandatory">
      {[1, 2, 3, 4, 5].map((sectionId) => (
        <Section key={sectionId} id={sectionId} />
      ))}
    </div>
  );
}
