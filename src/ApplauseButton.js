import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { ReactComponent as HandsOutline } from "./assets/hands-outline.svg";
import { ReactComponent as Hands } from "./assets/hands.svg";
import { ReactComponent as Spark } from "./assets/spark.svg";
import "./styles.css";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/recreating-the-medium-applause-button
 */

const BUBBLE_THRESHOLD = 1000;
const CLICK_THRESHOLD = 250;
const APPLAUSE_MAX = 50;
const INITIAL_COUNT = 300;

const ApplauseButton = () => {
  let bubbleTimer = useRef(null);
  let clickTimer = useRef(null);
  const sparkTilt = Math.random() < 0.5 ? "left" : "right";

  const [applause, setTotalApplause] = useState(0);
  const [active, setIsActive] = useState(false);
  const [clicked, setIsClicked] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setIsClicked(true);
    setHasInteracted(true);
    setTotalApplause((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (active) {
      bubbleTimer.current = setTimeout(
        () => setIsActive(false),
        BUBBLE_THRESHOLD
      );
      clickTimer.current = setTimeout(
        () => setIsClicked(false),
        CLICK_THRESHOLD
      );
    }

    return () => {
      clearTimeout(bubbleTimer.current);
      clearTimeout(clickTimer.current);
    };
  }, [applause, active]);

  return (
    <div className="container">
      <h1>Medium Applause Button</h1>
      <div className="outer-container">
        <button
          type="button"
          className={cn("applause-button", {
            active,
            inactive: !active,
            clicked,
            interacted: hasInteracted
          })}
          onClick={handleClick}
          disabled={applause >= APPLAUSE_MAX}
        >
          {hasInteracted ? (
            <Hands className="hands" />
          ) : (
            <HandsOutline className="hands" />
          )}
          <div className={cn("spark-container", sparkTilt)}>
            <Spark className="spark" />
          </div>
          <span className="bubble">{`+${applause}`}</span>
          <span className="counter">{applause + INITIAL_COUNT}</span>
        </button>
      </div>
    </div>
  );
};

export default ApplauseButton;
