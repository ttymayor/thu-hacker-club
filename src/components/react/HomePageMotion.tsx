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
    <section className="section-container select-none">
      <div ref={ref} className="content-wrapper">
        <div className="prose-container">
          {id === 1 ? (
            <>
              <h2 className="section-title text-center">114 東海駭客社</h2>
              <div className="typing-container">
                <Typing />
              </div>
            </>
          ) : (
            <h2 className="section-title">{section.title}</h2>
          )}
          {section.content?.map((content, index) => (
            <>
              <p className="section-content">{content}</p>
              {index !== section.content?.length - 1 && <br />}
            </>
          ))}
        </div>
      </div>
      <motion.div
        className="section-number"
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
    <div id="example">
      {[1, 2, 3, 4, 5].map((sectionId) => (
        <Section key={sectionId} id={sectionId} />
      ))}
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
  return (
    <style>{`
        html {
            scroll-snap-type: y mandatory;
        }

        #example {
            position: relative;
        }

        .section-container {
            min-height: 100vh;
            scroll-snap-align: start;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: 2rem;
        }

        .content-wrapper {
            max-width: 800px;
            width: 100%;
            margin: 0 auto;
        }

        .prose-container {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            padding: 3rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #8df0cc, #4ade80);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }

        .section-content {
            font-size: 1.125rem;
            line-height: 1.8;
            color: var(--foreground);
            margin: 0;
        }

        .typing-container {
            display: flex;
            justify-content: center;
        }

        .section-number {
            color: #8df0cc;
            margin: 0;
            font-family: "Azeret Mono", monospace;
            font-size: 4rem;
            font-weight: 700;
            letter-spacing: -3px;
            line-height: 1.2;
            position: absolute;
            display: inline-block;
            top: 4rem;
            right: 4rem;
            opacity: 0.3;
        }

        @media (max-width: 768px) {
            .section-container {
                padding: 1rem;
            }

            .prose-container {
                padding: 2rem;
            }

            .section-title {
                font-size: 2rem;
            }

            .section-content {
                font-size: 1rem;
            }

            .section-number {
                font-size: 3rem;
                top: 1rem;
                right: 1rem;
            }
        }
    `}</style>
  );
}

export const HomePageMotion = () => {
  return <Parallax />;
};
