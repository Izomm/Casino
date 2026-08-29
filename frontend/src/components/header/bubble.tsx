import React, { useState, useRef, useEffect } from "react";
import styles from "./scss/Glassdropdown.module.scss";

interface bubbleImageProps {
  anything?: string;
  className?: string;
}

export const Bubble: React.FC<bubbleImageProps> = ({ className }) => {
  const [selectedGame, setSelectedGame] = useState("");

  return <img className={className} src="/img/chip(1).png" alt="" />;
};

export default Bubble;
