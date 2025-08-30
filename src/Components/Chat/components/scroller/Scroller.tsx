import { useEffect, useState, type RefObject } from "react";
import "./scroller.css";

type Props = { box: RefObject<HTMLDivElement | null> };

export const Scroller = ({ box }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      const distanceFromBottom = scrollHeight - clientHeight - scrollTop;
      setVisible(distanceFromBottom > 250);
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [box]);

  const scrollToBottom = () => {
    box.current?.scrollTo({
      top: box.current.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <div
      className={`scrollBtn bg-gradient-to-b
     from-purple-600 to-blue-600 hover:from-blue-700 hover:to-purple-700
     transition duration-300 select-none ${visible ? "showBtn" : ""}`}
      onClick={scrollToBottom}
    >
      ⬇
    </div>
  );
};
