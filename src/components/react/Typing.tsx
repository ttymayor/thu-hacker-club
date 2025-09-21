import { Typewriter } from "react-simple-typewriter";

export const Typing = () => {
  return (
    <Typewriter
      words={[
        "希望各位社員在今年能夠學到東西",
        "無論是資安還是開發",
        "我更希望大家能從開發角度去考慮資安疑慮",
      ]}
      loop={1}
      cursor
      typeSpeed={70}
      delaySpeed={1000}
    />
  );
};
