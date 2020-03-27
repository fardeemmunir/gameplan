import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";
import lockAnimationData from "./lockAnimation.json";

interface Props {
  isLocked?: boolean;
  className?: string;
  onClick: () => void;
}

const Lock = ({
  isLocked = false,
  className = "w-10 h-10",
  onClick
}: Props) => {
  const animation = useRef<AnimationItem>();
  const container = useRef();

  function playLockAnimation() {
    animation.current.setDirection(-1);
    animation.current.play();
  }

  function playUnlockAnimation() {
    animation.current.setDirection(1);
    animation.current.play();
  }

  useEffect(() => {
    if (!container.current) return;

    animation.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: !isLocked,
      animationData: lockAnimationData
    });
  }, [container]);

  useEffect(() => {
    if (isLocked) {
      playLockAnimation();
    } else {
      playUnlockAnimation();
    }
  }, [isLocked]);

  return <div ref={container} className={className} onClick={onClick}></div>;
};

export default Lock;
